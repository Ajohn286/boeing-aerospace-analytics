'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Tune,
  PlayArrow,
  Pause,
  Stop,
  Refresh,
  Assessment,
  Timeline,
  TrendingUp,
  Settings,
  AutoFixHigh,
  Psychology,
  CompareArrows,
  CheckCircle,
  Warning,
  Info,
  ExpandMore,
  Save,
  Restore,
  Speed,
  Memory,
  CloudUpload,
} from '@mui/icons-material';

const hyperparameterConfigs = {
  computer_vision: {
    basic: [
      { name: 'learning_rate', label: 'Learning Rate', min: 0.0001, max: 0.1, step: 0.0001, default: 0.001, type: 'slider' },
      { name: 'batch_size', label: 'Batch Size', options: [8, 16, 32, 64, 128], default: 32, type: 'select' },
      { name: 'epochs', label: 'Epochs', min: 10, max: 500, step: 10, default: 100, type: 'slider' },
      { name: 'optimizer', label: 'Optimizer', options: ['Adam', 'SGD', 'RMSprop', 'AdamW'], default: 'Adam', type: 'select' },
    ],
    advanced: [
      { name: 'weight_decay', label: 'Weight Decay', min: 0, max: 0.01, step: 0.0001, default: 0.0005, type: 'slider' },
      { name: 'momentum', label: 'Momentum', min: 0.1, max: 0.99, step: 0.01, default: 0.9, type: 'slider' },
      { name: 'dropout_rate', label: 'Dropout Rate', min: 0, max: 0.5, step: 0.05, default: 0.2, type: 'slider' },
      { name: 'data_augmentation', label: 'Data Augmentation', default: true, type: 'switch' },
    ],
    model_specific: [
      { name: 'confidence_threshold', label: 'Confidence Threshold', min: 0.1, max: 0.95, step: 0.05, default: 0.25, type: 'slider' },
      { name: 'iou_threshold', label: 'IoU Threshold', min: 0.1, max: 0.95, step: 0.05, default: 0.45, type: 'slider' },
      { name: 'image_size', label: 'Image Size', options: [416, 512, 640, 832, 1024], default: 640, type: 'select' },
    ]
  },
  supply_chain: {
    basic: [
      { name: 'learning_rate', label: 'Learning Rate', min: 0.0001, max: 0.1, step: 0.0001, default: 0.001, type: 'slider' },
      { name: 'batch_size', label: 'Batch Size', options: [16, 32, 64, 128, 256], default: 64, type: 'select' },
      { name: 'epochs', label: 'Epochs', min: 50, max: 1000, step: 50, default: 200, type: 'slider' },
      { name: 'optimizer', label: 'Optimizer', options: ['Adam', 'SGD', 'RMSprop'], default: 'Adam', type: 'select' },
    ],
    advanced: [
      { name: 'hidden_layers', label: 'Hidden Layers', min: 1, max: 5, step: 1, default: 2, type: 'slider' },
      { name: 'units_per_layer', label: 'Units per Layer', min: 16, max: 512, step: 16, default: 64, type: 'slider' },
      { name: 'dropout_rate', label: 'Dropout Rate', min: 0, max: 0.5, step: 0.05, default: 0.2, type: 'slider' },
      { name: 'regularization', label: 'L2 Regularization', min: 0, max: 0.01, step: 0.0001, default: 0.001, type: 'slider' },
    ],
    model_specific: [
      { name: 'sequence_length', label: 'Sequence Length', min: 10, max: 100, step: 5, default: 30, type: 'slider' },
      { name: 'seasonality_mode', label: 'Seasonality Mode', options: ['additive', 'multiplicative'], default: 'additive', type: 'select' },
      { name: 'forecast_horizon', label: 'Forecast Horizon', min: 1, max: 30, step: 1, default: 7, type: 'slider' },
    ]
  }
};

