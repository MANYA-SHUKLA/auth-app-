'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button, Fade, Slide } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ThemeToggle from '@/app/components/ThemeToggle';
import FloatingShapes from '@/app/components/FloatingShapes';
import { ROUTES } from '@/constants';

/**
 * Home page component - Landing page with navigation to login and signup
 * This is the first page users see when they visit the app
 */
export default function Home() {
  // Get the current theme to check if we're in dark mode or light mode
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Set different background colors based on whether it's dark mode or light mode
  // Dark mode uses darker blue/purple colors, light mode uses lighter pastel colors
  const backgroundGradient = isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
    : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)';

  // These are the three feature cards shown at the bottom of the page
  // Each card has a title, description, and a color for the title text
  const featureCards = [
    {
      title: '✨ Beautiful UI',
      description: 'Modern, elegant design with smooth animations',
      color: '#6366f1',
    },
    {
      title: '🔒 Secure Validation',
      description: 'Comprehensive form validation and security',
      color: '#8b5cf6',
    },
    {
      title: '🚀 Fast & Responsive',
      description: 'Optimized performance for all devices',
      color: '#ec4899',
    },
  ];

  return (
    // Main container that takes up the full screen and centers everything
    <Box
      className="min-h-screen flex items-center justify-center relative"
      sx={{
        background: backgroundGradient,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Theme toggle button in the top right corner */}
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
      {/* Animated floating shapes in the background */}
      <FloatingShapes />
      {/* Main content container with a maximum width */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Slide animation for the entire content area */}
        <Slide direction="down" in={true} timeout={600}>
          <Box className="text-center space-y-8">
            {/* Fade in animation for the image */}
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

            {/* Main heading with gradient text effect - fades in after the image */}
            <Fade in={true} timeout={1000}>
              <Typography
                variant="h2"
                sx={{
                  // Create a colorful gradient text effect (indigo to purple to pink)
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  // Make text smaller on mobile, larger on desktop
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  mb: 4,
                }}
              >
                Welcome to Auth App
              </Typography>
            </Fade>

            {/* Subtitle text that describes what the app does */}
            <Fade in={true} timeout={1200}>
              <Typography
                variant="h6"
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  maxWidth: '600px',
                  margin: '0 auto 2rem',
                }}
              >
                Experience beautiful, elegant authentication with smooth animations and modern
                design
              </Typography>
            </Fade>

            {/* Sign In and Sign Up buttons - arranged side by side on larger screens, stacked on mobile */}
            <Fade in={true} timeout={1400}>
              <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Link to the login page */}
                <Link href={ROUTES.LOGIN} className="w-full sm:w-auto">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Login />}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      padding: '14px 32px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                      width: { xs: '100%', sm: 'auto' },
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

                {/* Link to the signup page */}
                <Link href={ROUTES.SIGNUP} className="w-full sm:w-auto">
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PersonAdd />}
                    sx={{
                      borderColor: '#6366f1',
                      borderWidth: '2px',
                      color: '#6366f1',
                      padding: '14px 32px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      width: { xs: '100%', sm: 'auto' },
                      // When user hovers, make the button slightly bigger and change colors
                      '&:hover': {
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        transform: 'translateY(-2px) scale(1.05)',
                      },
                      // When user clicks, return to normal size
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

            {/* Three feature cards showing what the app offers - one column on mobile, three columns on desktop */}
            <Fade in={true} timeout={1600}>
              <Box className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Loop through each feature card and display it */}
                {featureCards.map((card, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: isDark
                        ? 'rgba(30, 41, 59, 0.6)'
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: isDark
                        ? '1px solid rgba(99, 102, 241, 0.2)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      padding: 3,
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
                      sx={{ color: card.color, fontWeight: 600, mb: 1 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {card.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Fade>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
}
