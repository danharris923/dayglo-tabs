/**
 * Convert Dayglo Abortions data to JSON format
 * Run: node convert-data.js
 */

const fs = require('fs');
const path = require('path');

// GP file mappings from alphatab.js
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

// Albums data from script.js
const albums = [
  {
    id: 'out-of-the-womb',
    title: 'Out of the Womb',
    year: 1981,
    artwork: 'images/albums/out-of-the-womb.jpg',
    description: 'The raw debut album that launched Canadian hardcore punk into the spotlight.',
    trackList: [
      { title: "R.B.F.'s", hasBassTabs: false, hasGuitar: true },
      { title: '1967', hasBassTabs: false, hasGuitar: true },
      { title: 'Scared Of People', hasBassTabs: false, hasGuitar: true },
      { title: 'Black Sabbath', hasBassTabs: false, hasGuitar: true },
      { title: 'Used To Be In Love', hasBassTabs: false, hasGuitar: true },
      { title: 'I Killed Mommy', hasBassTabs: false, hasGuitar: true },
      { title: 'P.E.T.', hasBassTabs: false, hasGuitar: false },
      { title: 'East Indian', hasBassTabs: false, hasGuitar: true },
      { title: 'Kill The Hosers', hasBassTabs: false, hasGuitar: true },
      { title: 'Too Stoned To Care', hasBassTabs: false, hasGuitar: false },
      { title: 'Suicide', hasBassTabs: false, hasGuitar: true },
      { title: 'Idiot', hasBassTabs: false, hasGuitar: true },
      { title: 'I Am My Own God', hasBassTabs: false, hasGuitar: true },
      { title: 'Germ Attack', hasBassTabs: false, hasGuitar: true }
    ]
  },
  {
    id: 'feed-us-a-fetus',
    title: 'Feed Us a Fetus',
    year: 1986,
    artwork: 'images/albums/feed-us-a-fetus.jpg',
    description: 'The controversial album that cemented their reputation as punk provocateurs.',
    trackList: [
      { title: 'Stupid Songs', hasBassTabs: false, hasGuitar: true },
      { title: 'Argh Fuck Kill', hasBassTabs: false, hasGuitar: true },
      { title: 'Die Sinner Die', hasBassTabs: false, hasGuitar: true },
      { title: 'Bedtime Story', hasBassTabs: false, hasGuitar: true },
      { title: 'My Girl', hasBassTabs: false, hasGuitar: true },
      { title: 'Dogfarts', hasBassTabs: false, hasGuitar: true },
      { title: 'Inside My Head', hasBassTabs: false, hasGuitar: true },
      { title: 'Wake Up America', hasBassTabs: false, hasGuitar: true },
      { title: 'Proud To Be Canadian', hasBassTabs: false, hasGuitar: false },
      { title: 'Stupid World', hasBassTabs: false, hasGuitar: true },
      { title: 'Kill The Hosers', hasBassTabs: false, hasGuitar: true },
      { title: 'Religious Bumfucks', hasBassTabs: false, hasGuitar: true },
      { title: '1967', hasBassTabs: false, hasGuitar: true },
      { title: 'I Killed Mommy', hasBassTabs: false, hasGuitar: true },
      { title: "I'm My Own God", hasBassTabs: false, hasGuitar: true },
      { title: 'Used To Be In Love', hasBassTabs: false, hasGuitar: true },
      { title: 'Suicide', hasBassTabs: false, hasGuitar: true },
      { title: 'The Idiot', hasBassTabs: false, hasGuitar: true },
      { title: 'Germ Attack', hasBassTabs: false, hasGuitar: true },
      { title: 'Scared Of People', hasBassTabs: false, hasGuitar: true },
      { title: 'Black Sabbath', hasBassTabs: false, hasGuitar: true }
    ]
  },
  {
    id: 'here-today-guano-tomorrow',
    title: 'Here Today, Guano Tomorrow',
    year: 1988,
    artwork: 'images/albums/here-today-guano-tomorrow.jpg',
    description: 'Their most polished and politically charged album of the classic era.',
    trackList: [
      { title: 'Homophobic Sexist Cokeheads', hasBassTabs: false, hasGuitar: true },
      { title: 'Stupid Songs', hasBassTabs: false, hasGuitar: true },
      { title: 'Hide the Hamster', hasBassTabs: false, hasGuitar: false },
      { title: 'Argh Fuck Kill', hasBassTabs: false, hasGuitar: true },
      { title: "I'm Gonna Be a Shithead", hasBassTabs: false, hasGuitar: false },
      { title: "Isn't This Disgusting", hasBassTabs: false, hasGuitar: false },
      { title: 'Ben Meyer', hasBassTabs: false, hasGuitar: false },
      { title: 'Sacks of Meat', hasBassTabs: false, hasGuitar: false },
      { title: 'America Eats Her Young', hasBassTabs: false, hasGuitar: true },
      { title: 'Scared of People', hasBassTabs: false, hasGuitar: true },
      { title: 'The Spawn of Yog-Sothoth', hasBassTabs: false, hasGuitar: false },
      { title: 'When the Lie Becomes the Truth', hasBassTabs: false, hasGuitar: false },
      { title: 'Ronald McRaygun', hasBassTabs: false, hasGuitar: true }
    ]
  },
  {
    id: 'two-dogs-fucking',
    title: 'Two Dogs Fucking',
    year: 1991,
    artwork: 'images/albums/two-dogs-fucking.jpg',
    description: 'A harder, more metallic sound emerges on this provocative release.',
    trackList: [
      { title: 'Two Dogs Fucking', hasBassTabs: false, hasGuitar: false },
      { title: "Let's Party", hasBassTabs: false, hasGuitar: false },
      { title: "She's Ovulating", hasBassTabs: false, hasGuitar: false },
      { title: 'Cash Bash', hasBassTabs: false, hasGuitar: true },
      { title: 'Piss Me Off', hasBassTabs: false, hasGuitar: false },
      { title: 'Euthanasia Day', hasBassTabs: false, hasGuitar: true },
      { title: 'The Idiot', hasBassTabs: false, hasGuitar: true },
      { title: 'Nuclear Supremacy', hasBassTabs: false, hasGuitar: true },
      { title: 'Plastic Soldiers', hasBassTabs: false, hasGuitar: false },
      { title: 'Shit Happens', hasBassTabs: false, hasGuitar: false },
      { title: 'Cosmic Joke', hasBassTabs: false, hasGuitar: false },
      { title: 'Rich Bitch', hasBassTabs: false, hasGuitar: false },
      { title: 'Canadian Boozehounds', hasBassTabs: false, hasGuitar: false },
      { title: 'Carnage', hasBassTabs: false, hasGuitar: false },
      { title: 'White Anglo-Saxon Protestant', hasBassTabs: false, hasGuitar: true }
    ]
  },
  {
    id: 'little-man-in-the-canoe',
    title: 'Little Man in the Canoe',
    year: 1995,
    artwork: 'images/albums/little-man-in-the-canoe.jpg',
    description: 'A return to their punk roots with updated production values.',
    trackList: [
      { title: 'Casting Couch', hasBassTabs: false, hasGuitar: true },
      { title: 'Nikki Dial', hasBassTabs: false, hasGuitar: true },
      { title: 'Man Bites Dog', hasBassTabs: false, hasGuitar: true },
      { title: 'Meathead', hasBassTabs: false, hasGuitar: false },
      { title: 'Little Man in the Canoe', hasBassTabs: false, hasGuitar: true },
      { title: 'Open Sore', hasBassTabs: false, hasGuitar: true },
      { title: 'Big Fat Cow', hasBassTabs: false, hasGuitar: false },
      { title: 'Razor Burn', hasBassTabs: false, hasGuitar: false },
      { title: 'Drugged and Driving', hasBassTabs: false, hasGuitar: true },
      { title: 'Generation Landslide \'81', hasBassTabs: false, hasGuitar: false },
      { title: 'Save Dave From Himself', hasBassTabs: false, hasGuitar: false },
      { title: 'Stick It Up Your Ass', hasBassTabs: false, hasGuitar: false },
      { title: 'Used to Be in Love', hasBassTabs: false, hasGuitar: true },
      { title: 'Squid Row', hasBassTabs: false, hasGuitar: false }
    ]
  },
  {
    id: 'corporate-whores',
    title: 'Corporate Whores',
    year: 1996,
    artwork: 'images/albums/corporate-whores.jpg',
    description: 'Anti-corporate punk anthems with their signature offensive humor.',
    trackList: [
      { title: 'Corporate Whores', hasBassTabs: false, hasGuitar: true },
      { title: 'Fucking Up', hasBassTabs: false, hasGuitar: false },
      { title: 'Taking Drugs', hasBassTabs: false, hasGuitar: false },
      { title: 'Pissed on Another Planet', hasBassTabs: false, hasGuitar: false },
      { title: 'Asshole', hasBassTabs: false, hasGuitar: false },
      { title: 'Parasite', hasBassTabs: false, hasGuitar: false },
      { title: 'Sick of the Lies', hasBassTabs: false, hasGuitar: false },
      { title: 'Wage Slave', hasBassTabs: false, hasGuitar: false },
      { title: 'Stupid Junkies', hasBassTabs: false, hasGuitar: false },
      { title: 'Get Away', hasBassTabs: false, hasGuitar: false },
      { title: 'Filthy Greedy Guilt', hasBassTabs: false, hasGuitar: false },
      { title: 'Kill Kill Kill', hasBassTabs: false, hasGuitar: false }
    ]
  },
  {
    id: 'death-race-2000',
    title: 'Death Race 2000',
    year: 1999,
    artwork: 'images/albums/death-race-2000.jpg',
    description: 'Millennium-era fury with socially conscious punk anthems.',
    trackList: [
      { title: 'Death Race 2000', hasBassTabs: false, hasGuitar: false },
      { title: '1967', hasBassTabs: false, hasGuitar: true },
      { title: 'Courage in a Can', hasBassTabs: false, hasGuitar: true },
      { title: 'Scientology', hasBassTabs: false, hasGuitar: true },
      { title: 'Human Garbage Can', hasBassTabs: false, hasGuitar: false },
      { title: 'Flesh and Blood', hasBassTabs: false, hasGuitar: false },
      { title: 'Corpse Full of Shit', hasBassTabs: false, hasGuitar: false },
      { title: 'Prion', hasBassTabs: false, hasGuitar: false },
      { title: 'Death Machine', hasBassTabs: false, hasGuitar: false },
      { title: 'After the War', hasBassTabs: false, hasGuitar: false },
      { title: 'All Roads Lead to Rome', hasBassTabs: false, hasGuitar: false },
      { title: 'Another Bloody Sunday', hasBassTabs: false, hasGuitar: false },
      { title: 'Left Behind', hasBassTabs: false, hasGuitar: false }
    ]
  },
  {
    id: 'holy-shiite',
    title: 'Holy Shiite',
    year: 2004,
    artwork: 'images/albums/holy-shiite.jpg',
    description: 'Post-9/11 political punk with renewed aggression and purpose.',
    trackList: [
      { title: 'My Shit Stinks', hasBassTabs: false, hasGuitar: false },
      { title: 'Holy Shiite', hasBassTabs: false, hasGuitar: false },
      { title: 'Bombs Away', hasBassTabs: false, hasGuitar: false },
      { title: 'Your Poetry Sucks', hasBassTabs: false, hasGuitar: false },
      { title: 'Slumlord', hasBassTabs: false, hasGuitar: false },
      { title: 'Punk Rock Tried to Kill Me', hasBassTabs: false, hasGuitar: false },
      { title: 'Black Sabbath Sabbath', hasBassTabs: false, hasGuitar: false },
      { title: 'Pigs in Space', hasBassTabs: false, hasGuitar: false },
      { title: 'More Beer', hasBassTabs: false, hasGuitar: false },
      { title: 'Woke Up This Morning', hasBassTabs: false, hasGuitar: false },
      { title: 'Sick Boy', hasBassTabs: false, hasGuitar: false },
      { title: 'Sellout', hasBassTabs: false, hasGuitar: false },
      { title: 'The Legend of Bobby Bird', hasBassTabs: false, hasGuitar: false },
      { title: 'At Least I Tried', hasBassTabs: false, hasGuitar: false }
    ]
  },
  {
    id: 'armageddon-survival-guide',
    title: 'Armageddon Survival Guide',
    year: 2016,
    artwork: 'images/albums/armageddon-survival-guide.jpg',
    description: 'A return to form after 12 years, addressing modern societal collapse.',
    trackList: [
      { title: 'Armageddon Survival Guide', hasBassTabs: false, hasGuitar: false },
      { title: 'Aliens', hasBassTabs: false, hasGuitar: false },
      { title: 'Velcro Shoes', hasBassTabs: false, hasGuitar: false },
      { title: 'End of the World', hasBassTabs: false, hasGuitar: false },
      { title: 'Sick of the Lies', hasBassTabs: false, hasGuitar: false },
      { title: 'Marine Life', hasBassTabs: false, hasGuitar: false },
      { title: 'In Your Face', hasBassTabs: false, hasGuitar: false },
      { title: 'Left on the Shelf', hasBassTabs: false, hasGuitar: false },
      { title: 'Stay Away', hasBassTabs: false, hasGuitar: false },
      { title: 'Brave New World', hasBassTabs: false, hasGuitar: false },
      { title: 'Cockroaches', hasBassTabs: false, hasGuitar: false },
      { title: 'Outlaw', hasBassTabs: false, hasGuitar: false },
      { title: 'Worn Out', hasBassTabs: false, hasGuitar: false }
    ]
  },
  {
    id: 'hate-speech',
    title: 'Hate Speech',
    year: 2021,
    artwork: 'images/albums/hate-speech.jpg',
    description: 'Their latest full-length, continuing their tradition of provocative punk rock.',
    trackList: [
      { title: 'Hate Speech', hasBassTabs: false, hasGuitar: false },
      { title: 'Cancel Culture', hasBassTabs: false, hasGuitar: false },
      { title: 'White Noise', hasBassTabs: false, hasGuitar: false },
      { title: 'Neighbourhood Watch', hasBassTabs: false, hasGuitar: false },
      { title: 'Covid-1984', hasBassTabs: false, hasGuitar: false },
      { title: 'Trigger Warning', hasBassTabs: false, hasGuitar: false },
      { title: 'Dead Internet Theory', hasBassTabs: false, hasGuitar: false },
      { title: 'Thought Police', hasBassTabs: false, hasGuitar: false },
      { title: 'Plastic World', hasBassTabs: false, hasGuitar: false },
      { title: 'Hashtag', hasBassTabs: false, hasGuitar: false },
      { title: 'Blackout', hasBassTabs: false, hasGuitar: false },
      { title: 'Fuck Off and Die', hasBassTabs: false, hasGuitar: false }
    ]
  }
];

