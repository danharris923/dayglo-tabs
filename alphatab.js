/**
 * AlphaTab Integration for Dayglo Abortions Tablature
 * Provides Guitar Pro file playback using AlphaTab library
 */

// Mapping of song titles to GP filenames
const gpFiles = {
  "Proud to Be Canadian": "Dayglo Abortions-Proud To Be Canadian-10-14-2009.gp",
  "Proud To Be Canadian": "Dayglo Abortions-Proud To Be Canadian-10-14-2009.gp",
  "Stupid World": "Dayglo Abortions-Stupid World-09-09-2025.gp",
  "Drugged and Driving": "Dayglo Abortions-Drugged and Driving-09-07-2025.gp",
  "Almost Cut My Hair": "Dayglo Abortions-Almost Cut My Hair-10-04-2025.gp",
  "Punker Bitches": "Dayglo Abortions-Punker Bitches-09-07-2025.gp",
  "Dog Farts": "Dayglo Abortions-Dog Farts-10-03-2025.gp",
  "Dogfarts": "Dayglo Abortions-Dog Farts-10-03-2025.gp",
  "Kill the Hosers": "Dayglo Abortions-Kill The Hosers-10-08-2025.gp",
  "Kill The Hosers": "Dayglo Abortions-Kill The Hosers-10-08-2025.gp",
  "Bedtime Story": "Dayglo Abortions-Bedtime Story-10-20-2025.gp"
};

// Check if a track has a GP file available
function hasGpFile(trackTitle) {
  return gpFiles.hasOwnProperty(trackTitle);
}

// Get the GP file path for a track
function getGpFilePath(trackTitle) {
  const filename = gpFiles[trackTitle];
  return filename ? `gp/${filename}` : null;
}

// Current AlphaTab API instance
let alphaTabApi = null;

// Open AlphaTab modal for a track
function openAlphaTab(trackTitle) {
  const gpPath = getGpFilePath(trackTitle);
  if (!gpPath) {
    console.error('No GP file found for:', trackTitle);
    return;
  }

  // Create modal if it doesn't exist
  let modal = document.getElementById('alphatab-modal');
  if (!modal) {
    modal = createAlphaTabModal();
    document.body.appendChild(modal);
  }

  // Update modal title
  document.getElementById('alphatab-modal-title').textContent = trackTitle;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Initialize AlphaTab
  initAlphaTab(gpPath);
}

