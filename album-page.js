// Album Page JavaScript for Dayglo Abortions Tablature
// Handles album page functionality including track listing and tab display
// v3 - Simplified buttons: Guitar Pro or Tab only (2025-11-25)

class AlbumPageManager {
    constructor() {
        this.currentAlbum = null;
        this.init();
    }

    init() {
        // Get album ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const albumId = urlParams.get('id');
        
        if (albumId) {
            this.loadAlbum(albumId);
        } else {
            this.showError('No album ID provided');
        }

        // Initialize modal functionality
        this.initModal();
        
        // Initialize filter functionality
        this.initFilters();
    }

    loadAlbum(albumId) {
        // Find album in the albums array
        this.currentAlbum = albums.find(album => album.id === albumId);
        
        if (!this.currentAlbum) {
            this.showError(`Album not found: ${albumId}`);
            return;
        }

        // Update page content
        this.updatePageTitle();
        this.updateAlbumHeader();
        this.updateTrackList();
        this.updateResources();
        this.updateParallax();
    }

    updatePageTitle() {
        document.title = `${this.currentAlbum.title} - Dayglo Abortions Tablature`;
        
        // Update meta tags
        const ogTitle = document.getElementById('og-title');
        const ogDescription = document.getElementById('og-description');
        const twitterTitle = document.getElementById('twitter-title');
        const twitterDescription = document.getElementById('twitter-description');
        
        if (ogTitle) ogTitle.setAttribute('content', `${this.currentAlbum.title} - Dayglo Abortions Tablature`);
        if (ogDescription) ogDescription.setAttribute('content', `Guitar tabs for ${this.currentAlbum.title} by Dayglo Abortions. ${this.currentAlbum.description}`);
        if (twitterTitle) twitterTitle.setAttribute('content', `${this.currentAlbum.title} - Dayglo Abortions Tablature`);
        if (twitterDescription) twitterDescription.setAttribute('content', `Guitar tabs for ${this.currentAlbum.title} by Dayglo Abortions.`);
    }

    updateAlbumHeader() {
        // Update breadcrumb
        const breadcrumbAlbum = document.getElementById('breadcrumb-album');
        if (breadcrumbAlbum) breadcrumbAlbum.textContent = this.currentAlbum.title;

        // Update album title in header
        const albumTitle = document.getElementById('album-title');
        if (albumTitle) albumTitle.textContent = this.currentAlbum.title;

        const albumSubtitle = document.getElementById('album-subtitle');
        if (albumSubtitle) albumSubtitle.textContent = `${this.currentAlbum.year} • ${this.currentAlbum.type}`;

        // Update large album section
        const albumTitleLarge = document.getElementById('album-title-large');
        if (albumTitleLarge) albumTitleLarge.textContent = this.currentAlbum.title;

        const albumYear = document.getElementById('album-year');
        if (albumYear) albumYear.textContent = this.currentAlbum.year;

        const albumType = document.getElementById('album-type');
        if (albumType) albumType.textContent = this.currentAlbum.type;

        const albumDescription = document.getElementById('album-description');
        if (albumDescription) albumDescription.textContent = this.currentAlbum.description;

        // Update album artwork
        const albumArtwork = document.getElementById('album-artwork');
        if (albumArtwork) {
            albumArtwork.innerHTML = `<img src="${this.currentAlbum.artwork}" alt="${this.currentAlbum.title}" onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=\\"album-artwork-placeholder\\">${this.currentAlbum.title}</div>'">`;
        }

        // Update stats
        const albumStats = document.getElementById('album-stats');
        if (albumStats) {
            const tabCount = this.currentAlbum.trackList.filter(track => track.hasGuitar || track.hasBassTabs).length;
            albumStats.innerHTML = `
                <div class="stat">${this.currentAlbum.tracks} tracks</div>
                <div class="stat">${tabCount} tabs</div>
            `;
        }

        // Add YouTube button click handler (remove existing listeners first)
        const youtubeBtn = document.getElementById('play-all-btn');
        if (youtubeBtn) {
            // Clone node to remove all existing event listeners
            const newYoutubeBtn = youtubeBtn.cloneNode(true);
            youtubeBtn.parentNode.replaceChild(newYoutubeBtn, youtubeBtn);
            
            newYoutubeBtn.addEventListener('click', () => {
                const searchQuery = encodeURIComponent(`Dayglo Abortions ${this.currentAlbum.title} full album`);
                window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
            });
        }
    }

