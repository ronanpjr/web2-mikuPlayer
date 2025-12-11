import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header - App header with logo, navigation, and theme toggle
 * Consistent header component used across all pages
 */
const Header = ({
    isLightMode,
    onToggleTheme,
    showVocaloidsLink = false,
    showPlayerLink = false,
    showSettingsButton = false,
    onSettingsClick
}) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 p-6">
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
                        {showVocaloidsLink && (
                            <Link
                                to="/vocaloids"
                                className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors text-sm font-medium"
                            >
                                Vocaloids
                            </Link>
                        )}

                        {showPlayerLink && (
                            <Link
                                to="/player"
                                className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors text-sm font-medium"
                            >
                                Player
                            </Link>
                        )}

                        {showSettingsButton && onSettingsClick && (
                            <button
                                onClick={onSettingsClick}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground"
                                title="Configurações"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                        )}

                        <button
                            id="theme-toggle"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            onClick={onToggleTheme}
                        >
                            <svg
                                style={{ display: isLightMode ? 'none' : 'block' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                            <svg
                                style={{ display: isLightMode ? 'block' : 'none' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
