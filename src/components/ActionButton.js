import React from 'react';

/**
 * ActionButton - Styled action button with icon and label
 * Used for neumorphic-style action buttons in the player
 */
const ActionButton = ({ icon, label, onClick, isActive = false, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`neumorphic-icon group ${isActive ? 'text-primary' : ''} ${className}`}
        >
            {icon}
            <span className={`text-xs text-muted-foreground group-hover:text-foreground ${isActive ? 'text-foreground font-bold' : ''}`}>
                {label}
            </span>
        </button>
    );
};

export default ActionButton;
