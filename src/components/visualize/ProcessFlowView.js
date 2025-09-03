'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Mock process flow data for claims processing
const processFlowData = {
  flowTypes: ['Claims Processing', 'Customer Onboarding', 'Order Fulfillment'],
  claimsFlow: {
    name: 'Claims Processing',
    description: 'End-to-end flow of an insurance claim from submission to payment',
    steps: [
      {
        id: 'claim_submission',
        name: 'Claim Submission',
        description: 'Patient or provider submits a claim',
        icon: <PersonIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:15:32',
        duration: '10 minutes',
        metrics: {
          volume: 1250,
          avgCompletionTime: '8 minutes',
          errorRate: '3%'
        },
        dataCompleteness: {
          percentage: 92,
          missingElements: [
            { field: 'Secondary Diagnosis', count: 145, impact: 'Medium' },
            { field: 'Referring Provider', count: 78, impact: 'Low' }
          ],
          requiredFields: ['Patient ID', 'Date of Service', 'Procedure Code', 'Diagnosis', 'Provider ID'],
          completedFields: ['Patient ID', 'Date of Service', 'Procedure Code', 'Diagnosis', 'Provider ID'],
          optionalFields: ['Secondary Diagnosis', 'Referring Provider', 'Additional Notes']
        },
        entities: [
          { type: 'Person', id: 'PT12345', name: 'John Smith' },
          { type: 'Provider', id: 'PR54321', name: 'General Hospital' }
        ],
        documents: [
          { name: 'Claim Form', id: 'DOC-001', size: '2.3 MB' }
        ]
      },
      {
        id: 'claim_validation',
        name: 'Claim Validation',
        description: 'Verify claim information and patient eligibility',
        icon: <ReceiptLongIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:25:45',
        duration: '15 minutes',
        metrics: {
          volume: 1250,
          avgCompletionTime: '12 minutes',
          errorRate: '8%'
        },
        dataCompleteness: {
          percentage: 78,
          missingElements: [
            { field: 'Prior Authorization', count: 245, impact: 'High' },
            { field: 'Coordination of Benefits', count: 189, impact: 'Medium' },
            { field: 'Service Location', count: 115, impact: 'Low' }
          ],
          requiredFields: ['Member ID', 'Eligibility Date', 'Policy Status', 'Prior Authorization', 'Benefits Summary'],
          completedFields: ['Member ID', 'Eligibility Date', 'Policy Status', 'Benefits Summary'],
          optionalFields: ['Coordination of Benefits', 'Service Location', 'Group Number']
        },
        entities: [
          { type: 'Person', id: 'PT12345', name: 'John Smith' },
          { type: 'Claim', id: 'CL67890', amount: '$350.00' }
        ],
        issues: [
          { type: 'warning', message: 'Missing procedure code', count: 2 }
        ]
      },
      {
        id: 'provider_verification',
        name: 'Provider Verification',
        description: 'Verify provider credentials and network status',
        icon: <LocalHospitalIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:45:22',
        duration: '20 minutes',
        metrics: {
          volume: 1200,
          avgCompletionTime: '18 minutes',
          errorRate: '5%'
        },
        dataCompleteness: {
          percentage: 85,
          missingElements: [
            { field: 'Specialty Certification', count: 126, impact: 'Medium' },
            { field: 'Contract Terms', count: 42, impact: 'High' }
          ],
          requiredFields: ['Provider NPI', 'Network Status', 'Contract Terms', 'Specialty', 'License Status'],
          completedFields: ['Provider NPI', 'Network Status', 'Specialty', 'License Status'],
          optionalFields: ['Specialty Certification', 'Practice Address', 'Provider Group']
        },
        entities: [
          { type: 'Provider', id: 'PR54321', name: 'General Hospital' },
          { type: 'Claim', id: 'CL67890', amount: '$350.00' }
        ]
      },
      {
        id: 'claim_adjudication',
        name: 'Claim Adjudication',
        description: 'Evaluate the claim against policy coverage',
        icon: <ReceiptLongIcon />,
        status: 'in_progress',
        timestamp: '2023-10-15 10:15:30',
        duration: '30 minutes (in progress)',
        metrics: {
          volume: 1150,
          avgCompletionTime: '35 minutes',
          errorRate: '10%'
        },
        dataCompleteness: {
          percentage: 62,
          missingElements: [
            { field: 'Covered Services Rules', count: 324, impact: 'Critical' },
            { field: 'Member Benefit Details', count: 217, impact: 'High' },
            { field: 'Provider Payment Schedule', count: 185, impact: 'High' },
            { field: 'Authorization Rules', count: 156, impact: 'Medium' }
          ],
          requiredFields: ['Covered Services Rules', 'Member Benefit Details', 'Provider Payment Schedule', 'Authorization Rules', 'Claim Type Rules'],
          completedFields: ['Claim Type Rules'],
          optionalFields: ['Override Rules', 'Special Case Handling', 'Secondary Payer Logic']
        },
        entities: [
          { type: 'Claim', id: 'CL67890', amount: '$350.00' },
          { type: 'Policy', id: 'POL98765', type: 'Health Insurance' }
        ],
        issues: [
          { type: 'error', message: 'Procedure not covered by policy', count: 1 }
        ]
      },
      {
        id: 'payment_processing',
        name: 'Payment Processing',
        description: 'Process payment for approved claims',
        icon: <PaidIcon />,
        status: 'pending',
        timestamp: 'Pending',
        duration: 'Pending',
        metrics: {
          volume: 1050,
          avgCompletionTime: '20 minutes',
          errorRate: '2%'
        },
        dataCompleteness: {
          percentage: 40,
          missingElements: [
            { field: 'Payment Method', count: 385, impact: 'Critical' },
            { field: 'Payment Schedule', count: 298, impact: 'High' },
            { field: 'Tax Information', count: 246, impact: 'Medium' },
            { field: 'Bank Routing Details', count: 198, impact: 'High' }
          ],
          requiredFields: ['Payment Method', 'Payment Amount', 'Payee Information', 'Payment Schedule', 'Bank Routing Details'],
          completedFields: ['Payment Amount', 'Payee Information'],
          optionalFields: ['Tax Information', 'Remittance Advice', 'Electronic Payment ID']
        },
        entities: [
          { type: 'Claim', id: 'CL67890', amount: '$350.00' },
          { type: 'Payment', id: 'PAY00000', status: 'Pending' }
        ]
      }
    ]
  }
};

