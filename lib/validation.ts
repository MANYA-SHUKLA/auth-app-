/**
 * Validation utilities for form inputs
 * These functions check if user input is correct before submitting forms
 * @module lib/validation
 */

import { VALIDATION_RULES } from '@/constants';

/**
 * Validates an email address format
 * Checks if the email looks like a real email address (has @ symbol and domain)
 * @param email - The email address to validate
 * @returns Empty string if valid, error message otherwise
 */
export const validateEmail = (email: string): string => {
  // First check if the user entered anything at all
  if (!email || !email.trim()) {
    return 'Email is required';
  }

  // Check if the email follows the correct format (something@something.com)
  if (!VALIDATION_RULES.EMAIL.REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }

  // If everything looks good, return empty string (no error)
  return '';
};

/**
 * Validates a password for login (minimum length check)
 * For login, we just need to make sure the password is long enough
 * @param password - The password to validate
 * @returns Empty string if valid, error message otherwise
 */
export const validatePassword = (password: string): string => {
  // Check if the user entered a password
  if (!password) {
    return 'Password is required';
  }

  // Check if the password is long enough (at least 6 characters for login)
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long`;
  }

  // If the password is long enough, it's valid
  return '';
};

/**
 * Validates a password for signup (strength requirements)
 * For signup, we need a stronger password - it must have uppercase, lowercase, and numbers
 * @param password - The password to validate
 * @returns Empty string if valid, error message otherwise
 */
export const validateSignupPassword = (password: string): string => {
  // Check if the user entered a password
  if (!password) {
    return 'Password is required';
  }

  // Check if the password is at least 8 characters long
  if (password.length < VALIDATION_RULES.PASSWORD.SIGNUP_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD.SIGNUP_MIN_LENGTH} characters long`;
  }

  // Check if the password has at least one capital letter (A-Z)
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  // Check if the password has at least one lowercase letter (a-z)
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  // Check if the password has at least one number (0-9)
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }

  // If all checks pass, the password is valid
  return '';
};

/**
 * Validates a full name
 * Makes sure the name is not too short, not too long, and only contains allowed characters
 * @param name - The name to validate
 * @returns Empty string if valid, error message otherwise
 */
export const validateName = (name: string): string => {
  // Check if the user entered a name
  if (!name || !name.trim()) {
    return 'Name is required';
  }

  // Remove extra spaces at the beginning and end
  const trimmedName = name.trim();

  // Check if the name is at least 2 characters long
  if (trimmedName.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters long`;
  }

  // Check if the name is not too long (max 50 characters)
  if (trimmedName.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return `Name must be less than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`;
  }

  // Check if the name only contains letters, spaces, hyphens, and apostrophes
  // This allows names like "Mary-Jane O'Brien" but not "John123" or "Jane@Smith"
  if (!VALIDATION_RULES.NAME_REGEX.test(trimmedName)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // If all checks pass, the name is valid
  return '';
};

/**
 * Validates that the confirm password matches the original password
 * When users sign up, they type their password twice to make sure they didn't make a typo
 * This function checks if both passwords are exactly the same
 * @param password - The original password
 * @param confirmPassword - The password confirmation (what they typed the second time)
 * @returns Empty string if valid, error message otherwise
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  // Check if the user entered anything in the confirm password field
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  // Check if both passwords are exactly the same
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  // If they match, everything is good
  return '';
};

