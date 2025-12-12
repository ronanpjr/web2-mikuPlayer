import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { songs as masterPlaylist } from '../data/songs';

const PlayerContext = createContext();

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

export const PlayerProvider = ({ children }) => {
    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [activeQueue, setActiveQueue] = useState(masterPlaylist);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    // Mods
    const [userPlaylists, setUserPlaylists] = useState(() => {
        try {
            const saved = localStorage.getItem('userPlaylists');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const audioRef = useRef(new Audio());
    const audioContextRef = useRef(null); // For future EQ
    const sourceNodeRef = useRef(null); // For future EQ

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle song change
    useEffect(() => {
        const audio = audioRef.current;
        const song = activeQueue[currentSongIndex];

        if (song && audio) {
            const wasPlaying = isPlaying;
            // Only update src if it changed to avoid reloading same song (unless loop logic dictates)
            // But usually simplistic approach: set src, load.
            const currentSrcUrl = new URL(song.src, window.location.origin).href;
            const audioSrcUrl = new URL(audio.src, window.location.origin).href;

            if (currentSrcUrl !== audioSrcUrl) {
                audio.src = song.src;
                audio.load();
                if (wasPlaying) {
                    audio.play().catch(e => console.warn("Auto-play failed", e));
                }
            }
        }
    }, [currentSongIndex, activeQueue]);

    // Play/Pause effect
    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying && audio.paused) {
            audio.play().catch(e => console.warn("Play failed", e));
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying]);

    // Event Listeners
    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const onEnded = () => nextSong(); // Auto-advance

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', onEnded);
        };
    }, [activeQueue, currentSongIndex, isRepeating]);
    // ^ Dependency on nextSong logic which depends on queue/index

    // Actions
    const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);

    const playSong = useCallback((index, queue = null) => {
        if (queue) setActiveQueue(queue);
        setCurrentSongIndex(index);
        setIsPlaying(true);
    }, []);

    const nextSong = useCallback(() => {
        setCurrentSongIndex(prev => {
            if (isRepeating && activeQueue.length === 1) return 0; // Repeat one?
            // Simple next for now
            return (prev + 1) % activeQueue.length;
        });
    }, [activeQueue.length, isRepeating]);

    const prevSong = useCallback(() => {
        setCurrentSongIndex(prev => (prev - 1 + activeQueue.length) % activeQueue.length);
    }, [activeQueue.length]);

    const seek = useCallback((time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }, []);

    // Create Playlist
    const createPlaylist = useCallback((name, songs) => {
        const newPlaylist = { id: Date.now(), name, songs };
        const updated = [...userPlaylists, newPlaylist];
        setUserPlaylists(updated);
        localStorage.setItem('userPlaylists', JSON.stringify(updated));
    }, [userPlaylists]);

    const value = {
        state: {
            isPlaying,
            currentSongIndex,
            currentSong: activeQueue[currentSongIndex],
            activeQueue,
            volume,
            currentTime,
            duration,
            isShuffling,
            isRepeating,
            userPlaylists,
            audioRef
        },
        actions: {
            togglePlay,
            playSong,
            nextSong,
            prevSong,
            seek,
            setVolume,
            setIsShuffling,
            setIsRepeating,
            createPlaylist,
            setActiveQueue,
            setCurrentSongIndex,
        }
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
