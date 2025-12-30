/**
 * Application constants
 * All the fixed values used throughout the app are stored here
 * This makes it easy to change things in one place instead of searching through all files
 */

// Rules for validating user input in forms
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 6, // Minimum password length for login (6 characters)
    SIGNUP_MIN_LENGTH: 8, // Minimum password length for signup (8 characters, more secure)
  },
  NAME: {
    MIN_LENGTH: 2, // Name must be at least 2 characters
    MAX_LENGTH: 50, // Name can't be longer than 50 characters
  },
  EMAIL: {
    // Pattern to check if an email looks valid (must have @ and a domain like .com)
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  // Pattern for names - only allows letters, spaces, hyphens, and apostrophes
  // This allows names like "Mary-Jane O'Brien" but not "John123"
  NAME_REGEX: /^[a-zA-Z\s'-]+$/,
} as const;

// Different levels of password strength and their colors
// The threshold is how many requirements the password needs to meet
export const PASSWORD_STRENGTH_LEVELS = {
  WEAK: { threshold: 2, label: 'Weak' as const, color: '#ef4444' }, // Red color
  FAIR: { threshold: 3, label: 'Fair' as const, color: '#f59e0b' }, // Orange color
  GOOD: { threshold: 4, label: 'Good' as const, color: '#3b82f6' }, // Blue color
  STRONG: { threshold: 5, label: 'Strong' as const, color: '#10b981' }, // Green color
} as const;

// How long animations should take (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 300, // Quick animations (300 milliseconds = 0.3 seconds)
  NORMAL: 500, // Normal animations (500 milliseconds = 0.5 seconds)
  SLOW: 800, // Slow animations (800 milliseconds = 0.8 seconds)
} as const;

// How long to wait when simulating API calls (in milliseconds)
// In a real app, these would be actual API calls, but for now we just wait
export const API_DELAYS = {
  LOGIN: 1500, // Wait 1.5 seconds when logging in
  SIGNUP: 1500, // Wait 1.5 seconds when signing up
  SUCCESS_MESSAGE: 2000, // Show success message for 2 seconds before clearing form
} as const;

// The key used to save the theme preference in browser storage
export const THEME_STORAGE_KEY = 'themeMode' as const;

// All the page routes in the app
export const ROUTES = {
  HOME: '/', // The home page
  LOGIN: '/login', // The login page
  SIGNUP: '/signup', // The signup page
} as const;

