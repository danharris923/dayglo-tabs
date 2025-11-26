// Dayglo Abortions Albums Data with Tab Information
const albums = [
    {
        id: 'out-of-the-womb',
        title: 'Out of the Womb',
        year: 1981,
        type: 'studio',
        era: 'early',
        artwork: 'images/albums/out-of-the-womb.jpg',
        tracks: 14,
        bassTabs: 0,
        description: 'The raw debut album that launched Canadian hardcore punk into the spotlight. Produced by Nick Jones of the Pointed Sticks.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Wayne Gretzky (Cretin Sr.) - Bass',
        trackList: [
            { title: 'R.B.F.\'s', duration: '2:14', hasBassTabs: false, hasGuitar: true },
            { title: '1967', duration: '2:31', hasBassTabs: false, hasGuitar: true },
            { title: 'Scared Of People', duration: '2:08', hasBassTabs: false, hasGuitar: true },
            { title: 'Black Sabbath', duration: '2:45', hasBassTabs: false, hasGuitar: true },
            { title: 'Used To Be In Love', duration: '2:18', hasBassTabs: false, hasGuitar: true },
            { title: 'I Killed Mommy', duration: '1:16', hasBassTabs: false, hasGuitar: true },
            { title: 'P.E.T.', duration: '1:52', hasBassTabs: false, hasGuitar: false },
            { title: 'East Indian', duration: '1:09', hasBassTabs: false, hasGuitar: true },
            { title: 'Kill The Hosers', duration: '1:44', hasBassTabs: false, hasGuitar: true },
            { title: 'Too Stoned To Care', duration: '2:13', hasBassTabs: false, hasGuitar: false },
            { title: 'Suicide', duration: '1:47', hasBassTabs: false, hasGuitar: true },
            { title: 'Idiot', duration: '2:27', hasBassTabs: false, hasGuitar: true },
            { title: 'I Am My Own God', duration: '2:01', hasBassTabs: false, hasGuitar: true },
            { title: 'Germ Attack', duration: '1:33', hasBassTabs: false, hasGuitar: true }
        ]
    },
    {
        id: 'feed-us-a-fetus',
        title: 'Feed Us a Fetus',
        year: 1986,
        type: 'studio',
        era: 'classic',
        artwork: 'images/albums/feed-us-a-fetus.jpg',
        tracks: 21,
        bassTabs: 0,
        description: 'The controversial album that cemented their reputation as punk provocateurs.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Stupid Songs', duration: '1:28', hasBassTabs: false, hasGuitar: true },
            { title: 'Argh Fuck Kill', duration: '3:56', hasBassTabs: false, hasGuitar: true },
            { title: 'Die Sinner Die', duration: '2:14', hasBassTabs: false, hasGuitar: true },
            { title: 'Bedtime Story', duration: '4:02', hasBassTabs: false, hasGuitar: true },
            { title: 'My Girl', duration: '2:18', hasBassTabs: false, hasGuitar: true },
            { title: 'Dogfarts', duration: '1:58', hasBassTabs: false, hasGuitar: true },
            { title: 'Inside My Head', duration: '2:18', hasBassTabs: false, hasGuitar: true },
            { title: 'Wake Up America', duration: '3:07', hasBassTabs: false, hasGuitar: true },
            { title: 'Proud To Be A Canadian', duration: '1:56', hasBassTabs: false, hasGuitar: false },
            { title: 'Stupid World', duration: '2:30', hasBassTabs: false, hasGuitar: true },
            { title: 'Kill The Hosers', duration: '1:58', hasBassTabs: false, hasGuitar: true },
            { title: 'Religious Bumfucks', duration: '2:14', hasBassTabs: false, hasGuitar: true },
            { title: '1967', duration: '2:31', hasBassTabs: false, hasGuitar: true },
            { title: 'I Killed Mommy', duration: '1:16', hasBassTabs: false, hasGuitar: true },
            { title: 'I\'m My Own God', duration: '2:01', hasBassTabs: false, hasGuitar: true },
            { title: 'Used To Be In Love', duration: '2:18', hasBassTabs: false, hasGuitar: true },
            { title: 'Suicide', duration: '1:47', hasBassTabs: false, hasGuitar: true },
            { title: 'The Idiot', duration: '2:27', hasBassTabs: false, hasGuitar: true },
            { title: 'Germ Attack', duration: '1:33', hasBassTabs: false, hasGuitar: true },
            { title: 'Scared Of People', duration: '2:08', hasBassTabs: false, hasGuitar: true },
            { title: 'Black Sabbath', duration: '2:45', hasBassTabs: false, hasGuitar: true }
        ]
    },
    {
        id: 'here-today-guano-tomorrow',
        title: 'Here Today, Guano Tomorrow',
        year: 1988,
        type: 'studio',
        era: 'classic',
        artwork: 'images/albums/here-today-guano-tomorrow.jpg',
        tracks: 13,
        bassTabs: 0,
        description: 'Their most polished and politically charged album of the classic era.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Homophobic Sexist Cokeheads', duration: '3:12', hasBassTabs: false, hasGuitar: true },
            { title: 'Stupid Songs', duration: '1:28', hasBassTabs: false, hasGuitar: true },
            { title: 'Hide the Hamster', duration: '2:45', hasBassTabs: false, hasGuitar: false },
            { title: 'Argh Fuck Kill', duration: '3:56', hasBassTabs: false, hasGuitar: true },
            { title: 'I\'m Gonna Be a Shithead', duration: '2:17', hasBassTabs: false, hasGuitar: false },
            { title: 'Isn\'t This Disgusting', duration: '2:33', hasBassTabs: false, hasGuitar: false },
            { title: 'Ben Meyer', duration: '3:08', hasBassTabs: false, hasGuitar: false },
            { title: 'Sacks of Meat', duration: '2:49', hasBassTabs: false, hasGuitar: false },
            { title: 'America Eats Her Young', duration: '4:21', hasBassTabs: false, hasGuitar: true },
            { title: 'Scared of People', duration: '3:02', hasBassTabs: false, hasGuitar: true },
            { title: 'The Spawn of Yog-Sothoth', duration: '2:44', hasBassTabs: false, hasGuitar: false },
            { title: 'When the Lie Becomes the Truth', duration: '3:37', hasBassTabs: false, hasGuitar: false },
            { title: 'Ronald McRaygun', duration: '1:59', hasBassTabs: false, hasGuitar: true }
        ]
    },
    {
        id: 'two-dogs-fucking',
        title: 'Two Dogs Fucking',
        year: 1991,
        type: 'studio',
        era: 'middle',
        artwork: 'images/albums/two-dogs-fucking.jpg',
        tracks: 15,
        bassTabs: 0,
        description: 'A harder, more metallic sound emerges on this provocative release.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Two Dogs Fucking', duration: '3:45', hasBassTabs: false, hasGuitar: false },
            { title: 'Let\'s Party', duration: '2:18', hasBassTabs: false, hasGuitar: false },
            { title: 'She\'s Ovulating', duration: '2:56', hasBassTabs: false, hasGuitar: false },
            { title: 'Cash Bash', duration: '3:21', hasBassTabs: false, hasGuitar: true },
            { title: 'Piss Me Off', duration: '2:47', hasBassTabs: false, hasGuitar: false },
            { title: 'Euthanasia Day', duration: '3:03', hasBassTabs: false, hasGuitar: true },
            { title: 'The Idiot', duration: '2:39', hasBassTabs: false, hasGuitar: true },
            { title: 'Nuclear Supremacy', duration: '3:58', hasBassTabs: false, hasGuitar: true },
            { title: 'Plastic Soldiers', duration: '2:44', hasBassTabs: false, hasGuitar: false },
            { title: 'Shit Happens', duration: '3:12', hasBassTabs: false, hasGuitar: false },
            { title: 'Cosmic Joke', duration: '2:51', hasBassTabs: false, hasGuitar: false },
            { title: 'Rich Bitch', duration: '3:27', hasBassTabs: false, hasGuitar: false },
            { title: 'Canadian Boozehounds', duration: '2:15', hasBassTabs: false, hasGuitar: false },
            { title: 'Carnage', duration: '4:03', hasBassTabs: false, hasGuitar: false },
            { title: 'White Anglo-Saxon Protestant', duration: '2:30', hasBassTabs: false, hasGuitar: true }
        ]
    },
    {
        id: 'little-man-in-the-canoe',
        title: 'Little Man in the Canoe',
        year: 1995,
        type: 'studio',
        era: 'middle',
        artwork: 'images/albums/little-man-in-the-canoe.jpg',
        tracks: 14,
        bassTabs: 0,
        description: 'A return to their punk roots with updated production values.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Casting Couch', duration: '3:21', hasBassTabs: false, hasGuitar: true },
            { title: 'Nikki Dial', duration: '2:47', hasBassTabs: false, hasGuitar: true },
            { title: 'Man Bites Dog', duration: '2:18', hasBassTabs: false, hasGuitar: true },
            { title: 'Meathead', duration: '2:53', hasBassTabs: false, hasGuitar: false },
            { title: 'Little Man in the Canoe', duration: '3:12', hasBassTabs: false, hasGuitar: true },
            { title: 'Open Sore', duration: '2:36', hasBassTabs: false, hasGuitar: true },
            { title: 'Big Fat Cow', duration: '2:41', hasBassTabs: false, hasGuitar: false },
            { title: 'Razor Burn', duration: '3:08', hasBassTabs: false, hasGuitar: false },
            { title: 'Drugged and Driving', duration: '2:59', hasBassTabs: false, hasGuitar: true },
            { title: 'Generation Landslide \'81', duration: '2:24', hasBassTabs: false, hasGuitar: false },
            { title: 'Save Dave From Himself', duration: '3:33', hasBassTabs: false, hasGuitar: false },
            { title: 'Stick It Up Your Ass', duration: '2:45', hasBassTabs: false, hasGuitar: false },
            { title: 'Used to Be in Love', duration: '3:16', hasBassTabs: false, hasGuitar: true },
            { title: 'Squid Row', duration: '4:02', hasBassTabs: false, hasGuitar: false }
        ]
    },
    {
        id: 'corporate-whores',
        title: 'Corporate Whores',
        year: 1996,
        type: 'studio',
        era: 'middle',
        artwork: 'images/albums/corporate-whores.jpg',
        tracks: 12,
        bassTabs: 0,
        description: 'Anti-corporate punk anthems with their signature offensive humor.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Corporate Whores', duration: '3:12', hasBassTabs: false, hasGuitar: true },
            { title: 'Fucking Up', duration: '2:47', hasBassTabs: false, hasGuitar: false },
            { title: 'Taking Drugs', duration: '2:34', hasBassTabs: false, hasGuitar: false },
            { title: 'Pissed on Another Planet', duration: '3:21', hasBassTabs: false, hasGuitar: false },
            { title: 'Asshole', duration: '2:18', hasBassTabs: false, hasGuitar: false },
            { title: 'Parasite', duration: '2:56', hasBassTabs: false, hasGuitar: false },
            { title: 'Sick of the Lies', duration: '3:04', hasBassTabs: false, hasGuitar: false },
            { title: 'Wage Slave', duration: '2:41', hasBassTabs: false, hasGuitar: false },
            { title: 'Stupid Junkies', duration: '2:53', hasBassTabs: false, hasGuitar: false },
            { title: 'Get Away', duration: '3:17', hasBassTabs: false, hasGuitar: false },
            { title: 'Filthy Greedy Guilt', duration: '2:29', hasBassTabs: false, hasGuitar: false },
            { title: 'Kill Kill Kill', duration: '3:38', hasBassTabs: false, hasGuitar: false }
        ]
    },
    {
        id: 'death-race-2000',
        title: 'Death Race 2000',
        year: 1999,
        type: 'studio',
        era: 'late',
        artwork: 'images/albums/death-race-2000.jpg',
        tracks: 13,
        bassTabs: 0,
        description: 'Millennium-era fury with socially conscious punk anthems.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass',
        trackList: [
            { title: 'Death Race 2000', duration: '3:45', hasBassTabs: false, hasGuitar: false },
            { title: '1967', duration: '2:28', hasBassTabs: false, hasGuitar: true },
            { title: 'Courage in a Can', duration: '2:53', hasBassTabs: false, hasGuitar: true },
            { title: 'Scientology', duration: '3:17', hasBassTabs: false, hasGuitar: true },
            { title: 'Human Garbage Can', duration: '2:41', hasBassTabs: false, hasGuitar: false },
            { title: 'Flesh and Blood', duration: '3:02', hasBassTabs: false, hasGuitar: false },
            { title: 'Corpse Full of Shit', duration: '2:36', hasBassTabs: false, hasGuitar: false },
            { title: 'Prion', duration: '3:24', hasBassTabs: false, hasGuitar: false },
            { title: 'Death Machine', duration: '2:58', hasBassTabs: false, hasGuitar: false },
            { title: 'After the War', duration: '3:39', hasBassTabs: false, hasGuitar: false },
            { title: 'All Roads Lead to Rome', duration: '3:11', hasBassTabs: false, hasGuitar: false },
            { title: 'Another Bloody Sunday', duration: '2:47', hasBassTabs: false, hasGuitar: false },
            { title: 'Left Behind', duration: '4:12', hasBassTabs: false, hasGuitar: false }
        ]
    },
    {
        id: 'holy-shiite',
        title: 'Holy Shiite',
        year: 2004,
        type: 'studio',
        era: 'late',
        artwork: 'images/albums/holy-shiite.jpg',
        tracks: 14,
        bassTabs: 0,
        description: 'Post-9/11 political punk with renewed aggression and purpose.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Jesus Bonehead - Drums, Mike Jak - Bass, Willy Jak - Guitar',
        trackList: [
            { title: 'My Shit Stinks', duration: '2:45', hasBassTabs: false, hasGuitar: false },
            { title: 'Holy Shiite', duration: '3:12', hasBassTabs: false, hasGuitar: false },
            { title: 'Bombs Away', duration: '2:38', hasBassTabs: false, hasGuitar: false },
            { title: 'Your Poetry Sucks', duration: '2:17', hasBassTabs: false, hasGuitar: false },
            { title: 'Slumlord', duration: '3:24', hasBassTabs: false, hasGuitar: false },
            { title: 'Punk Rock Tried to Kill Me', duration: '2:53', hasBassTabs: false, hasGuitar: false },
            { title: 'Black Sabbath Sabbath', duration: '3:06', hasBassTabs: false, hasGuitar: false },
            { title: 'Pigs in Space', duration: '2:41', hasBassTabs: false, hasGuitar: false },
            { title: 'More Beer', duration: '2:28', hasBassTabs: false, hasGuitar: false },
            { title: 'Woke Up This Morning', duration: '3:15', hasBassTabs: false, hasGuitar: false },
            { title: 'Sick Boy', duration: '2:52', hasBassTabs: false, hasGuitar: false },
            { title: 'Sellout', duration: '3:31', hasBassTabs: false, hasGuitar: false },
            { title: 'The Legend of Bobby Bird', duration: '3:47', hasBassTabs: false, hasGuitar: false },
            { title: 'At Least I Tried', duration: '4:01', hasBassTabs: false, hasGuitar: false }
        ]
    },
    {
        id: 'armageddon-survival-guide',
        title: 'Armageddon Survival Guide',
        year: 2016,
        type: 'studio',
        era: 'modern',
        artwork: 'images/albums/armageddon-survival-guide.jpg',
        tracks: 13,
        bassTabs: 0,
        description: 'A return to form after 12 years, addressing modern societal collapse.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Blind Marc - Drums, Willy Jak - Bass, Matt Fiorito - Guitar',
        trackList: [
            { title: 'Armageddon Survival Guide', duration: '3:21', hasBassTabs: false, hasGuitar: false },
            { title: 'Aliens', duration: '2:47', hasBassTabs: false, hasGuitar: false },
            { title: 'Velcro Shoes', duration: '2:18', hasBassTabs: false, hasGuitar: false },
            { title: 'End of the World', duration: '3:04', hasBassTabs: false, hasGuitar: false },
            { title: 'Sick of the Lies', duration: '2:36', hasBassTabs: false, hasGuitar: false },
            { title: 'Marine Life', duration: '2:53', hasBassTabs: false, hasGuitar: false },
            { title: 'In Your Face', duration: '3:12', hasBassTabs: false, hasGuitar: false },
            { title: 'Left on the Shelf', duration: '2:41', hasBassTabs: false, hasGuitar: false },
            { title: 'Stay Away', duration: '2:29', hasBassTabs: false, hasGuitar: false },
            { title: 'Brave New World', duration: '3:38', hasBassTabs: false, hasGuitar: false },
            { title: 'Cockroaches', duration: '2:45', hasBassTabs: false, hasGuitar: false },
            { title: 'Outlaw', duration: '3:17', hasBassTabs: false, hasGuitar: false },
            { title: 'Worn Out', duration: '3:52', hasBassTabs: false, hasGuitar: false }
        ]
    },
    {
        id: 'hate-speech',
        title: 'Hate Speech',
        year: 2021,
        type: 'studio',
        era: 'modern',
        artwork: 'images/albums/hate-speech.jpg',
        tracks: 12,
        bassTabs: 0,
        description: 'Their latest full-length, continuing their tradition of provocative punk rock.',
        bandcampUrl: null,
        bandMembers: 'Murray Acton (The Cretin) - Guitar/Vocals, Blind Marc - Drums, Mike Jak - Guitar, Matt Fiorito - Guitar',
        trackList: [
            { title: 'Hate Speech', duration: '3:14', hasBassTabs: false, hasGuitar: false },
            { title: 'Cancel Culture', duration: '2:36', hasBassTabs: false, hasGuitar: false },
            { title: 'White Noise', duration: '2:48', hasBassTabs: false, hasGuitar: false },
            { title: 'Neighbourhood Watch', duration: '3:21', hasBassTabs: false, hasGuitar: false },
            { title: 'Covid-1984', duration: '2:53', hasBassTabs: false, hasGuitar: false },
            { title: 'Trigger Warning', duration: '2:17', hasBassTabs: false, hasGuitar: false },
            { title: 'Dead Internet Theory', duration: '3:04', hasBassTabs: false, hasGuitar: false },
            { title: 'Thought Police', duration: '2:42', hasBassTabs: false, hasGuitar: false },
            { title: 'Plastic World', duration: '2:38', hasBassTabs: false, hasGuitar: false },
            { title: 'Hashtag', duration: '3:19', hasBassTabs: false, hasGuitar: false },
            { title: 'Blackout', duration: '2:56', hasBassTabs: false, hasGuitar: false },
            { title: 'Fuck Off and Die', duration: '3:47', hasBassTabs: false, hasGuitar: false }
        ]
    }
];

