import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const LandingPage = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        // Theme Logic
        const savedTheme = localStorage.getItem('theme');
        let initialLight = false;
        if (savedTheme) {
            initialLight = savedTheme === 'light';
        } else {
            initialLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        }
        setIsLightMode(initialLight);
        document.body.classList.toggle('light', initialLight);
        document.body.classList.toggle('light-theme', initialLight); // landing.js used light-theme, player.js used light. standardizing on 'light' for tailwind darkMode, but keeping 'light-theme' if needed for legacy CSS
    }, []);

    const toggleTheme = () => {
        const newMode = !isLightMode;
        setIsLightMode(newMode);
        document.body.classList.toggle('light', newMode);
        document.body.classList.toggle('light-theme', newMode);
        localStorage.setItem('theme', newMode ? 'light' : 'dark');
    };

    useEffect(() => {
        // Decorative Triangles Logic
        const container = document.querySelector('.decorative-triangles');
        if (!container) return;

        // Clear existing to prevent duplicates if re-rendering
        container.innerHTML = '';

        for (let i = 0; i < 15; i++) {
            const triangle = document.createElement("div");
            triangle.style.position = "absolute";
            triangle.style.left = `${Math.random() * 100}%`;
            triangle.style.top = `${Math.random() * 100}%`;
            triangle.style.width = `${20 + Math.random() * 40}px`;
            triangle.style.height = `${20 + Math.random() * 40}px`;
            triangle.style.opacity = 0.3 + Math.random() * 0.4;
            triangle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            triangle.style.animationDelay = `${Math.random() * 2}s`;

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 100 100");
            svg.style.width = "100%";
            svg.style.height = "100%";

            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", "50,10 90,90 10,90");

            let color;
            if (i % 3 === 0) color = "#00DDC0";
            else if (i % 3 === 1) color = "#D713F1";
            else color = "#F641B4";

            polygon.setAttribute("fill", color);
            polygon.setAttribute("opacity", "0.6");

            svg.appendChild(polygon);
            triangle.appendChild(svg);
            container.appendChild(triangle);
        }
    }, []);

    return (
        <>
            <div className="background-container">
                <img
                    src="/assets/images/dark-bg.jpg"
                    alt=""
                    className="background-image"
                />
                <div className="background-overlay"></div>
            </div>

            <div className="gradient-triangle">
                <svg
                    className="triangle-svg"
                    viewBox="0 0 1003 1080"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1017.5 -330L2034.65 1177.5H0.353149L1017.5 -330Z"
                        fill="url(#paint0_linear)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear"
                            x1="1017.5"
                            y1="-330"
                            x2="1017.5"
                            y2="1680"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#00DDC0" />
                            <stop offset="1" stopColor="#F641B4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="decorative-triangles"></div>

            <div className="main-content">
                <Header
                    isLightMode={isLightMode}
                    onToggleTheme={toggleTheme}
                    showVocaloidsLink={true}
                    showPlayerLink={false}
                />

                <div className="hero-section">
                    <div className="left-content">
                        <div className="text-content">
                            <div>
                                <h1 className="main-title">MIKU.</h1>
                            </div>
                            <div>
                                <p className="description">
                                    The Miku Music Player brings practicality and style in a design inspired by Hatsune Miku. 
                                    Transform your music into a more immersive and energetic experience. 
                                    Enjoy every beat with personality and fun.
                                </p>
                            </div>
                            <div className="cta-section">
                                <Link to="/player" className="play-now-button inline-block text-center no-underline">LISTEN NOW</Link>
                                <div className="platform-icons">
                                    <button className="icon-button">
                                        <svg
                                            className="icon"
                                            viewBox="0 0 57 57"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.0349 41.2861C15.0349 42.5886 16.098 43.6518 17.4061 43.6518H20.117V50.3537C20.117 52.0515 21.4807 53.4375 23.1562 53.4375C24.8373 53.4375 26.1955 52.0571 26.1955 50.3537V43.6462H30.9269V50.3482C30.9269 52.0459 32.2907 53.432 33.9662 53.432C35.6473 53.432 37.0055 52.0515 37.0055 50.3482V43.6462H39.7163C41.0244 43.6462 42.0876 42.583 42.0876 41.2805V19.2821H15.0349V41.2861ZM34.9125 7.88205L37.4118 4.26389C37.5565 4.05237 37.5231 3.76848 37.3283 3.62932C37.1335 3.49573 36.8552 3.56252 36.7104 3.77405L34.1165 7.53694C32.4076 6.8634 30.5039 6.49045 28.5056 6.49045C26.5072 6.49045 24.6035 6.8634 22.8946 7.53694L20.3007 3.77961C20.1559 3.56809 19.8776 3.49573 19.6828 3.63489C19.488 3.76848 19.4546 4.0468 19.5993 4.26946L22.0986 7.88762C18.1242 9.73567 15.341 13.2369 14.9848 17.3282H42.0375C41.6701 13.2314 38.8813 9.7301 34.9125 7.88205ZM22.7944 13.5876C22.4983 13.5876 22.2088 13.4998 21.9625 13.3353C21.7163 13.1707 21.5244 12.9369 21.411 12.6633C21.2977 12.3897 21.2681 12.0886 21.3258 11.7981C21.3836 11.5077 21.5262 11.2409 21.7356 11.0315C21.945 10.8221 22.2118 10.6794 22.5023 10.6217C22.7928 10.5639 23.0938 10.5935 23.3674 10.7069C23.641 10.8202 23.8749 11.0121 24.0394 11.2584C24.204 11.5046 24.2918 11.7941 24.2918 12.0903C24.2908 12.4871 24.1327 12.8673 23.8521 13.1479C23.5715 13.4285 23.1912 13.5866 22.7944 13.5876ZM34.3948 13.5876C34.0987 13.5876 33.8092 13.4998 33.5629 13.3353C33.3167 13.1707 33.1248 12.9369 33.0114 12.6633C32.8981 12.3897 32.8684 12.0886 32.9262 11.7981C32.984 11.5077 33.1266 11.2409 33.336 11.0315C33.5454 10.8221 33.8122 10.6794 34.1027 10.6217C34.3932 10.5639 34.6942 10.5935 34.9678 10.7069C35.2414 10.8202 35.4753 11.0121 35.6398 11.2584C35.8044 11.5046 35.8922 11.7941 35.8922 12.0903C35.8911 12.4871 35.7331 12.8673 35.4525 13.1479C35.1719 13.4285 34.7916 13.5866 34.3948 13.5876ZM46.8302 19.193C45.1491 19.193 43.7909 20.5735 43.7909 22.2768V34.3225C43.7909 36.0202 45.1547 37.4063 46.8302 37.4063C48.5112 37.4063 49.8694 36.0258 49.8694 34.3225V22.2712C49.875 20.5679 48.5168 19.193 46.8302 19.193ZM10.1698 19.193C8.48876 19.193 7.13055 20.5735 7.13055 22.2768V34.3225C7.13055 36.0202 8.49432 37.4063 10.1698 37.4063C11.8509 37.4063 13.2091 36.0258 13.2091 34.3225V22.2712C13.2091 20.5679 11.8453 19.193 10.1698 19.193Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                    <button className="icon-button">
                                        <svg
                                            className="icon apple"
                                            viewBox="0 0 43 43"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M30.0516 0.0215188C29.9602 -0.0806061 26.668 0.0618314 23.8032 3.17127C20.9383 6.27802 21.379 9.84164 21.4435 9.93302C21.508 10.0244 25.5285 10.1668 28.0951 6.55214C30.6617 2.93746 30.143 0.126331 30.0516 0.0215188ZM38.958 31.554C38.829 31.296 32.7095 28.2376 33.2793 22.3573C33.849 16.4744 37.7809 14.8619 37.8427 14.6872C37.9045 14.5125 36.2382 12.5641 34.4725 11.5778C33.1761 10.8824 31.7413 10.484 30.272 10.4114C29.9817 10.4033 28.9739 10.1561 26.9019 10.7231C25.5366 11.0967 22.4594 12.3061 21.6129 12.3545C20.7636 12.4028 18.2374 10.9516 15.5203 10.5673C13.7815 10.2313 11.9379 10.9193 10.6183 11.4488C9.30142 11.9755 6.79667 13.4751 5.04442 17.4607C3.29217 21.4436 4.20861 27.7538 4.86436 29.7157C5.52011 31.6749 6.54405 34.8865 8.28555 37.2299C9.83355 39.8745 11.8868 41.71 12.7441 42.3335C13.6014 42.957 16.0202 43.3709 17.6972 42.5136C19.0463 41.6858 21.4812 41.2101 22.4433 41.2451C23.4027 41.28 25.2947 41.659 27.2324 42.6936C28.767 43.2231 30.2182 43.0027 31.6722 42.4115C33.1261 41.8175 35.2304 39.5654 37.6868 34.9993C38.6194 32.8762 39.044 31.7286 38.958 31.554Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="character-image-container">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972"
                                alt="Hatsune Miku"
                                className="character-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
