'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/lib/validation';
import { motion } from 'framer-motion';
import FloatingShapes from '@/app/components/FloatingShapes';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useTheme } from '@mui/material/styles';
import { ROUTES, API_DELAYS } from '@/constants';
import type { FormSubmitState } from '@/types';

/**
 * Login page component - Handles user authentication
 * Users enter their email and password to sign in to their account
 */
export default function LoginPage() {
  // Get the current theme to check if we're in dark mode
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Store what the user types in the email field
  const [email, setEmail] = useState('');
  // Store what the user types in the password field
  const [password, setPassword] = useState('');
  // Track whether the password should be visible or hidden (eye icon toggle)
  const [showPassword, setShowPassword] = useState(false);
  // Store any error message for the email field (like "email is invalid")
  const [emailError, setEmailError] = useState('');
  // Store any error message for the password field (like "password too short")
  const [passwordError, setPasswordError] = useState('');
  // Track the form submission state - whether it's submitting, if there's an error, or if it succeeded
  const [submitState, setSubmitState] = useState<FormSubmitState>({
    isSubmitting: false,
    error: '',
    success: false,
  });

  // This function runs every time the user types in the email field
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update the email state with what the user typed
    setEmail(value);
    // If there was an error before, clear it when they start typing again
    if (emailError) {
      setEmailError('');
    }
    // If they've typed something, check if it's a valid email
    if (value) {
      setEmailError(validateEmail(value));
    }
  }, [emailError]);

  // This function runs every time the user types in the password field
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update the password state with what the user typed
    setPassword(value);
    // If there was an error before, clear it when they start typing again
    if (passwordError) {
      setPasswordError('');
    }
    // If they've typed something, check if it meets the minimum requirements
    if (value) {
      setPasswordError(validatePassword(value));
    }
  }, [passwordError]);

  // This function runs when the user clicks the "Sign In" button
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting normally (which would refresh the page)
    e.preventDefault();

    // Reset any previous error or success messages
    setSubmitState({ isSubmitting: false, error: '', success: false });

    // Check if both email and password are valid
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Show any validation errors to the user
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    // If there are any errors, stop here and don't try to log in
    if (emailValidation || passwordValidation) {
      return;
    }

    // Mark that we're now trying to log in (this disables the button and shows "Signing in...")
    setSubmitState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Simulate sending the login request to a server (in a real app, this would be an API call)
      await new Promise((resolve) => setTimeout(resolve, API_DELAYS.LOGIN));
      // If successful, show a success message
      setSubmitState({ isSubmitting: false, error: '', success: true });

      // After showing success, clear the form and reset everything
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setSubmitState({ isSubmitting: false, error: '', success: false });
      }, API_DELAYS.SUCCESS_MESSAGE);
    } catch {
      // If something went wrong, show an error message
      setSubmitState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: 'Login failed. Please try again.',
      }));
    }
  }, [email, password]);

  // Set the background color based on dark/light mode
  const backgroundGradient = isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
    : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)';

  // Styles for the main form container (the white/dark card)
  const paperStyles = {
    background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: isDark
      ? '0 20px 60px rgba(0, 0, 0, 0.5)'
      : '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      sx={{
        background: backgroundGradient,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <ThemeToggle />
      </Box>
      <FloatingShapes />
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Paper
            elevation={0}
            component={motion.div}
            whileHover={{
              scale: 1.02,
              boxShadow: isDark
                ? '0 25px 70px rgba(99, 102, 241, 0.3)'
                : '0 25px 70px rgba(99, 102, 241, 0.2)',
            }}
            className="p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm"
            sx={paperStyles}
          >
            <Fade in={true} timeout={700}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
                suppressHydrationWarning
              >
                <Image
                  src="https://images.unsplash.com/photo-1633265486064-086b219458ec?w=300&h=200&fit=crop&q=80"
                  alt="Login illustration"
                  width={200}
                  height={150}
                  loading="eager"
                  style={{
                    borderRadius: '16px',
                    objectFit: 'cover',
                    width: '200px',
                    height: '150px',
                    boxShadow: isDark
                      ? '0 8px 30px rgba(99, 102, 241, 0.3)'
                      : '0 8px 30px rgba(99, 102, 241, 0.2)',
                  }}
                  unoptimized
                />
              </Box>
            </Fade>

            <Fade in={true} timeout={800}>
              <Box className="text-center mb-8">
                <Typography
                  variant="h4"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    mb: 2,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Sign in to your account to continue
                </Typography>
              </Box>
            </Fade>

            {/* Show a green success message if login was successful */}
            {submitState.success && (
              <Fade in={submitState.success}>
                <Alert
                  severity="success"
                  className="mb-6 rounded-xl"
                  sx={{ borderRadius: '12px' }}
                >
                  Login successful! Redirecting...
                </Alert>
              </Fade>
            )}

            {/* Show a red error message if something went wrong */}
            {submitState.error && (
              <Fade in={!!submitState.error}>
                <Alert
                  severity="error"
                  className="mb-6 rounded-xl"
                  sx={{ borderRadius: '12px' }}
                >
                  {submitState.error}
                </Alert>
              </Fade>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* The login form with email and password fields */}
              <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                {/* Email input field with animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    // When user clicks away from the field, validate the email one more time
                    onBlur={() => {
                      if (email) {
                        setEmailError(validateEmail(email));
                      }
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    placeholder="shuklamanya99@gmail.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className="text-indigo-500" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#6366f1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6366f1',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6366f1',
                      },
                    }}
                    className="transition-all duration-300"
                  />
                </motion.div>

                {/* Password input field with show/hide toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    // Show password as text or dots based on the toggle
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    // When user clicks away from the field, validate the password one more time
                    onBlur={() => {
                      if (password) {
                        setPasswordError(validatePassword(password));
                      }
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                    placeholder="Enter your password"
                    InputProps={{
                      // Lock icon on the left side
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-indigo-500" />
                        </InputAdornment>
                      ),
                      // Eye icon on the right side to toggle password visibility
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            aria-label="toggle password visibility"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                              },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#6366f1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6366f1',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6366f1',
                      },
                    }}
                    className="transition-all duration-300"
                  />
                </motion.div>

                {/* Submit button - disabled while the form is being submitted */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    // Disable the button while we're trying to log in
                    disabled={submitState.isSubmitting}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                      mt: 3,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                      '&.Mui-disabled': {
                        background: '#9ca3af',
                      },
                    }}
                  >
                    {submitState.isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </motion.div>

                {/* Link to the signup page for users who don't have an account yet */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Box className="text-center mt-6">
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Don&apos;t have an account?{' '}
                      <Link
                        href={ROUTES.SIGNUP}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 hover:underline"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
