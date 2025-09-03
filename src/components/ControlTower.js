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
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Badge,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Flight,
  LocalShipping,
  Build,
  Analytics,
  Speed,
  AttachMoney,
  Schedule,
  Notifications,
  Refresh,
  Fullscreen,
  LocationOn,
  Assessment,
  AutoGraph,
  Psychology,
  AccessTime,
  Timeline,
  Engineering,
  Security,
  CloudDownload,
  Settings,
  FlightTakeoff,
  FlightLand,
  AirplanemodeActive,
  BuildCircle,
  WarningAmber,
  CheckCircleOutline,
  ErrorOutline
} from '@mui/icons-material';
import DynamicControlMap from './DynamicControlMap';
import Image from 'next/image';

// Mock real-time data for Boeing manufacturing and predictive maintenance operations
const mockControlTowerData = {
  overview: {
    totalPlants: 24, // manufacturing plants
    activePlants: 22,
    maintenanceInProgress: 2,
    predictiveCenters: 8,
    manufacturingEfficiency: 94.2, // percentage
    predictiveAccuracy: 96.5, // percentage
    maintenanceEfficiency: 91.8, // percentage
    qualityScore: 99.1, // percentage
    activeAircraft: 847, // active aircraft in fleet
    totalFleet: 950, // total aircraft in fleet
    groundedAircraft: 7 // grounded aircraft
  },
  alerts: [
    { type: 'error', severity: 'error', message: 'Everett 787 assembly line equipment failure detected - immediate maintenance required', priority: 'critical' },
    { type: 'warning', severity: 'warning', message: 'Renton 737 production line efficiency dropping - predictive maintenance scheduled within 48h', priority: 'high' },
    { type: 'warning', severity: 'warning', message: 'Supply chain delays affecting component delivery to Charleston facility', priority: 'medium' },
    { type: 'success', severity: 'info', message: 'Seattle predictive maintenance system prevented 15% efficiency loss', priority: 'medium' },
    { type: 'info', severity: 'info', message: 'New IoT sensors integrated - North Charleston manufacturing facility', priority: 'low' },
    { type: 'info', severity: 'info', message: 'Scheduled equipment maintenance completed - Boeing MRO center', priority: 'low' }
  ],
  manufacturing: {
    productionEfficiency: 94.2,
    equipmentHealth: 98.1,
    qualityControl: 91.8,
    maintenanceEfficiency: 87.5,
    technicianAvailability: 89.3,
    inventoryManagement: 92.7
  },
  kpis: {
    manufacturingEfficiency: {
      label: 'Manufacturing Efficiency',
      value: '94.2%',
      trend: 'up',
      change: '+2.1% from last week'
    },
    activePlants: {
      label: 'Active Plants',
      value: '22/24',
      trend: 'up',
      change: '+1 from yesterday'
    },
    predictiveAccuracy: {
      label: 'Predictive Accuracy',
      value: '96.5%',
      trend: 'up',
      change: '+1.5% from last month'
    },
    qualityScore: {
      label: 'Quality Score',
      value: '99.1%',
      trend: 'stable',
      change: 'No change from last week'
    }
  }
};

