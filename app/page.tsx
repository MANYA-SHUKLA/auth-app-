'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button, Fade, Slide } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ThemeToggle from '@/app/components/ThemeToggle';
import FloatingShapes from '@/app/components/FloatingShapes';

// This is the home page - the first thing people see when they visit
// It has buttons to go to the login or signup pages
export default function Home() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box
      className="min-h-screen flex items-center justify-center relative"
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="down" in={true} timeout={600}>
          <Box className="text-center space-y-8">
            {/* Decorative image at the top */}
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 4,
                }}
                suppressHydrationWarning
              >
                <Image
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&q=80"
                  alt="Authentication illustration"
                  width={300}
                  height={200}
                  loading="eager"
                  priority
                  style={{
                    borderRadius: '20px',
                    objectFit: 'cover',
                    width: '300px',
                    height: '200px',
                    boxShadow: isDark
                      ? '0 10px 40px rgba(99, 102, 241, 0.3)'
                      : '0 10px 40px rgba(99, 102, 241, 0.2)',
                  }}
                  unoptimized
                />
              </Box>
            </Fade>
            {/* The big "Welcome to Auth App" heading at the top */}
            <Fade in={true} timeout={1000}>
              <Typography
                variant="h2"
                className="mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                }}
              >
                Welcome to Auth App
              </Typography>
            </Fade>

            {/* The description text below the heading */}
            <Fade in={true} timeout={1200}>
              <Typography
                variant="h6"
                className="text-gray-600 mb-8"
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  maxWidth: '600px',
                  margin: '0 auto 2rem',
                }}
              >
                Experience beautiful, elegant authentication with smooth
                animations and modern design
              </Typography>
            </Fade>

            {/* The "Sign In" and "Sign Up" buttons */}
            <Fade in={true} timeout={1400}>
              <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Login />}
                    className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      padding: '14px 32px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                        transform: 'translateY(-2px) scale(1.05)',
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PersonAdd />}
                    className="w-full sm:w-auto py-3 px-8 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                    sx={{
                      borderColor: '#6366f1',
                      borderWidth: '2px',
                      color: '#6366f1',
                      padding: '14px 32px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        transform: 'translateY(-2px) scale(1.05)',
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(1)',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </Fade>

            {/* Three boxes showing what the app can do */}
            <Fade in={true} timeout={1600}>
              <Box className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Box
                  className="p-6 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  sx={{
                    background: isDark
                      ? 'rgba(30, 41, 59, 0.6)'
                      : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: isDark
                      ? '1px solid rgba(99, 102, 241, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow: isDark
                        ? '0 20px 40px rgba(99, 102, 241, 0.3)'
                        : '0 20px 40px rgba(99, 102, 241, 0.15)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    className="mb-2 text-indigo-600 font-semibold"
                    sx={{ color: '#6366f1', fontWeight: 600 }}
                  >
                    ✨ Beautiful UI
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Modern, elegant design with smooth animations
                  </Typography>
                </Box>

                <Box
                  className="p-6 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  sx={{
                    background: isDark
                      ? 'rgba(30, 41, 59, 0.6)'
                      : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: isDark
                      ? '1px solid rgba(99, 102, 241, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow: isDark
                        ? '0 20px 40px rgba(99, 102, 241, 0.3)'
                        : '0 20px 40px rgba(99, 102, 241, 0.15)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    className="mb-2 text-purple-600 font-semibold"
                    sx={{ color: '#8b5cf6', fontWeight: 600 }}
                  >
                    🔒 Secure Validation
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Comprehensive form validation and security
                  </Typography>
                </Box>

                <Box
                  className="p-6 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  sx={{
                    background: isDark
                      ? 'rgba(30, 41, 59, 0.6)'
                      : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: isDark
                      ? '1px solid rgba(99, 102, 241, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow: isDark
                        ? '0 20px 40px rgba(99, 102, 241, 0.3)'
                        : '0 20px 40px rgba(99, 102, 241, 0.15)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    className="mb-2 text-pink-600 font-semibold"
                    sx={{ color: '#ec4899', fontWeight: 600 }}
                  >
                    🚀 Fast & Responsive
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Optimized performance for all devices
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
}
