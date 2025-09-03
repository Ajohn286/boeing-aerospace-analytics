'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Tabs,
  Tab,
  Button,
  CircularProgress
} from '@mui/material';
import MasterTables from '@/components/transform/MasterTables';
import OntologyMapping from '@/components/transform/OntologyMapping';
import DataProfiling from '@/components/transform/DataProfiling';
import DataLineage from '@/components/transform/DataLineage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`transform-tabpanel-${index}`}
      aria-labelledby={`transform-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function DataTransformationView({ onProceedToVisualization }) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transformationComplete, setTransformationComplete] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCompleteTransformation = () => {
    setIsLoading(true);
    // Use Promise to handle the transformation more reliably
    new Promise((resolve) => {
      setTimeout(resolve, 2000);
    })
      .then(() => {
        setIsLoading(false);
        setTransformationComplete(true);
      })
      .catch(() => {
        setIsLoading(false);
        // Handle error if needed
      });
  };

  const handleProceedToVisualization = () => {
    // Switch to the Overview visualization tab (index 2)
    if (onProceedToVisualization) {
      onProceedToVisualization();
    }
  };

  if (isInitializing) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6">
          Initializing Data Transformation...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Data Transformation
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
        Transform raw data into structured formats with master data management and ontology mapping
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6">
            Processing Data...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Creating master tables and analyzing your data
          </Typography>
        </Box>
      ) : transformationComplete ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" color="success.main" gutterBottom>
            Transformation Complete!
          </Typography>
          <Typography variant="body1" paragraph>
            Your data has been successfully transformed and is ready for visualization.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleProceedToVisualization}
          >
            Proceed to Visualization
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Master Tables" />
              <Tab label="Ontology Mapping" />
              <Tab label="Data Profiling" />
              <Tab label="Data Lineage" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <MasterTables />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OntologyMapping />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DataProfiling />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DataLineage />
          </TabPanel>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteTransformation}
              disabled={isLoading}
            >
              Complete Transformation
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
} 