const tuningStrategies = [
  {
    id: 'grid_search',
    name: 'Grid Search',
    description: 'Exhaustive search through parameter combinations',
    duration: 'Long (2-6 hours)',
    accuracy: 'High',
    icon: <Settings />,
  },
  {
    id: 'random_search',
    name: 'Random Search',
    description: 'Random sampling of parameter space',
    duration: 'Medium (1-3 hours)',
    accuracy: 'Medium-High',
    icon: <Refresh />,
  },
  {
    id: 'bayesian_optimization',
    name: 'Bayesian Optimization',
    description: 'Smart search using probabilistic models',
    duration: 'Medium (1-2 hours)',
    accuracy: 'High',
    icon: <Psychology />,
  },
  {
    id: 'automated_ml',
    name: 'AutoML',
    description: 'Fully automated hyperparameter optimization',
    duration: 'Short (30-60 minutes)',
    accuracy: 'Medium',
    icon: <AutoFixHigh />,
  },
];

export default function ModelTuningInterface({ model, modelType, onTuningComplete }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hyperparameters, setHyperparameters] = useState({});
  const [selectedStrategy, setSelectedStrategy] = useState('bayesian_optimization');
  const [isTuning, setIsTuning] = useState(false);
  const [tuningProgress, setTuningProgress] = useState(0);
  const [tuningResults, setTuningResults] = useState([]);
  const [bestConfig, setBestConfig] = useState(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  const config = hyperparameterConfigs[modelType] || hyperparameterConfigs.computer_vision;

  // Initialize hyperparameters with defaults
  useEffect(() => {
    const defaultParams = {};
    Object.values(config).flat().forEach(param => {
      defaultParams[param.name] = param.default;
    });
    setHyperparameters(defaultParams);
  }, [modelType]);

  const handleParameterChange = (paramName, value) => {
    setHyperparameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const startTuning = async () => {
    setIsTuning(true);
    setTuningProgress(0);
    
    // Simulate tuning process
    const totalSteps = 20;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setTuningProgress((i / totalSteps) * 100);
      
      // Add mock results periodically
      if (i % 5 === 0 && i > 0) {
        const mockResult = {
          id: i,
          params: { ...hyperparameters, learning_rate: Math.random() * 0.01 },
          score: 0.85 + Math.random() * 0.1,
          loss: Math.random() * 0.5,
          duration: Math.floor(Math.random() * 60) + 30,
        };
        setTuningResults(prev => [...prev, mockResult]);
        
        if (!bestConfig || mockResult.score > bestConfig.score) {
          setBestConfig(mockResult);
        }
      }
    }
    
    setIsTuning(false);
  };

  const renderParameterControl = (param) => {
    const value = hyperparameters[param.name] || param.default;
    
    switch (param.type) {
      case 'slider':
        return (
          <Box key={param.name} sx={{ mb: 3 }}>
            <Typography gutterBottom>{param.label}</Typography>
            <Slider
              value={value}
              onChange={(e, newValue) => handleParameterChange(param.name, newValue)}
              min={param.min}
              max={param.max}
              step={param.step}
              valueLabelDisplay="auto"
              marks={param.marks}
            />
            <Typography variant="caption" color="text.secondary">
              Current: {value}
            </Typography>
          </Box>
        );
      
      case 'select':
        return (
          <FormControl fullWidth key={param.name} sx={{ mb: 3 }}>
            <InputLabel>{param.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleParameterChange(param.name, e.target.value)}
              label={param.label}
            >
              {param.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'switch':
        return (
          <FormControlLabel
            key={param.name}
            control={
              <Switch
                checked={value}
                onChange={(e) => handleParameterChange(param.name, e.target.checked)}
              />
            }
            label={param.label}
            sx={{ mb: 2 }}
          />
        );
      
      default:
        return (
          <TextField
            key={param.name}
            fullWidth
            label={param.label}
            type="number"
            value={value}
            onChange={(e) => handleParameterChange(param.name, parseFloat(e.target.value))}
            sx={{ mb: 2 }}
          />
        );
    }
  };

  const renderHyperparameterTuning = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Hyperparameter Configuration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Basic Parameters
              </Typography>
              {config.basic.map(renderParameterControl)}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Advanced Parameters
              </Typography>
              {config.advanced.map(renderParameterControl)}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Model-Specific Parameters
              </Typography>
              {config.model_specific.map(renderParameterControl)}
              
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<Restore />}
                  onClick={() => {
                    const defaultParams = {};
                    Object.values(config).flat().forEach(param => {
                      defaultParams[param.name] = param.default;
                    });
                    setHyperparameters(defaultParams);
                  }}
                  sx={{ mr: 1 }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                >
                  Save Config
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderTuningStrategy = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Optimization Strategy
      </Typography>
      
      <Grid container spacing={3}>
        {tuningStrategies.map((strategy) => (
          <Grid item xs={12} md={6} key={strategy.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedStrategy === strategy.id ? 2 : 1,
                borderColor: selectedStrategy === strategy.id ? 'primary.main' : 'divider',
                '&:hover': { boxShadow: 3 }
              }}
              onClick={() => setSelectedStrategy(strategy.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {strategy.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {strategy.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {strategy.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body2">
                      {strategy.duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Accuracy
                    </Typography>
                    <Typography variant="body2">
                      {strategy.accuracy}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={isTuning ? <CircularProgress size={20} /> : <PlayArrow />}
          onClick={startTuning}
          disabled={isTuning}
        >
          {isTuning ? 'Tuning in Progress...' : 'Start Hyperparameter Tuning'}
        </Button>
      </Box>

      {isTuning && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" gutterBottom>
            Optimization Progress: {tuningProgress.toFixed(0)}%
          </Typography>
          <LinearProgress variant="determinate" value={tuningProgress} />
        </Box>
      )}
    </Box>
  );

  const renderTuningResults = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Tuning Results ({tuningResults.length} experiments)
        </Typography>
        <Button
          variant="outlined"
          startIcon={<CompareArrows />}
          onClick={() => setCompareDialogOpen(true)}
          disabled={tuningResults.length < 2}
        >
          Compare Results
        </Button>
      </Box>

      {bestConfig && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Best Configuration Found</AlertTitle>
          Score: {bestConfig.score.toFixed(3)} • Loss: {bestConfig.loss.toFixed(3)} • Duration: {bestConfig.duration}s
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Experiment</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Loss</TableCell>
              <TableCell align="right">Learning Rate</TableCell>
              <TableCell align="right">Batch Size</TableCell>
              <TableCell align="right">Duration (s)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tuningResults.map((result) => (
              <TableRow 
                key={result.id}
                sx={{ 
                  bgcolor: bestConfig?.id === result.id ? 'success.light' : 'inherit',
                  opacity: bestConfig?.id === result.id ? 1 : 0.8
                }}
              >
                <TableCell>#{result.id}</TableCell>
                <TableCell align="right">{result.score.toFixed(3)}</TableCell>
                <TableCell align="right">{result.loss.toFixed(3)}</TableCell>
                <TableCell align="right">{result.params.learning_rate?.toFixed(4)}</TableCell>
                <TableCell align="right">{result.params.batch_size}</TableCell>
                <TableCell align="right">{result.duration}</TableCell>
                <TableCell>
                  {bestConfig?.id === result.id ? (
                    <Chip label="Best" color="success" size="small" />
                  ) : (
                    <Chip label="Complete" color="default" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {bestConfig && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined">
            Apply Best Config
          </Button>
          <Button 
            variant="contained" 
            onClick={() => onTuningComplete(bestConfig)}
            startIcon={<CheckCircle />}
          >
            Complete Tuning
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderPerformanceAnalysis = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Performance Analysis
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Training Metrics Comparison
              </Typography>
              <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Performance comparison chart will be displayed here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Hyperparameter Sensitivity
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Learning Rate"
                    secondary="High impact on convergence"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Timeline color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Batch Size"
                    secondary="Moderate impact on stability"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dropout Rate"
                    secondary="Low impact on final score"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Model Tuning Phase</AlertTitle>
        Optimize your model's hyperparameters based on expert feedback and automated search strategies.
      </Alert>

      <Paper>
        <Tabs 
          value={activeTab} 
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Parameters" icon={<Tune />} iconPosition="start" />
          <Tab label="Strategy" icon={<Psychology />} iconPosition="start" />
          <Tab label="Results" icon={<Assessment />} iconPosition="start" />
          <Tab label="Analysis" icon={<TrendingUp />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderHyperparameterTuning()}
          {activeTab === 1 && renderTuningStrategy()}
          {activeTab === 2 && renderTuningResults()}
          {activeTab === 3 && renderPerformanceAnalysis()}
        </Box>
      </Paper>

      {/* Results Comparison Dialog */}
      <Dialog open={compareDialogOpen} onClose={() => setCompareDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Compare Tuning Results</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Detailed comparison of hyperparameter configurations and their performance metrics.
          </Typography>
          {/* Add comparison charts and tables here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 