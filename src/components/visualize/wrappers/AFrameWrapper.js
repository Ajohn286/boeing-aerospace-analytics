'use client';

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

// Only import ForceGraphVR after we confirm A-Frame is loaded
const ForceGraphVR = dynamic(
  () => import('react-force-graph-vr'),
  { ssr: false }
);

export default function AFrameWrapper({ isLoading, graphData, commonProps }) {
  const [isAframeReady, setIsAframeReady] = useState(false);
  const [showVrGraph, setShowVrGraph] = useState(false);

  // Check if AFRAME global is available and initialized
  useEffect(() => {
    // Function to check if A-Frame is loaded and ready
    const checkAframe = () => {
      if (typeof window !== 'undefined' && window.AFRAME) {
        console.log('A-Frame is available globally');
        setIsAframeReady(true);
        
        // We set a timeout to ensure AFRAME is fully initialized before rendering
        setTimeout(() => {
          setShowVrGraph(true);
        }, 500);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!checkAframe() && !isLoading) {
      // If not available yet, set up a polling mechanism
      const interval = setInterval(() => {
        if (checkAframe()) {
          clearInterval(interval);
        }
      }, 100);
      
      // Clean up interval
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading || !isAframeReady) {
    return (
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
          {isLoading ? 'Loading A-Frame library...' : 'Initializing VR environment...'}
        </Typography>
      </Box>
    );
  }

  // Only render ForceGraphVR when A-Frame is confirmed ready and showVrGraph is true
  if (!showVrGraph) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Preparing VR visualization...</Typography>
      </Box>
    );
  }

  return (
    <ForceGraphVR
      {...commonProps}
      width={800}
      height={440}
      backgroundColor="#f0f0f0"
      showNavInfo={true}
    />
  );
} 