// Script to update hasGuitar flags in script.js based on tabLookup in album.js
// This ensures Tab buttons appear for all songs that have tabs

const fs = require('fs');
const path = require('path');

const ALBUM_JS_PATH = path.join(__dirname, '..', 'album.js');
const SCRIPT_JS_PATH = path.join(__dirname, '..', 'script.js');
const BACKUP_PATH = path.join(__dirname, '..', 'script.js.backup');

// Read album.js to get tabLookup
const albumJsContent = fs.readFileSync(ALBUM_JS_PATH, 'utf8');

// Extract tabLookup keys (songs that have tabs)
const tabLookupMatch = albumJsContent.match(/const tabLookup = \{([\s\S]*?)\n\};/);
if (!tabLookupMatch) {
  console.error('Could not find tabLookup in album.js');
  process.exit(1);
}

// Parse the keys from tabLookup
const songsWithTabs = new Set();
const keyPattern = /"([^"]+)":\s*\[/g;
let match;
while ((match = keyPattern.exec(tabLookupMatch[1])) !== null) {
  songsWithTabs.add(match[1]);
}
console.log(`Found ${songsWithTabs.size} songs with tabs in tabLookup`);

// Read script.js
let scriptJsContent = fs.readFileSync(SCRIPT_JS_PATH, 'utf8');

// Backup
fs.writeFileSync(BACKUP_PATH, scriptJsContent);
console.log('Created backup: script.js.backup');

// Track changes
let updatedCount = 0;

// For each song with tabs, find it in script.js and set hasGuitar: true
songsWithTabs.forEach(songKey => {
  // Convert song key back to variations of title matching
  // e.g., "stupid-songs" could match "Stupid Songs", "stupid songs", etc.

  // Create regex patterns for the song title in various formats
  const titleWords = songKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Look for the track in script.js trackList arrays
  // Pattern: { title: "Song Title", ... hasGuitar: false, ... }
  // We need to find tracks and update hasGuitar to true

  // Try different title variations
  const titleVariations = [
    titleWords,                                    // "Stupid Songs"
    songKey.split('-').join(' '),                  // "stupid songs"
    titleWords.replace(/ /g, ' '),                 // normalized spaces
  ];

  for (const title of titleVariations) {
    // Match pattern: title: "Title", followed by hasGuitar: false within the same object
    // This is complex because the object spans multiple lines

    // First, find all occurrences of this title
    const titlePattern = new RegExp(`title:\\s*["']${escapeRegex(title)}["']`, 'gi');

    if (titlePattern.test(scriptJsContent)) {
      // Found the title, now we need to update hasGuitar in the same object
      // The object structure is like:
      // { title: "Song", duration: "1:23", hasGuitar: false, hasBassTabs: false }

      // Use a more targeted replacement
      const objectPattern = new RegExp(
        `(\\{[^}]*title:\\s*["']${escapeRegex(title)}["'][^}]*)(hasGuitar:\\s*false)([^}]*\\})`,
        'gi'
      );

      const newContent = scriptJsContent.replace(objectPattern, '$1hasGuitar: true$3');
      if (newContent !== scriptJsContent) {
        scriptJsContent = newContent;
        updatedCount++;
        console.log(`  Updated: ${title}`);
      }
      break; // Found and processed this song
    }
  }
});

// Write updated script.js
fs.writeFileSync(SCRIPT_JS_PATH, scriptJsContent);

console.log(`\n=== UPDATE COMPLETE ===`);
console.log(`Songs with tabs: ${songsWithTabs.size}`);
console.log(`Tracks updated: ${updatedCount}`);

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
