import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MUIThemeProvider from './providers/theme-provider';
import LayoutWrapper from './components/LayoutWrapper';
import { THEME_STORAGE_KEY } from '@/constants';

// Load the Geist Sans font (the main font for the app)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load the Geist Mono font (for code/monospace text if needed)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Information about the app that shows up in browser tabs and search results
export const metadata: Metadata = {
  title: "Auth App - Login & Signup by Manya Shukla",
  description: "Beautiful and elegant login and signup pages with Material UI and Tailwind CSS",
};

/**
 * Root layout component - This wraps every page in the app
 * It sets up fonts, theme, and the overall page structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This is needed for Material UI's emotion styling to work properly */}
        <meta name="emotion-insertion-point" content="" />
        {/* This script runs before React loads to prevent theme flashing
            It checks if the user has a saved theme preference and applies it immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('${THEME_STORAGE_KEY}');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Theme provider wraps everything to manage light/dark mode */}
        <MUIThemeProvider>
          {/* Layout wrapper adds the footer and overall page structure */}
          <LayoutWrapper>
            {/* This is where each page's content gets rendered */}
            {children}
          </LayoutWrapper>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
