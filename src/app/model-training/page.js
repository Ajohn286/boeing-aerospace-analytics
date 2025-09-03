'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  ModelTraining as ModelTrainingIcon,
  Assessment,
  Psychology,
  Tune,
  CloudDone,
  Timeline,
  Person,
  GroupWork,
} from '@mui/icons-material';
import ModelTrainingForm from '@/components/model-training/ModelTrainingForm';
import ModelEvaluation from '@/components/model-training/ModelEvaluation';
import ModelLifecycleManager from '@/components/model-training/ModelLifecycleManager';
import HumanInTheLoopInterface from '@/components/model-training/HumanInTheLoopInterface';
import ModelTuningInterface from '@/components/model-training/ModelTuningInterface';

// Simulated training progress and results
const simulateTraining = async (formData) => {
  // Simulate different training phases
  const phases = [
    'Preparing dataset',
    'Loading model architecture',
    'Initializing training',
    'Training epoch 1/100',
    'Training epoch 25/100',
    'Training epoch 50/100',
    'Training epoch 75/100',
    'Training epoch 100/100',
    'Computing evaluation metrics',
    'Saving model weights',
  ];

  // Simulate training process with progress updates
  for (const phase of phases) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(phase);
  }

  // Return simulated results based on model type
  if (formData.modelType.startsWith('yolo')) {
    return {
      status: 'success',
      accuracy: 0.89,
      precision: 0.87,
      recall: 0.85,
      f1Score: 0.86,
      trainingTime: '2h 15m',
      gpuUtilization: '85%',
      inferenceSpeed: '45',
      modelSize: '14.2',
      mAP: '0.82',
      falsePositives: '2.3',
      predictions: [
        { label: 'Car', confidence: 0.95 },
        { label: 'Person', confidence: 0.88 },
        { label: 'Building', confidence: 0.76 },
        { label: 'Traffic Light', confidence: 0.92 },
        { label: 'Bicycle', confidence: 0.85 }
      ],
      learningCurves: {
        trainLoss: [0.8, 0.6, 0.4, 0.3, 0.25],
        valLoss: [0.85, 0.65, 0.45, 0.35, 0.3],
        epochs: [1, 25, 50, 75, 100]
      }
    };
  } else {
    return {
      status: 'success',
      accuracy: 0.92,
      precision: 0.90,
      recall: 0.89,
      f1Score: 0.91,
      trainingTime: '45m',
      gpuUtilization: '75%',
      predictions: [
        { metric: 'Demand', actual: 1200, predicted: 1180, error: '1.7%' },
        { metric: 'Stock Level', actual: 450, predicted: 460, error: '2.2%' },
        { metric: 'Lead Time', actual: 5.2, predicted: 5.0, error: '3.8%' }
      ],
      learningCurves: {
        trainLoss: [0.5, 0.3, 0.2, 0.15, 0.12],
        valLoss: [0.55, 0.35, 0.25, 0.18, 0.15],
        epochs: [1, 25, 50, 75, 100]
      }
    };
  }
};

