'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Switch,
  FormControlLabel,
  Tooltip,
  Chip,
} from '@mui/material';
import { 
  CloudUpload, 
  PlayArrow, 
  ExpandMore, 
  Settings,
  Dataset,
  Memory,
  Speed,
  Tune
} from '@mui/icons-material';

export default function ModelTrainingForm({ modelType, onSubmit, isTraining }) {
  const [dataset, setDataset] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState('yolov8n');
  const [hyperparameters, setHyperparameters] = useState({
    // Common hyperparameters
    batchSize: 32,
    epochs: 100,
    learningRate: 0.001,
    optimizer: 'Adam',
    // YOLOv8 specific
    imgSize: 640,
    confidence: 0.25,
    iou: 0.45,
    augmentation: true,
    // Supply chain specific
    hiddenLayers: [64, 32],
    dropout: 0.2,
  });

  const modelOptions = {
    computer_vision: [
      { value: 'yolov8n', label: 'YOLOv8 Nano' },
      { value: 'yolov8s', label: 'YOLOv8 Small' },
      { value: 'yolov8m', label: 'YOLOv8 Medium' },
      { value: 'yolov8l', label: 'YOLOv8 Large' },
      { value: 'yolov8x', label: 'YOLOv8 XLarge' },
    ],
    supply_chain: [
      { value: 'lstm', label: 'LSTM Network' },
      { value: 'prophet', label: 'Prophet' },
      { value: 'xgboost', label: 'XGBoost' },
      { value: 'randomforest', label: 'Random Forest' },
    ],
  };

  const handleDatasetUpload = async (event) => {
    try {
      setIsUploading(true);
      setError(null);
      const files = event.target.files;
      
      if (modelType === 'computer_vision') {
        // For computer vision, accept multiple files or a zip
        if (files[0].type === 'application/zip' || files[0].type === 'application/x-zip-compressed') {
          setDataset({
            type: 'zip',
            file: files[0],
            name: files[0].name,
            size: files[0].size,
          });
        } else {
          // Handle multiple image files
          const imageFiles = Array.from(files).filter(file => 
            file.type.startsWith('image/')
          );
          if (imageFiles.length === 0) {
            throw new Error('Please upload image files or a ZIP containing your dataset');
          }
          setDataset({
            type: 'images',
            files: imageFiles,
            count: imageFiles.length,
            totalSize: imageFiles.reduce((sum, file) => sum + file.size, 0),
          });
        }
      } else {
        // For supply chain, accept CSV/Excel
        const file = files[0];
        if (!file.type.includes('csv') && !file.type.includes('spreadsheet')) {
          throw new Error('Please upload a CSV or Excel file for supply chain optimization');
        }
        setDataset({
          type: 'tabular',
          file: file,
          name: file.name,
          size: file.size,
        });
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err.message || 'Error uploading dataset');
    } finally {
      setIsUploading(false);
    }
  };

  const handleHyperparameterChange = (param, value) => {
    setHyperparameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!dataset) {
      setError('Please upload a dataset first');
      return;
    }

    try {
      await onSubmit({
        dataset,
        modelType: selectedModel,
        hyperparameters,
      });
    } catch (err) {
      setError(err.message || 'Error submitting training job');
    }
  };

  const renderDatasetInfo = () => {
    if (!dataset) return null;

    return (
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          icon={<Dataset />}
          label={dataset.type === 'images' 
            ? `${dataset.count} images (${(dataset.totalSize / 1024 / 1024).toFixed(1)} MB)`
            : `${dataset.name} (${(dataset.size / 1024 / 1024).toFixed(1)} MB)`
          }
          color="primary"
        />
        {modelType === 'computer_vision' && (
          <Chip
            icon={<Memory />}
            label={`${hyperparameters.imgSize}x${hyperparameters.imgSize}`}
            color="secondary"
          />
        )}
        <Chip
          icon={<Speed />}
          label={`Batch: ${hyperparameters.batchSize}`}
          variant="outlined"
        />
      </Box>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {/* Model Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Model Architecture</InputLabel>
            <Select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              label="Model Architecture"
            >
              {modelOptions[modelType].map((model) => (
                <MenuItem key={model.value} value={model.value}>
                  {model.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Dataset Upload */}
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            component="label"
          >
            <input
              type="file"
              hidden
              onChange={handleDatasetUpload}
              multiple={modelType === 'computer_vision'}
              accept={modelType === 'computer_vision' 
                ? '.jpg,.jpeg,.png,.zip'
                : '.csv,.xlsx'
              }
            />
            <CloudUpload sx={{ fontSize: 40, mb: 2 }} />
            <Typography>
              {dataset ? dataset.name || `${dataset.count} files selected` : 'Upload Dataset'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {modelType === 'computer_vision'
                ? 'Drop image files or a ZIP containing your dataset'
                : 'Drop CSV/Excel file containing your training data'
              }
            </Typography>
            {isUploading && <CircularProgress size={24} sx={{ mt: 2 }} />}
          </Paper>
          {renderDatasetInfo()}
        </Grid>

        {/* Hyperparameters */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tune />
                <Typography>Hyperparameters</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {/* Common hyperparameters */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Batch Size"
                    type="number"
                    value={hyperparameters.batchSize}
                    onChange={(e) => handleHyperparameterChange('batchSize', parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Epochs"
                    type="number"
                    value={hyperparameters.epochs}
                    onChange={(e) => handleHyperparameterChange('epochs', parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Learning Rate"
                    type="number"
                    value={hyperparameters.learningRate}
                    onChange={(e) => handleHyperparameterChange('learningRate', parseFloat(e.target.value))}
                    InputProps={{ inputProps: { min: 0.0001, max: 1, step: 0.0001 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Optimizer</InputLabel>
                    <Select
                      value={hyperparameters.optimizer}
                      onChange={(e) => handleHyperparameterChange('optimizer', e.target.value)}
                      label="Optimizer"
                    >
                      <MenuItem value="Adam">Adam</MenuItem>
                      <MenuItem value="SGD">SGD</MenuItem>
                      <MenuItem value="RMSprop">RMSprop</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Model specific hyperparameters */}
                {modelType === 'computer_vision' && (
                  <>
                    <Grid item xs={12}>
                      <Typography gutterBottom>Image Size</Typography>
                      <Slider
                        value={hyperparameters.imgSize}
                        onChange={(e, value) => handleHyperparameterChange('imgSize', value)}
                        step={32}
                        marks
                        min={416}
                        max={1280}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom>Confidence Threshold</Typography>
                      <Slider
                        value={hyperparameters.confidence}
                        onChange={(e, value) => handleHyperparameterChange('confidence', value)}
                        step={0.05}
                        min={0.1}
                        max={0.95}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom>IoU Threshold</Typography>
                      <Slider
                        value={hyperparameters.iou}
                        onChange={(e, value) => handleHyperparameterChange('iou', value)}
                        step={0.05}
                        min={0.1}
                        max={0.95}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={hyperparameters.augmentation}
                            onChange={(e) => handleHyperparameterChange('augmentation', e.target.checked)}
                          />
                        }
                        label="Enable Data Augmentation"
                      />
                    </Grid>
                  </>
                )}

                {modelType === 'supply_chain' && (
                  <>
                    <Grid item xs={12}>
                      <Typography gutterBottom>Hidden Layers</Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {hyperparameters.hiddenLayers.map((size, index) => (
                          <TextField
                            key={index}
                            label={`Layer ${index + 1}`}
                            type="number"
                            value={size}
                            onChange={(e) => {
                              const newLayers = [...hyperparameters.hiddenLayers];
                              newLayers[index] = parseInt(e.target.value);
                              handleHyperparameterChange('hiddenLayers', newLayers);
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom>Dropout Rate</Typography>
                      <Slider
                        value={hyperparameters.dropout}
                        onChange={(e, value) => handleHyperparameterChange('dropout', value)}
                        step={0.1}
                        min={0}
                        max={0.5}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!dataset || isUploading || isTraining}
            startIcon={isTraining ? <CircularProgress size={20} /> : <PlayArrow />}
          >
            {isTraining ? 'Training in Progress...' : 'Start Training'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
} 