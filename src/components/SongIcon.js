import React from 'react';

/**
 * SongIcon - Mac-style song icon component
 * Used in playlists and song selections across the app
 */
const SongIcon = ({ song, isActive = false, onClick, className = '' }) => {
    return (
        <div
            className={`mac-icon-item ${isActive ? 'active-song ring-2 ring-primary/50 rounded-xl' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="icon-wrapper">
                <img src={song.art} alt={song.title} />
            </div>
            <p>{song.title}</p>
        </div>
    );
};

export default SongIcon;
