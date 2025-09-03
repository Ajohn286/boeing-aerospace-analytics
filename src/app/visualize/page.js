'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs,
  Tab,
  Button,
  Grid
} from '@mui/material';
import DataIngestionView from '@/components/visualize/DataIngestionView';
import DataTransformationView from '@/components/visualize/DataTransformationView';
import CustomerProductView from '@/components/visualize/CustomerProductView';
import ProcessFlowView from '@/components/visualize/ProcessFlowView';
import GeospatialView from '@/components/visualize/GeospatialView';
import OntologyView from '@/components/visualize/OntologyView';
import DataQualityView from '@/components/visualize/DataQualityView';
import OverviewView from '@/components/visualize/OverviewView';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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

export default function VisualizePage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProceedToTransform = () => {
    setValue(2); // Switch to Data Transformation tab (now index 2)
  };

  const handleProceedToVisualization = () => {
    setValue(0); // Switch to Overview tab (now index 0)
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Data Management & Visualization Suite
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Complete data pipeline from ingestion to visualization and insights
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Overview" />
              <Tab label="Data Ingestion" />
              <Tab label="Data Transformation" />
              <Tab label="Master Data Management" />
              <Tab label="Ontology & Object View" />
              <Tab label="Data Quality" />
              {/*<Tab label="Process Flow Visualization" />
              <Tab label="Geospatial Mapping" />*/}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <OverviewView />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataIngestionView onProceedToTransform={handleProceedToTransform} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DataTransformationView onProceedToVisualization={handleProceedToVisualization} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CustomerProductView />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <OntologyView />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <DataQualityView />
          </TabPanel>
          {/* Commented out for now
          <TabPanel value={value} index={6}>
            <ProcessFlowView />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <GeospatialView />
          </TabPanel>
          */}
        </Paper>
      </Box>
    </Container>
  );
} 