import React, { useEffect, useRef } from 'react';

const TrianglesBackground = ({ colors = ['#32CDFF', '#87ceeb', '#ff69b4'] }) => {
    const canvasRef = useRef(null);
    const colorsRef = useRef(colors);

    // Keep colors ref formatted up to date without re-triggering the effect
    useEffect(() => {
        colorsRef.current = colors;
    }, [colors]);

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
                // Use current colors
                this.color = colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)];
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
    }, []); // Empty dependency array ensures we only init once, but we use refs for dynamic values

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            id="bg-canvas" // Keeping ID for compatibility if needed elsewhere
        />
    );
};

export default TrianglesBackground;
