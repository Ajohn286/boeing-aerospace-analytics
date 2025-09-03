'use client';

import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Assessment,
  CheckCircle,
  Error,
  Timeline,
  Speed,
  Memory,
  Storage,
  CloudDownload,
  BugReport,
  Visibility,
  Settings,
  TrendingUp,
} from '@mui/icons-material';
import { useState } from 'react';

export default function ModelEvaluation({ results, modelType }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!results) return null;

  const getMetricColor = (value) => {
    if (value >= 0.8) return 'success';
    if (value >= 0.6) return 'warning';
    return 'error';
  };

  const renderMetric = (label, value, description) => (
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {(value * 100).toFixed(1)}%
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={value * 100} 
          color={getMetricColor(value)}
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </Grid>
  );

  const renderModelStatus = () => (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
      {results.status === 'success' ? (
        <>
          <CheckCircle color="success" />
          <Typography variant="subtitle1" color="success.main">
            Model Training Complete
          </Typography>
        </>
      ) : (
        <>
          <Error color="error" />
          <Typography variant="subtitle1" color="error">
            Training Failed: {results.error}
          </Typography>
        </>
      )}
    </Box>
  );

  const renderTrainingMetrics = () => (
    <Grid container spacing={3}>
      {/* Basic metrics */}
      {renderMetric(
        'Accuracy',
        results.accuracy,
        'Overall prediction accuracy'
      )}
      {renderMetric(
        'Precision',
        results.precision,
        'Ratio of correct positive predictions'
      )}
      {renderMetric(
        'Recall',
        results.recall,
        'Ratio of actual positives correctly identified'
      )}
      {renderMetric(
        'F1 Score',
        results.f1Score,
        'Harmonic mean of precision and recall'
      )}

      {/* Training details */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Training Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Training Time
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Speed />
                    <Typography variant="h6">
                      {results.trainingTime || '2h 15m'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    GPU Utilization
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Memory />
                    <Typography variant="h6">
                      {results.gpuUtilization || '85%'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Learning curves */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Learning Curves
          </Typography>
          <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
            {/* Placeholder for learning curves chart */}
            <Typography variant="body2" color="text.secondary" align="center">
              Training and validation loss curves will be displayed here
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderPredictions = () => (
    <Grid container spacing={3}>
      {modelType === 'computer_vision' ? (
        <>
          {/* Object detection results */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Detection Results
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(results.predictions || []).map((pred, index) => (
                  <Chip
                    key={index}
                    label={`${pred.label} (${(pred.confidence * 100).toFixed(1)}%)`}
                    color={pred.confidence > 0.7 ? 'success' : 'warning'}
                    icon={<Visibility />}
                  />
                ))}
              </Box>
              <Box sx={{ mt: 3, height: 400, bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Visualization of object detection results will be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Model performance analysis */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Performance Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Speed />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Inference Speed" 
                        secondary={`${results.inferenceSpeed || '45'} FPS`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Memory />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Model Size" 
                        secondary={`${results.modelSize || '14.2'} MB`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <BugReport />
                      </ListItemIcon>
                      <ListItemText 
                        primary="False Positives" 
                        secondary={`${results.falsePositives || '2.3'}%`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      <ListItemText 
                        primary="mAP@0.5:0.95" 
                        secondary={`${results.mAP || '0.82'}`}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      ) : (
        <>
          {/* Supply chain prediction results */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Forecast Results
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell align="right">Actual</TableCell>
                      <TableCell align="right">Predicted</TableCell>
                      <TableCell align="right">Error</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(results.predictions || [
                      { metric: 'Demand', actual: 1200, predicted: 1180, error: '1.7%' },
                      { metric: 'Stock Level', actual: 450, predicted: 460, error: '2.2%' },
                      { metric: 'Lead Time', actual: 5.2, predicted: 5.0, error: '3.8%' },
                    ]).map((row) => (
                      <TableRow key={row.metric}>
                        <TableCell component="th" scope="row">
                          {row.metric}
                        </TableCell>
                        <TableCell align="right">{row.actual}</TableCell>
                        <TableCell align="right">{row.predicted}</TableCell>
                        <TableCell align="right">{row.error}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Time series visualization */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Time Series Analysis
              </Typography>
              <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Time series forecast visualization will be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assessment />
          Model Evaluation Results
        </Typography>
        {renderModelStatus()}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="Training Metrics" icon={<TrendingUp />} iconPosition="start" />
          <Tab label="Predictions" icon={<Visibility />} iconPosition="start" />
        </Tabs>
      </Box>

      {activeTab === 0 ? renderTrainingMetrics() : renderPredictions()}

      {/* Export model section */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Download trained model">
          <IconButton color="primary" size="large">
            <CloudDownload />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
} 