export default function ControlTower() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();

  // Set isClient to true after component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update time every second, but only on client side
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'success';
    if (health >= 80) return 'warning';
    return 'error';
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <Box sx={{ 
      background: '#FFFFFF', // White background
      color: '#000000', // Black text
      minHeight: '100vh',
      width: '100%',
      p: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 25% 25%, ${alpha('#000', 0.05)} 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, ${alpha('#000', 0.03)} 0%, transparent 50%)`,
        zIndex: 0
      }} />

      {/* Header */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image 
            src="/images/Boeing.png" 
            alt="Boeing Logo" 
            width={60} 
            height={40}
            style={{ objectFit: 'contain' }}
          />
          <Box>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 'bold', 
              fontSize: '1.8rem',
              mb: 0.5,
              color: '#000000'
            }}>
              Boeing Manufacturing Control Tower
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem', color: '#666666' }}>
              Real-time manufacturing operations and predictive maintenance monitoring
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            icon={<CheckCircle />} 
            label="All Plants Operational" 
            color="success" 
            size="small"
            sx={{
              backgroundColor: '#E8F5E8',
              color: '#2E7D32',
              '& .MuiChip-icon': {
                color: '#2E7D32'
              }
            }}
          />
          <Typography variant="body2" component="div" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: '0.8rem',
            color: '#666666'
          }}>
            <AccessTime sx={{ fontSize: 16 }} />
            {isClient && currentTime.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      {/* Key Performance Indicators */}
      <Grid container spacing={2} sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        {Object.entries(mockControlTowerData.kpis).map(([key, kpi]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card sx={{ 
              height: '110px',
              bgcolor: '#FFFFFF', 
              border: '1px solid #E0E0E0',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#F8F8F8',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardContent sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="body2" sx={{ 
                    color: '#666666', 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    lineHeight: 1.2
                  }}>
                    {kpi.label}
                  </Typography>
                  <Box sx={{ 
                    color: kpi.trend === 'up' ? '#4caf50' : kpi.trend === 'down' ? '#f44336' : '#ff9800',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {kpi.trend === 'up' ? <TrendingUp sx={{ fontSize: 16 }} /> : 
                     kpi.trend === 'down' ? <TrendingDown sx={{ fontSize: 16 }} /> : 
                     <Timeline sx={{ fontSize: 16 }} />}
                  </Box>
                </Box>
                
                <Typography variant="h5" sx={{ 
                  color: '#000000', 
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1.2
                }}>
                  {kpi.value}
                </Typography>
                
                <Typography variant="caption" sx={{ 
                  color: kpi.trend === 'up' ? '#4caf50' : kpi.trend === 'down' ? '#f44336' : '#ff9800',
                  fontSize: '0.7rem',
                  fontWeight: 500
                }}>
                  {kpi.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Fleet Health Overview */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            height: '400px',
            bgcolor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>
                  Fleet Health Overview
                </Typography>
                <IconButton size="small" onClick={handleRefresh} disabled={refreshing}>
                  <Refresh sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {Object.entries(mockControlTowerData.manufacturing).map(([key, value]) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 'bold',
                        color: getHealthColor(value) === 'success' ? '#4caf50' : 
                               getHealthColor(value) === 'warning' ? '#ff9800' : '#f44336'
                      }}>
                        {value}%
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666666',
                        fontSize: '0.75rem',
                        textTransform: 'capitalize'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={value} 
                        color={getHealthColor(value)}
                        sx={{ mt: 1, height: 4, borderRadius: 2 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Aircraft Status Summary */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<FlightTakeoff />} 
                  label={`${mockControlTowerData.overview.activeAircraft} Active`} 
                  color="success" 
                  variant="outlined"
                />
                <Chip 
                  icon={<Build />} 
                  label={`${mockControlTowerData.overview.maintenanceInProgress} In Maintenance`} 
                  color="warning" 
                  variant="outlined"
                />
                <Chip 
                  icon={<Warning />} 
                  label={`${mockControlTowerData.overview.groundedAircraft} Grounded`} 
                  color="error" 
                  variant="outlined"
                />
                <Chip 
                  icon={<Engineering />} 
                  label={`${mockControlTowerData.overview.totalFleet} Total Fleet`} 
                  color="info" 
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Real-time Alerts */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            height: '400px',
            bgcolor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000', mb: 2 }}>
                Real-time Alerts
              </Typography>
              
              <List sx={{ p: 0, maxHeight: '320px', overflow: 'auto' }}>
                {mockControlTowerData.alerts.map((alert, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <Alert 
                      severity={alert.severity} 
                      sx={{ 
                        width: '100%',
                        fontSize: '0.75rem',
                        '& .MuiAlert-message': {
                          fontSize: '0.75rem',
                          lineHeight: 1.3
                        }
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {alert.message}
                      </Typography>
                    </Alert>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Fleet Map */}
        <Grid item xs={12}>
          <Card sx={{ 
            height: '500px',
            bgcolor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>
                  Global Fleet Distribution
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    icon={<FlightTakeoff />} 
                    label="Active" 
                    size="small"
                    sx={{ bgcolor: '#E8F5E8', color: '#2E7D32' }}
                  />
                  <Chip 
                    icon={<Build />} 
                    label="Maintenance" 
                    size="small"
                    sx={{ bgcolor: '#FFF3E0', color: '#F57C00' }}
                  />
                  <Chip 
                    icon={<Warning />} 
                    label="Grounded" 
                    size="small"
                    sx={{ bgcolor: '#FFEBEE', color: '#D32F2F' }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ height: 'calc(100% - 60px)' }}>
                <DynamicControlMap 
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 