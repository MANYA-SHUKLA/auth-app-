'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import emotionCache from '@/app/lib/emotion-cache';
import { THEME_STORAGE_KEY } from '@/constants';
import type { ThemeMode } from '@/types';

interface ThemeContextType extends ThemeMode {}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme mode and toggle function
 * @throws {Error} If used outside of MUIThemeProvider
 */
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within MUIThemeProvider');
  }
  return context;
};

interface MUIThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component - Manages theme state and provides theme context
 * This wraps the entire app and remembers the user's theme preference (light or dark mode)
 */
export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  // Track whether we're in light or dark mode (start with light mode by default)
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  // Track if the component has finished loading (to avoid hydration issues)
  const [mounted, setMounted] = useState(false);

  // When the page first loads, check if the user has a saved theme preference
  useEffect(() => {
    setMounted(true);
    try {
      // Try to get the saved theme from browser storage
      const savedMode = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
      if (savedMode === 'light' || savedMode === 'dark') {
        // If they have a saved preference, use it
        setMode(savedMode);
      } else {
        // If no saved preference, check if their computer is set to dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      // If something goes wrong (like in private browsing), just use light mode
      console.warn('Failed to load theme preference:', error);
      setMode('light');
    }
  }, []);

  // Whenever the theme changes, save it to browser storage so it remembers next time
  useEffect(() => {
    if (mounted) {
      try {
        // Save the theme preference to browser storage
        localStorage.setItem(THEME_STORAGE_KEY, mode);
        // Also set it on the HTML element so CSS can use it
        document.documentElement.setAttribute('data-theme', mode);
      } catch (error) {
        // If we can't save (like in private browsing), that's okay
        console.warn('Failed to save theme preference:', error);
      }
    }
  }, [mode, mounted]);

  // Function to switch between light and dark mode
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
        secondary: mode === 'dark' ? '#cbd5e1' : '#64748b',
      },
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '12px 24px',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-1px)',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
