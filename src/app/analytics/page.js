'use client';

import { useState } from 'react';
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

// Import the components dynamically to avoid SSR issues
const NetworkViewComponent = dynamic(
  () => import('../network-view/page'),
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
  () => import('../supply-chain-optimization/page'),
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
  () => import('../fpa-integration/page'),
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
  () => import('./computer-vision'),
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
  () => import('./demand-forecasting'),
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
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ height: '100%', position: 'relative' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ p: 3, pb: 2, backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4" gutterBottom>
          Boeing Manufacturing Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive analytics hub for Boeing manufacturing operations, predictive maintenance, and production optimization
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
            icon={<Map />} 
            label="Manufacturing Network View" 
            iconPosition="start"
          />
          <Tab 
            icon={<Assessment />} 
            label="Production Optimization" 
            iconPosition="start"
          />
          <Tab 
            icon={<AccountTree />} 
            label="Predictive Analytics" 
            iconPosition="start"
          />
          <Tab 
            icon={<RemoveRedEye />} 
            label="Equipment Health Monitoring" 
            iconPosition="start"
          />
          <Tab 
            icon={<AutoGraph />} 
            label="Production Forecasting" 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <TabPanel value={activeTab} index={0}>
          <NetworkViewWrapper />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <SupplyChainWrapper />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <FPAWrapper />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <ComputerVisionComponent />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <DemandForecastingComponent />
        </TabPanel>
      </Box>
    </Box>
  );
} 