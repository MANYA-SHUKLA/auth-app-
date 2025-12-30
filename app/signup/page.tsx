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
import { motion } from 'framer-motion';
import FloatingShapes from '@/app/components/FloatingShapes';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useTheme } from '@mui/material/styles';

// This is the signup page where new users create an account
// It checks that all the information is valid and shows how strong the password is
export default function SignupPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Keep track of what the user types in all the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Keep track of any errors to show the user
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Keep track of whether we're submitting the form and if it was successful
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Figure out how strong the password is (weak, fair, good, or strong)
  // This checks if it has uppercase, lowercase, numbers, and special characters
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 2) {
      return { strength, label: 'Weak', color: '#ef4444' };
    } else if (strength <= 3) {
      return { strength, label: 'Fair', color: '#f59e0b' };
    } else if (strength <= 4) {
      return { strength, label: 'Good', color: '#3b82f6' };
    } else {
      return { strength, label: 'Strong', color: '#10b981' };
    }
  };

  const passwordStrength = getPasswordStrength();

  // When the user types in the name field, check if it's valid
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    if (nameError) {
      setNameError('');
    }
    
    if (value) {
      const error = validateName(value);
      setNameError(error);
    }
  };

  // When the user types in the email field, check if it's valid
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError) {
      setEmailError('');
    }
    
    if (value) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  // When the user types in the password field, check if it's valid
  // Also check if it matches the confirm password field
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (passwordError) {
      setPasswordError('');
    }
    
    // If they've already typed a confirm password, check if it still matches
    if (confirmPassword) {
      const error = validateConfirmPassword(value, confirmPassword);
      setConfirmPasswordError(error);
    }
    
    if (value) {
      const error = validateSignupPassword(value);
      setPasswordError(error);
    }
  };

  // When the user types in the confirm password field, check if it matches the password
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
    
    if (value) {
      const error = validateConfirmPassword(password, value);
      setConfirmPasswordError(error);
    }
  };

  // When the user clicks the signup button, check everything and create their account
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any old error or success messages
    setSubmitError('');
    setSubmitSuccess(false);
    
    // Make sure all the fields are filled out correctly
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validateSignupPassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword
    );
    
    setNameError(nameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);
    
    // If something is wrong, stop here and show the errors
    if (
      nameValidation ||
      emailValidation ||
      passwordValidation ||
      confirmPasswordValidation
    ) {
      return;
    }
    
    // Show that we're trying to create the account
    setIsSubmitting(true);
    
    // In a real app, this would send the signup info to a server
    // For now, we just wait a moment to simulate that
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real application, you would make an API call here
      // const response = await fetch('/api/signup', { ... });
      
      setSubmitSuccess(true);
      
      // Clear the form after showing success message
      setTimeout(() => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      setSubmitError('Signup failed. Please try again.');
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
            {/* The "Create Your Account" heading at the top of the form */}
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
                  Create Your Account
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ color: '#6b7280' }}
                >
                  Join us today and start your journey
                </Typography>
              </Box>
            </Fade>

            {/* Show a green success message if signup worked, or red if something went wrong */}
            {submitSuccess && (
              <Fade in={submitSuccess}>
                <Alert
                  severity="success"
                  icon={<CheckCircle />}
                  className="mb-6 rounded-xl"
                  sx={{
                    borderRadius: '12px',
                    animation: 'slideIn 0.3s ease-out',
                  }}
                >
                  Account created successfully! Welcome aboard!
                </Alert>
              </Fade>
            )}

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

            {/* The form with all the input fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box component="form" onSubmit={handleSubmit} className="space-y-5">
                {/* Where the user types their full name */}
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

                {/* Where the user types their email address */}
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

                {/* Where the user creates their password */}
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
                    helperText={passwordError || 'Must be 8+ chars with uppercase, lowercase, and number'}
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
                  
                  {/* Shows how strong the password is (weak, fair, good, or strong) */}
                  {password && (
                    <Fade in={!!password}>
                      <Box className="mt-2">
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
                        <Box
                          className="h-2 rounded-full bg-gray-200 overflow-hidden"
                          sx={{
                            backgroundColor: '#e5e7eb',
                            borderRadius: '9999px',
                            height: '8px',
                          }}
                        >
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

                {/* Where the user types their password again to make sure it's correct */}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          className="text-gray-500 hover:text-indigo-600 transition-colors"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            },
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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

                {/* The "Create Account" button that submits the form */}
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
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
                </motion.div>

                {/* Link to go to the login page if they already have an account */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Box className="text-center mt-6">
                    <Typography variant="body2" className="text-gray-600">
                      Already have an account?{' '}
                      <Link
                        href="/login"
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

