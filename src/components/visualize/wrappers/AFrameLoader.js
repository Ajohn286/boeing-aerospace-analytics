'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Script from 'next/script';

const AFrameLoader = ({ children }) => {
  const [isAframeLoaded, setIsAframeLoaded] = useState(false);
  const [isAframeReady, setIsAframeReady] = useState(false);

  // Handle script load notification
  const handleScriptLoad = () => {
    console.log('A-Frame script loaded successfully');
    setIsAframeLoaded(true);
  };

  // Check for AFRAME global and initialize after it loads
  useEffect(() => {
    if (!isAframeLoaded) return;

    // Function to check if AFRAME global exists
    const checkAframe = () => {
      if (typeof window !== 'undefined' && window.AFRAME) {
        console.log('A-Frame is available globally');
        // Wait a bit before rendering VR content to ensure complete initialization
        setTimeout(() => {
          setIsAframeReady(true);
        }, 500);
        return true;
      }
      return false;
    };

    // First check immediately
    if (!checkAframe()) {
      // If not available yet, poll every 100ms
      const interval = setInterval(() => {
        if (checkAframe()) {
          clearInterval(interval);
        }
      }, 100);
      
      // Clean up interval
      return () => clearInterval(interval);
    }
  }, [isAframeLoaded]);

  // If A-Frame is not ready, show loading indicator
  if (!isAframeReady) {
    return (
      <>
        <Script 
          src="https://unpkg.com/aframe@1.4.2/dist/aframe.min.js" 
          strategy="beforeInteractive"
          onLoad={handleScriptLoad}
        />
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            p: 3 
          }}
        >
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Loading VR components...
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {isAframeLoaded ? 'Initializing VR environment...' : 'Loading A-Frame library...'}
          </Typography>
        </Box>
      </>
    );
  }

  // A-Frame is ready, render children
  return children;
};

export default AFrameLoader; 