    getExternalLinksForTrack(trackTitle) {
        const songKey = trackTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        // Comprehensive list of songs that have Ultimate Guitar tabs
        const ugOnlySongs = [
            // Original list
            'fob', 'marijuanathon', 'suicide', 'dogfarts', '1967', 'dragons', 'scientology',
            'wasp', 'bunchoffuckingoofs', 'jerrys-retards', 'dysfunctional-family',
            'corporate-whores', 'euthanasia-day', 'anal-chinook', 'the-idiot', 'stupid-world',
            'my-girl', 'germ-attack', 'black-sabbath', 'shred-central', 'old-school',
            'gutter-ball', 'spuds-visitation', 'open-sore', 'nuclear-supremacy', 'nikki-dial',
            'feeder-brigade', 'casting-couch', 'cash-bash', 'big-michel', 'punker-bitches',
            'my-erection', 'stupid-songs', 'vince-neil', 'ronald-mcraygun', 'religious-bumfucks',
            'bedtime-story', 'swallow-the-pill', 'stroke-all-day', 'sea-of-shit', 'chalk-one-up',
            'drunk-on-power', 'ben-hoffmans-nose',
            // Additional songs from Ultimate Guitar
            'drugged-and-driving', 'i-killed-mommy', 'argh-fuck-kill', 'proud-to-be-canadian',
            'america-eats-her-young', 'ben-gets-off', 'brick-shithouse-bouncers',
            'christina-bin-laden', 'courage-in-a-can', 'die-sinner-die', 'dream-date-of-the-90s',
            'drink-beer-smoke-pot', 'fuck-my-shit-stinks', 'fuck-satan-to-death',
            'fuck-the-world-if-it-cant-take-a-joke', 'homophobic-sexist-cokeheads',
            'how-low-will-you-go', 'i-am-my-own-god', 'i-do-the-best-that-i-can',
            'i-wanna-be-an-east-indian', 'inside-my-head', 'isnt-this-disgusting',
            'just-cant-say-no-to-drugs', 'kill-johnny-stiff', 'kill-the-hosers',
            'lets-get-drunk', 'little-man-in-the-canoe', 'man-bites-dog',
            'my-kingdom-on-earth', 'my-mother-was-a-man', 'one-cheque-from-the-street',
            'scared-of-people', 'sit-on-my-face-and-bleed', 'squeegee-night-in-canada',
            'the-spawn-of-yog-sothoth', 'used-to-be-in-love', 'wake-up-america',
            'when-the-big-hand-meets-the-little-hand', 'wheres-bin-laden',
            'white-anglo-saxon-protestant'
        ];

        const showUGLinks = ugOnlySongs.includes(songKey);
        const showSongsterrLinks = songKey === 'proud-to-be-a-canadian';
        
        let linksHtml = '';
        if (showSongsterrLinks) {
            linksHtml += `
                <a href="https://www.songsterr.com/search?pattern=${encodeURIComponent('Dayglo Abortions ' + trackTitle)}" target="_blank" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 6L8 10.5 4.5 6h7z"/>
                    </svg>
                    Songsterr
                </a>
            `;
        }
        if (showUGLinks) {
            linksHtml += `
                <a href="https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent('Dayglo Abortions ' + trackTitle)}" target="_blank" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-3.58 0-6.5-2.92-6.5-6.5S4.42 1.5 8 1.5s6.5 2.92 6.5 6.5-2.92 6.5-6.5 6.5z"/>
                    </svg>
                    Ultimate Guitar
                </a>
            `;
        }
        
        return linksHtml ? `<div class="external-links">${linksHtml}</div>` : '';
    }

