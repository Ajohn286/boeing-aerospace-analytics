'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import {
  Map,
  Assessment,
  AccountTree,
  RemoveRedEye,
  AutoGraph,
  Flight,
  Build,
  Speed,
  Engineering,
  Psychology
} from '@mui/icons-material';
import dynamic from 'next/dynamic';

// Make ControlTower also dynamic to avoid SSR issues
const ControlTower = dynamic(
  () => import('../components/ControlTower'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    )
  }
);

// Import the components dynamically to avoid SSR issues
const NetworkViewComponent = dynamic(
  () => import('./network-view/page'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }
);

const SupplyChainOptimizationComponent = dynamic(
  () => import('./supply-chain-optimization/page'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }
);

const FPAIntegrationComponent = dynamic(
  () => import('./fpa-integration/page'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }
);

const ComputerVisionComponent = dynamic(
  () => import('./analytics/computer-vision'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }
);

const DemandForecastingComponent = dynamic(
  () => import('./analytics/demand-forecasting'),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }
);

// Wrapper components that remove the duplicate headers
const NetworkViewWrapper = () => (
  <Box 
    sx={{ 
      '& > div > div:first-of-type': { display: 'none' }, // Hide the header section
      '& .leaflet-container': { height: '600px' }
    }}
  >
    <NetworkViewComponent />
  </Box>
);

const SupplyChainWrapper = () => (
  <Box sx={{ 
    minHeight: '400px', // Ensure minimum height
    p: 2 // Add some padding
  }}>
    <SupplyChainOptimizationComponent />
  </Box>
);

const FPAWrapper = () => (
  <Box sx={{ 
    '& > div > h4': { display: 'none' }, // Hide only the h4 title
    '& > div > p:first-of-type': { display: 'none' } // Hide the description paragraph
  }}>
    <FPAIntegrationComponent />
  </Box>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
      style={{ height: '100%', width: '100%' }}
    >
      {value === index && (
        <Box sx={{ 
          height: '100%', 
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration is complete before rendering dynamic content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading Boeing Fleet Control Tower...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Control Tower Section */}
      <ControlTower />
      
      {/* Analytics Dashboard Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 3, pb: 2, backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Image 
              src="/images/Boeing.png" 
              alt="Boeing Logo" 
              width={80} 
              height={50}
              style={{ objectFit: 'contain' }}
            />
            <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
              Boeing Maintenance Analytics Dashboard
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Comprehensive analytics hub for Boeing aircraft fleet monitoring, predictive maintenance, and operational optimization
          </Typography>
        </Box>

        <Paper square elevation={0}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ 
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                gap: 1.5
              }
            }}
          >
            <Tab 
              icon={<RemoveRedEye />} 
              label="Aircraft Health Monitoring" 
              iconPosition="start"
            />
            <Tab 
              icon={<Map />} 
              label="Fleet Network View" 
              iconPosition="start"
            />
            <Tab 
              icon={<Assessment />} 
              label="Maintenance Optimization" 
              iconPosition="start"
            />
            <Tab 
              icon={<AccountTree />} 
              label="Predictive Analytics" 
              iconPosition="start"
            />
            <Tab 
              icon={<AutoGraph />} 
              label="Engine Performance Forecasting" 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          position: 'relative',
          width: '100%'
        }}>
          <TabPanel value={activeTab} index={0}>
            <ComputerVisionComponent />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <NetworkViewWrapper />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <SupplyChainWrapper />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <FPAWrapper />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <DemandForecastingComponent />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
