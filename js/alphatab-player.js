/**
 * AlphaTab Player with High-Quality SoundFont
 * Features: Play/Pause, Tempo, Loop, Track Mixer
 */

(function() {
  'use strict';

  let api = null;
  let isAudioLoaded = false;

  // SoundFont URLs - GeneralUser GS for high quality guitar/bass
  const LOCAL_SOUNDFONT = '/soundfonts/GeneralUser-GS.sf2';
  const CDN_SOUNDFONT = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2';

  // Format time
  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Initialize player
  function initPlayer() {
    const container = document.getElementById('alphatab-container');
    const loadBtn = document.getElementById('load-audio-btn');

    if (!container) return;

    const gpFile = container.dataset.file;
    if (!gpFile) return;

    // Create player UI
    const playerHTML = `
      <div class="player-header">
        <div class="player-controls-main">
          <button class="player-btn play-btn" id="play-btn" disabled>
            <span class="play-icon">▶</span>
            <span class="pause-icon" style="display:none">⏸</span>
          </button>
          <button class="player-btn stop-btn" id="stop-btn" disabled>⏹</button>
        </div>

        <div class="player-progress" id="progress-section" style="display:none">
          <span class="time current-time" id="current-time">0:00</span>
          <div class="progress-bar" id="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
          <span class="time total-time" id="total-time">0:00</span>
        </div>

        <div class="player-options">
          <div class="tempo-control">
            <label>Speed:</label>
            <select id="tempo-select">
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1" selected>1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>

          <button class="player-btn toggle-btn" id="loop-btn" title="Loop">🔁</button>
          <button class="player-btn toggle-btn" id="metronome-btn" title="Metronome">🥁</button>
          <button class="player-btn toggle-btn" id="mixer-btn" title="Track Mixer">🎚️</button>
          <a href="${gpFile}" download class="player-btn download-btn" title="Download GP File">⬇</a>
        </div>
      </div>

      <div class="mixer-panel" id="mixer-panel" style="display:none">
        <h4>Track Mixer</h4>
        <div class="mixer-tracks" id="mixer-tracks"></div>
      </div>

      <div class="loading-overlay" id="loading-overlay">
        <div class="spinner"></div>
        <p>Loading tablature...</p>
      </div>

      <div class="notation-container" id="notation-container"></div>
    `;

    container.innerHTML = playerHTML;

    // Initialize AlphaTab (notation only, no audio yet)
    const settings = {
      core: {
        fontDirectory: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/',
        file: gpFile,
        tracks: 'all'
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        scrollElement: document.getElementById('notation-container'),
        soundFont: null // Don't load audio automatically
      },
      display: {
        layoutMode: alphaTab.LayoutMode.Page,
        staveProfile: alphaTab.StaveProfile.Default
      },
      notation: {
        elements: {
          scoreTitle: false,
          scoreSubTitle: false,
          scoreArtist: false,
          scoreAlbum: false,
          scoreWords: false,
          scoreMusic: false
        }
      }
    };

    api = new alphaTab.AlphaTabApi(document.getElementById('notation-container'), settings);

    // Events
    api.scoreLoaded.on(function(score) {
      document.getElementById('loading-overlay').style.display = 'none';
      buildMixerUI(score.tracks);
    });

    api.soundFontLoaded.on(function() {
      isAudioLoaded = true;
      document.getElementById('play-btn').disabled = false;
      document.getElementById('stop-btn').disabled = false;
      document.getElementById('progress-section').style.display = 'flex';
      loadBtn.textContent = 'Audio Loaded';
      loadBtn.disabled = true;
    });

    api.playerStateChanged.on(function(e) {
      const playIcon = document.querySelector('.play-icon');
      const pauseIcon = document.querySelector('.pause-icon');

      if (e.state === alphaTab.synth.PlayerState.Playing) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      } else {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      }
    });

    api.playerPositionChanged.on(function(e) {
      document.getElementById('current-time').textContent = formatTime(e.currentTime);
      document.getElementById('total-time').textContent = formatTime(e.endTime);

      const progress = e.endTime > 0 ? (e.currentTime / e.endTime) * 100 : 0;
      document.getElementById('progress-fill').style.width = progress + '%';
    });

    // Button handlers
    loadBtn.addEventListener('click', loadAudio);

    document.getElementById('play-btn').addEventListener('click', function() {
      if (api && isAudioLoaded) api.playPause();
    });

    document.getElementById('stop-btn').addEventListener('click', function() {
      if (api) api.stop();
    });

    document.getElementById('tempo-select').addEventListener('change', function(e) {
      if (api) api.playbackSpeed = parseFloat(e.target.value);
    });

    document.getElementById('loop-btn').addEventListener('click', function() {
      if (api) {
        api.isLooping = !api.isLooping;
        this.classList.toggle('active', api.isLooping);
      }
    });

    document.getElementById('metronome-btn').addEventListener('click', function() {
      if (api) {
        const isOn = api.metronomeVolume > 0;
        api.metronomeVolume = isOn ? 0 : 1;
        this.classList.toggle('active', !isOn);
      }
    });

    document.getElementById('mixer-btn').addEventListener('click', function() {
      const panel = document.getElementById('mixer-panel');
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      this.classList.toggle('active');
    });

    // Progress bar click
    document.getElementById('progress-bar').addEventListener('click', function(e) {
      if (!api || !isAudioLoaded) return;
      const rect = this.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      api.timePosition = percent * api.timePosition / (document.getElementById('progress-fill').style.width.replace('%', '') / 100);
    });
  }

  // Load audio (SoundFont)
  function loadAudio() {
    if (!api || isAudioLoaded) return;

    const loadBtn = document.getElementById('load-audio-btn');
    loadBtn.textContent = 'Loading Audio...';
    loadBtn.disabled = true;

    // Try local SoundFont first, fall back to CDN
    fetch(LOCAL_SOUNDFONT, { method: 'HEAD' })
      .then(function(res) {
        const soundFontUrl = res.ok ? LOCAL_SOUNDFONT : CDN_SOUNDFONT;
        api.loadSoundFont(soundFontUrl, true);
      })
      .catch(function() {
        api.loadSoundFont(CDN_SOUNDFONT, true);
      });
  }

  // Build mixer UI
  function buildMixerUI(tracks) {
    const container = document.getElementById('mixer-tracks');
    container.innerHTML = '';

    tracks.forEach(function(track, index) {
      const trackDiv = document.createElement('div');
      trackDiv.className = 'mixer-track';
      trackDiv.innerHTML = `
        <span class="track-name">${track.name || 'Track ' + (index + 1)}</span>
        <button class="mixer-btn mute-btn" data-index="${index}">M</button>
        <button class="mixer-btn solo-btn" data-index="${index}">S</button>
        <input type="range" class="volume-slider" data-index="${index}" min="0" max="100" value="100">
      `;
      container.appendChild(trackDiv);
    });

    // Mixer event handlers
    container.querySelectorAll('.mute-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.index);
        const track = api.score.tracks[idx];
        const isMuted = this.classList.toggle('active');
        api.changeTrackMute([track], isMuted);
      });
    });

    container.querySelectorAll('.solo-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.index);
        const track = api.score.tracks[idx];
        const isSolo = this.classList.toggle('active');
        api.changeTrackSolo([track], isSolo);
      });
    });

    container.querySelectorAll('.volume-slider').forEach(function(slider) {
      slider.addEventListener('input', function() {
        const idx = parseInt(this.dataset.index);
        const track = api.score.tracks[idx];
        api.changeTrackVolume([track], this.value / 100);
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
})();
