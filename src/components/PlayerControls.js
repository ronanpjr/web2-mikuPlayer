import React from 'react';

/**
 * PlayerControls - Media control buttons component
 * Includes shuffle, prev, play/pause, next, and volume controls
 */
const PlayerControls = ({
    isPlaying,
    onPlayPause,
    onPrev,
    onNext,
    volume,
    onVolumeChange,
    showVolume,
    onToggleVolume
}) => {
    return (
        <div className="flex items-center justify-center gap-4">
            {/* Shuffle Button */}
            <button className="p-2 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M17 2.1l4 4-4 4" />
                    <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8" />
                    <path d="M7 21.9l-4-4 4-4" />
                    <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
                </svg>
            </button>

            {/* Previous Button */}
            <button onClick={onPrev} id="prev-button" className="p-2 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line x1="5" x2="5" y1="19" y2="5" />
                </svg>
            </button>

            {/* Play/Pause Button */}
            <button
                onClick={onPlayPause}
                id="play-pause-button"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-secondary/50"
            >
                {isPlaying ? (
                    <svg id="pause-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <rect width="4" height="16" x="6" y="4" />
                        <rect width="4" height="16" x="14" y="4" />
                    </svg>
                ) : (
                    <svg id="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                )}
            </button>

            {/* Next Button */}
            <button onClick={onNext} id="next-button" className="p-2 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" x2="19" y1="5" y2="19" />
                </svg>
            </button>

            {/* Volume Control */}
            <div className="relative flex items-center justify-center">
                <button
                    onClick={onToggleVolume}
                    className="p-2 hover:text-primary transition-colors text-muted-foreground hover:bg-white/5 rounded-full"
                    title="Volume"
                >
                    {volume === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" x2="17" y1="9" y2="15" />
                            <line x1="17" x2="23" y1="9" y2="15" />
                        </svg>
                    ) : volume < 0.5 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </button>

                {/* Vertical Slider Popup */}
                {showVolume && (
                    <div className="absolute bottom-full mb-4 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 z-50">
                        <div className="h-32 w-8 flex items-center justify-center">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                                className="volume-slider -rotate-90 origin-center"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerControls;
