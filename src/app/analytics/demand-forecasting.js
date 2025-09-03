'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Timeline,
  AutoGraph,
  Flight,
  Build,
  Speed,
  Warning,
  CheckCircle,
  Engineering,
  CalendarMonth,
  Assessment,
  Refresh,
  CloudUpload,
  Psychology,
  Settings,
  Insights,
  ShowChart,
  PieChart,
  BarChart,
  AttachMoney,
  Schedule,
  Business,
} from '@mui/icons-material';

// Mock data for engine performance forecasting
const enginePerformanceData = {
  currentMonth: {
    predicted: 94.2,
    actual: 92.8,
    variance: -1.4,
    confidence: 94.2
  },
  nextMonth: {
    predicted: 91.5,
    confidence: 91.7,
    trend: 'decreasing'
  },
  engineTypes: [
    { 
      name: 'Trent XWB-84', 
      currentPerformance: 96.2, 
      forecast: 94.8, 
      trend: -1.4, 
      maintenanceCycle: 'high',
      confidence: 95.2,
      risk: 'Medium'
    },
    { 
      name: 'Trent 1000', 
      currentPerformance: 93.5, 
      forecast: 91.2, 
      trend: -2.3, 
      maintenanceCycle: 'medium',
      confidence: 92.8,
      risk: 'High'
    },
    { 
      name: 'CFM LEAP-1A', 
      currentPerformance: 95.8, 
      forecast: 94.1, 
      trend: -1.7, 
      maintenanceCycle: 'medium',
      confidence: 89.5,
      risk: 'Medium'
    },
    { 
      name: 'PW1100G-JM', 
      currentPerformance: 92.1, 
      forecast: 89.5, 
      trend: -2.6, 
      maintenanceCycle: 'high',
      confidence: 87.3,
      risk: 'High'
    },
    { 
      name: 'Trent 7000', 
      currentPerformance: 97.3, 
      forecast: 96.8, 
      trend: -0.5, 
      maintenanceCycle: 'low',
      confidence: 94.1,
      risk: 'Low'
    }
  ],
  maintenanceFacilities: [
    { name: 'Toulouse', capacity: 25, utilization: 78, forecast: 82, growth: 5.1, risk: 'Low' },
    { name: 'Hamburg', capacity: 18, utilization: 82, forecast: 87, growth: 6.1, risk: 'Medium' },
    { name: 'Tianjin', capacity: 12, utilization: 65, forecast: 71, growth: 9.2, risk: 'Low' },
    { name: 'Mobile', capacity: 8, utilization: 71, forecast: 76, growth: 7.0, risk: 'Low' },
    { name: 'Seattle', capacity: 15, utilization: 89, forecast: 94, growth: 5.6, risk: 'High' }
  ],
  seasonalFactors: [
    { month: 'Jan', factor: 0.95, temperature: 45 },
    { month: 'Feb', factor: 0.92, temperature: 48 },
    { month: 'Mar', factor: 0.94, temperature: 55 },
    { month: 'Apr', factor: 0.96, temperature: 65 },
    { month: 'May', factor: 0.98, temperature: 75 },
    { month: 'Jun', factor: 1.02, temperature: 82 },
    { month: 'Jul', factor: 1.05, temperature: 88 },
    { month: 'Aug', factor: 1.03, temperature: 86 },
    { month: 'Sep', factor: 1.01, temperature: 78 },
    { month: 'Oct', factor: 0.99, temperature: 68 },
    { month: 'Nov', factor: 0.97, temperature: 58 },
    { month: 'Dec', factor: 0.96, temperature: 48 }
  ],
  externalFactors: [
    { factor: 'Flight Hours', impact: 'High', correlation: 0.89, trend: 'Negative' },
    { factor: 'Environmental Conditions', impact: 'Medium', correlation: 0.67, trend: 'Negative' },
    { factor: 'Maintenance Schedule', impact: 'High', correlation: 0.78, trend: 'Positive' },
    { factor: 'Fuel Quality', impact: 'Medium', correlation: 0.45, trend: 'Positive' },
    { factor: 'Operating Conditions', impact: 'High', correlation: 0.82, trend: 'Negative' }
  ]
};

