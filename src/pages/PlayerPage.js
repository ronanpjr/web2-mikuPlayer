import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Lyrics from '../components/Lyrics';
import Header from '../components/Header';
import PlayerControls from '../components/PlayerControls';
import ActionButton from '../components/ActionButton';
import SongIcon from '../components/SongIcon';

const PlayerPage = () => {
    // Playlist data from player.js
    const playlist = React.useMemo(() => [
        {
            title: "World is Mine", artist: "ryo (supercell)",
            src: "/songs/world.mp3",
            art: "/assets/images/world_is_mine.png",
            theme: {
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8'] }
            }
        },
        {
            title: "Echo", artist: "Crusher-P",
            src: "/songs/echo.mp3",
            art: "/assets/images/echo.png",
            theme: {
                primary: '69 179 157', secondary: '46 204 113', triangles: ['#45b39d', '#2ecc71', '#f1c40f'],
                light: { primary: '39 174 96', secondary: '22 160 133', triangles: ['#27ae60', '#16a085', '#fde68a'] }
            }
        },
        {
            title: "Remote Control", artist: "Jesus-P",
            src: "https://ia801308.us.archive.org/29/items/KagamineRinLenRemoteControl/Kagamine%20Rin%20%26%20Len%20-%20Remote%20Control.mp3",
            art: "/assets/images/remote_control.png",
            theme: {
                primary: '241 196 15', secondary: '247 220 111', triangles: ['#f1c40f', '#f7dc6f', '#3498db'],
                light: { primary: '243 156 18', secondary: '230 126 34', triangles: ['#f39c12', '#e67e22', '#93c5fd'] }
            }
        },
        {
            title: "Just Be Friends", artist: "Dixie Flatline",
            src: "https://ia600205.us.archive.org/10/items/JustBeFriends/Luka-JustBeFriends.mp3",
            art: "/assets/images/just_be_friends.png",
            theme: {
                primary: '229 57 171', secondary: '244 161 216', triangles: ['#e539ab', '#f4a1d8', '#8e44ad'],
                light: { primary: '216 27 96', secondary: '194 24 91', triangles: ['#d81b60', '#c2185b', '#c084fc'] }
            }
        },
        {
            title: "Yoshiwara Lament", artist: "Asa-P",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "/assets/images/yoshiwara_lament.png",
            theme: {
                primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'],
                light: { primary: '231 76 60', secondary: '192 57 43', triangles: ['#e74c3c', '#c0392b', '#fde68a'] }
            }
        },
        {
            title: "Ghost Rule", artist: "DECO*27",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "/assets/images/ghost_rule.png",
            theme: {
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8'] }
            }
        },
        {
            title: "Luka Luka Night Fever", artist: "ryo (supercell)",
            src: "https://ia800905.us.archive.org/9/items/Vocaloid-worldIsMine/Vocaloid-worldIsMine.mp3",
            art: "/assets/images/luka_night.png",
            theme: {
                primary: '229 57 171', secondary: '244 161 216', triangles: ['#e539ab', '#f4a1d8', '#8e44ad'],
                light: { primary: '216 27 96', secondary: '194 24 91', triangles: ['#d81b60', '#c2185b', '#c084fc'] }
            }
        },
        {
            title: "PPPP", artist: "Tak",
            src: "/songs/pppp.mp3",
            art: "/assets/images/PPPP.png",
            theme: {
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8'] }
            }
        },
        {
            title: "BIRDBRAIN", artist: "JamieP",
            src: "/songs/birdbrain.mp3",
            art: "/assets/images/birdbrain.png",
            theme: {
                primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'],
                light: { primary: '231 76 60', secondary: '192 57 43', triangles: ['#e74c3c', '#c0392b', '#fde68a'] }
            }
        },
        {
            title: "Copycat", artist: "Circus-P",
            src: "https://ia600205.us.archive.org/10/items/JustBeFriends/Luka-JustBeFriends.mp3",
            art: "/assets/images/copycat.png",
            theme: {
                primary: '69 179 157', secondary: '46 204 113', triangles: ['#45b39d', '#2ecc71', '#f1c40f'],
                light: { primary: '39 174 96', secondary: '22 160 133', triangles: ['#27ae60', '#16a085', '#fde68a'] }
            }
        },
        {
            title: "劣等上等", artist: "GIGA",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "/assets/images/rettou.png",
            theme: {
                primary: '241 196 15', secondary: '247 220 111', triangles: ['#f1c40f', '#f7dc6f', '#3498db'],
                light: { primary: '243 156 18', secondary: '230 126 34', triangles: ['#f39c12', '#e67e22', '#93c5fd'] }
            }
        },
        {
            title: "ギガンティックO.T.N", artist: "GIGA",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "/assets/images/otn.png",
            theme: {
                primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'],
                light: { primary: '231 76 60', secondary: '192 57 43', triangles: ['#e74c3c', '#c0392b', '#fde68a'] }
            }
        }
    ], []);

    // State
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [selectedSongsForNew, setSelectedSongsForNew] = useState(new Set());
    const [activePlaylistId, setActivePlaylistId] = useState(null); // null = master playlist

    // Compute active queue
    const activeQueue = React.useMemo(() => {
        if (!activePlaylistId) return playlist;
        const userPl = userPlaylists.find(pl => pl.id.toString() === activePlaylistId.toString());
        return userPl ? userPl.songs : playlist;
    }, [activePlaylistId, userPlaylists, playlist]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const [showLyrics, setShowLyrics] = useState(false);
    const [showFullScreenLyrics, setShowFullScreenLyrics] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // Stats State
    const [showStats, setShowStats] = useState(false);
    const [userStats, setUserStats] = useState(() => {
        const saved = localStorage.getItem('miku_player_stats');
        return saved ? JSON.parse(saved) : { totalPlays: 0, songs: {}, artists: {} };
    });

    // Save stats on change
    useEffect(() => {
        localStorage.setItem('miku_player_stats', JSON.stringify(userStats));
    }, [userStats]);

    // Track play function
    const trackPlay = (song) => {
        setUserStats(prev => {
            const newStats = { ...prev };
            newStats.totalPlays += 1;
            newStats.songs[song.title] = (newStats.songs[song.title] || 0) + 1;
            newStats.artists[song.artist] = (newStats.artists[song.artist] || 0) + 1;
            return newStats;
        });
    };

    // Theme Config State
    const [themeMode, setThemeMode] = useState('auto'); // 'auto' | 'manual'
    const [manualTheme, setManualTheme] = useState(null); // { primary, secondary }

    // Check for shared song in URL
    useEffect(() => {
        const songIndexParam = searchParams.get('song');
        if (songIndexParam !== null) {
            const index = parseInt(songIndexParam, 10);
            if (!isNaN(index) && index >= 0 && index < playlist.length) {
                setActivePlaylistId(null); // Ensure we use the main playlist
                setCurrentSongIndex(index);
                // Optional: Auto-play when shared link is opened
                // setIsPlaying(true); 
            }
        }
    }, [searchParams, playlist]);

    const handleShare = () => {
        // Find current song in the main playlist to get the correct global index
        const currentSongObj = activeQueue[currentSongIndex];
        const globalIndex = playlist.findIndex(s => s.title === currentSongObj.title); // Using title as unique identifier is safer than index if activeQueue is different

        if (globalIndex !== -1) {
            const url = `${window.location.origin}${window.location.pathname}?song=${globalIndex}`;
            navigator.clipboard.writeText(url).then(() => {
                alert(`Link copiado para a área de transferência: ${url}`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    // Note: Playlist Creation State moved up to use in activeQueue memo

    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const triangleColorsRef = useRef(['#32CDFF', '#87ceeb', '#ff69b4']); // Default

    // Equalizer State & Refs
    const [showSettings, setShowSettings] = useState(false);
    const [eqBands, setEqBands] = useState([0, 0, 0, 0, 0]); // 60, 250, 1k, 4k, 12k
    const audioContextRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const filtersRef = useRef([]);
    const isAudioContextInitialized = useRef(false);

    // Initialize Audio Context
    const initAudioContext = () => {
        if (isAudioContextInitialized.current || !audioRef.current) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            const source = ctx.createMediaElementSource(audioRef.current);
            sourceNodeRef.current = source;

            // Create Filters
            const frequencies = [60, 250, 1000, 4000, 12000];
            const filters = frequencies.map(freq => {
                const filter = ctx.createBiquadFilter();
                filter.type = 'peaking';
                filter.frequency.value = freq;
                filter.Q.value = 1;
                filter.gain.value = 0;
                return filter;
            });
            filtersRef.current = filters;

            // Connect Chain: Source -> F1 -> F2 -> ... -> F5 -> Destination
            source.connect(filters[0]);
            for (let i = 0; i < filters.length - 1; i++) {
                filters[i].connect(filters[i + 1]);
            }
            filters[filters.length - 1].connect(ctx.destination);

            isAudioContextInitialized.current = true;
        } catch (e) {
            console.error("Audio Context Init Failed (likely CORS or already init)", e);
        }
    };

    // Handle EQ Change
    const handleEqChange = (index, value) => {
        const newBands = [...eqBands];
        newBands[index] = parseFloat(value);
        setEqBands(newBands);

        if (filtersRef.current[index]) {
            filtersRef.current[index].gain.value = parseFloat(value);
        }
    };

    // Apply Presets
    const applyPreset = (type) => {
        let values = [0, 0, 0, 0, 0];
        switch (type) {
            case 'bass': values = [8, 5, 0, -2, -3]; break;
            case 'vocal': values = [-2, -2, 4, 2, -1]; break;
            case 'treble': values = [-3, -2, 0, 5, 8]; break;
            default: values = [0, 0, 0, 0, 0]; // Flat
        }
        setEqBands(values);
        values.forEach((v, i) => {
            if (filtersRef.current[i]) filtersRef.current[i].gain.value = v;
        });
    };

    // Ensure AudioContext is resumed handling user gesture
    useEffect(() => {
        const resumeAudio = () => {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            if (!isAudioContextInitialized.current) {
                initAudioContext();
            }
        };
        document.addEventListener('click', resumeAudio);
        return () => document.removeEventListener('click', resumeAudio);
    }, []);

    // Handle Volume Change
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Load playlists from local storage
    useEffect(() => {
        const savedPlaylists = localStorage.getItem('userPlaylists');
        if (savedPlaylists) {
            try {
                const parsed = JSON.parse(savedPlaylists);
                setUserPlaylists(parsed);
            } catch (e) {
                console.error("Failed to parse playlists", e);
            }
        }
    }, []);

    // Save playlists to local storage
    useEffect(() => {
        localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    }, [userPlaylists]);

    // Format time helper
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return minutes + ':' + (secs < 10 ? '0' : '') + secs;
    };

    // Initialize Theme
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

    // Helper to set CSS variables based on theme/song
    const updateThemeVars = React.useCallback((song, lightMode, currentThemeMode, currentManualTheme) => {
        // Determine which theme to use
        let themeToUse;
        if (currentThemeMode === 'manual' && currentManualTheme) {
            themeToUse = currentManualTheme;
        } else {
            themeToUse = song.theme;
        }

        const currentThemePalette = lightMode && themeToUse.light ? themeToUse.light : themeToUse;

        // Safety check for properties
        if (currentThemePalette) {
            document.documentElement.style.setProperty('--color-primary', currentThemePalette.primary);
            document.documentElement.style.setProperty('--color-secondary', currentThemePalette.secondary);

            // Update triangles colors for canvas
            if (currentThemePalette.triangles) {
                triangleColorsRef.current = currentThemePalette.triangles;
            } else if (themeToUse.triangles) {
                triangleColorsRef.current = themeToUse.triangles;
            } else {
                // Fallback generation from primary color if manual has no triangles defined
                triangleColorsRef.current = ['#ffffff', '#ffffff', '#ffffff']; // Logic could be better but sufficient for now
            }
        }
    }, []);

    // Update theme when light mode or song changes or configuration changes
    useEffect(() => {
        if (activeQueue[currentSongIndex]) {
            updateThemeVars(activeQueue[currentSongIndex], isLightMode, themeMode, manualTheme);
        }
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        document.body.classList.toggle('light', isLightMode);
    }, [currentSongIndex, isLightMode, activeQueue, updateThemeVars, themeMode, manualTheme]);

    // Handle Theme Presets
    const handleThemePreset = (preset) => {
        if (preset === 'auto') {
            setThemeMode('auto');
            setManualTheme(null);
        } else {
            setThemeMode('manual');
            const presets = {
                miku: { primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'] },
                luka: { primary: '229 57 171', secondary: '244 161 216', triangles: ['#e539ab', '#f4a1d8', '#8e44ad'] },
                rin: { primary: '241 196 15', secondary: '247 220 111', triangles: ['#f1c40f', '#f7dc6f', '#3498db'] },
                gumi: { primary: '69 179 157', secondary: '46 204 113', triangles: ['#45b39d', '#2ecc71', '#f1c40f'] },
                meiko: { primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'] }
            };
            setManualTheme(presets[preset]);
        }
    };

    // Handle Active Queue Change (Reset index if out of bounds or on switch)
    useEffect(() => {
        if (currentSongIndex >= activeQueue.length) {
            setCurrentSongIndex(0);
        }
    }, [activeQueue, currentSongIndex]);

    // Handle Song Change
    const nextSong = React.useCallback(() => {
        // Track play if current song is ending naturally (this is called by onEnded)
        if (activeQueue[currentSongIndex]) {
            trackPlay(activeQueue[currentSongIndex]);
        }
        setCurrentSongIndex(prev => (prev + 1) % activeQueue.length);
    }, [activeQueue, currentSongIndex]);

    const prevSong = React.useCallback(() => {
        setCurrentSongIndex(prev => (prev - 1 + activeQueue.length) % activeQueue.length);
    }, [activeQueue.length]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(error => {
                console.log("Play error", error);
            });
        }
    }, [currentSongIndex, isPlaying]);

    // Handle Play/Pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && audio.paused) {
            audio.play().catch(error => {
                console.log("Toggle play aborted", error);
            });
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying]);

    const handleProgressChange = (e) => {
        if (!audioRef.current) return;
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleLyricClick = (time) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    // Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Triangle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 20 + 10;
                this.color = triangleColorsRef.current[Math.floor(Math.random() * triangleColorsRef.current.length)];
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.rotationSpeed;

                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                ctx.moveTo(0, -this.size / 1.5);
                ctx.lineTo(-this.size / 1.5, this.size / 1.5);
                ctx.lineTo(this.size / 1.5, this.size / 1.5);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.5;
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize triangles
        let triangles = [];
        for (let i = 0; i < 50; i++) triangles.push(new Triangle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            triangles.forEach(triangle => {
                triangle.update();
                triangle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const currentSong = activeQueue[currentSongIndex] || playlist[0];

    return (
        <div className="text-foreground transition-colors duration-300 ease-in-out">
            <div id="background-overlay"></div>
            <canvas id="bg-canvas" ref={canvasRef}></canvas>
            <audio
                ref={audioRef}
                src={currentSong.src}
                crossOrigin="anonymous"
                preload="auto"
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onEnded={nextSong}
                onError={(e) => console.error("Audio error", e)}
            />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
                <Header
                    isLightMode={isLightMode}
                    onToggleTheme={() => setIsLightMode(!isLightMode)}
                    showVocaloidsLink={true}
                    showSettingsButton={true}
                    onSettingsClick={() => { setShowSettings(true); setShowPlaylist(false); setShowLyrics(false); }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="player-card-glass border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl">
                                    <img src={currentSong.art} alt="Now Playing" className="w-full h-full object-cover transition-opacity duration-300" />
                                </div>

                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-1 transition-opacity duration-300">{currentSong.title}</h3>
                                        <p className="text-muted-foreground transition-opacity duration-300">{currentSong.artist}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={duration ? (currentTime / duration) * 100 : 0}
                                            onChange={handleProgressChange}
                                            id="music-progress"
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>



                                    <PlayerControls
                                        isPlaying={isPlaying}
                                        onPlayPause={() => setIsPlaying(!isPlaying)}
                                        onPrev={prevSong}
                                        onNext={nextSong}
                                        volume={volume}
                                        onVolumeChange={setVolume}
                                        showVolume={showVolume}
                                        onToggleVolume={() => setShowVolume(!showVolume)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Ações</h2>
                            <div className="grid grid-cols-5 gap-4">
                                <button id="playlist-toggle" onClick={() => setShowPlaylist(!showPlaylist)} className="flex flex-col items-center justify-center gap-2 group">
                                    <div className="folder-icon"></div>
                                    <span className="text-xs text-muted-foreground group-hover:text-foreground">Minhas favoritas</span>
                                </button>

                                <ActionButton
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M5 12h14" /><path d="M12 5v14" /></svg>}
                                    label="Adicionar"
                                    onClick={() => setShowCreatePlaylistModal(true)}
                                />

                                <ActionButton
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>}
                                    label="Compartilhar"
                                    onClick={handleShare}
                                />

                                <ActionButton
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                                    label="Perfil"
                                    onClick={() => setShowStats(true)}
                                />

                                <ActionButton
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 group-hover:text-foreground"><path d="M12 6.52c.82-.9 2.05-1.52 3.5-1.52 2.76 0 5 2.24 5 5 0 3.15-2.5 5.5-5 5.5-1.45 0-2.68-.62-3.5-1.52-.82.9-2.05 1.52-3.5 1.52-2.76 0-5-2.24-5-5 0-3.15 2.5-5.5 5-5.5 1.45 0 2.68.62 3.5 1.52z" /><path d="m12 12.5-2.5 3" /><path d="m14.5 15.5 2.5-3" /></svg>}
                                    label="Letras"
                                    onClick={() => { setShowLyrics(!showLyrics); setShowPlaylist(false); }}
                                    isActive={showLyrics}
                                />
                            </div>
                        </section>


                        <section id="playlist-grid" className={`${showPlaylist ? '' : 'hidden'} transition-opacity duration-300`} style={{ opacity: showPlaylist ? 1 : 0 }}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">
                                    {activePlaylistId ? userPlaylists.find(p => p.id.toString() === activePlaylistId.toString())?.title : "Minhas favoritas"}
                                </h2>
                                <select
                                    className="bg-white/10 border border-white/10 rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={activePlaylistId || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setActivePlaylistId(val === "" ? null : val);
                                        setCurrentSongIndex(0);
                                        setIsPlaying(false);
                                    }}
                                >
                                    <option value="" className="bg-zinc-900">Todas as Músicas</option>
                                    {userPlaylists.map(pl => (
                                        <option key={pl.id} value={pl.id} className="bg-zinc-900">{pl.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-2">
                                {activeQueue.map((song, index) => (
                                    <SongIcon
                                        key={index}
                                        song={song}
                                        isActive={currentSongIndex === index}
                                        onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); setShowPlaylist(false); }}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Lyrics Section */}
                        {showLyrics && (
                            <section className="animate-in fade-in zoom-in duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold">Letras</h2>
                                    <button
                                        onClick={() => setShowFullScreenLyrics(true)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-primary"
                                        title="Expandir (Full Screen)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" x2="14" y1="3" y2="10" /><line x1="3" x2="10" y1="21" y2="14" /></svg>
                                    </button>
                                </div>
                                <div className="player-card-glass border border-white/10 rounded-3xl p-6 shadow-2xl h-[500px]">
                                    <Lyrics
                                        song={currentSong}
                                        currentTime={currentTime}
                                        duration={duration}
                                        onLyricClick={handleLyricClick}
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                </div >

                {/* Create Playlist Modal */}
                {showCreatePlaylistModal && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in overflow-hidden"
                        onClick={() => {
                            setShowCreatePlaylistModal(false);
                            setNewPlaylistName("");
                            setSelectedSongsForNew(new Set());
                        }}
                    >
                        <div
                            className="player-card-glass w-full max-w-lg border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                                <h2 className="text-2xl font-bold text-center">Criar Nova Playlist</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Nome da Playlist</label>
                                        <input
                                            type="text"
                                            value={newPlaylistName}
                                            onChange={(e) => setNewPlaylistName(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                                            placeholder="Minha Playlist..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Selecionar Músicas</label>
                                        <div className="h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                            {playlist.map((song, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => {
                                                        const newSet = new Set(selectedSongsForNew);
                                                        if (newSet.has(idx)) newSet.delete(idx);
                                                        else newSet.add(idx);
                                                        setSelectedSongsForNew(newSet);
                                                    }}
                                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedSongsForNew.has(idx) ? 'bg-primary/20 border-primary/30' : 'bg-white/5 hover:bg-white/10 border-transparent'} border`}
                                                >
                                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedSongsForNew.has(idx) ? 'bg-primary border-primary' : 'border-white/30'}`}>
                                                        {selectedSongsForNew.has(idx) && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12" /></svg>}
                                                    </div>
                                                    <img src={song.art} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium truncate">{song.title}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => {
                                            setShowCreatePlaylistModal(false);
                                            setNewPlaylistName("");
                                            setSelectedSongsForNew(new Set());
                                        }}
                                        className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!newPlaylistName.trim()) return;

                                            const songList = Array.from(selectedSongsForNew).map(idx => playlist[idx]);
                                            if (songList.length === 0) return;

                                            const newPlaylist = {
                                                id: Date.now(),
                                                title: newPlaylistName,
                                                songs: songList
                                            };

                                            setUserPlaylists([...userPlaylists, newPlaylist]);
                                            setShowCreatePlaylistModal(false);
                                            setNewPlaylistName("");
                                            setSelectedSongsForNew(new Set());
                                        }}
                                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                                    >
                                        Criar Playlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings / Equalizer Modal */}
                {showSettings && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden"
                        onClick={() => setShowSettings(false)}
                    >
                        <div
                            className="player-card-glass w-full max-w-2xl border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] flex flex-col relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Configurações</h2>
                                    <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                {/* --- Appearance Section --- */}
                                <section className="space-y-4">
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1">Aparência</h3>

                                    <div className="bg-white/5 rounded-2xl p-2 flex gap-2 border border-white/5">
                                        <button
                                            onClick={() => setIsLightMode(false)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${!isLightMode ? 'bg-white/10 shadow-lg text-white' : 'hover:bg-white/5 text-muted-foreground'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                            <span className="font-medium">Dark</span>
                                        </button>
                                        <button
                                            onClick={() => setIsLightMode(true)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${isLightMode ? 'bg-white shadow-lg text-black' : 'hover:bg-white/5 text-muted-foreground'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                            <span className="font-medium">Light</span>
                                        </button>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <label className="text-xs font-medium text-muted-foreground ml-1">Cores do Tema</label>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleThemePreset('auto')}
                                                className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all ${themeMode === 'auto' ? 'border-primary ring-2 ring-primary/30 scale-110' : 'border-white/10 hover:border-white/30'}`}
                                                title="Auto (Song Color)"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={themeMode === 'auto' ? 'text-primary' : 'text-muted-foreground'}><path d="M12 12c-2-2.33-3-3.5-3-5a3 3 0 0 1 6 0c0 1.5-1 2.67-3 5Z" /><path d="m12 12 4 10-4-2-4 2 4-10Z" /></svg>
                                            </button>

                                            {[
                                                { id: 'miku', color: '#32CDFF' },
                                                { id: 'luka', color: '#e539ab' },
                                                { id: 'rin', color: '#f1c40f' },
                                                { id: 'gumi', color: '#45b39d' },
                                                { id: 'meiko', color: '#c0392b' }
                                            ].map(swatch => (
                                                <button
                                                    key={swatch.id}
                                                    onClick={() => handleThemePreset(swatch.id)}
                                                    className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center ${themeMode === 'manual' && manualTheme && manualTheme.primary.includes(swatch.color.replace('#', '').substring(0, 2)) ? 'ring-2 ring-white/50 scale-110' : 'border-transparent hover:scale-110'}`}
                                                    style={{ backgroundColor: swatch.color, borderColor: 'transparent' }}
                                                >
                                                    {/* Simple styling for now */}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* --- Audio Section --- */}
                                <section className="space-y-4 pt-4 border-t border-white/10">
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1">Áudio</h3>
                                    <div className="grid grid-cols-5 gap-4 h-64 items-end justify-items-center px-4">
                                        {['60Hz', '250Hz', '1kHz', '4kHz', '12kHz'].map((label, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-4 h-full w-full">
                                                <div className="relative h-full w-full flex justify-center py-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                                                    <input
                                                        type="range"
                                                        min="-12"
                                                        max="12"
                                                        step="0.1"
                                                        value={eqBands[idx]}
                                                        onChange={(e) => handleEqChange(idx, e.target.value)}
                                                        className="vertical-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        title={`${label}: ${eqBands[idx]}dB`}
                                                    />
                                                    {/* Custom Visual Slider Track */}
                                                    <div className="w-1.5 h-full bg-white/10 rounded-full relative overflow-hidden pointer-events-none">
                                                        <div
                                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-secondary transition-all duration-100 ease-out"
                                                            style={{ height: `${((eqBands[idx] + 12) / 24) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    {/* Thumb Indicator */}
                                                    <div
                                                        className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-primary pointer-events-none transition-all duration-100 ease-out flex items-center justify-center translate-y-2.5" // translate-y to center
                                                        style={{ bottom: `${((eqBands[idx] + 12) / 24) * 100}%`, marginBottom: '-12px' }}
                                                    >
                                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                                                <span className="text-xs font-bold font-mono">{eqBands[idx] > 0 ? `+${eqBands[idx].toFixed(0)}` : eqBands[idx].toFixed(0)}dB</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 justify-center pt-4">
                                        {[
                                            { id: 'flat', label: 'Flat', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /></svg> },
                                            { id: 'bass', label: 'Bass Boost', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M6 16V4" /><path d="M10 16v-4" /><path d="M14 16v-8" /><path d="M18 16v-2" /></svg> },
                                            { id: 'vocal', label: 'Vocal', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg> },
                                            { id: 'treble', label: 'Treble', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M6 16v-2" /><path d="M10 16v-4" /><path d="M14 16V4" /><path d="M18 16v-6" /></svg> }
                                        ].map(preset => (
                                            <button
                                                key={preset.id}
                                                onClick={() => applyPreset(preset.id)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-primary transition-all active:scale-95 border border-white/5"
                                            >
                                                {preset.icon}
                                                <span className="text-sm font-medium">{preset.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}
            </main >

            {/* Profile / Stats Modal */}
            {showStats && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden"
                    onClick={() => setShowStats(false)}
                >
                    <div
                        className="player-card-glass w-full max-w-4xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Seu Resumo Miku</h2>
                                <button onClick={() => setShowStats(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {userStats.totalPlays === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-xl text-muted-foreground">Ouça algumas músicas para ver suas estatísticas!</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Hero Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
                                            <div className="relative z-10">
                                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Total de Reproduções</p>
                                                <h3 className="text-6xl font-black text-primary">{userStats.totalPlays}</h3>
                                                <p className="text-sm text-foreground/60 mt-2">Músicas tocadas</p>
                                            </div>
                                            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                                            </div>
                                        </div>

                                        {/* Top Song Highlight */}
                                        {(() => {
                                            const topSongName = Object.entries(userStats.songs).sort((a, b) => b[1] - a[1])[0]?.[0];
                                            const topSongCount = Object.entries(userStats.songs).sort((a, b) => b[1] - a[1])[0]?.[1];
                                            const topSongObj = playlist.find(s => s.title === topSongName) || activeQueue[0];

                                            if (!topSongName) return null;

                                            return (
                                                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 border border-white/10 flex items-center gap-6 relative overflow-hidden">
                                                    <img src={topSongObj.art} alt="" className="w-24 h-24 rounded-xl shadow-lg z-10" />
                                                    <div className="z-10">
                                                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Música Mais Ouvida</p>
                                                        <h3 className="text-2xl font-bold leading-tight">{topSongName}</h3>
                                                        <p className="text-lg text-muted-foreground">{topSongObj.artist}</p>
                                                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                                            {topSongCount} reproduções
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Top Songs List */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                                                Top Músicas
                                            </h3>
                                            <div className="space-y-3">
                                                {Object.entries(userStats.songs)
                                                    .sort((a, b) => b[1] - a[1])
                                                    .slice(0, 5)
                                                    .map(([title, count], idx) => {
                                                        const song = playlist.find(s => s.title === title);
                                                        const max = Math.max(...Object.values(userStats.songs));
                                                        return (
                                                            <div key={title} className="bg-white/5 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden group">
                                                                <div className="absolute left-0 top-0 bottom-0 bg-primary/10 transition-all duration-500 ease-out" style={{ width: `${(count / max) * 100}%` }}></div>
                                                                <div className="font-mono font-bold text-white/30 text-lg w-6 shrink-0 relative z-10 text-center">#{idx + 1}</div>
                                                                {song && <img src={song.art} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm relative z-10" />}
                                                                <div className="flex-1 min-w-0 relative z-10">
                                                                    <p className="font-medium truncate">{title}</p>
                                                                    <p className="text-xs text-muted-foreground truncate">{song?.artist}</p>
                                                                </div>
                                                                <div className="text-sm font-bold opacity-80 relative z-10">{count}</div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>

                                        {/* Top Artists List */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5a2.5 2.5 0 0 0-2.5 2.5" /><path d="M15.5 15.5a2.5 2.5 0 0 0 2.5-2.5" /></svg>
                                                Top Artistas
                                            </h3>
                                            <div className="space-y-3">
                                                {Object.entries(userStats.artists)
                                                    .sort((a, b) => b[1] - a[1])
                                                    .slice(0, 5)
                                                    .map(([artist, count], idx) => {
                                                        const max = Math.max(...Object.values(userStats.artists));
                                                        return (
                                                            <div key={artist} className="bg-white/5 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                                                                <div className="absolute left-0 top-0 bottom-0 bg-secondary/10 transition-all duration-500 ease-out" style={{ width: `${(count / max) * 100}%` }}></div>
                                                                <div className="font-mono font-bold text-white/30 text-lg w-6 shrink-0 relative z-10 text-center">#{idx + 1}</div>
                                                                <div className="flex-1 min-w-0 relative z-10">
                                                                    <p className="font-medium truncate">{artist}</p>
                                                                </div>
                                                                <div className="text-sm font-bold opacity-80 relative z-10">{count}</div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Lyrics Overlay */}
            {showFullScreenLyrics && activeQueue[currentSongIndex] && (
                <div className="fixed inset-0 z-[200] flex flex-col bg-black animate-in fade-in duration-500">
                    {/* Dynamic Blurred Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={activeQueue[currentSongIndex].art}
                            alt=""
                            className="w-full h-full object-cover blur-[80px] scale-110 opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Header */}
                    <div className="relative z-10 p-8 flex justify-end">
                        <button
                            onClick={() => setShowFullScreenLyrics(false)}
                            className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Lyrics Content */}
                    <div className="relative z-10 flex-1 overflow-hidden mask-linear-fade">
                        <Lyrics
                            song={activeQueue[currentSongIndex]}
                            currentTime={currentTime}
                            duration={duration}
                            onLyricClick={handleLyricClick}
                            isFullScreen={true}
                        />
                    </div>

                    {/* Minimal Controls */}
                    <div className="relative z-10 p-12 pb-16 w-full max-w-4xl mx-auto space-y-6">
                        <div className="text-center space-y-1">
                            <h2 className="text-4xl font-black text-white tracking-tight">{activeQueue[currentSongIndex].title}</h2>
                            <p className="text-xl text-white/60 font-medium">{activeQueue[currentSongIndex].artist}</p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={duration ? (currentTime / duration) * 100 : 0}
                                onChange={handleProgressChange}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/20 accent-white hover:accent-primary transition-all"
                            />
                            <div className="flex justify-center gap-12 items-center">
                                <button onClick={prevSong} className="p-2 text-white/70 hover:text-white transition-colors hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" x2="5" y1="19" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                                </button>
                                <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-2xl hover:shadow-white/20">
                                    {isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                    )}
                                </button>
                                <button onClick={nextSong} className="p-2 text-white/70 hover:text-white transition-colors hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default PlayerPage;