export default function ProcessFlowView() {
  const [flowType, setFlowType] = useState('Claims Processing');
  const [selectedStep, setSelectedStep] = useState(processFlowData.claimsFlow.steps[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleFlowTypeChange = (event) => {
    setFlowType(event.target.value);
  };
  
  const handleStepClick = (step) => {
    setSelectedStep(step);
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in_progress':
        return <ScheduleIcon color="primary" />;
      case 'pending':
        return <ScheduleIcon color="disabled" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success.main';
      case 'in_progress':
        return 'primary.main';
      case 'pending':
        return 'text.disabled';
      case 'error':
        return 'error.main';
      default:
        return 'warning.main';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Process Flow Visualization
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Box>
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>



      <Box sx={{ mb: 4 }}>
        <Paper 
          sx={{ 
            p: 2,
            overflowX: 'auto',
            minHeight: 180,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'left center',
            transition: 'transform 0.3s ease',
            px: 2,
            py: 3,
            width: 'max-content'
          }}>
            {processFlowData.claimsFlow.steps.map((step, index) => (
              <Box 
                key={step.id} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleStepClick(step)}
              >
                <Paper 
                  elevation={selectedStep.id === step.id ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 150,
                    border: selectedStep.id === step.id ? 2 : 0,
                    borderColor: 'primary.main',
                    bgcolor: selectedStep.id === step.id ? 'rgba(25, 118, 210, 0.08)' : 'background.paper'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: getStatusColor(step.status),
                      mb: 1,
                      width: 48,
                      height: 48
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography variant="subtitle2" align="center" gutterBottom>
                    {step.name}
                  </Typography>
                  <Chip 
                    icon={getStatusIcon(step.status)} 
                    label={step.status.replace('_', ' ')}
                    size="small"
                    color={
                      step.status === 'completed' ? 'success' :
                      step.status === 'in_progress' ? 'primary' :
                      step.status === 'error' ? 'error' : 'default'
                    }
                    variant="outlined"
                  />
                  <Box sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Data Completeness
                    </Typography>
                    <Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
                      <Box sx={{ 
                        width: '100%', 
                        height: 6, 
                        bgcolor: 'grey.200', 
                        borderRadius: 3,
                        position: 'relative' 
                      }}>
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${step.dataCompleteness.percentage}%`,
                            bgcolor: 
                              step.dataCompleteness.percentage > 80 ? 'success.main' :
                              step.dataCompleteness.percentage > 60 ? 'warning.main' : 'error.main',
                            borderRadius: 3
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" mt={0.5}>
                      {step.dataCompleteness.percentage}%
                    </Typography>
                  </Box>
                </Paper>
                {index < processFlowData.claimsFlow.steps.length - 1 && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 1,
                    color: step.status === 'completed' ? 'success.main' : 'text.disabled',
                    mx: 3
                  }}>
                    <ArrowForwardIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedStep.name} - Data Completeness Analysis
                </Typography>
                <Chip 
                  icon={getStatusIcon(selectedStep.status)} 
                  label={selectedStep.status.replace('_', ' ')}
                  size="small"
                  color={
                    selectedStep.status === 'completed' ? 'success' :
                    selectedStep.status === 'in_progress' ? 'primary' :
                    selectedStep.status === 'error' ? 'error' : 'default'
                  }
                />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedStep.description}
              </Typography>


              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Overall Completeness</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedStep.dataCompleteness.percentage}%
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${selectedStep.dataCompleteness.percentage}%`,
                      bgcolor: 
                        selectedStep.dataCompleteness.percentage > 80 ? 'success.main' :
                        selectedStep.dataCompleteness.percentage > 60 ? 'warning.main' : 'error.main',
                      borderRadius: 4
                    }}
                  />
                </Box>
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Required Data Elements
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense disablePadding>
                      {selectedStep.dataCompleteness.requiredFields.map((field, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                mr: 1,
                                bgcolor: selectedStep.dataCompleteness.completedFields.includes(field) 
                                  ? 'success.main' 
                                  : 'error.main'
                              }} 
                            />
                            <Typography variant="body2">
                              {field}
                            </Typography>
                            {!selectedStep.dataCompleteness.completedFields.includes(field) && (
                              <Chip 
                                label="Missing" 
                                size="small" 
                                color="error" 
                                variant="outlined" 
                                sx={{ ml: 'auto' }}
                              />
                            )}
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Optional Data Elements
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense disablePadding>
                      {selectedStep.dataCompleteness.optionalFields.map((field, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                mr: 1,
                                bgcolor: selectedStep.dataCompleteness.completedFields.includes(field) 
                                  ? 'success.main' 
                                  : 'warning.main'
                              }} 
                            />
                            <Typography variant="body2">
                              {field}
                            </Typography>
                            {!selectedStep.dataCompleteness.completedFields.includes(field) && (
                              <Chip 
                                label="Incomplete" 
                                size="small" 
                                color="warning" 
                                variant="outlined" 
                                sx={{ ml: 'auto' }}
                              />
                            )}
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle2" gutterBottom>
                Critical Missing Data
              </Typography>
              <Paper variant="outlined" sx={{ mb: 2 }}>
                <List dense>
                  {selectedStep.dataCompleteness.missingElements.map((element, idx) => (
                    <ListItem key={idx} divider={idx < selectedStep.dataCompleteness.missingElements.length - 1}>
                      <ListItemText
                        primary={element.field}
                        secondary={`${element.count} records affected`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <Chip 
                        label={element.impact} 
                        size="small" 
                        color={
                          element.impact === 'Critical' ? 'error' :
                          element.impact === 'High' ? 'warning' :
                          element.impact === 'Medium' ? 'info' : 'default'
                        }
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small" startIcon={<InfoOutlinedIcon />}>
                  View Industry Schema Documentation
                </Button>
                <Button variant="contained" size="small">
                  Set Up Automated Data Validation
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 