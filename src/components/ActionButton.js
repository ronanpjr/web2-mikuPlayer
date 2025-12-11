import React from 'react';
import { motion } from 'framer-motion';

/**
 * ActionButton - Styled action button with icon and label
 * Used for neumorphic-style action buttons in the player
 */
const ActionButton = ({ icon, label, onClick, isActive = false, className = '' }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`neumorphic-icon group ${isActive ? 'text-primary' : ''} ${className}`}
        >
            {icon}
            <span className={`text-xs text-muted-foreground group-hover:text-foreground ${isActive ? 'text-foreground font-bold' : ''}`}>
                {label}
            </span>
        </motion.button>
    );
};

export default ActionButton;
