/**
 * Extract text tabs from album.js tabData to individual .txt files
 * Run: node extract-tabs.js
 */

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, '../dayglo-tabs/album.js');
const OUTPUT_DIR = path.join(__dirname, 'tabs-txt');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read the album.js file
const content = fs.readFileSync(SOURCE_FILE, 'utf8');

// Extract tabData object using regex
// Match: "song-key": `...content...`,
const tabRegex = /"([^"]+)":\s*`([^`]+)`/g;

let match;
let count = 0;

while ((match = tabRegex.exec(content)) !== null) {
  const key = match[1];
  const tabContent = match[2];

  // Skip keys that end with -ug (duplicates)
  if (key.endsWith('-ug')) continue;

  // Write to file
  const filename = `${key}.txt`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, tabContent.trim());
  count++;
  console.log(`Extracted: ${filename}`);
}

console.log(`\nExtracted ${count} text tabs to ${OUTPUT_DIR}`);
