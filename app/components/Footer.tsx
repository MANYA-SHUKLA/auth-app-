'use client';

import { Box, Container, Typography, IconButton, Link as MuiLink, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Language, WhatsApp } from '@mui/icons-material';

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverColor?: string;
}

/**
 * Footer component - Displays copyright and social media links
 * This appears at the bottom of every page
 */
export default function Footer() {
  // Get the current theme to check if we're in dark mode
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // List of social media links to display as icons
  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/MANYA-SHUKLA',
      label: 'GitHub',
      icon: <GitHub />,
    },
    {
      href: 'https://www.linkedin.com/in/manya-shukla-326724292/',
      label: 'LinkedIn',
      icon: <LinkedIn />,
    },
    {
      href: 'https://manya-shukla.vercel.app/',
      label: 'Portfolio',
      icon: <Language />,
    },
    {
      href: 'https://wa.me/918005586588',
      label: 'WhatsApp',
      icon: <WhatsApp />,
      hoverColor: '#25D366',
    },
  ];

  // Set the background color based on dark/light mode
  const backgroundGradient = isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
    : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)';

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto', // Push footer to the bottom
        py: 4, // Add padding top and bottom
        background: backgroundGradient,
        borderTop: isDark
          ? '1px solid rgba(99, 102, 241, 0.2)'
          : '1px solid rgba(99, 102, 241, 0.1)',
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        {/* Footer content - stacked on mobile, side by side on desktop */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Copyright text with link to portfolio */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Made with ❤️ by{' '}
            <MuiLink
              href="https://manya-shukla.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.dark',
                },
              }}
            >
              Manya Shukla
            </MuiLink>{' '}
            © 2025
          </Typography>

          {/* Social media icons - GitHub, LinkedIn, Portfolio, WhatsApp */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
            component="nav"
            aria-label="Social media links"
          >
            {/* Loop through each social link and create an icon button */}
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: link.hoverColor || 'primary.main',
                    backgroundColor: link.hoverColor
                      ? `rgba(${link.hoverColor === '#25D366' ? '37, 211, 102' : '99, 102, 241'}, 0.1)`
                      : 'action.hover',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
