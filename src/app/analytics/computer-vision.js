'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Videocam,
  Warning,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Flight,
  Engineering,
  Timer,
  Shield,
  Analytics,
  Speed,
  Person,
  Groups,
  ZoomIn,
  ZoomOut,
  Refresh,
  CloudUpload,
  Memory,
  Storage,
  Timeline,
  Build,
  Psychology,
  AutoGraph
} from '@mui/icons-material';
import Image from 'next/image';

// Simulated real-time aircraft health metrics
const generateMetrics = () => ({
  engineHealth: {
    active: Math.floor(Math.random() * 4) + 8,
    maintenance: Math.floor(Math.random() * 3) + 1,
    avgEfficiency: (Math.random() * 5 + 92).toFixed(1),
    healthScore: Math.floor(Math.random() * 10) + 85
  },
  structuralHealth: {
    stressLevels: Math.floor(Math.random() * 5) + 92,
    fatigueAlerts: Math.floor(Math.random() * 2),
    structuralScore: Math.floor(Math.random() * 8) + 90
  },
  avionicsHealth: {
    systemsOnline: Math.floor(Math.random() * 3) + 18,
    errorRate: Math.floor(Math.random() * 2) + 1,
    performanceLevel: Math.random() < 0.3 ? 'Optimal' : Math.random() < 0.7 ? 'Normal' : 'Attention'
  }
});

// Aircraft zone monitoring data
const aircraftZoneData = [
  { zone: 'Engine Bay A', activity: 87, status: 'optimal', systems: 12 },
  { zone: 'Engine Bay B', activity: 65, status: 'normal', systems: 8 },
  { zone: 'Structural Frame', activity: 23, status: 'attention', systems: 3 },
  { zone: 'Avionics Bay', activity: 45, status: 'optimal', systems: 6 },
  { zone: 'Hydraulic Systems', activity: 92, status: 'optimal', systems: 15 }
];

// Aircraft health alerts
const recentAlerts = [
  { id: 1, time: '10:23 AM', type: 'Engine', message: 'Engine vibration levels above normal in Engine A', severity: 'medium' },
  { id: 2, time: '09:45 AM', type: 'Structural', message: 'Stress levels detected in wing root section', severity: 'high' },
  { id: 3, time: '09:12 AM', type: 'Avionics', message: 'Navigation system calibration required', severity: 'low' },
  { id: 4, time: '08:30 AM', type: 'Performance', message: 'Fuel efficiency below optimal levels', severity: 'medium' }
];

export default function AircraftHealthMonitoring() {
  const [metrics, setMetrics] = useState(generateMetrics());
  const [viewMode, setViewMode] = useState('live');
  const [selectedGif, setSelectedGif] = useState('engine');
  const theme = useTheme();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'success';
      case 'normal': return 'warning';
      case 'attention': return 'error';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Aircraft Health Monitoring
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time aircraft health analysis using advanced sensor monitoring and predictive analytics
        </Typography>
      </Box>

      {/* Visual Demo Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                <Videocam sx={{ mr: 1, verticalAlign: 'middle' }} />
                Live Aircraft Monitoring
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ToggleButtonGroup
                  value={selectedGif}
                  exclusive
                  onChange={(e, value) => value && setSelectedGif(value)}
                  size="small"
                >
                  <ToggleButton value="engine">
                    <Flight sx={{ mr: 0.5 }} fontSize="small" />
                    Engine
                  </ToggleButton>
                  <ToggleButton value="structural">
                    <Engineering sx={{ mr: 0.5 }} fontSize="small" />
                    Structural
                  </ToggleButton>
                </ToggleButtonGroup>
                <IconButton size="small">
                  <Refresh />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: 400, backgroundColor: '#f5f5f5', borderRadius: 1, overflow: 'hidden' }}>
              {selectedGif === 'engine' ? (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <video 
                    src="/images/turbofan.mp4.mp4" 
                    alt="Engine Health Analysis"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Overlay annotations */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: '20%', 
                    left: '30%', 
                    border: '2px solid #00ff00',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderRadius: 1
                  }}>
                    <Typography variant="caption" sx={{ color: '#00ff00', fontWeight: 'bold' }}>
                      Engine Hull - Optimal
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid #ffff00',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(255, 255, 0, 0.1)',
                    borderRadius: 1
                  }}>
                    <Typography variant="caption" sx={{ color: '#ffaa00', fontWeight: 'bold' }}>
                      Turbine - Normal
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <video 
                    src="/images/turbofan.mp4.mp4" 
                    alt="Structural Health Analysis"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Overlay annotations */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: '15%', 
                    left: '20%', 
                    border: '2px solid #00ff00',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderRadius: 1
                  }}>
                    <Typography variant="caption" sx={{ color: '#00ff00', fontWeight: 'bold' }}>
                      Wing Structure - Optimal
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: '15%', 
                    left: '25%', 
                    border: '2px solid #ff0000',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderRadius: 1
                  }}>
                    <Typography variant="caption" sx={{ color: '#ff0000', fontWeight: 'bold' }}>
                      Stress Point - Monitor
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Engine Health Metrics */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Engine Health
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="primary">
                      {metrics.engineHealth.active}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Engines
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="warning.main">
                      {metrics.engineHealth.maintenance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      In Maintenance
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Average Efficiency: {metrics.engineHealth.avgEfficiency}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={metrics.engineHealth.healthScore} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Health Score: {metrics.engineHealth.healthScore}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Structural Health Metrics */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Engineering sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Structural Health
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="success.main">
                      {metrics.structuralHealth.stressLevels}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stress Levels
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="error.main">
                      {metrics.structuralHealth.fatigueAlerts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fatigue Alerts
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Structural Score: {metrics.structuralHealth.structuralScore}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={metrics.structuralHealth.structuralScore} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Avionics Health Metrics */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Avionics Health
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="success.main">
                      {metrics.avionicsHealth.systemsOnline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Systems Online
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="error.main">
                      {metrics.avionicsHealth.errorRate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Error Rate
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={metrics.avionicsHealth.performanceLevel} 
                    color={metrics.avionicsHealth.performanceLevel === 'Optimal' ? 'success' : 
                           metrics.avionicsHealth.performanceLevel === 'Normal' ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Aircraft Zone Monitoring */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Aircraft Zone Monitoring
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Aircraft Zone</TableCell>
                    <TableCell>Activity Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Active Systems</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aircraftZoneData.map((zone, index) => (
                    <TableRow key={index}>
                      <TableCell>{zone.zone}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={zone.activity} 
                            sx={{ width: 60, mr: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="body2">{zone.activity}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={zone.status} 
                          color={getStatusColor(zone.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{zone.systems}</TableCell>
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
              Recent Health Alerts
            </Typography>
            <List>
              {recentAlerts.map((alert, index) => (
                <ListItem key={alert.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Warning color={getSeverityColor(alert.severity)} />
                  </ListItemIcon>
                  <ListItemText
                    primary={alert.message}
                    secondary={`${alert.time} - ${alert.type}`}
                  />
                  <Chip 
                    label={alert.severity} 
                    color={getSeverityColor(alert.severity)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 