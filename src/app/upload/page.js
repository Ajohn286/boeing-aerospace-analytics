'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Divider,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import FileUpload from '@/components/upload/FileUpload';
import SourceSelection from '@/components/upload/SourceSelection';
import UploadSummary from '@/components/upload/UploadSummary';

export default function UploadPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dataSource, setDataSource] = useState('file');
  const [uploadSummary, setUploadSummary] = useState(null);

  const steps = ['Select Data Source', 'Upload Data', 'Review & Confirm'];

  const handleNext = () => {
    if (activeStep === 1 && uploadedFile) {
      // Simulate processing the file
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Mock summary data
        setUploadSummary({
          fileName: uploadedFile.name,
          fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
          rowCount: Math.floor(Math.random() * 10000) + 1000,
          columnCount: Math.floor(Math.random() * 20) + 5,
          sampleColumns: ['Customer ID', 'Name', 'Email', 'Purchase Date', 'Amount', 'Product ID'],
          dataQuality: {
            completeness: Math.floor(Math.random() * 30) + 70,
            duplicates: Math.floor(Math.random() * 5) + 1,
            issues: Math.floor(Math.random() * 10) + 1
          }
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, 2000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleSourceChange = (source) => {
    setDataSource(source);
  };

  const handleProceedToTransform = () => {
    // In a real implementation, we would save the data to the store
    // and then navigate to the transform page
    window.location.href = '/transform';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Data Ingestion
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Upload your enterprise data files or connect to your data sources
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mb: 4 }} />

          {activeStep === 0 && (
            <SourceSelection dataSource={dataSource} onSourceChange={handleSourceChange} />
          )}

          {activeStep === 1 && (
            <FileUpload 
              onFileUpload={handleFileUpload} 
              uploadedFile={uploadedFile}
            />
          )}

          {activeStep === 2 && uploadSummary && (
            <UploadSummary summary={uploadSummary} />
          )}

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0 || isLoading}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleProceedToTransform}
                disabled={isLoading}
              >
                Proceed to Transform
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={(activeStep === 1 && !uploadedFile) || isLoading}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 