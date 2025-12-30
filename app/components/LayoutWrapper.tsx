'use client';

import { Box } from '@mui/material';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Layout wrapper component - Provides consistent layout structure with footer
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      suppressHydrationWarning
    >
      <Box component="main" sx={{ flex: 1 }} suppressHydrationWarning>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
