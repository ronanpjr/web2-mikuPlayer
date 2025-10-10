document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const audioPlayer = document.createElement('audio');
    
    const albumArt = document.querySelector('.lg\\:col-span-1 img');
    const logoIcon = document.querySelector('.logo-icon'); 
    const songTitle = document.querySelector('.lg\\:col-span-1 h3');
    const songArtist = document.querySelector('.lg\\:col-span-1 p');
    const playPauseBtn = document.getElementById('play-pause-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    const progressBar = document.getElementById('music-progress');
    const currentTimeEl = document.querySelector('.flex.justify-between span:first-child');
    const totalDurationEl = document.querySelector('.flex.justify-between span:last-child');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const playlistToggleBtn = document.getElementById('playlist-toggle');
    const playlistGrid = document.getElementById('playlist-grid');
    const playlistContainer = playlistGrid.querySelector('.grid');
   
    const playlist = [
        {
            title: "World is Mine", artist: "ryo (supercell)",
            src: "https://ia800905.us.archive.org/9/items/Vocaloid-worldIsMine/Vocaloid-worldIsMine.mp3",
            art: "../assets/images/world_is_mine.png",
            theme: { 
                primary: '50 205 255', secondary: '135 206 235', triangles: ['#32CDFF', '#87ceeb', '#ff69b4'],
                light: { primary: '0 168 232', secondary: '0 126 167', triangles: ['#00A8E8', '#007EA7', '#fbcfe8']}
            }
        },
        {
            title: "Echo", artist: "Crusher-P",
            src: "https://ia800201.us.archive.org/16/items/VocaloidGumiEcho/Vocaloid%20Gumi%20-%20Echo.mp3",
            art: "../assets/images/echo.png",
            theme: { 
                primary: '69 179 157', secondary: '46 204 113', triangles: ['#45b39d', '#2ecc71', '#f1c40f'],
                light: { primary: '39 174 96', secondary: '22 160 133', triangles: ['#27ae60', '#16a085', '#fde68a']}
            }
        },
        {
            title: "Remote Control", artist: "Jesus-P",
            src: "https://ia801308.us.archive.org/29/items/KagamineRinLenRemoteControl/Kagamine%20Rin%20%26%20Len%20-%20Remote%20Control.mp3",
            art: "../assets/images/remote_control.png",
            theme: { 
                primary: '241 196 15', secondary: '247 220 111', triangles: ['#f1c40f', '#f7dc6f', '#3498db'],
                light: { primary: '243 156 18', secondary: '230 126 34', triangles: ['#f39c12', '#e67e22', '#93c5fd']}
            }
        },
        {
            title: "Just Be Friends", artist: "Dixie Flatline",
            src: "https://ia600205.us.archive.org/10/items/JustBeFriends/Luka-JustBeFriends.mp3",
            art: "../assets/images/just_be_friends.png",
            theme: { 
                primary: '229 57 171', secondary: '244 161 216', triangles: ['#e539ab', '#f4a1d8', '#8e44ad'],
                light: { primary: '216 27 96', secondary: '194 24 91', triangles: ['#d81b60', '#c2185b', '#c084fc']}
            }
        },
        {
            title: "Yoshiwara Lament", artist: "Asa-P",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "../assets/images/yoshiwara_lament.png",
            theme: { 
                primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'],
                light: { primary: '231 76 60', secondary: '192 57 43', triangles: ['#e74c3c', '#c0392b', '#fde68a']}
            }
        },
        {
            title: "Yoshiwara Lament", artist: "Asa-P",
            src: "https://archive.org/download/yoshiwara-lament-asa-feat.-kasane-teto/Yoshiwara%20Lament%20-%20Asa%20feat.%20Kasane%20Teto.mp3",
            art: "../assets/images/yoshiwara_lament.png",
            theme: { 
                primary: '192 57 43', secondary: '231 76 60', triangles: ['#c0392b', '#e74c3c', '#f1c40f'],
                light: { primary: '231 76 60', secondary: '192 57 43', triangles: ['#e74c3c', '#c0392b', '#fde68a']}
            }
        }
        
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isLightMode = false;

    function updateLogo(lightMode) {
        if (lightMode) {
            logoIcon.src = '../assets/images/logo-black.png';
        } else {
            logoIcon.src = '../assets/images/logo-white.png';
        }
    }

    function setTheme(songTheme) {
        const currentThemePalette = isLightMode && songTheme.light ? songTheme.light : songTheme;
        root.style.setProperty('--color-primary', currentThemePalette.primary);
        root.style.setProperty('--color-secondary', currentThemePalette.secondary);
        createTriangles(currentThemePalette.triangles);
    }

    function toggleTheme() {
        isLightMode = !isLightMode;
        document.body.classList.toggle('light');
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
        updateLogo(isLightMode);
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        setTheme(playlist[currentSongIndex].theme);
    }

    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumArt.src = song.art;
        audioPlayer.src = song.src;
        setTheme(song.theme);
    }

    function playSong() {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        audioPlayer.play();
    }

    function pauseSong() {
        isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        audioPlayer.pause();
    }
    
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlist.length - 1;
        }
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > playlist.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    function updateProgress() {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progressPercent;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            totalDurationEl.textContent = formatTime(audioPlayer.duration);
        }
    }
    
    function setProgress() {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function renderPlaylist() {
        playlistContainer.innerHTML = '';
        playlist.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'mac-icon-item';
            songItem.innerHTML = `
                <div class="icon-wrapper">
                    <img src="${song.art}" alt="${song.title}" />
                </div>
                <p>${song.title}</p>
            `;
            songItem.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(playlist[currentSongIndex]);
                playSong();
                playlistGrid.classList.add('hidden');
            });
            playlistContainer.appendChild(songItem);
        });
    }

    playPauseBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    themeToggleBtn.addEventListener('click', toggleTheme);
    playlistToggleBtn.addEventListener('click', () => {
        playlistGrid.classList.toggle('hidden');
    });
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    progressBar.addEventListener('input', setProgress);
    
    function initialize() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isLightMode = savedTheme === 'light';
        } else {
            isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        }

        if (isLightMode) {
            document.body.classList.add('light');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            document.body.classList.remove('light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }

        updateLogo(isLightMode);

        renderPlaylist();
        loadSong(playlist[currentSongIndex]);
        animate(); 
    }
    
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let triangles = [];
    let triangleColors = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Triangle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10;
            this.color = triangleColors[Math.floor(Math.random() * triangleColors.length)];
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

    function createTriangles(colors) {
        if (colors && colors.length) triangleColors = colors;
        triangles = [];
        for (let i = 0; i < 50; i++) triangles.push(new Triangle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        triangles.forEach(triangle => {
            triangle.update();
            triangle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    initialize();
});