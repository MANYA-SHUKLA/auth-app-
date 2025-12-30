'use client';

import { Box, Container, Typography, IconButton, Link as MuiLink, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Language, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';

// This is the footer that appears at the bottom of every page
// It shows who made the app and links to social media profiles
export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf2f8 100%)',
        borderTop: isDark
          ? '1px solid rgba(99, 102, 241, 0.2)'
          : '1px solid rgba(99, 102, 241, 0.1)',
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Shows "Made with ❤️ by Manya Shukla © 2025" */}
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

          {/* Icons that link to GitHub, LinkedIn, Portfolio, and WhatsApp */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {/* GitHub */}
            <IconButton
              component="a"
              href="https://github.com/MANYA-SHUKLA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <GitHub />
            </IconButton>

            {/* LinkedIn */}
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/manya-shukla-326724292/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <LinkedIn />
            </IconButton>

            {/* Portfolio */}
            <IconButton
              component="a"
              href="https://manya-shukla.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Language />
            </IconButton>

            {/* WhatsApp */}
            <IconButton
              component="a"
              href={`https://wa.me/918005586588`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: '#25D366',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <WhatsApp />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

