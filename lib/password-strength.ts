/**
 * Password strength calculation utilities
 * These functions figure out how strong a password is by checking different requirements
 * @module lib/password-strength
 */

import { PASSWORD_STRENGTH_LEVELS } from '@/constants';
import type { PasswordStrength } from '@/types';

/**
 * Calculates password strength based on various criteria
 * Checks if the password has: length, uppercase letters, lowercase letters, numbers, and special characters
 * The more requirements it meets, the stronger it is
 * @param password - The password to evaluate
 * @returns Password strength object with strength level, label, and color
 */
export const calculatePasswordStrength = (password: string): PasswordStrength => {
  // If there's no password, return empty strength
  if (!password) {
    return { strength: 0, label: '', color: '' };
  }

  // Start with 0 points and add 1 point for each requirement the password meets
  let strength = 0;
  // +1 point if password is at least 8 characters long
  if (password.length >= 8) strength++;
  // +1 point if password has at least one capital letter (A-Z)
  if (/[A-Z]/.test(password)) strength++;
  // +1 point if password has at least one lowercase letter (a-z)
  if (/[a-z]/.test(password)) strength++;
  // +1 point if password has at least one number (0-9)
  if (/[0-9]/.test(password)) strength++;
  // +1 point if password has at least one special character (!@#$% etc.)
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Based on how many points the password got, assign it a strength level
  // 0-2 points = Weak (red)
  if (strength <= PASSWORD_STRENGTH_LEVELS.WEAK.threshold) {
    return {
      strength,
      label: PASSWORD_STRENGTH_LEVELS.WEAK.label,
      color: PASSWORD_STRENGTH_LEVELS.WEAK.color,
    };
  }
  // 3 points = Fair (orange)
  if (strength <= PASSWORD_STRENGTH_LEVELS.FAIR.threshold) {
    return {
      strength,
      label: PASSWORD_STRENGTH_LEVELS.FAIR.label,
      color: PASSWORD_STRENGTH_LEVELS.FAIR.color,
    };
  }
  // 4 points = Good (blue)
  if (strength <= PASSWORD_STRENGTH_LEVELS.GOOD.threshold) {
    return {
      strength,
      label: PASSWORD_STRENGTH_LEVELS.GOOD.label,
      color: PASSWORD_STRENGTH_LEVELS.GOOD.color,
    };
  }
  // 5 points = Strong (green)
  return {
    strength,
    label: PASSWORD_STRENGTH_LEVELS.STRONG.label,
    color: PASSWORD_STRENGTH_LEVELS.STRONG.color,
  };
};