// Singles data
// Singles data is loaded from singles.js

// Generate and append album cards
function generateAlbumCards(albumsToShow = albums) {
    const albumsGrid = document.querySelector('.albums-grid');
    if (!albumsGrid) return; // Exit if not on the main page
    albumsGrid.innerHTML = '';
    
    albumsToShow.forEach(album => {
        const card = document.createElement('a');
        card.href = `album.html?id=${album.id}`;
        card.className = 'album-card';
        card.innerHTML = `
            <div class="album-artwork">
                ${album.artwork ? 
                    `<img src="${album.artwork}" alt="${album.title}" loading="lazy">` :
                    `<div class="album-artwork-placeholder">${album.title}</div>`
                }
            </div>
            <div class="album-info">
                <div class="album-header">
                    <h3 class="album-title">${album.title}</h3>
                    ${album.type ? `<span class="type-badge ${album.type}">${album.type}</span>` : ''}
                </div>
                <p class="album-year">${album.year}</p>
                <div class="album-stats">
                    <span class="album-stat">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM3.5 8a.5.5 0 01.5-.5h4.5V3a.5.5 0 011 0v5h4.5a.5.5 0 010 1H9v4.5a.5.5 0 01-1 0V9H4a.5.5 0 01-.5-.5z"/>
                        </svg>
                        ${album.tracks} tracks
                    </span>
                    <span class="album-stat">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 2v6h8V6H4z"/>
                        </svg>
                        ${album.trackList ? album.trackList.filter(track => track.hasGuitar || track.hasBassTabs).length : 0} tabs
                    </span>
                </div>
                ${album.description ? `<p class="album-description">${album.description}</p>` : ''}
            </div>
        `;
        albumsGrid.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Generate album cards
    generateAlbumCards();
    
    
    // Update stats in header if present
    const totalTracks = albums.reduce((sum, album) => sum + album.tracks, 0);
    const totalTabs = albums.reduce((sum, album) => {
        const guitarTabs = album.trackList ? album.trackList.filter(track => track.hasGuitar).length : 0;
        return sum + guitarTabs;
    }, 0);
    
    // You could update header stats here if needed
    console.log(`Total tracks: ${totalTracks}, Total tabs: ${totalTabs}`);
});