// Create slug from title
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get GP file for a track
function getGpFile(title) {
  return gpFiles[title] || null;
}

// Check if text tab file exists
function getTabFile(slug) {
  const tabPath = path.join(__dirname, 'tabs-txt', `${slug}.txt`);
  if (fs.existsSync(tabPath)) {
    return `tabs-txt/${slug}.txt`;
  }
  return null;
}

// Convert albums to new format
function convertAlbums() {
  return albums.map(album => {
    const tracks = album.trackList.map((track, index) => {
      const slug = slugify(track.title);
      const gpFile = getGpFile(track.title);

      return {
        id: slug,
        title: track.title,
        trackNumber: index + 1,
        hasBass: track.hasBassTabs,
        hasGuitar: track.hasGuitar,
        gpFile: gpFile ? `gp/${gpFile}` : null,
        tabFile: getTabFile(slug)
      };
    });

    return {
      id: album.id,
      title: album.title,
      year: album.year,
      cover: album.artwork,
      description: album.description,
      tracks: tracks
    };
  });
}

// Main
const outputData = convertAlbums();

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write JSON
const outputPath = path.join(dataDir, 'albums.json');
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

console.log(`Converted ${outputData.length} albums`);

// Count stats
let totalTracks = 0;
let totalTabs = 0;
let totalGp = 0;

outputData.forEach(album => {
  totalTracks += album.tracks.length;
  album.tracks.forEach(track => {
    if (track.hasGuitar || track.hasBass) totalTabs++;
    if (track.gpFile) totalGp++;
  });
});

console.log(`Total tracks: ${totalTracks}`);
console.log(`Total tabs (guitar/bass): ${totalTabs}`);
console.log(`Total GP files: ${totalGp}`);
console.log(`\nOutput: ${outputPath}`);
