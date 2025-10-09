document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let triangles = [];
    let triangleColors = ['#32CDFF', '#e539ab', '#ffffff'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
        if (colors && colors.length) {
            triangleColors = colors;
        }
        triangles = [];
        for (let i = 0; i < 50; i++) {
            triangles.push(new Triangle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        triangles.forEach(triangle => {
            triangle.update();
            triangle.draw();
        });
        requestAnimationFrame(animate);
    }


    const root = document.documentElement;
    const audioPlayer = document.getElementById('audioPlayer');
    
    createTriangles(); 
    animate(); 
});