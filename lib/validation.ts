// These functions check if the information users type is correct
// They're used on both the login and signup pages

// Checks if the email address looks valid (has @ and a domain)
export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email is required';
  }
  
  // This pattern checks if it looks like an email (something@something.com)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return '';
};

// Checks if the password is long enough for login (at least 6 characters)
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return '';
};

// Checks if the password is strong enough for signup
// It needs to be at least 8 characters and have uppercase, lowercase, and a number
export const validateSignupPassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  // Make sure it has at least one capital letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  // Make sure it has at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  // Make sure it has at least one number
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return '';
};

// Checks if the name is valid (not too short, not too long, only letters and spaces)
export const validateName = (name: string): string => {
  if (!name) {
    return 'Name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (name.trim().length > 50) {
    return 'Name must be less than 50 characters';
  }
  
  // Only allow letters, spaces, hyphens, and apostrophes (like "Mary-Jane O'Brien")
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  
  return '';
};

// Checks if the confirm password matches the original password
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return '';
};

