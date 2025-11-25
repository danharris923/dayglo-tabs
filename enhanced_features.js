// Enhanced Features for Dayglo Abortions Tab Collection
// Search, Favorites, Print, YouTube integration

// Local Storage Keys
const STORAGE_KEYS = {
  favorites: 'nmn_favorites',
  recentlyViewed: 'nmn_recent',
  settings: 'nmn_settings'
};

// Favorites Manager
class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.favorites);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveFavorites() {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(this.favorites));
  }

  isFavorite(itemId) {
    return this.favorites.includes(itemId);
  }

  toggleFavorite(itemId) {
    if (this.isFavorite(itemId)) {
      this.favorites = this.favorites.filter(id => id !== itemId);
    } else {
      this.favorites.push(itemId);
    }
    this.saveFavorites();
    this.updateUI();
  }

  updateUI() {
    // Update all favorite buttons
    document.querySelectorAll('.favorite-button, .track-favorite').forEach(btn => {
      const itemId = btn.dataset.itemId;
      if (itemId && this.isFavorite(itemId)) {
        btn.classList.add('active');
        btn.innerHTML = '★';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '☆';
      }
    });
  }
}

// Search Manager
class SearchManager {
  constructor() {
    this.searchIndex = this.buildSearchIndex();
    this.initSearchListeners();
  }

  buildSearchIndex() {
    const index = [];
    
    // Index all albums and tracks
    // Use global albums array from script.js
    (typeof albums !== 'undefined' ? albums : []).forEach(album => {
      // Index album
      index.push({
        type: 'album',
        id: album.id,
        title: album.title,
        year: album.year,
        searchText: `${album.title} ${album.year} ${album.description}`.toLowerCase()
      });

      // Index tracks
      album.trackList.forEach((track, trackIndex) => {
        const hasTab = track.hasBassTabs || track.hasGuitar;
        index.push({
          type: 'track',
          id: `${album.id}_track_${trackIndex}`,
          title: track.title,
          album: album.title,
          albumId: album.id,
          trackIndex: trackIndex,
          hasBassTabs: track.hasBassTabs,
          hasGuitar: track.hasGuitar,
          hasSongsterr: track.hasSongsterr,
          searchText: `${track.title} ${album.title} ${hasTab ? 'tab' : ''}`.toLowerCase()
        });
      });
    });

    return index;
  }

  initSearchListeners() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput) {
      // Real-time search as user types
      searchInput.addEventListener('input', (e) => {
        if (e.target.value.length >= 2) {
          this.performSearch(e.target.value);
        } else if (e.target.value.length === 0) {
          this.clearSearchResults();
        }
      });

      // Search on Enter key
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch(e.target.value);
        }
      });
    }

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        const query = searchInput?.value || '';
        if (query) {
          this.performSearch(query);
        }
      });
    }
  }

  performSearch(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const results = this.searchIndex.filter(item => 
      item.searchText.includes(normalizedQuery)
    );

    this.displaySearchResults(results, query);
  }

  displaySearchResults(results, query) {
    const resultsSection = document.getElementById('search-results');
    const resultsContent = document.getElementById('search-results-content');
    const albumsGrid = document.querySelector('.albums-grid');

    if (!resultsSection || !resultsContent) return;

    if (results.length === 0) {
      resultsContent.innerHTML = `
        <div class="no-results">
          <p>No results found for "${query}"</p>
        </div>
      `;
      resultsSection.style.display = 'block';
      albumsGrid.style.display = 'none';
      return;
    }

    // Group results by type
    const albums = results.filter(r => r.type === 'album');
    const tracks = results.filter(r => r.type === 'track');

    let html = '';

    if (albums.length > 0) {
      html += '<h4 class="search-category">Albums</h4>';
      albums.forEach(album => {
        html += `
          <div class="search-result-item" onclick="window.location.href='album.html?id=${album.id}'">
            <div class="search-result-track">${album.title}</div>
            <div class="search-result-album">${album.year}</div>
          </div>
        `;
      });
    }

    if (tracks.length > 0) {
      html += '<h4 class="search-category">Tracks</h4>';
      tracks.forEach(track => {
        const badges = [];
        if (track.hasBassTabs) badges.push('<span class="resource-badge bass">Bass</span>');
        if (track.hasGuitar) badges.push('<span class="resource-badge guitar">Guitar</span>');
        if (track.hasSongsterr) badges.push('<span class="resource-badge interactive">Interactive</span>');

        html += `
          <div class="search-result-item" onclick="window.location.href='album.html?id=${track.albumId}#track-${track.trackIndex}'">
            <div class="search-result-track">${track.title}</div>
            <div class="search-result-album">${track.album}</div>
            <div class="search-result-badges">${badges.join('')}</div>
          </div>
        `;
      });
    }

    resultsContent.innerHTML = html;
    resultsSection.style.display = 'block';
    albumsGrid.style.display = 'none';
  }

  clearSearchResults() {
    const resultsSection = document.getElementById('search-results');
    const albumsGrid = document.querySelector('.albums-grid');
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (albumsGrid) albumsGrid.style.display = 'grid';
  }
}

// Recently Viewed Manager
class RecentlyViewedManager {
  constructor() {
    this.recent = this.loadRecent();
    this.maxItems = 20;
  }

  loadRecent() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.recentlyViewed);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveRecent() {
    localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(this.recent));
  }

  addItem(item) {
    // Remove if already exists
    this.recent = this.recent.filter(r => r.id !== item.id);
    
    // Add to beginning
    this.recent.unshift({
      ...item,
      viewedAt: new Date().toISOString()
    });

    // Keep only maxItems
    this.recent = this.recent.slice(0, this.maxItems);
    
    this.saveRecent();
  }

  getRecent() {
    return this.recent;
  }
}

