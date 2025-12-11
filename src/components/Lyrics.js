import React, { useState, useEffect, useRef } from 'react';

const Lyrics = ({ song, currentTime, duration, onLyricClick }) => {
    const [lyrics, setLyrics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const lyricsContainerRef = useRef(null);
    const activeLineRef = useRef(null);

    // Fetch lyrics when song changes
    useEffect(() => {
        const fetchLyrics = async () => {
            if (!song) return;

            setLoading(true);
            setError(null);
            setLyrics([]);

            try {
                // Construct query parameters
                // Using song title and artist. 
                // We might need to scrub "feat." or other noise if matches are poor, but start simple.
                const params = new URLSearchParams({
                    track_name: song.title,
                    artist_name: song.artist,
                    duration: duration // Duration helps match the specific version
                });

                const response = await fetch(`https://lrclib.net/api/get?${params}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Lyrics not found');
                        return;
                    }
                    throw new Error('Failed to fetch lyrics');
                }

                const data = await response.json();

                if (data.syncedLyrics) {
                    const parsed = parseLrc(data.syncedLyrics);
                    setLyrics(parsed);
                } else if (data.plainLyrics) {
                    // Fallback to plain lyrics if synced not available
                    setLyrics([{ time: 0, text: data.plainLyrics, isPlain: true }]);
                } else {
                    setError('No lyrics available');
                }

            } catch (err) {
                console.error("Lyrics fetch error:", err);
                setError('Could not load lyrics');
            } finally {
                setLoading(false);
            }
        };

        fetchLyrics();
    }, [song, song.title, song.artist, duration]);

    // Parse LRC format: [mm:ss.xx] Text
    const parseLrc = (lrcString) => {
        const lines = lrcString.split('\n');
        const parsedLines = [];
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

        for (const line of lines) {
            const match = timeRegex.exec(line);
            if (match) {
                const minutes = parseInt(match[1], 10);
                const seconds = parseInt(match[2], 10);
                const milliseconds = parseInt(match[3], 10);
                // Convert to total seconds
                // ms can be 2 or 3 digits. 2 digits = 1/100s, 3 digits = 1/1000s
                // Usually standard is .xx so 10ms units? No, .xx is usually 1/100.
                const time = minutes * 60 + seconds + (milliseconds / (match[3].length === 3 ? 1000 : 100));
                const text = line.replace(timeRegex, '').trim();
                parsedLines.push({ time, text });
            }
        }
        return parsedLines;
    };

    // Auto-scroll to active line
    useEffect(() => {
        if (activeLineRef.current) {
            activeLineRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentTime]);

    // Find active line index
    const activeIndex = lyrics.findIndex((line, index) => {
        const nextLine = lyrics[index + 1];
        return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">
                Loading lyrics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground">
                {error}
            </div>
        );
    }

    return (
        <div
            className="h-full overflow-y-auto px-4 py-8 space-y-6 custom-scrollbar text-center"
            ref={lyricsContainerRef}
            style={{ maxHeight: '600px' }} // Height constraint for scrolling
        >
            {lyrics.map((line, index) => {
                const isActive = index === activeIndex;
                return (
                    <p
                        key={index}
                        ref={isActive ? activeLineRef : null}
                        onClick={() => !line.isPlain && onLyricClick && onLyricClick(line.time)}
                        className={`transition-all duration-500 ease-in-out cursor-pointer
                            ${isActive
                                ? 'text-2xl font-bold text-foreground scale-105 blur-none opacity-100'
                                : 'text-lg text-muted-foreground/60 blur-[1px] opacity-60 hover:opacity-100 hover:blur-none hover:text-foreground/80'
                            }
                            ${line.isPlain ? 'whitespace-pre-wrap cursor-default' : ''}
                        `}
                    >
                        {line.text}
                    </p>
                );
            })}
        </div>
    );
};

export default Lyrics;
