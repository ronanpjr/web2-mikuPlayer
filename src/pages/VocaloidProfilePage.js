import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SongIcon from '../components/SongIcon';

const VocaloidProfilePage = () => {
    const { vocaloidId } = useParams();
    const navigate = useNavigate();
    const [isLightMode, setIsLightMode] = useState(false);

    // Vocaloid character data
    const vocaloidData = {
        miku: {
            id: 'miku',
            name: 'Hatsune Miku',
            nameJp: '初音ミク',
            cv: 'Saki Fujita',
            color: '#00DDC0',
            colorRgb: '0 221 192',
            age: '16',
            height: '158cm',
            birthday: 'August 31',
            description: 'The world\'s most famous virtual idol and pop sensation. With her iconic teal twin-tails and energetic performances, Miku has inspired millions of songs and performances worldwide.',
            personality: 'とても内気で、自分に自信がない少女。ある日、偶然通りがかったライブカフェ&バーで杏とミュージシャンがセッションしているのを目撃。',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['World is Mine', 'Echo', 'Ghost Rule', 'PPPP'],
            voiceBank: 'Crypton Future Media',
            debut: '2007',
            likes: 'Singing, Leeks, Making new songs',
            specialty: 'High energy pop and electronic music'
        },
        luka: {
            id: 'luka',
            name: 'Megurine Luka',
            nameJp: '巡音ルカ',
            cv: 'Yuu Asakawa',
            color: '#F641B4',
            colorRgb: '246 65 180',
            age: '20',
            height: '162cm',
            birthday: 'January 30',
            description: 'A mature and sophisticated vocalist with a calm presence. Luka is bilingual in Japanese and English, known for her smooth, soulful voice.',
            personality: 'Elegant and composed, Luka brings a mature sophistication to every performance. She has a gentle demeanor but powerful stage presence.',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['Just Be Friends', 'Luka Luka Night Fever'],
            voiceBank: 'Crypton Future Media',
            debut: '2009',
            likes: 'Wine, Jazz music, Cooking',
            specialty: 'Bilingual singing, Emotional ballads'
        },
        rinlen: {
            id: 'rinlen',
            name: 'Kagamine Rin & Len',
            nameJp: '鏡音リン・レン',
            cv: 'Asami Shimoda',
            color: '#F1C40F',
            colorRgb: '241 196 15',
            age: '14',
            height: '152cm',
            birthday: 'December 27',
            description: 'Energetic mirror twins with vibrant personalities. Rin and Len are known for their powerful harmonies and dynamic performances.',
            personality: 'Playful and energetic, these twins complement each other perfectly. Rin is bold and outgoing, while Len is cool and reserved.',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['Remote Control', '劣等上等'],
            voiceBank: 'Crypton Future Media',
            debut: '2007',
            likes: 'Oranges, Road rollers, Performing together',
            specialty: 'Twin harmonies, Rock and electronic'
        },
        gumi: {
            id: 'gumi',
            name: 'GUMI',
            nameJp: 'グミ',
            cv: 'Megumi Nakajima',
            color: '#45B39D',
            colorRgb: '69 179 157',
            age: '15',
            height: '157cm',
            birthday: 'June 26',
            description: 'A versatile vocalist with a sweet, expressive voice. GUMI is known for her wide vocal range and ability to sing various genres.',
            personality: 'Sweet and cheerful, GUMI has an infectious energy that shines through her performances. She\'s friendly and approachable.',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['Copycat', 'Echo'],
            voiceBank: 'Internet Co., Ltd.',
            debut: '2009',
            likes: 'Vegetables, Nature, Cute things',
            specialty: 'Versatile genres, Sweet vocals'
        },
        teto: {
            id: 'teto',
            name: 'Kasane Teto',
            nameJp: '重音テト',
            cv: 'Mayo Oyamano',
            color: '#E74C3C',
            colorRgb: '231 76 60',
            age: '31 (Chimera)',
            height: '159.5cm',
            birthday: 'April 1',
            description: 'Originally an April Fools\' joke, Teto became a beloved UTAU character. A 31-year-old chimera with distinctive twin drills.',
            personality: 'Despite her age, Teto has a youthful spirit. She started as a joke but became a symbol of community-driven creativity.',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['Yoshiwara Lament'],
            voiceBank: 'UTAU/SynthV',
            debut: '2008',
            likes: 'Bread (French bread), Singing',
            specialty: 'Powerful vocals, Traditional Japanese songs'
        },
        kaito: {
            id: 'kaito',
            name: 'KAITO',
            nameJp: 'カイト',
            cv: 'Naoto Fūga',
            color: '#3498DB',
            colorRgb: '52 152 219',
            age: '20',
            height: '176cm',
            birthday: 'February 17',
            description: 'A blue-haired gentleman with a smooth, deep voice. One of the original Vocaloids and a certified ice cream enthusiast.',
            personality: 'Cool and collected on the outside, but has a warm heart. Known for his love of ice cream and his gentle demeanor.',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
            songs: ['ギガンティックO.T.N', 'BIRDBRAIN'],
            voiceBank: 'Crypton Future Media',
            debut: '2006',
            likes: 'Ice cream, Snow, Singing ballads',
            specialty: 'Deep vocals, Emotional performances'
        }
    };

    // Full playlist
    const playlist = [
        { title: "World is Mine", artist: "ryo (supercell)", index: 0 },
        { title: "Echo", artist: "Crusher-P", index: 1 },
        { title: "Remote Control", artist: "Jesus-P", index: 2 },
        { title: "Just Be Friends", artist: "Dixie Flatline", index: 3 },
        { title: "Yoshiwara Lament", artist: "Asa-P", index: 4 },
        { title: "Ghost Rule", artist: "DECO*27", index: 5 },
        { title: "Luka Luka Night Fever", artist: "ryo (supercell)", index: 6 },
        { title: "PPPP", artist: "Tak", index: 7 },
        { title: "BIRDBRAIN", artist: "JamieP", index: 8 },
        { title: "Copycat", artist: "Circus-P", index: 9 },
        { title: "劣等上等", artist: "GIGA", index: 10 },
        { title: "ギガンティックO.T.N", artist: "GIGA", index: 11 }
    ];

    const vocaloid = vocaloidData[vocaloidId];

    // Initialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        let initialLight = false;
        if (savedTheme) {
            initialLight = savedTheme === 'light';
        } else {
            initialLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        }
        setIsLightMode(initialLight);
        document.body.classList.toggle('light', initialLight);
    }, []);

    // Set CSS variable for character color
    useEffect(() => {
        if (vocaloid) {
            document.documentElement.style.setProperty('--vocaloid-color', vocaloid.color);
            document.documentElement.style.setProperty('--vocaloid-color-rgb', vocaloid.colorRgb);
        }
    }, [vocaloid]);

    const handleSongClick = (songTitle) => {
        const song = playlist.find(s => s.title === songTitle);
        if (song) {
            navigate(`/player?song=${song.index}`);
        }
    };

    if (!vocaloid) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Vocaloid not found</h2>
                    <Link to="/vocaloids" className="text-primary hover:underline">
                        Return to Vocaloids Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="text-foreground transition-colors duration-300 ease-in- overflow-hidden min-h-screen">
            <div id="background-overlay"></div>

            <main className="relative z-10 min-h-screen">
                <Header
                    isLightMode={isLightMode}
                    onToggleTheme={() => {
                        const newMode = !isLightMode;
                        setIsLightMode(newMode);
                        document.body.classList.toggle('light', newMode);
                        localStorage.setItem('theme', newMode ? 'light' : 'dark');
                    }}
                    showVocaloidsLink={true}
                    showPlayerLink={true}
                />

                {/* Profile Content */}
                <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
                        {/* Left: Character Image with Round Style */}
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                {/* Circular gradient background */}
                                <div
                                    className="absolute inset-0 rounded-full blur-3xl opacity-30"
                                    style={{
                                        background: `radial-gradient(circle, ${vocaloid.color}, transparent 70%)`,
                                        transform: 'scale(1.2)'
                                    }}
                                ></div>

                                {/* Character circle */}
                                <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-8 shadow-2xl animate-in zoom-in duration-500"
                                    style={{ borderColor: vocaloid.color }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-20"
                                        style={{
                                            background: `linear-gradient(135deg, ${vocaloid.color}, transparent)`
                                        }}
                                    ></div>
                                    <img
                                        src={vocaloid.image}
                                        alt={vocaloid.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Decorative elements */}
                                <div
                                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-50 blur-xl"
                                    style={{ backgroundColor: vocaloid.color }}
                                ></div>
                                <div
                                    className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-40 blur-xl"
                                    style={{ backgroundColor: vocaloid.color }}
                                ></div>
                            </div>
                        </div>

                        {/* Right: Profile Info */}
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500 delay-200">
                            {/* Name Header */}
                            <div>
                                <h2
                                    className="text-6xl font-black mb-2"
                                    style={{ color: vocaloid.color }}
                                >
                                    {vocaloid.nameJp}
                                </h2>
                                <p className="text-3xl font-bold text-muted-foreground uppercase tracking-wider">
                                    {vocaloid.name}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">CV: {vocaloid.cv}</p>
                            </div>

                            {/* Profile Card */}
                            <div className="player-card-glass border border-white/10 rounded-3xl p-8 space-y-6">
                                {/* Basic Info Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 rounded-xl p-3 text-center">
                                        <p className="text-xs text-muted-foreground mb-1">Gender</p>
                                        <p className="font-bold">Female</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 text-center">
                                        <p className="text-xs text-muted-foreground mb-1">Birthday</p>
                                        <p className="font-bold text-sm">{vocaloid.birthday}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 text-center">
                                        <p className="text-xs text-muted-foreground mb-1">Height</p>
                                        <p className="font-bold">{vocaloid.height}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-xs text-muted-foreground mb-1">School/Age</p>
                                        <p className="font-medium">{vocaloid.age}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-xs text-muted-foreground mb-1">Voice Bank</p>
                                        <p className="font-medium text-sm">{vocaloid.voiceBank}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                        About
                                    </h3>
                                    <p className="text-sm leading-relaxed">
                                        {vocaloid.description}
                                    </p>
                                </div>

                                {/* Personality */}
                                <div>
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                        Personality
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {vocaloid.personality}
                                    </p>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Likes</p>
                                        <p className="text-sm font-medium">{vocaloid.likes}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Specialty</p>
                                        <p className="text-sm font-medium">{vocaloid.specialty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Songs Section */}
                            <div className="player-card-glass border border-white/10 rounded-3xl p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ color: vocaloid.color }}
                                    >
                                        <path d="M9 18V5l12-2v13" />
                                        <circle cx="6" cy="18" r="3" />
                                        <circle cx="18" cy="16" r="3" />
                                    </svg>
                                    Featured Songs
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {vocaloid.songs.map((songTitle) => {
                                        const song = playlist.find(s => s.title === songTitle);
                                        if (!song) return null;
                                        return (
                                            <SongIcon
                                                key={songTitle}
                                                song={song}
                                                onClick={() => handleSongClick(songTitle)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VocaloidProfilePage;