// YouTube Integration
class YouTubeManager {
  constructor() {
    this.apiKey = 'YOUR_API_KEY'; // Note: For production, this should be server-side
    this.videoCache = new Map();
  }

  async searchVideo(trackTitle, artistName = 'Dayglo Abortions') {
    const query = `${artistName} ${trackTitle}`;
    const cacheKey = query.toLowerCase();

    // Check cache first
    if (this.videoCache.has(cacheKey)) {
      return this.videoCache.get(cacheKey);
    }

    // For now, return a search URL (without API key)
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    return { searchUrl, videoId: null };
  }

  createEmbed(videoId) {
    return `
      <div class="youtube-embed">
        <div class="youtube-container">
          <iframe src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
  }

  createSearchLink(trackTitle) {
    const query = `Dayglo Abortions ${trackTitle}`;
    return `
      <div class="youtube-search">
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}" 
           target="_blank" 
           rel="noopener"
           class="btn btn-secondary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          Search on YouTube
        </a>
      </div>
    `;
  }
}

// Print Manager
class PrintManager {
  constructor() {
    this.initPrintButtons();
  }

  initPrintButtons() {
    // Will be called when print buttons are added to the UI
  }

  printTab(tabContent, trackTitle, albumTitle) {
    // Create a print-friendly window
    const printWindow = window.open('', '_blank');
    const printDocument = printWindow.document;

    printDocument.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${trackTitle} - ${albumTitle} | Dayglo Abortions Tab</title>
        <style>
          body {
            font-family: 'Courier New', Courier, monospace;
            margin: 20px;
            color: #000;
            background: #fff;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
          }
          .tab-content {
            white-space: pre;
            font-size: 14px;
            line-height: 1.6;
            border: 1px solid #ccc;
            padding: 20px;
            background: #f5f5f5;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 12px;
            color: #666;
          }
          @page {
            margin: 1in;
          }
        </style>
      </head>
      <body>
        <h1>${trackTitle}</h1>
        <h2>${albumTitle} - Dayglo Abortions</h2>
        <div class="tab-content">${tabContent}</div>
        <div class="footer">
          <p>Printed from Dayglo Abortions Tab Collection</p>
          <p>Tab credits: ${this.extractCredits(tabContent)}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
      </html>
    `);

    printDocument.close();
  }

  extractCredits(tabContent) {
    // Extract credits from tab content
    const creditPatterns = [
      /Submitted by: (.+)/i,
      /Author: (.+)/i,
      /Tabbed by: (.+)/i,
      /Source: (.+)/i
    ];

    for (const pattern of creditPatterns) {
      const match = tabContent.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return 'Various contributors';
  }
}

// Quick Filter Manager
class QuickFilterManager {
  constructor() {
    this.favoritesManager = new FavoritesManager();
    this.recentManager = new RecentlyViewedManager();
    this.initFilters();
  }

  initFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    
    filterChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        // Update active state
        filterChips.forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        
        // Apply filter
        const filter = e.target.dataset.filter;
        this.applyFilter(filter);
      });
    });
  }

  applyFilter(filter) {
    const albumCards = document.querySelectorAll('.album-card');
    const resultsSection = document.getElementById('search-results');
    
    // Hide search results when filtering
    if (resultsSection) resultsSection.style.display = 'none';

    switch (filter) {
      case 'all':
        albumCards.forEach(card => card.style.display = 'block');
        break;
        
      case 'favorites':
        albumCards.forEach(card => {
          const albumId = card.dataset.albumId;
          card.style.display = this.favoritesManager.isFavorite(albumId) ? 'block' : 'none';
        });
        break;
        
      case 'bass':
        albumCards.forEach(card => {
          const albumId = card.dataset.albumId;
          const album = typeof albums !== 'undefined' ? albums.find(a => a.id === albumId) : null;
          card.style.display = album && album.bassTabs > 0 ? 'block' : 'none';
        });
        break;

      case 'guitar':
        albumCards.forEach(card => {
          const albumId = card.dataset.albumId;
          const album = typeof albums !== 'undefined' ? albums.find(a => a.id === albumId) : null;
          const hasGuitar = album && album.trackList.some(t => t.hasGuitar);
          card.style.display = hasGuitar ? 'block' : 'none';
        });
        break;
        
      case 'recent':
        const recent = this.recentManager.getRecent();
        const recentIds = recent.map(r => r.id);
        albumCards.forEach(card => {
          const albumId = card.dataset.albumId;
          card.style.display = recentIds.includes(albumId) ? 'block' : 'none';
        });
        break;
    }
  }
}

// Initialize all enhanced features
function initEnhancedFeatures() {
  window.favoritesManager = new FavoritesManager();
  window.searchManager = new SearchManager();
  window.recentManager = new RecentlyViewedManager();
  window.youtubeManager = new YouTubeManager();
  window.printManager = new PrintManager();
  window.filterManager = new QuickFilterManager();

  // Update favorites UI on load
  window.favoritesManager.updateUI();
  
  console.log('Enhanced features initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedFeatures);
} else {
  initEnhancedFeatures();
}

// Export for use in other files
window.EnhancedFeatures = {
  FavoritesManager,
  SearchManager,
  RecentlyViewedManager,
  YouTubeManager,
  PrintManager,
  QuickFilterManager
};