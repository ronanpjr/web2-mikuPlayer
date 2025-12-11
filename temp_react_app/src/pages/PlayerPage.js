import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PlayerPage = () => {
    // Playlist data from player.js
    const playlist = React.useMemo(() => [
        {
            title: "World is Mine", artist: "ryo (supercell)",
            src: "https://ia800905.us.archive.org/9/items/Vocaloid-worldIsMine/Vocaloid-worldIsMine.mp3",
            art: "/assets/images/world_is_mine.png",
            theme: {
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8'] }
            }
        },
        {
            title: "Echo", artist: "Crusher-P",
            src: "https://ia800201.us.archive.org/16/items/VocaloidGumiEcho/Vocaloid%20Gumi%20-%20Echo.mp3",
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
            src: "https://ia800201.us.archive.org/16/items/VocaloidGumiEcho/Vocaloid%20Gumi%20-%20Echo.mp3",
            art: "/assets/images/PPPP.png",
            theme: {
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8'] }
            }
        },
        {
            title: "BIRDBRAIN", artist: "JamieP",
            src: "https://ia801308.us.archive.org/29/items/KagamineRinLenRemoteControl/Kagamine%20Rin%20%26%20Len%20-%20Remote%20Control.mp3",
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

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const audioRef = useRef(new Audio(playlist[0].src));
    const canvasRef = useRef(null);
    const triangleColorsRef = useRef(['#32CDFF', '#87ceeb', '#ff69b4']); // Default

    // Format time helper
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
    const updateThemeVars = React.useCallback((song, lightMode) => {
        const theme = song.theme;
        const currentThemePalette = lightMode && theme.light ? theme.light : theme;
        document.documentElement.style.setProperty('--color-primary', currentThemePalette.primary);
        document.documentElement.style.setProperty('--color-secondary', currentThemePalette.secondary);

        // Update triangles colors for canvas
        if (currentThemePalette.triangles) {
            triangleColorsRef.current = currentThemePalette.triangles;
        }
    }, []);

    // Update theme when light mode or song changes
    useEffect(() => {
        updateThemeVars(playlist[currentSongIndex], isLightMode);
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        document.body.classList.toggle('light', isLightMode);
    }, [currentSongIndex, isLightMode, playlist, updateThemeVars]);

    const nextSong = React.useCallback(() => {
        setCurrentSongIndex(prev => (prev + 1) % playlist.length);
    }, [playlist.length]);

    const prevSong = React.useCallback(() => {
        setCurrentSongIndex(prev => (prev - 1 + playlist.length) % playlist.length);
    }, [playlist.length]);

    // Audio Event Listeners
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => nextSong();

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [nextSong]);

    // Handle Song Change
    useEffect(() => {
        const audio = audioRef.current;
        if (audio.src !== playlist[currentSongIndex].src) {
            audio.src = playlist[currentSongIndex].src;
            if (isPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Context play aborted", error);
                    });
                }
            }
        }
    }, [currentSongIndex, playlist, isPlaying]);

    // Handle Play/Pause
    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying && audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Toggle play aborted", error);
                });
            }
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying]);

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
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

    const currentSong = playlist[currentSongIndex];

    return (
        <div className="text-foreground transition-colors duration-300 ease-in-out">
            <div id="background-overlay"></div>
            <canvas id="bg-canvas" ref={canvasRef}></canvas>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
                <header className="fixed top-0 left-0 right-0 z-50 p-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between">
                            <Link to="/">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={isLightMode ? "/assets/images/logo-black.png" : "/assets/images/logo-white.png"}
                                        alt="Miku Icon"
                                        className="logo-icon"
                                    />
                                    <h1 className="text-xl tracking-wider">MIKU MIKU MUSIC</h1>
                                </div>
                            </Link>

                            <div className="flex items-center gap-4">
                                <button id="theme-toggle" className="p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsLightMode(!isLightMode)}>
                                    <svg id="sun-icon" style={{ display: isLightMode ? 'none' : 'block' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                    <svg id="moon-icon" style={{ display: isLightMode ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

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

                                    <div className="flex items-center justify-center gap-4">
                                        <button className="p-2 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8" /><path d="M7 21.9l-4-4 4-4" /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" /></svg></button>
                                        <button onClick={prevSong} id="prev-button" className="p-2 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" x2="5" y1="19" y2="5" /></svg></button>
                                        <button onClick={() => setIsPlaying(!isPlaying)} id="play-pause-button" className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-secondary/50">
                                            {isPlaying ? (
                                                <svg id="pause-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>
                                            ) : (
                                                <svg id="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ml-1"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                            )}
                                        </button>
                                        <button onClick={nextSong} id="next-button" className="p-2 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" /></svg></button>
                                        <button className="p-2 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Ações</h2>
                            <div className="grid grid-cols-4 gap-4">
                                <button id="playlist-toggle" onClick={() => setShowPlaylist(!showPlaylist)} className="flex flex-col items-center justify-center gap-2 group">
                                    <div className="folder-icon"></div>
                                    <span className="text-xs text-muted-foreground group-hover:text-foreground">Minhas favoritas</span>
                                </button>
                                <div className="neumorphic-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                    <span className="text-xs text-muted-foreground">Adicionar</span>
                                </div>
                                <div className="neumorphic-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
                                    <span className="text-xs text-muted-foreground">Compartilhar</span>
                                </div>
                                <div className="neumorphic-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-muted-foreground"><path d="M12 6.52c.82-.9 2.05-1.52 3.5-1.52 2.76 0 5 2.24 5 5 0 3.15-2.5 5.5-5 5.5-1.45 0-2.68-.62-3.5-1.52-.82.9-2.05 1.52-3.5 1.52-2.76 0-5-2.24-5-5 0-3.15 2.5-5.5 5-5.5 1.45 0 2.68.62 3.5 1.52z" /><path d="m12 12.5-2.5 3" /><path d="m14.5 15.5 2.5-3" /></svg>
                                    <span className="text-xs text-muted-foreground">Letras</span>
                                </div>
                            </div>
                        </section>


                        <section id="playlist-grid" className={`${showPlaylist ? '' : 'hidden'} transition-opacity duration-300`} style={{ opacity: showPlaylist ? 1 : 0 }}>
                            <h2 className="text-2xl font-bold mb-4">Minhas favoritas</h2>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-2">
                                {playlist.map((song, index) => (
                                    <div key={index} className="mac-icon-item" onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); setShowPlaylist(false); }}>
                                        <div className="icon-wrapper">
                                            <img src={song.art} alt={song.title} />
                                        </div>
                                        <p>{song.title}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PlayerPage;
