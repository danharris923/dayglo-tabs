// Script to integrate Ultimate Guitar tabs into album.js
// UG tabs get PRIORITY over other sources - UG version displayed FIRST
// When both UG and existing versions exist, COMBINE them with UG first

const fs = require('fs');
const path = require('path');

const UG_TABS_DIR = path.join(__dirname, '..', 'tabs-from-ug');
const ALBUM_JS_PATH = path.join(__dirname, '..', 'album.js');
const BACKUP_PATH = path.join(__dirname, '..', 'album.js.backup');

// Read current album.js
const albumJsContent = fs.readFileSync(ALBUM_JS_PATH, 'utf8');

// Backup the file
fs.writeFileSync(BACKUP_PATH, albumJsContent);
console.log('Created backup: album.js.backup');

// Extract existing tabData content
const tabDataMatch = albumJsContent.match(/const tabData = \{([\s\S]*?)\n\};/);
if (!tabDataMatch) {
  console.error('Could not find tabData in album.js');
  process.exit(1);
}

// Parse existing tab entries
const existingTabs = {};
const existingContent = tabDataMatch[1];
const entryPattern = /"([^"]+)":\s*`([\s\S]*?)`(?=,\s*\n\s*"|,?\s*\n\};|$)/g;
let match;
while ((match = entryPattern.exec(existingContent)) !== null) {
  const key = match[1];
  const content = match[2];
  existingTabs[key] = content;
}
console.log(`Found ${Object.keys(existingTabs).length} existing tabs in album.js`);

// Read all UG tab files
const tabFiles = fs.readdirSync(UG_TABS_DIR).filter(f => f.endsWith('.txt'));
console.log(`Found ${tabFiles.length} UG tab files to process`);

// Load UG tabs
const ugTabs = {};
tabFiles.forEach(file => {
  const content = fs.readFileSync(path.join(UG_TABS_DIR, file), 'utf8');
  const baseName = file.replace('.txt', '');
  ugTabs[baseName] = content;
});

// Track stats
const newTabs = [];
const mergedTabs = [];
const ugOnlyTabs = [];

// Build combined tab entries
const finalTabs = {};

// Process all UG tabs
Object.keys(ugTabs).forEach(tabKey => {
  const ugContent = ugTabs[tabKey];

  if (existingTabs[tabKey]) {
    // MERGE: UG version first, then existing version
    // Check if existing already has multiple sources (contains multiple "---" headers)
    const existingContent = existingTabs[tabKey];

    // Combine: UG content first, then existing (which may have TabCrawler, GuitarTabs.cc, etc.)
    // The UG file already has the header, just append the existing content after
    finalTabs[tabKey] = ugContent.trim() + '\n\n' + existingContent.trim();
    mergedTabs.push(tabKey);
  } else {
    // UG only - no existing version
    finalTabs[tabKey] = ugContent;
    newTabs.push(tabKey);
  }
});

// Add existing tabs that DON'T have a UG version (keep them as-is)
Object.keys(existingTabs).forEach(tabKey => {
  if (!ugTabs[tabKey]) {
    finalTabs[tabKey] = existingTabs[tabKey];
  }
});

console.log(`Merged tabs (UG + existing): ${mergedTabs.length}`);
console.log(`New tabs (UG only): ${newTabs.length}`);
console.log(`Kept tabs (no UG version): ${Object.keys(existingTabs).length - mergedTabs.length}`);

// Build new tabData content
let newTabDataContent = '';
Object.keys(finalTabs).sort().forEach(tabKey => {
  const content = finalTabs[tabKey];
  // Escape backslashes, backticks and dollar signs for template literals
  const escapedContent = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  newTabDataContent += `  "${tabKey}": \`${escapedContent}\`,\n\n`;
});

// Build new tabLookup
const allSongKeys = new Set();
const tabVariants = {};

Object.keys(finalTabs).forEach(tabKey => {
  let baseKey = tabKey;
  if (tabKey.match(/-v\d+$/)) {
    baseKey = tabKey.replace(/-v\d+$/, '');
  } else if (tabKey.endsWith('-bass')) {
    baseKey = tabKey.replace(/-bass$/, '');
  }

  allSongKeys.add(baseKey);
  if (!tabVariants[baseKey]) {
    tabVariants[baseKey] = [];
  }
  tabVariants[baseKey].push(tabKey);
});

// Build tabLookup entries - primary version first, then variants
let newTabLookupContent = '';
[...allSongKeys].sort().forEach(songKey => {
  const variants = tabVariants[songKey].sort((a, b) => {
    // Primary version (no suffix) comes first
    if (a === songKey) return -1;
    if (b === songKey) return 1;
    // Then v2, v3, etc.
    if (a.match(/-v\d+$/) && b.match(/-v\d+$/)) {
      return a.localeCompare(b);
    }
    if (a.match(/-v\d+$/)) return -1;
    if (b.match(/-v\d+$/)) return 1;
    // Bass last
    return a.localeCompare(b);
  });

  const variantsList = variants.map(v => `"${v}"`).join(', ');
  newTabLookupContent += `  "${songKey}": [${variantsList}],\n`;
});

// Remove trailing comma from last entry
newTabLookupContent = newTabLookupContent.replace(/,\n$/, '\n');

// Construct new album.js content
const beforeTabData = albumJsContent.substring(0, albumJsContent.indexOf('const tabData = {') + 'const tabData = {'.length);
const afterTabLookup = albumJsContent.substring(albumJsContent.indexOf('};', albumJsContent.indexOf('const tabLookup')) + 2);

const newAlbumJs = `${beforeTabData}
${newTabDataContent}};

const tabLookup = {
${newTabLookupContent}};${afterTabLookup}`;

// Write updated album.js
fs.writeFileSync(ALBUM_JS_PATH, newAlbumJs);

console.log('\n=== INTEGRATION COMPLETE ===');
console.log(`Total tabs in final file: ${Object.keys(finalTabs).length}`);
console.log(`Total songs in tabLookup: ${allSongKeys.size}`);

if (newTabs.length > 0) {
  console.log('\nNew songs added (UG only):');
  newTabs.slice(0, 20).forEach(t => console.log(`  - ${t}`));
  if (newTabs.length > 20) {
    console.log(`  ... and ${newTabs.length - 20} more`);
  }
}

if (mergedTabs.length > 0) {
  console.log('\nMerged tabs (UG + existing):');
  mergedTabs.slice(0, 10).forEach(t => console.log(`  - ${t}`));
  if (mergedTabs.length > 10) {
    console.log(`  ... and ${mergedTabs.length - 10} more`);
  }
}