export default function ModelTraining() {
  const [activeTab, setActiveTab] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState(null);
  const [currentModelType, setCurrentModelType] = useState('computer_vision');
  const [activeStep, setActiveStep] = useState(0);
  const [models, setModels] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue < 2) {
      setCurrentModelType(newValue === 0 ? 'computer_vision' : 'supply_chain');
    }
    setEvaluationResults(null);
    setError(null);
  };

  const handleTrainingSubmit = async (formData) => {
    try {
      setIsTraining(true);
      setError(null);
      setActiveStep(1); // Move to training step
      
      // Validate dataset size
      if (formData.dataset.type === 'images' && formData.dataset.count < 10) {
        throw new Error('Dataset too small. Please provide at least 10 images for training.');
      }

      // Simulate model training process
      const results = await simulateTraining(formData);
      setEvaluationResults(results);
      setActiveStep(2); // Move to evaluation step
      
      // Add to models list
      const newModel = {
        id: Date.now(),
        name: `${formData.modelType}_${Date.now()}`,
        type: currentModelType,
        status: 'trained',
        accuracy: results.accuracy,
        createdAt: new Date(),
        results: results
      };
      setModels(prev => [...prev, newModel]);
      
    } catch (error) {
      console.error('Training error:', error);
      setError(error.message || 'An error occurred during training');
      setEvaluationResults({
        status: 'error',
        error: error.message || 'An error occurred during training'
      });
    } finally {
      setIsTraining(false);
    }
  };

  const steps = [
    {
      label: 'Configure & Train',
      description: 'Set up your model architecture and hyperparameters',
      icon: <ModelTrainingIcon />,
    },
    {
      label: 'Training Progress',
      description: 'Monitor training progress and metrics in real-time',
      icon: <Timeline />,
    },
    {
      label: 'Evaluate Results',
      description: 'Analyze model performance and validation metrics',
      icon: <Assessment />,
    },
    {
      label: 'Human Review',
      description: 'Human expert review and feedback collection',
      icon: <Person />,
    },
    {
      label: 'Model Tuning',
      description: 'Fine-tune model based on feedback and analysis',
      icon: <Tune />,
    },
    {
      label: 'Deploy Model',
      description: 'Deploy optimized model to production environment',
      icon: <CloudDone />,
    },
  ];

  const renderModelTypeOverview = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Card 
          sx={{ 
            height: '100%',
            border: currentModelType === 'computer_vision' ? 2 : 1,
            borderColor: currentModelType === 'computer_vision' ? 'primary.main' : 'divider',
            cursor: 'pointer',
          }}
          onClick={() => {
            setCurrentModelType('computer_vision');
            setActiveTab(0);
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Psychology sx={{ mr: 1, fontSize: 30, color: 'primary.main' }} />
              <Typography variant="h6">Computer Vision Models</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Train object detection, image classification, and quality control models for visual inspection and automation.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="YOLOv8" size="small" />
              <Chip label="Image Classification" size="small" />
              <Chip label="Object Detection" size="small" />
              <Chip label="Quality Control" size="small" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card 
          sx={{ 
            height: '100%',
            border: currentModelType === 'supply_chain' ? 2 : 1,
            borderColor: currentModelType === 'supply_chain' ? 'primary.main' : 'divider',
            cursor: 'pointer',
          }}
          onClick={() => {
            setCurrentModelType('supply_chain');
            setActiveTab(1);
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Timeline sx={{ mr: 1, fontSize: 30, color: 'secondary.main' }} />
              <Typography variant="h6">Supply Chain Models</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Build forecasting, optimization, and predictive models for supply chain management and logistics.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="LSTM" size="small" />
              <Chip label="Prophet" size="small" />
              <Chip label="XGBoost" size="small" />
              <Chip label="Demand Forecasting" size="small" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderTrainingInterface = () => (
    <Box>
      {renderModelTypeOverview()}
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ML Model Lifecycle
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(activeStep / (steps.length - 1)) * 100} 
            sx={{ mb: 2 }}
          />
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null}
                icon={step.icon}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                
                {index === 0 && (
                  <ModelTrainingForm
                    modelType={currentModelType}
                    onSubmit={handleTrainingSubmit}
                    isTraining={isTraining}
                  />
                )}
                
                {index === 1 && isTraining && (
                  <Box sx={{ py: 2 }}>
                    <Typography variant="body2" gutterBottom>Training in progress...</Typography>
                    <LinearProgress />
                  </Box>
                )}
                
                {index === 2 && evaluationResults && (
                  <Box>
                    <ModelEvaluation
                      results={evaluationResults}
                      modelType={currentModelType}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(3)}
                        startIcon={<GroupWork />}
                      >
                        Proceed to Human Review
                      </Button>
                    </Box>
                  </Box>
                )}
                
                {index === 3 && evaluationResults && (
                  <Box>
                    <HumanInTheLoopInterface
                      model={evaluationResults}
                      modelType={currentModelType}
                      onFeedbackSubmit={(feedback) => {
                        console.log('Human feedback:', feedback);
                        setActiveStep(4);
                      }}
                    />
                  </Box>
                )}
                
                {index === 4 && evaluationResults && (
                  <Box>
                    <ModelTuningInterface
                      model={evaluationResults}
                      modelType={currentModelType}
                      onTuningComplete={(tunedModel) => {
                        console.log('Model tuned:', tunedModel);
                        setActiveStep(5);
                      }}
                    />
                  </Box>
                )}
                
                {index === 5 && (
                  <Box>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <AlertTitle>Model Ready for Deployment</AlertTitle>
                      Your model has been successfully trained, evaluated, and tuned based on human feedback.
                    </Alert>
                    <Button variant="contained" color="success" startIcon={<CloudDone />}>
                      Deploy to Production
                    </Button>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {error && !evaluationResults && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        AI Model Training Platform
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Complete ML lifecycle management with human-in-the-loop feedback and model optimization
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Training Environment</AlertTitle>
        • GPU: NVIDIA A100 (40GB VRAM)<br />
        • Framework: PyTorch 2.1.0 with CUDA 11.8<br />
        • Distributed Training: Multi-GPU support enabled<br />
        • MLOps: Automated versioning and experiment tracking
      </Alert>

      <Paper sx={{ mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Computer Vision" icon={<Psychology />} iconPosition="start" />
          <Tab label="Supply Chain" icon={<Timeline />} iconPosition="start" />
          <Tab label="Lifecycle Manager" icon={<Assessment />} iconPosition="start" />
          <Tab label="Model Registry" icon={<CloudDone />} iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {activeTab < 2 ? (
            renderTrainingInterface()
          ) : activeTab === 2 ? (
            <ModelLifecycleManager models={models} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CloudDone sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Model Registry
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Centralized model versioning, deployment, and monitoring dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {models.length} models trained • Version control • A/B testing capabilities
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
} 