    updateTrackList() {
        const trackContainer = document.getElementById('track-container');
        if (!trackContainer) return;

        let html = '';
        
        this.currentAlbum.trackList.forEach((track, index) => {
            const hasTab = track.hasGuitar || track.hasBassTabs;
            const trackId = `${this.currentAlbum.id}-${track.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
            
            // Get direct Ultimate Guitar tab links
            const songKey = track.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            // Direct Ultimate Guitar tab links from UG Popular Tabs
            const ugDirectLinks = {
                // From the HTML you provided - all real Ultimate Guitar tab URLs
                'bedtime-story': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/bedtime-story-tabs-704144',
                'drugged-and-driving': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/drugged-and-driving-tabs-762363',
                'i-killed-mommy': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/i-killed-mommy-tabs-765688',
                'argh-fuck-kill': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/argh-fuck-kill-tabs-1166537',
                'stupid-songs': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/stupid-songs-tabs-994095',
                'proud-to-be-canadian': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/proud-to-be-canadian-guitar-pro-589289',
                'stupid-world': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/stupid-world-tabs-1166556',
                'black-sabbath': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/black-sabbath-tabs-1166540',
                // Bass tabs
                'i-killed-mommy-bass': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/i-killed-mommy-bass-762365',
                'proud-to-be-canadian-bass': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/proud-to-be-canadian-bass-119148',
                // From previous FOB link
                'fob': 'https://tabs.ultimate-guitar.com/tab/dayglo-abortions/fob-tabs-1166583'
            };

            // Songs with multiple versions on Ultimate Guitar - use search for these
            const songsWithMultipleVersions = [
                'i-killed-mommy', // Has guitar and bass versions
                'proud-to-be-canadian' // Has guitar and bass versions
            ];

            // Determine which Ultimate Guitar URL to use
            let ugFinalLinkToUse;
            if (songsWithMultipleVersions.includes(songKey)) {
                ugFinalLinkToUse = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent('Dayglo Abortions ' + track.title)}`;
            } else {
                ugFinalLinkToUse = ugDirectLinks[songKey] || null;
            }

            // Songs that should show Ultimate Guitar links (either direct or search)
            const ugSongs = [
                'fob', 'marijuanathon', 'suicide', 'dogfarts', '1967', 'dragons', 'scientology',
                'wasp', 'bunchoffuckingoofs', 'jerrys-retards', 'dysfunctional-family',
                'corporate-whores', 'euthanasia-day', 'anal-chinook', 'the-idiot', 'stupid-world',
                'my-girl', 'germ-attack', 'black-sabbath', 'shred-central', 'old-school',
                'gutter-ball', 'spuds-visitation', 'open-sore', 'nuclear-supremacy', 'nikki-dial',
                'feeder-brigade', 'casting-couch', 'cash-bash', 'big-michel', 'punker-bitches',
                'my-erection', 'stupid-songs', 'vince-neil', 'ronald-mcraygun', 'religious-bumfucks',
                'bedtime-story', 'swallow-the-pill', 'stroke-all-day', 'sea-of-shit', 'chalk-one-up',
                'drunk-on-power', 'ben-hoffmans-nose', 'drugged-and-driving', 'i-killed-mommy',
                'argh-fuck-kill', 'proud-to-be-canadian', 'america-eats-her-young', 'ben-gets-off',
                'brick-shithouse-bouncers', 'christina-bin-laden', 'courage-in-a-can', 'die-sinner-die',
                'dream-date-of-the-90s', 'drink-beer-smoke-pot', 'fuck-my-shit-stinks', 'fuck-satan-to-death',
                'fuck-the-world-if-it-cant-take-a-joke', 'homophobic-sexist-cokeheads', 'how-low-will-you-go',
                'i-am-my-own-god', 'i-do-the-best-that-i-can', 'i-wanna-be-an-east-indian', 'inside-my-head',
                'isnt-this-disgusting', 'just-cant-say-no-to-drugs', 'kill-johnny-stiff', 'kill-the-hosers',
                'lets-get-drunk', 'little-man-in-the-canoe', 'man-bites-dog', 'my-kingdom-on-earth',
                'my-mother-was-a-man', 'one-cheque-from-the-street', 'scared-of-people',
                'sit-on-my-face-and-bleed', 'squeegee-night-in-canada', 'the-spawn-of-yog-sothoth',
                'used-to-be-in-love', 'wake-up-america', 'when-the-big-hand-meets-the-little-hand', 'wheres-bin-laden',
                'white-anglo-saxon-protestant'
            ];

            const showUGLink = ugSongs.includes(songKey) && ugFinalLinkToUse;
            const showSongsterrLinks = songKey === 'proud-to-be-a-canadian';

            // Determine which button to show: Guitar Pro takes priority, then Tab
            const hasGp = typeof hasGpFile === 'function' && hasGpFile(track.title);

            html += `
                <div class="track-item" data-filter="${hasTab ? 'tabs' : 'no-tabs'}" data-track-index="${index}">
                    <div class="track-info">
                        <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                        <div class="track-details">
                            <h3 class="track-title">${track.title}</h3>
                            <div class="track-meta">
                                ${track.duration ? `<span class="track-duration">${track.duration}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="track-actions">
                        ${hasGp ? `
                            <button class="btn btn-primary gp-btn" data-track-title="${track.title}">
                                Guitar Pro
                            </button>
                        ` : hasTab ? `
                            <button class="btn btn-primary view-tab-btn" data-track="${trackId}" data-track-title="${track.title}">
                                Tab
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        trackContainer.innerHTML = html;

        // Use event delegation for tab viewing to avoid multiple listeners
        if (!trackContainer.dataset.listenersAdded) {
            trackContainer.addEventListener('click', (e) => {
                // Handle Tab button clicks
                const tabButton = e.target.closest('.view-tab-btn');
                if (tabButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    const trackId = tabButton.dataset.track;
                    const trackTitle = tabButton.dataset.trackTitle;
                    this.showTab(trackId, trackTitle);
                    return;
                }

                // Handle Guitar Pro button clicks
                const gpButton = e.target.closest('.gp-btn');
                if (gpButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    const trackTitle = gpButton.dataset.trackTitle;
                    if (typeof openAlphaTab === 'function') {
                        openAlphaTab(trackTitle);
                    }
                    return;
                }
            });
            trackContainer.dataset.listenersAdded = 'true';
        }

        // Close any stuck modal on page load
        const modal = document.getElementById('track-modal');
        if (modal && modal.classList.contains('active')) {
            this.closeModal();
        }
    }

    updateResources() {
        const resourceGrid = document.getElementById('resource-grid');
        if (!resourceGrid) return;

        resourceGrid.innerHTML = `
            <div class="resource-item">
                <h4>Songsterr</h4>
                <p>Interactive guitar tabs with playback</p>
                <a href="https://www.songsterr.com/search?pattern=${encodeURIComponent('Dayglo Abortions')}" target="_blank" class="btn btn-secondary">
                    Visit Songsterr
                </a>
            </div>
            <div class="resource-item">
                <h4>YouTube</h4>
                <p>Video performances and lessons</p>
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent('Dayglo Abortions ' + this.currentAlbum.title)}" target="_blank" class="btn btn-secondary">
                    Search YouTube
                </a>
            </div>
        `;
    }

    updateParallax() {
        const parallaxBg = document.getElementById('parallax-bg');
        if (parallaxBg && this.currentAlbum.artwork) {
            parallaxBg.style.backgroundImage = `url(${this.currentAlbum.artwork})`;
        }
    }

    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Apply filter
                const filter = e.target.dataset.filter;
                this.applyTrackFilter(filter);
            });
        });
    }

    applyTrackFilter(filter) {
        const trackItems = document.querySelectorAll('.track-item');

        trackItems.forEach(item => {
            const trackIndex = parseInt(item.dataset.trackIndex);
            const track = this.currentAlbum.trackList[trackIndex];

            switch (filter) {
                case 'all':
                    item.style.display = 'block';
                    break;
                case 'tabs':
                    item.style.display = item.dataset.filter === 'tabs' ? 'block' : 'none';
                    break;
                case 'bass':
                    // Show tracks with bass tabs
                    item.style.display = (track && track.hasBassTabs) ? 'block' : 'none';
                    break;
                case 'guitar':
                    // Show tracks with guitar tabs
                    item.style.display = (track && track.hasGuitar) ? 'block' : 'none';
                    break;
                case 'interactive':
                    // Show tracks with Guitar Pro files
                    const hasGp = typeof hasGpFile === 'function' && track && hasGpFile(track.title);
                    item.style.display = hasGp ? 'block' : 'none';
                    break;
                default:
                    item.style.display = 'block';
            }
        });
    }

    showTab(trackId, trackTitle) {
        const modal = document.getElementById('track-modal');
        const modalTitle = document.getElementById('modal-track-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = trackTitle;
        
        // Simple key format for tab lookup
        const songKey = trackTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        // Comprehensive list of songs that have Ultimate Guitar tabs
        const ugOnlySongs = [
            // Original list
            'fob', 'marijuanathon', 'suicide', 'dogfarts', '1967', 'dragons', 'scientology',
            'wasp', 'bunchoffuckingoofs', 'jerrys-retards', 'dysfunctional-family',
            'corporate-whores', 'euthanasia-day', 'anal-chinook', 'the-idiot', 'stupid-world',
            'my-girl', 'germ-attack', 'black-sabbath', 'shred-central', 'old-school',
            'gutter-ball', 'spuds-visitation', 'open-sore', 'nuclear-supremacy', 'nikki-dial',
            'feeder-brigade', 'casting-couch', 'cash-bash', 'big-michel', 'punker-bitches',
            'my-erection', 'stupid-songs', 'vince-neil', 'ronald-mcraygun', 'religious-bumfucks',
            'bedtime-story', 'swallow-the-pill', 'stroke-all-day', 'sea-of-shit', 'chalk-one-up',
            'drunk-on-power', 'ben-hoffmans-nose',
            // Additional songs from Ultimate Guitar
            'drugged-and-driving', 'i-killed-mommy', 'argh-fuck-kill', 'proud-to-be-canadian',
            'america-eats-her-young', 'ben-gets-off', 'brick-shithouse-bouncers',
            'christina-bin-laden', 'courage-in-a-can', 'die-sinner-die', 'dream-date-of-the-90s',
            'drink-beer-smoke-pot', 'fuck-my-shit-stinks', 'fuck-satan-to-death',
            'fuck-the-world-if-it-cant-take-a-joke', 'homophobic-sexist-cokeheads',
            'how-low-will-you-go', 'i-am-my-own-god', 'i-do-the-best-that-i-can',
            'i-wanna-be-an-east-indian', 'inside-my-head', 'isnt-this-disgusting',
            'just-cant-say-no-to-drugs', 'kill-johnny-stiff', 'kill-the-hosers',
            'lets-get-drunk', 'little-man-in-the-canoe', 'man-bites-dog',
            'my-kingdom-on-earth', 'my-mother-was-a-man', 'one-cheque-from-the-street',
            'scared-of-people', 'sit-on-my-face-and-bleed', 'squeegee-night-in-canada',
            'the-spawn-of-yog-sothoth', 'used-to-be-in-love', 'wake-up-america',
            'when-the-big-hand-meets-the-little-hand', 'wheres-bin-laden',
            'white-anglo-saxon-protestant'
        ];

        // Check if tab exists in tabData
        let tabContent = null;
        if (typeof tabData !== 'undefined') {
            tabContent = tabData[songKey];
        }
        
        if (tabContent) {
            // Use textContent instead of innerHTML to avoid HTML parsing overhead
            const tabDiv = document.createElement('div');
            tabDiv.className = 'tab-content';
            const pre = document.createElement('pre');
            pre.textContent = tabContent;
            tabDiv.appendChild(pre);
            modalBody.innerHTML = '';
            modalBody.appendChild(tabDiv);
        } else {
            // Check if this song should show UG links
            const showUGLinks = ugOnlySongs.includes(songKey);
            // Check if this song should show Songsterr links
            const showSongsterrLinks = songKey === 'proud-to-be-a-canadian';
            
            let linksHtml = '';
            if (showUGLinks) {
                linksHtml += `<a href="https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent('Dayglo Abortions ' + trackTitle)}" target="_blank" class="btn btn-secondary">Ultimate Guitar</a>`;
            }
            if (showSongsterrLinks) {
                linksHtml += `<a href="https://www.songsterr.com/search?pattern=${encodeURIComponent('Dayglo Abortions ' + trackTitle)}" target="_blank" class="btn btn-secondary">Songsterr</a>`;
            }
            
            if (linksHtml) {
                modalBody.innerHTML = `
                    <div class="no-tab-content">
                        <p>Tab not available for this track.</p>
                        <p>Try searching on:</p>
                        <div class="external-links">
                            ${linksHtml}
                        </div>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <div class="no-tab-content">
                        <p>Tab not available for this track.</p>
                    </div>
                `;
            }
        }
        
        // Show modal
        console.log('Showing modal for:', trackTitle);
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        console.log('Modal classes:', modal.className);
    }

    initModal() {
        const modal = document.getElementById('track-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBackdrop = document.getElementById('modal-backdrop');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.closeModal());
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('track-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    showError(message) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Error</h2>
                    <p>${message}</p>
                    <a href="index.html" class="btn btn-primary">Back to Albums</a>
                </div>
            `;
        }
    }
}

// Initialize album page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AlbumPageManager();
});