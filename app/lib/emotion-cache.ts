'use client';

import createCache from '@emotion/cache';

// Create a cache for Emotion styles that works with Next.js App Router
// This prevents hydration mismatches by ensuring consistent style injection
const emotionCache = createCache({ 
  key: 'css',
  prepend: true,
});

export default emotionCache;

