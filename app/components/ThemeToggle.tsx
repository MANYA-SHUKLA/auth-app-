'use client';

import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '@/app/providers/theme-provider';
import { motion } from 'framer-motion';

/**
 * Theme toggle button component - Allows users to switch between light and dark mode
 * This button appears in the top right corner of every page
 */
export default function ThemeToggle() {
  // Get the current theme mode and the function to switch between light and dark
  const { mode, toggleTheme } = useThemeMode();

  return (
    // Show a tooltip when user hovers over the button
    <Tooltip
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      arrow
    >
      {/* Add smooth animation when hovering or clicking */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={toggleTheme}
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          sx={{
            color: 'text.primary',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {/* Show sun icon in dark mode (to switch to light), moon icon in light mode (to switch to dark) */}
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
}
