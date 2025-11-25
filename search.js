// Search functionality for Dayglo Abortions Tab Collection
// Provides real-time search across albums, singles, and tracks

class DaygloSearch {
  constructor() {
    console.log('DaygloSearch constructor called');
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search-button');
    this.searchResults = document.getElementById('search-results');
    this.searchData = null;
    this.isSearchActive = false;
    
    console.log('Search elements found:', {
      input: !!this.searchInput,
      button: !!this.searchButton,
      results: !!this.searchResults
    });
    
    if (!this.searchInput) {
      console.error('Search input element not found!');
      return;
    }
    
    this.initializeSearch();
  }
  
  initializeSearch() {
    if (!this.searchInput) return;
    
    // Build search index when data is available
    this.buildSearchIndex();
    
    // Check for search parameter in URL
    this.handleUrlSearch();
    
    // Add event listeners
    this.searchInput.addEventListener('input', this.handleSearchInput.bind(this));
    this.searchInput.addEventListener('focus', this.handleSearchFocus.bind(this));
    this.searchButton.addEventListener('click', this.handleSearchClick.bind(this));
    
    // Close search results when clicking outside
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    
    // Handle keyboard navigation
    this.searchInput.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleUrlSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
      this.searchInput.value = searchQuery;
      this.performSearch(searchQuery);
    }
  }
  
  buildSearchIndex() {
    console.log('Building search index...');
    this.searchData = [];
    
    // Add studio albums to search index
    if (window.albums) {
      console.log('Found albums data:', window.albums.length);
      window.albums.forEach(album => {
        // Add album itself
        this.searchData.push({
          type: 'album',
          title: album.title,
          year: album.year,
          description: album.description || '',
          url: `album.html?id=${album.id}`,
          hasBassTabs: album.bassTabs > 0,
          tracks: album.tracks || album.trackList?.length || 0
        });
        
        // Add individual tracks
        if (album.trackList) {
          album.trackList.forEach(track => {
            this.searchData.push({
              type: 'track',
              title: track.title,
              album: album.title,
              year: album.year,
              url: `album.html?id=${album.id}`,
              hasBassTabs: track.hasBassTabs,
              hasGuitar: track.hasGuitar || track.hasGuitarPro,
              duration: track.duration
            });
          });
        }
      });
    }
    
    // Add singles/EPs to search index
    if (window.singles) {
      console.log('Found singles data:', window.singles.length);
      window.singles.forEach((single, index) => {
        console.log(`Processing single ${index}:`, single.title, 'tracks:', typeof single.tracks, single.tracks);
        // Add single itself
        this.searchData.push({
          type: 'single',
          title: single.title,
          year: single.year,
          description: single.description || '',
          url: `album.html?id=${single.id}&type=single`,
          hasBassTabs: (Array.isArray(single.tracks) && single.tracks.some(t => t.hasBassTabs)) || false,
          tracks: (Array.isArray(single.tracks) ? single.tracks.length : 0)
        });
        
        // Add individual tracks from singles
        if (Array.isArray(single.tracks)) {
          single.tracks.forEach(track => {
            this.searchData.push({
              type: 'track',
              title: track.title,
              album: single.title,
              year: single.year,
              url: `album.html?id=${single.id}&type=single`,
              hasBassTabs: track.hasBassTabs,
              hasGuitar: track.hasGuitar,
              duration: track.duration
            });
          });
        }
      });
    }
    
    console.log(`Search index built with ${this.searchData.length} total items`);
  }
  
  handleSearchInput(event) {
    const query = event.target.value.trim();
    console.log('Search input event:', query);
    
    if (query.length === 0) {
      this.hideSearchResults();
      return;
    }
    
    if (query.length < 2) {
      console.log('Query too short, need at least 2 characters');
      return; // Don't search until at least 2 characters
    }
    
    this.performSearch(query);
  }
  
  handleSearchFocus() {
    if (this.searchInput.value.trim().length >= 2) {
      this.performSearch(this.searchInput.value.trim());
    }
  }
  
  handleSearchClick() {
    const query = this.searchInput.value.trim();
    if (query.length >= 2) {
      this.performSearch(query);
    }
  }
  
  handleDocumentClick(event) {
    if (!event.target.closest('.search-container')) {
      this.hideSearchResults();
    }
  }
  
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.hideSearchResults();
    }
  }
  
  performSearch(query) {
    console.log('Performing search for:', query);
    
    if (!this.searchData || this.searchData.length === 0) {
      console.log('Search data empty, rebuilding index...');
      this.buildSearchIndex();
    }
    
    console.log('Searching through', this.searchData.length, 'items');
    
    const results = this.searchData.filter(item => {
      const searchText = `${item.title} ${item.album || ''} ${item.description || ''}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    console.log('Found', results.length, 'results');
    
    // Sort results by relevance
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const queryLower = query.toLowerCase();
      
      // Exact title matches first
      if (aTitle === queryLower) return -1;
      if (bTitle === queryLower) return 1;
      
      // Title starts with query
      if (aTitle.startsWith(queryLower) && !bTitle.startsWith(queryLower)) return -1;
      if (bTitle.startsWith(queryLower) && !aTitle.startsWith(queryLower)) return 1;
      
      // Albums before tracks
      if (a.type === 'album' && b.type === 'track') return -1;
      if (a.type === 'track' && b.type === 'album') return 1;
      
      // Alphabetical order
      return aTitle.localeCompare(bTitle);
    });
    
    this.displaySearchResults(results.slice(0, 10), query); // Show max 10 results
  }
  
  displaySearchResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-result-item">
          <div class="search-result-title">No results found</div>
          <div class="search-result-meta">Try searching for album names, song titles, or "bass tabs"</div>
        </div>
      `;
    } else {
      this.searchResults.innerHTML = results.map(result => {
        const highlightedTitle = this.highlightQuery(result.title, query);
        const tabsInfo = this.getTabsInfo(result);
        
        return `
          <div class="search-result-item" onclick="window.location.href='${result.url}'">
            <div class="search-result-title">${highlightedTitle}</div>
            <div class="search-result-meta">
              ${result.type === 'track' ? `${result.album} (${result.year})` : `${result.year}`} 
              ${tabsInfo ? ` • ${tabsInfo}` : ''}
              ${result.duration ? ` • ${result.duration}` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
    
    this.showSearchResults();
  }
  
  highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }
  
  getTabsInfo(result) {
    const tabs = [];
    if (result.hasBassTabs) tabs.push('Bass');
    if (result.hasGuitar) tabs.push('Guitar');
    
    if (tabs.length > 0) {
      return `${tabs.join(' & ')} tabs`;
    }
    
    if (result.type === 'album' || result.type === 'single') {
      return `${result.tracks} tracks`;
    }
    
    return '';
  }
  
  showSearchResults() {
    console.log('Showing search results');
    if (!this.searchResults) {
      console.error('Search results element not found!');
      return;
    }
    this.searchResults.style.display = 'block';
    this.isSearchActive = true;
  }
  
  hideSearchResults() {
    console.log('Hiding search results');
    if (!this.searchResults) {
      console.error('Search results element not found!');
      return;
    }
    this.searchResults.style.display = 'none';
    this.isSearchActive = false;
  }
}

// Initialize search when DOM is loaded
let searchInstance = null;

function initializeSearch() {
  console.log('initializeSearch called');
  try {
    if (!searchInstance) {
      console.log('Creating new search instance...');
      searchInstance = new DaygloSearch();
      // Make it globally accessible for debugging
      window.searchInstance = searchInstance;
      console.log('Search instance created and stored globally');
      
      // Add manual search function for testing
      window.testSearch = function(query) {
        console.log('Manual search test for:', query);
        if (window.searchInstance) {
          window.searchInstance.performSearch(query);
        } else {
          console.error('Search instance not found in window!');
        }
      };
      console.log('Test function added to window');
    } else {
      console.log('Search instance already exists');
    }
  } catch (error) {
    console.error('Error during search initialization:', error);
  }
}

// Make initializeSearch globally accessible for manual testing
window.initializeSearch = initializeSearch;

if (document.readyState === 'loading') {
  console.log('DOM is loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, setting 500ms timer...');
    setTimeout(initializeSearch, 500);
  });
} else {
  console.log('DOM already loaded, setting 500ms timer...');
  setTimeout(initializeSearch, 500);
}