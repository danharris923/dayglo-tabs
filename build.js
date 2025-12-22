/**
 * Dayglo Abortions Tabs Static Site Builder
 * Generates individual HTML pages for each song, album, and homepage
 * Run: node build.js
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const DATA_DIR = path.join(__dirname, 'data');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const SITE_URL = 'https://dayglotabs.com';

// Ensure dist directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Load template
function loadTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, `${name}.html`), 'utf8');
}

// Load JSON data
function loadData(name) {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
}

// URL encode for external links
function urlEncode(str) {
  return encodeURIComponent(str.toLowerCase().replace(/\s+/g, '-'));
}

// Generate badges HTML
function generateBadges(track) {
  let badges = '';
  if (track.hasBass) {
    badges += '<span class="badge bass">Bass Tab</span>';
  }
  if (track.hasGuitar) {
    badges += '<span class="badge guitar">Guitar Tab</span>';
  }
  if (track.gpFile) {
    badges += '<span class="badge gp">Guitar Pro</span>';
  }
  return badges;
}

// Get tab type string
function getTabType(track) {
  const types = [];
  if (track.hasBass) types.push('Bass');
  if (track.hasGuitar) types.push('Guitar');
  return types.length > 0 ? types.join(' & ') : 'Tab';
}

// Generate GP player HTML
function generateGPPlayer(track) {
  if (!track.gpFile) return '';

  return `
                <section class="tab-player-section">
                    <div class="tab-player" id="tab-player">
                        <div class="player-controls">
                            <button class="load-audio-btn" id="load-audio-btn">Load Audio Player</button>
                        </div>
                        <div class="alphatab-container" id="alphatab-container" data-file="/${track.gpFile}"></div>
                    </div>
                </section>`;
}

// Generate GP scripts
function generateGPScripts(track) {
  if (!track.gpFile) return '';

  return `
    <script src="https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.js"></script>
    <script src="/js/alphatab-player.js"></script>`;
}

// Generate text tab section
function generateTextTab(track) {
  if (!track.tabFile) {
    return `
                <section class="text-tab-section">
                    <p class="no-tab-message">Text tab not yet available for this song.</p>
                </section>`;
  }

  // Check if tab file exists
  const tabPath = path.join(__dirname, track.tabFile);
  if (fs.existsSync(tabPath)) {
    const tabContent = fs.readFileSync(tabPath, 'utf8');
    return `
                <section class="text-tab-section">
                    <h3>Text Tab</h3>
                    <pre class="tab-text">${escapeHtml(tabContent)}</pre>
                </section>`;
  }

  return `
                <section class="text-tab-section">
                    <p class="no-tab-message">Text tab file coming soon.</p>
                </section>`;
}

// Escape HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate album tracks list for song page
function generateAlbumTracks(album, currentTrackId) {
  return album.tracks
    .filter(t => t.hasBass || t.hasGuitar || t.gpFile || t.tabFile)
    .slice(0, 5)
    .map(track => {
      const isCurrent = track.id === currentTrackId;
      return `
                        <a href="/tabs/${track.id}.html" class="track-link ${isCurrent ? 'current' : ''}">
                            ${track.title}
                            ${track.gpFile ? '<span class="gp-icon">GP</span>' : ''}
                        </a>`;
    })
    .join('');
}

// Generate track list HTML for album page
function generateTrackList(album) {
  return album.tracks.map((track, index) => {
    const hasTab = track.hasBass || track.hasGuitar || track.gpFile || track.tabFile;
    const trackNum = (index + 1).toString().padStart(2, '0');

    // Show one button - prioritize GP, then text tab
    let button = '';
    if (track.gpFile) {
      button = `<span class="btn btn-primary btn-gp">Guitar Pro</span>`;
    } else if (track.tabFile) {
      button = `<span class="btn btn-secondary">Text Tab</span>`;
    } else if (track.hasBass || track.hasGuitar) {
      button = `<span class="btn btn-primary">Tab</span>`;
    }

    // Make entire row clickable if tab exists
    if (hasTab) {
      return `
                        <a href="/tabs/${track.id}.html" class="track-item track-link">
                            <div class="track-info">
                                <div class="track-number">${trackNum}</div>
                                <div class="track-details">
                                    <h3 class="track-title">${track.title}</h3>
                                </div>
                            </div>
                            <div class="track-actions">
                                ${button}
                            </div>
                        </a>`;
    } else {
      return `
                        <div class="track-item no-tab">
                            <div class="track-info">
                                <div class="track-number">${trackNum}</div>
                                <div class="track-details">
                                    <h3 class="track-title">${track.title}</h3>
                                </div>
                            </div>
                            <div class="track-actions">
                            </div>
                        </div>`;
    }
  }).join('');
}

// Generate album card HTML
function generateAlbumCard(album) {
  const tabCount = album.tracks.filter(t => t.hasBass || t.hasGuitar || t.gpFile || t.tabFile).length;

  return `
                    <a href="/albums/${album.id}.html" class="album-card">
                        <div class="album-artwork">
                            <img src="/${album.cover}" alt="${album.title}" loading="lazy">
                        </div>
                        <div class="album-info">
                            <div class="album-header">
                                <h3 class="album-title">${album.title}</h3>
                            </div>
                            <div class="album-year">${album.year}</div>
                            <div class="album-stats">
                                <span class="badge">${album.tracks.length} tracks</span>
                                <span class="badge badge-primary">${tabCount} tabs</span>
                            </div>
                            <p class="album-description">${album.description || ''}</p>
                        </div>
                    </a>`;
}

// Build song pages
function buildSongPages(albums) {
  const songTemplate = loadTemplate('song');
  let songCount = 0;

  ensureDir(path.join(DIST_DIR, 'tabs'));

  albums.forEach(album => {
    album.tracks.forEach(track => {
      // Only create pages for songs with tabs
      if (!track.hasBass && !track.hasGuitar && !track.gpFile && !track.tabFile) return;

      let html = songTemplate
        .replace(/{{SONG_TITLE}}/g, track.title)
        .replace(/{{SONG_SLUG}}/g, track.id)
        .replace(/{{TAB_TYPE}}/g, getTabType(track))
        .replace(/{{ALBUM_TITLE}}/g, album.title)
        .replace(/{{ALBUM_ID}}/g, album.id)
        .replace(/{{ALBUM_YEAR}}/g, album.year)
        .replace(/{{ALBUM_COVER}}/g, album.cover)
        .replace(/{{BADGES}}/g, generateBadges(track))
        .replace(/{{GP_PLAYER}}/g, generateGPPlayer(track))
        .replace(/{{TEXT_TAB}}/g, generateTextTab(track))
        .replace(/{{GP_SCRIPTS}}/g, generateGPScripts(track))
        .replace(/{{ALBUM_TRACKS}}/g, generateAlbumTracks(album, track.id))
        .replace(/{{SONG_TITLE_URL}}/g, encodeURIComponent(track.title))
        .replace(/{{BANDCAMP_URL}}/g, album.bandcampUrl || 'https://daygloabortions.bandcamp.com/')
        .replace(/{{BANDCAMP_DISPLAY}}/g, album.bandcampUrl ? '' : 'style="display:none"');

      fs.writeFileSync(path.join(DIST_DIR, 'tabs', `${track.id}.html`), html);
      songCount++;
    });
  });

  console.log(`Generated ${songCount} song pages`);
  return songCount;
}

// Build album pages
function buildAlbumPages(albums) {
  const albumTemplate = loadTemplate('album');

  ensureDir(path.join(DIST_DIR, 'albums'));

  albums.forEach(album => {
    const tabCount = album.tracks.filter(t => t.hasBass || t.hasGuitar || t.gpFile || t.tabFile).length;

    let html = albumTemplate
      .replace(/{{ALBUM_TITLE}}/g, album.title)
      .replace(/{{ALBUM_ID}}/g, album.id)
      .replace(/{{ALBUM_YEAR}}/g, album.year)
      .replace(/{{ALBUM_COVER}}/g, album.cover)
      .replace(/{{ALBUM_DESCRIPTION}}/g, album.description || '')
      .replace(/{{TRACK_COUNT}}/g, album.tracks.length)
      .replace(/{{TAB_COUNT}}/g, tabCount)
      .replace(/{{TRACK_LIST}}/g, generateTrackList(album))
      .replace(/{{ALBUM_TITLE_URL}}/g, encodeURIComponent(album.title))
      .replace(/{{BANDCAMP_URL}}/g, album.bandcampUrl || 'https://daygloabortions.bandcamp.com/')
      .replace(/{{BANDCAMP_DISPLAY}}/g, album.bandcampUrl ? '' : 'style="display:none"');

    fs.writeFileSync(path.join(DIST_DIR, 'albums', `${album.id}.html`), html);
  });

  console.log(`Generated ${albums.length} album pages`);
}

// Build homepage
function buildHomepage(albums) {
  const indexTemplate = loadTemplate('index');

  const totalSongs = albums.reduce((sum, a) => sum + a.tracks.length, 0);
  const totalTabs = albums.reduce((sum, a) =>
    sum + a.tracks.filter(t => t.hasBass || t.hasGuitar || t.gpFile || t.tabFile).length, 0);

  const albumCards = albums.map(generateAlbumCard).join('');

  let html = indexTemplate
    .replace(/{{ALBUM_COUNT}}/g, albums.length)
    .replace(/{{SONG_COUNT}}/g, totalSongs)
    .replace(/{{TAB_COUNT}}/g, totalTabs)
    .replace(/{{ALBUM_CARDS}}/g, albumCards);

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
  console.log('Generated homepage');
}

// Generate sitemap
function generateSitemap(albums) {
  const urls = [`${SITE_URL}/`];

  // Album pages
  albums.forEach(album => {
    urls.push(`${SITE_URL}/albums/${album.id}.html`);

    // Song pages
    album.tracks.forEach(track => {
      if (track.hasBass || track.hasGuitar || track.gpFile || track.tabFile) {
        urls.push(`${SITE_URL}/tabs/${track.id}.html`);
      }
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === `${SITE_URL}/` ? '1.0' : url.includes('/tabs/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap with ${urls.length} URLs`);
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('Generated robots.txt');
}

// Copy static assets
function copyAssets() {
  const assetDirs = ['css', 'js', 'images', 'gp', 'soundfonts', 'tabs-txt'];

  assetDirs.forEach(dir => {
    const srcDir = path.join(__dirname, dir);
    const destDir = path.join(DIST_DIR, dir);

    if (fs.existsSync(srcDir)) {
      copyDirSync(srcDir, destDir);
      console.log(`Copied ${dir}/`);
    }
  });
}

// Recursive copy directory
function copyDirSync(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main build function
function build() {
  console.log('\n=== Dayglo Abortions Tabs Static Site Builder ===\n');

  // Ensure dist exists (don't delete - may be locked)
  ensureDir(DIST_DIR);

  // Load data
  const albums = loadData('albums');
  console.log(`Loaded ${albums.length} albums\n`);

  // Build pages
  buildSongPages(albums);
  buildAlbumPages(albums);
  buildHomepage(albums);

  // Generate SEO files
  generateSitemap(albums);
  generateRobots();

  // Copy assets
  console.log('\nCopying assets...');
  copyAssets();

  console.log('\n=== Build Complete ===');
  console.log(`Output: ${DIST_DIR}/\n`);
}

// Run build
build();
