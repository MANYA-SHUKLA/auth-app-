'use client';

import { useState, useCallback, useMemo } from 'react';
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
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  CheckCircle,
} from '@mui/icons-material';
import Link from 'next/link';
import {
  validateEmail,
  validateSignupPassword,
  validateName,
  validateConfirmPassword,
} from '@/lib/validation';
import { calculatePasswordStrength } from '@/lib/password-strength';
import { motion } from 'framer-motion';
import FloatingShapes from '@/app/components/FloatingShapes';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useTheme } from '@mui/material/styles';
import { ROUTES, API_DELAYS } from '@/constants';
import type { FormSubmitState } from '@/types';

/**
 * Signup page component - Handles new user registration
 * Users create a new account by entering their name, email, and password
 */
export default function SignupPage() {
  // Get the current theme to check if we're in dark mode
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Store what the user types in each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Track whether passwords should be visible or hidden
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Store error messages for each field
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Track the form submission state
  const [submitState, setSubmitState] = useState<FormSubmitState>({
    isSubmitting: false,
    error: '',
    success: false,
  });

  // Calculate how strong the password is (weak, fair, good, or strong)
  // This only recalculates when the password changes, not on every render
  const passwordStrength = useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      setNameError('');
    }
    if (value) {
      setNameError(validateName(value));
    }
  }, [nameError]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
    if (value) {
      setEmailError(validateEmail(value));
    }
  }, [emailError]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError('');
    }
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(value, confirmPassword));
    }
    if (value) {
      setPasswordError(validateSignupPassword(value));
    }
  }, [passwordError, confirmPassword]);

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmPassword(value);
      if (confirmPasswordError) {
        setConfirmPasswordError('');
      }
      if (value) {
        setConfirmPasswordError(validateConfirmPassword(password, value));
      }
    },
    [confirmPasswordError, password]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSubmitState({ isSubmitting: false, error: '', success: false });

      const nameValidation = validateName(name);
      const emailValidation = validateEmail(email);
      const passwordValidation = validateSignupPassword(password);
      const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

      setNameError(nameValidation);
      setEmailError(emailValidation);
      setPasswordError(passwordValidation);
      setConfirmPasswordError(confirmPasswordValidation);

      if (nameValidation || emailValidation || passwordValidation || confirmPasswordValidation) {
        return;
      }

      setSubmitState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        await new Promise((resolve) => setTimeout(resolve, API_DELAYS.SIGNUP));
        setSubmitState({ isSubmitting: false, error: '', success: true });

        setTimeout(() => {
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setSubmitState({ isSubmitting: false, error: '', success: false });
        }, API_DELAYS.SUCCESS_MESSAGE);
      } catch {
        setSubmitState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: 'Signup failed. Please try again.',
        }));
      }
    },
    [name, email, password, confirmPassword]
  );

  const backgroundGradient = isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
    : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)';

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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop&q=80"
                  alt="Signup illustration"
                  width={200}
                  height={150}
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
                  Create Your Account
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Join us today and start your journey
                </Typography>
              </Box>
            </Fade>

            {submitState.success && (
              <Fade in={submitState.success}>
                <Alert
                  severity="success"
                  icon={<CheckCircle />}
                  className="mb-6 rounded-xl"
                  sx={{ borderRadius: '12px' }}
                >
                  Account created successfully! Welcome aboard!
                </Alert>
              </Fade>
            )}

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
              <Box component="form" onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={() => {
                      if (name) {
                        setNameError(validateName(name));
                      }
                    }}
                    error={!!nameError}
                    helperText={nameError}
                    placeholder="Manya Shukla"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person className="text-indigo-500" />
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

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
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

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Box>
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => {
                        if (password) {
                          setPasswordError(validateSignupPassword(password));
                        }
                      }}
                      error={!!passwordError}
                      helperText={
                        passwordError || 'Must be 8+ chars with uppercase, lowercase, and number'
                      }
                      placeholder="Create a strong password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock className="text-indigo-500" />
                          </InputAdornment>
                        ),
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

                    {/* Show password strength indicator only when user has typed something */}
                    {password && (
                      <Fade in={!!password}>
                        <Box className="mt-2">
                          {/* Label and strength text (Weak, Fair, Good, or Strong) */}
                          <Box className="flex items-center justify-between mb-1">
                            <Typography
                              variant="caption"
                              sx={{ fontSize: '0.75rem', color: '#6b7280' }}
                            >
                              Password Strength:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: passwordStrength.color,
                              }}
                            >
                              {passwordStrength.label}
                            </Typography>
                          </Box>
                          {/* Progress bar showing password strength visually */}
                          <Box
                            className="h-2 rounded-full bg-gray-200 overflow-hidden"
                            sx={{
                              backgroundColor: '#e5e7eb',
                              borderRadius: '9999px',
                              height: '8px',
                            }}
                          >
                            {/* The colored bar that fills based on strength (0-100% width) */}
                            <Box
                              className="h-full rounded-full transition-all duration-500"
                              sx={{
                                width: `${(passwordStrength.strength / 5) * 100}%`,
                                backgroundColor: passwordStrength.color,
                                height: '100%',
                                borderRadius: '9999px',
                                transition: 'all 0.5s ease-in-out',
                              }}
                            />
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => {
                      if (confirmPassword) {
                        setConfirmPasswordError(
                          validateConfirmPassword(password, confirmPassword)
                        );
                      }
                    }}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    placeholder="Re-enter your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-indigo-500" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            aria-label="toggle confirm password visibility"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                              },
                            }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
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
                    {submitState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Box className="text-center mt-6">
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Already have an account?{' '}
                      <Link
                        href={ROUTES.LOGIN}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 hover:underline"
                      >
                        Sign in
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