// Close AlphaTab modal
function closeAlphaTab() {
  const modal = document.getElementById('alphatab-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Destroy AlphaTab instance
  if (alphaTabApi) {
    alphaTabApi.destroy();
    alphaTabApi = null;
  }
}

// Create the AlphaTab modal HTML
function createAlphaTabModal() {
  const modal = document.createElement('div');
  modal.id = 'alphatab-modal';
  modal.className = 'alphatab-modal';

  modal.innerHTML = `
    <div class="alphatab-modal-backdrop" onclick="closeAlphaTab()"></div>
    <div class="alphatab-modal-content">
      <div class="alphatab-modal-header">
        <h3 id="alphatab-modal-title">Loading...</h3>
        <button class="alphatab-modal-close" onclick="closeAlphaTab()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="alphatab-controls">
        <button id="at-play-pause" class="at-btn" title="Play/Pause">
          <svg id="at-play-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg id="at-pause-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        <button id="at-stop" class="at-btn" title="Stop">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h12v12H6z"/>
          </svg>
        </button>
        <div class="at-tempo">
          <label>Tempo:</label>
          <input type="range" id="at-tempo-slider" min="25" max="200" value="100">
          <span id="at-tempo-value">100%</span>
        </div>
        <div class="at-volume">
          <label>Volume:</label>
          <input type="range" id="at-volume-slider" min="0" max="100" value="80">
        </div>
        <div class="at-track-select">
          <label>Track:</label>
          <select id="at-track-dropdown"></select>
        </div>
      </div>
      <div class="alphatab-viewport">
        <div id="alphatab-container"></div>
      </div>
      <div class="alphatab-loading" id="alphatab-loading">
        <div class="loading-spinner"></div>
        <span>Loading Guitar Pro file...</span>
      </div>
    </div>
  `;

  return modal;
}

// Initialize AlphaTab with a GP file
function initAlphaTab(gpPath) {
  const container = document.getElementById('alphatab-container');
  const loading = document.getElementById('alphatab-loading');

  // Show loading
  loading.style.display = 'flex';
  container.innerHTML = '';

  // Destroy previous instance
  if (alphaTabApi) {
    alphaTabApi.destroy();
  }

  // Create AlphaTab settings
  const settings = {
    file: gpPath,
    player: {
      enablePlayer: true,
      enableCursor: true,
      enableUserInteraction: true,
      soundFont: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2'
    },
    display: {
      layoutMode: alphaTab.LayoutMode.Page,
      staveProfile: alphaTab.StaveProfile.Default
    }
  };

  // Initialize AlphaTab
  alphaTabApi = new alphaTab.AlphaTabApi(container, settings);

  // Event handlers
  alphaTabApi.renderStarted.on(() => {
    loading.style.display = 'flex';
  });

  alphaTabApi.renderFinished.on(() => {
    loading.style.display = 'none';
    populateTrackDropdown();
  });

  alphaTabApi.playerStateChanged.on((e) => {
    const playIcon = document.getElementById('at-play-icon');
    const pauseIcon = document.getElementById('at-pause-icon');

    if (e.state === alphaTab.synth.PlayerState.Playing) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  });

  alphaTabApi.error.on((e) => {
    console.error('AlphaTab error:', e);
    loading.innerHTML = '<span style="color: #ff6b6b;">Error loading file</span>';
  });

  // Setup controls
  setupAlphaTabControls();
}

// Setup AlphaTab control buttons
function setupAlphaTabControls() {
  // Play/Pause
  document.getElementById('at-play-pause').onclick = () => {
    if (alphaTabApi) {
      alphaTabApi.playPause();
    }
  };

  // Stop
  document.getElementById('at-stop').onclick = () => {
    if (alphaTabApi) {
      alphaTabApi.stop();
    }
  };

  // Tempo slider
  const tempoSlider = document.getElementById('at-tempo-slider');
  const tempoValue = document.getElementById('at-tempo-value');
  tempoSlider.oninput = () => {
    const tempo = parseInt(tempoSlider.value);
    tempoValue.textContent = tempo + '%';
    if (alphaTabApi) {
      alphaTabApi.playbackSpeed = tempo / 100;
    }
  };

  // Volume slider
  const volumeSlider = document.getElementById('at-volume-slider');
  volumeSlider.oninput = () => {
    if (alphaTabApi) {
      alphaTabApi.masterVolume = parseInt(volumeSlider.value) / 100;
    }
  };

  // Track dropdown
  document.getElementById('at-track-dropdown').onchange = (e) => {
    if (alphaTabApi && alphaTabApi.score) {
      const trackIndex = parseInt(e.target.value);
      const track = alphaTabApi.score.tracks[trackIndex];
      if (track) {
        alphaTabApi.renderTracks([track]);
      }
    }
  };
}

// Populate track dropdown with available tracks
function populateTrackDropdown() {
  const dropdown = document.getElementById('at-track-dropdown');
  dropdown.innerHTML = '';

  if (alphaTabApi && alphaTabApi.score) {
    alphaTabApi.score.tracks.forEach((track, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = track.name || `Track ${index + 1}`;
      dropdown.appendChild(option);
    });
  }
}

// Export functions for use in other scripts
window.hasGpFile = hasGpFile;
window.getGpFilePath = getGpFilePath;
window.openAlphaTab = openAlphaTab;
window.closeAlphaTab = closeAlphaTab;
