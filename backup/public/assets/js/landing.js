document.addEventListener("DOMContentLoaded", function () {
    const decorativeTrianglesContainer = document.querySelector(
        ".decorative-triangles",
    );

    for (let i = 0; i < 15; i++) {
        const triangle = document.createElement("div");
        triangle.style.position = "absolute";
        triangle.style.left = `${Math.random() * 100}%`;
        triangle.style.top = `${Math.random() * 100}%`;
        triangle.style.width = `${20 + Math.random() * 40}px`;
        triangle.style.height = `${20 + Math.random() * 40}px`;
        triangle.style.opacity = 0.3 + Math.random() * 0.4;
        triangle.style.animation = `float ${3 + Math.random() * 4
            }s ease-in-out infinite`;
        triangle.style.animationDelay = `${Math.random() * 2}s`;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.style.width = "100%";
        svg.style.height = "100%";

        const polygon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon",
        );
        polygon.setAttribute("points", "50,10 90,90 10,90");
        let color;
        if (i % 3 === 0) {
            color = "#00DDC0";
        } else if (i % 3 === 1) {
            color = "#D713F1";
        } else {
            color = "#F641B4";
        }
        polygon.setAttribute("fill", color);
        polygon.setAttribute("opacity", "0.6");

        svg.appendChild(polygon);
        triangle.appendChild(svg);
        decorativeTrianglesContainer.appendChild(triangle);
    }

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(10deg);
            }
        }
    `;
    document.head.appendChild(style);

    // --- Tema ---
    const themeToggleButton = document.getElementById("theme-toggle-button");
    const body = document.body;
    const logoIcon = document.querySelector(".logo-icon");

    const setTheme = (isLight) => {
        if (isLight) {
            body.classList.add("light-theme");
            localStorage.setItem('theme', 'light');
            logoIcon.src = './assets/images/logo-black.png'; // Muda para o logo preto
        } else {
            body.classList.remove("light-theme");
            localStorage.setItem('theme', 'dark');
            logoIcon.src = './assets/images/logo-white.png'; // Muda para o logo branco
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'light');
    } else {
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        setTheme(prefersLight);
    }


    themeToggleButton.addEventListener("click", function () {
        setTheme(!body.classList.contains("light-theme"));
    });
});