import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TrianglesBackground from '../components/TrianglesBackground';

const VocaloidsPage = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    // Vocaloid character data
    const vocaloids = [
        {
            id: 'miku',
            name: 'Hatsune Miku',
            nameJp: '初音ミク',
            color: '#00DDC0',
            colorRgb: '0 221 192',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        },
        {
            id: 'luka',
            name: 'Megurine Luka',
            nameJp: '巡音ルカ',
            color: '#F641B4',
            colorRgb: '246 65 180',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        },
        {
            id: 'rinlen',
            name: 'Kagamine Rin & Len',
            nameJp: '鏡音リン・レン',
            color: '#F1C40F',
            colorRgb: '241 196 15',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        },
        {
            id: 'gumi',
            name: 'GUMI',
            nameJp: 'グミ',
            color: '#45B39D',
            colorRgb: '69 179 157',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        },
        {
            id: 'teto',
            name: 'Kasane Teto',
            nameJp: '重音テト',
            color: '#E74C3C',
            colorRgb: '231 76 60',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        },
        {
            id: 'kaito',
            name: 'KAITO',
            nameJp: 'カイト',
            color: '#3498DB',
            colorRgb: '52 152 219',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/0b73e8521bb4aaf4efa1d32bce93216b8b6dd7d1?width=2972',
        }
    ];

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

    return (
        <div className="text-foreground transition-colors duration-300 ease-in-out min-h-screen">
            <div id="background-overlay"></div>
            <TrianglesBackground colors={['#32CDFF', '#87ceeb', '#ff69b4']} />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
                <Header
                    isLightMode={isLightMode}
                    onToggleTheme={() => {
                        const newMode = !isLightMode;
                        setIsLightMode(newMode);
                        document.body.classList.toggle('light', newMode);
                        localStorage.setItem('theme', newMode ? 'light' : 'dark');
                    }}
                    showPlayerLink={true}
                />

                {/* Page Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Vocaloid Gallery
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Select a virtual star to view their profile
                    </p>
                </div>

                {/* Vocaloid Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {vocaloids.map((vocaloid, idx) => (
                        <Link
                            key={vocaloid.id}
                            to={`/vocaloids/${vocaloid.id}`}
                            className="group"
                        >
                            <div
                                className="player-card-glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 cursor-pointer"
                                style={{
                                    animationDelay: `${idx * 100}ms`,
                                }}
                            >
                                {/* Character Circle */}
                                <div className="p-8 flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <div
                                            className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"
                                            style={{ backgroundColor: vocaloid.color }}
                                        ></div>
                                        <div
                                            className="relative w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl group-hover:border-8 transition-all"
                                            style={{ borderColor: vocaloid.color }}
                                        >
                                            <img
                                                src={vocaloid.image}
                                                alt={vocaloid.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h3
                                        className="text-2xl font-bold mb-1 group-hover:scale-110 transition-transform"
                                        style={{ color: vocaloid.color }}
                                    >
                                        {vocaloid.nameJp}
                                    </h3>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                                        {vocaloid.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default VocaloidsPage;
