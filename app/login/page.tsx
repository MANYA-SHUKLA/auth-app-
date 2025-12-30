'use client';

import { useState } from 'react';
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
  Slide,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/lib/validation';
import { motion } from 'framer-motion';
import FloatingShapes from '@/app/components/FloatingShapes';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useTheme } from '@mui/material/styles';

// This is the login page where users sign in to their account
// It checks that the email and password are valid before submitting
export default function LoginPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Keep track of what the user types in the email and password fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Keep track of any errors to show the user (like "email is invalid")
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Keep track of whether we're submitting the form and if it was successful
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // When the user types in the email field, check if it's valid
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Remove any error message when they start typing again
    if (emailError) {
      setEmailError('');
    }
    
    // Check if the email looks valid as they type
    if (value) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  // When the user types in the password field, check if it's valid
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Remove any error message when they start typing again
    if (passwordError) {
      setPasswordError('');
    }
    
    // Check if the password is long enough as they type
    if (value) {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  // When the user clicks the login button, check everything and try to log them in
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any old error or success messages
    setSubmitError('');
    setSubmitSuccess(false);
    
    // Make sure both email and password are valid
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    
    // If something is wrong, stop here and show the errors
    if (emailValidation || passwordValidation) {
      return;
    }
    
    // Show that we're trying to log in
    setIsSubmitting(true);
    
    // In a real app, this would send the login info to a server
    // For now, we just wait a moment to simulate that
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real application, you would make an API call here
      // const response = await fetch('/api/login', { ... });
      
      setSubmitSuccess(true);
      
      // Clear the form after showing success message
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      setSubmitError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)',
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
            sx={{
              background: isDark
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              boxShadow: isDark
                ? '0 20px 60px rgba(0, 0, 0, 0.5)'
                : '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Decorative image at the top */}
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
            {/* The "Welcome Back" heading at the top of the form */}
            <Fade in={true} timeout={800}>
              <Box className="text-center mb-8">
                <Typography
                  variant="h4"
                  className="mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ color: '#6b7280' }}
                >
                  Sign in to your account to continue
                </Typography>
              </Box>
            </Fade>

            {/* Show a green success message if login worked */}
            {submitSuccess && (
              <Fade in={submitSuccess}>
                <Alert
                  severity="success"
                  className="mb-6 rounded-xl"
                  sx={{
                    borderRadius: '12px',
                    animation: 'slideIn 0.3s ease-out',
                  }}
                >
                  Login successful! Redirecting...
                </Alert>
              </Fade>
            )}

            {/* Show a red error message if something went wrong */}
            {submitError && (
              <Fade in={!!submitError}>
                <Alert
                  severity="error"
                  className="mb-6 rounded-xl"
                  sx={{
                    borderRadius: '12px',
                    animation: 'slideIn 0.3s ease-out',
                  }}
                >
                  {submitError}
                </Alert>
              </Fade>
            )}

            {/* The form with email and password fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                {/* Where the user types their email address */}
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

                {/* Where the user types their password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => {
                    if (password) {
                      setPasswordError(validatePassword(password));
                    }
                  }}
                  error={!!passwordError}
                  helperText={passwordError}
                  placeholder="Enter your password"
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
                          className="text-gray-500 hover:text-indigo-600 transition-colors"
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

                {/* The "Sign In" button that submits the form */}
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
                    disabled={isSubmitting}
                    className="py-3 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
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
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </motion.div>

                {/* Link to go to the signup page if they don't have an account */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Box className="text-center mt-6">
                    <Typography variant="body2" className="text-gray-600">
                      Don&apos;t have an account?{' '}
                      <Link
                        href="/signup"
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

