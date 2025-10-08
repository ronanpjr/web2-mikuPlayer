document.addEventListener('DOMContentLoaded', () => {
    // Starfield effect
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const triangles = [];
    const gridSize = 80;
    const colors = ['#FF006E', '#00D9FF', '#7B2CBF', '#0096C7'];

    for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
            triangles.push({
                x: x + Math.random() * 20 - 10,
                y: y + Math.random() * 20 - 10,
                size: Math.random() * 30 + 20,
                rotation: Math.random() * 360,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.15 + 0.05,
            });
        }
    }

    const drawTriangle = (triangle) => {
        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate((triangle.rotation * Math.PI) / 180);
        
        ctx.beginPath();
        ctx.moveTo(0, -triangle.size / 2);
        ctx.lineTo(-triangle.size / 2, triangle.size / 2);
        ctx.lineTo(triangle.size / 2, triangle.size / 2);
        ctx.closePath();
        
        ctx.strokeStyle = triangle.color;
        ctx.globalAlpha = triangle.opacity;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.restore();
    };

    let time = 0;
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.001;

        triangles.forEach((triangle, index) => {
            const pulse = Math.sin(time * 2 + index * 0.1) * 0.05;
            triangle.opacity = Math.max(0.05, Math.min(0.2, triangle.opacity + pulse));
            drawTriangle(triangle);
        });

        requestAnimationFrame(animate);
    };

    animate();

    // Music Player
    const playPauseButton = document.getElementById('play-pause-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const musicProgress = document.getElementById('music-progress');

    let isPlaying = false;

    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    });
    
    musicProgress.addEventListener('input', (e) => {
      const progress = e.target.value;
      musicProgress.style.background = `linear-gradient(to right, hsl(var(--secondary)) 0%, hsl(var(--secondary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`;
    });
    
    // Set initial progress bar color
    const initialProgress = musicProgress.value;
    musicProgress.style.background = `linear-gradient(to right, hsl(var(--secondary)) 0%, hsl(var(--secondary)) ${initialProgress}%, hsl(var(--muted)) ${initialProgress}%, hsl(var(--muted)) 100%)`;
});