const modelMetrics = {
  accuracy: 94.2,
  mape: 5.8, // Mean Absolute Percentage Error
  rmse: 2.1,
  r2: 0.89,
  lastUpdate: '2024-01-15T10:30:00Z',
  trainingData: '24 months',
  algorithm: 'LSTM + Prophet Hybrid'
};

export default function EnginePerformanceForecasting() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('next_month');
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuations in confidence scores
      setIsLoading(false);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend) => {
    if (trend > -1) return 'success';
    if (trend > -3) return 'warning';
    return 'error';
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 80) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            <AutoGraph sx={{ mr: 1, verticalAlign: 'middle' }} />
            Engine Performance Forecasting Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            AI-powered engine performance prediction and maintenance forecasting
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Timeframe</InputLabel>
            <Select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              label="Timeframe"
            >
              <MenuItem value="next_week">Next Week</MenuItem>
              <MenuItem value="next_month">Next Month</MenuItem>
              <MenuItem value="next_quarter">Next Quarter</MenuItem>
              <MenuItem value="next_year">Next Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {/* Key Metrics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="primary">
                    {enginePerformanceData.nextMonth.predicted.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Predicted Performance
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    +{((enginePerformanceData.nextMonth.predicted - enginePerformanceData.currentMonth.actual) / enginePerformanceData.currentMonth.actual * 100).toFixed(1)}% vs Current
                  </Typography>
                </Box>
                <TrendingUp color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="success.main">
                    {enginePerformanceData.nextMonth.confidence}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Forecast Confidence
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={enginePerformanceData.nextMonth.confidence} 
                    color="success"
                    sx={{ mt: 1, height: 6, borderRadius: 3 }}
                  />
                </Box>
                <Psychology color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="secondary">
                    {modelMetrics.accuracy}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Model Accuracy
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    MAPE: {modelMetrics.mape}%
                  </Typography>
                </Box>
                <Assessment color="secondary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {enginePerformanceData.currentMonth.variance}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Variance
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Actual vs Predicted
                  </Typography>
                </Box>
                <ShowChart color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Engine Type Forecasts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <BarChart sx={{ mr: 1, verticalAlign: 'middle' }} />
              Engine Type Performance Forecast
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Engine Type</TableCell>
                    <TableCell align="right">Current Performance</TableCell>
                    <TableCell align="right">Forecast</TableCell>
                    <TableCell align="center">Trend</TableCell>
                    <TableCell align="center">Confidence</TableCell>
                    <TableCell align="center">Risk</TableCell>
                    <TableCell align="center">Maintenance Cycle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enginePerformanceData.engineTypes.map((engine) => (
                    <TableRow key={engine.name}>
                      <TableCell>{engine.name}</TableCell>
                      <TableCell align="right">{engine.currentPerformance.toFixed(1)}%</TableCell>
                      <TableCell align="right">
                        <Box sx={{ fontWeight: 'bold' }}>
                          {engine.forecast.toFixed(1)}%
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          {engine.trend > 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                          <Typography 
                            variant="body2" 
                            color={engine.trend > 0 ? 'success.main' : 'error.main'}
                            sx={{ fontWeight: 'bold' }}
                          >
                            {engine.trend > 0 ? '+' : ''}{engine.trend}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={`${engine.confidence}%`} 
                          color={getConfidenceColor(engine.confidence)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={engine.risk} 
                          color={getRiskColor(engine.risk)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">
                          {engine.maintenanceCycle}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Model Performance */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
                Model Performance
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Algorithm</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {modelMetrics.algorithm}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Accuracy</Typography>
                  <Typography variant="body2" color="success.main">
                    {modelMetrics.accuracy}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">R² Score</Typography>
                  <Typography variant="body2">{modelMetrics.r2}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Training Data</Typography>
                  <Typography variant="body2">{modelMetrics.trainingData}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Last Update</Typography>
                  <Typography variant="body2">
                    {new Date(modelMetrics.lastUpdate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Stack spacing={1}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<CloudUpload />}
                  fullWidth
                >
                  Retrain Model
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<Settings />}
                  fullWidth
                >
                  Adjust Parameters
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<Assessment />}
                  fullWidth
                >
                  Generate Report
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Maintenance Facilities Analysis */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Build sx={{ mr: 1, verticalAlign: 'middle' }} />
              Maintenance Facilities Utilization
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Facility</TableCell>
                    <TableCell align="right">Current Utilization</TableCell>
                    <TableCell align="right">Forecast</TableCell>
                    <TableCell align="center">Growth</TableCell>
                    <TableCell align="center">Risk</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enginePerformanceData.maintenanceFacilities.map((facility) => (
                    <TableRow key={facility.name}>
                      <TableCell>{facility.name}</TableCell>
                      <TableCell align="right">{facility.utilization}%</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                        {facility.forecast}%
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          <TrendingUp color="success" fontSize="small" />
                          <Typography variant="body2" color="success.main">
                            +{facility.growth}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={facility.risk} 
                          color={getRiskColor(facility.risk)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <CalendarMonth sx={{ mr: 1, verticalAlign: 'middle' }} />
              Seasonal Performance Factors
            </Typography>
            <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1, p: 2, position: 'relative' }}>
              {/* Simplified seasonal chart visualization */}
              <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: '80%', px: 2 }}>
                {enginePerformanceData.seasonalFactors.map((month) => (
                  <Box key={month.month} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 20,
                        height: `${month.factor * 100}px`,
                        bgcolor: month.factor > 1.05 ? 'error.main' : month.factor > 0.98 ? 'warning.main' : 'success.main',
                        borderRadius: 1,
                        mb: 1
                      }}
                    />
                    <Typography variant="caption">{month.month}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {month.temperature}°F
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                Seasonal performance multiplier vs average temperature correlation
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* External Factors & Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
              External Factors Impact Analysis
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Factor</TableCell>
                    <TableCell align="center">Impact Level</TableCell>
                    <TableCell align="center">Correlation</TableCell>
                    <TableCell align="center">Trend</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enginePerformanceData.externalFactors.map((factor) => (
                    <TableRow key={factor.factor}>
                      <TableCell>{factor.factor}</TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={factor.impact} 
                          color={
                            factor.impact === 'High' ? 'error' : 
                            factor.impact === 'Medium' ? 'warning' : 
                            'success'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography 
                          variant="body2" 
                          color={factor.correlation > 0 ? 'success.main' : 'error.main'}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {factor.correlation > 0 ? '+' : ''}{factor.correlation}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          {factor.trend === 'Positive' ? 
                            <TrendingUp color="success" fontSize="small" /> : 
                            factor.trend === 'Negative' ? 
                            <TrendingDown color="error" fontSize="small" /> : 
                            <Timeline color="warning" fontSize="small" />
                          }
                          <Typography variant="body2">
                            {factor.trend}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" variant="outlined">
                          Monitor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
              Forecast Alerts
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Warning color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="PW1100G-JM Performance Decline"
                  secondary="2.6% predicted decrease - investigate maintenance schedule"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Trent 7000 Performance Stability"
                  secondary="Trent 7000 showing consistent performance"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Facility Utilization Increase"
                  secondary="Toulouse showing 5.1% growth opportunity"
                />
              </ListItem>
            </List>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>Maintenance Planning</AlertTitle>
              Schedule Trent 1000 maintenance for next month to prevent performance degradation.
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Model Architecture Info */}
      <Alert severity="info" icon={<Psychology />} sx={{ mt: 3 }}>
        <AlertTitle>AI Model Architecture</AlertTitle>
        <Typography variant="body2">
          • <strong>Hybrid LSTM-Prophet:</strong> Combines time series patterns with seasonal decomposition
          <br />
          • <strong>Feature Engineering:</strong> Weather data, flight hours, maintenance history, fuel quality
          <br />
          • <strong>Real-time Updates:</strong> Model retrains weekly with new performance data and external factors
          <br />
          • <strong>Ensemble Approach:</strong> Multiple models weighted by recent performance and confidence intervals
        </Typography>
      </Alert>
    </Box>
  );
} 