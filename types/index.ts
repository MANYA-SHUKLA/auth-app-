/**
 * Shared TypeScript types and interfaces for the authentication app
 * These define what data structures look like throughout the app
 */

// Represents the state of a form field (like email or password input)
export interface FormFieldState {
  value: string; // What the user typed
  error: string; // Any error message to show (empty string if no error)
}

// Represents how strong a password is
export interface PasswordStrength {
  strength: number; // A number from 0 to 5 showing how many requirements it meets
  label: 'Weak' | 'Fair' | 'Good' | 'Strong'; // A word describing the strength
  color: string; // The color to show (red for weak, green for strong)
}

// Represents the theme state and how to change it
export interface ThemeMode {
  mode: 'light' | 'dark'; // Whether we're in light mode or dark mode
  toggleTheme: () => void; // Function to switch between light and dark
}

// Result of validating user input
export interface ValidationResult {
  isValid: boolean; // Whether the input is valid (true) or has errors (false)
  error: string; // Error message if invalid, empty string if valid
}

// State of a form when it's being submitted
export interface FormSubmitState {
  isSubmitting: boolean; // Whether we're currently trying to submit (shows loading state)
  error: string; // Any error message if submission failed
  success: boolean; // Whether submission was successful
}

