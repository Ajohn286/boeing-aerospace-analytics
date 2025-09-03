'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Divider,
  TextField,
  MenuItem,
  Slider,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  AccountBalance,
  TrendingUp,
  Assessment,
  CheckCircle,
  Cancel,
  Pending,
  AttachMoney,
  Calculate,
  Analytics,
  Comment,
  Send,
  MoreVert,
  Warning,
  Info,
  Person,
  Group,
  Schedule,
  Description,
  ThumbUp,
  ThumbDown,
  Edit,
  Visibility,
  Flight,
  Build,
  Engineering,
  DataUsage,
  CloudDownload,
  VerifiedUser,
  CompareArrows,
  BusinessCenter,
  Archive,
  Security,
  ExpandMore,
  PlayArrow,
  Pause,
  AccessTime,
  HourglassEmpty,
  CheckCircleOutline,
  ErrorOutline,
  ContactMail,
  Notifications,
  PriorityHigh,
  Speed,
  Psychology
} from '@mui/icons-material';

// Data Sources for Predictive Analytics
const dataSources = [
  { id: 'erp', name: 'Aircraft Management System', status: 'connected', lastSync: '2024-01-26 08:30', records: '2.4M', type: 'operational' },
  { id: 'crm', name: 'Maintenance Records', status: 'connected', lastSync: '2024-01-26 08:25', records: '890K', type: 'maintenance' },
  { id: 'supply', name: 'Engine Performance Data', status: 'connected', lastSync: '2024-01-26 08:35', records: '1.2M', type: 'performance' },
  { id: 'market', name: 'Flight Data Analytics', status: 'syncing', lastSync: '2024-01-26 07:45', records: '450K', type: 'flight' },
  { id: 'hr', name: 'Technician Systems', status: 'connected', lastSync: '2024-01-26 08:20', records: '25K', type: 'workforce' },
  { id: 'treasury', name: 'Cost Management Data', status: 'error', lastSync: '2024-01-26 06:15', records: '12K', type: 'financial' },
  { id: 'customer', name: 'Aircraft Health Analytics', status: 'connected', lastSync: '2024-01-26 08:40', records: '3.1M', type: 'health' },
  { id: 'economic', name: 'Environmental Factors', status: 'connected', lastSync: '2024-01-26 08:00', records: '180K', type: 'environmental' }
];

// Predictive Analytics Workflow with 8 Approvers
const predictiveWorkflow = [
  {
    id: 'data-collection',
    name: 'Sensor Data Collection & Validation',
    status: 'completed',
    owner: 'Data Team',
    duration: '2 hours',
    description: 'Aggregate data from aircraft sensors and maintenance systems',
    completedAt: '2024-01-26 10:30'
  },
  {
    id: 'data-analyst-review',
    name: 'Data Analyst Review',
    status: 'completed',
    owner: 'Sarah Chen',
    role: 'Senior Data Analyst',
    duration: '4 hours',
    description: 'Validate data quality and prepare initial predictive models',
    completedAt: '2024-01-26 14:30',
    avatar: 'SC'
  },
  {
    id: 'fp-analyst-review',
    name: 'Predictive Analytics Review',
    status: 'completed',
    owner: 'Michael Rodriguez',
    role: 'Predictive Analytics Specialist',
    duration: '6 hours',
    description: 'Build predictive models and performance analysis',
    completedAt: '2024-01-26 18:00',
    avatar: 'MR'
  },
  {
    id: 'senior-analyst-review',
    name: 'Senior Analyst Approval',
    status: 'in-progress',
    owner: 'Jennifer Kim',
    role: 'Senior Predictive Analyst',
    duration: '3 hours',
    description: 'Review assumptions and methodology',
    startedAt: '2024-01-27 09:00',
    avatar: 'JK'
  },
  {
    id: 'fp-manager-review',
    name: 'Maintenance Manager Approval',
    status: 'pending',
    owner: 'David Thompson',
    role: 'Maintenance Manager',
    duration: '2 hours',
    description: 'Strategic review and operational alignment',
    avatar: 'DT'
  },
  {
    id: 'controller-review',
    name: 'Engineering Review',
    status: 'pending',
    owner: 'Lisa Park',
    role: 'Senior Engineer',
    duration: '4 hours',
    description: 'Engineering standards and safety review',
    avatar: 'LP'
  },
  {
    id: 'finance-director-review',
    name: 'Operations Director Approval',
    status: 'pending',
    owner: 'Robert Johnson',
    role: 'Operations Director',
    duration: '3 hours',
    description: 'Executive review and strategic validation',
    avatar: 'RJ'
  },
  {
    id: 'cfo-approval',
    name: 'Chief Operations Officer Final Approval',
    status: 'pending',
    owner: 'Patricia Williams',
    role: 'Chief Operations Officer',
    duration: '1 hour',
    description: 'Final executive sign-off',
    avatar: 'PW'
  }
];

// Current Predictive Analytics Data
const currentPrediction = {
  period: 'Q2 2024',
  maintenanceCosts: 12500000,
  enginePerformance: 94.2,
  grossEfficiency: 37.6,
  operationalCosts: 3500000,
  costSavings: 1200000,
  confidence: 85,
  scenarios: ['Base Case', 'Optimistic', 'Conservative'],
  lastUpdated: '2024-01-27 09:15',
  version: 'v2.3'
};

export default function PredictiveAnalytics() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStep, setSelectedStep] = useState(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState('in-progress');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getDataSourceIcon = (type) => {
    switch (type) {
      case 'financial': return <AttachMoney />;
      case 'maintenance': return <Build />;
      case 'operational': return <Flight />;
      case 'performance': return <Speed />;
      case 'flight': return <Flight />;
      case 'workforce': return <Person />;
      case 'health': return <Assessment />;
      case 'environmental': return <Engineering />;
      default: return <DataUsage />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'success';
      case 'syncing': return 'warning';
      case 'error': return 'error';
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'grey';
      default: return 'grey';
    }
  };

  const getWorkflowIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in-progress': return <HourglassEmpty />;
      case 'pending': return <Schedule />;
      default: return <Pending />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Predictive Analytics Workflow
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Multi-source data integration and collaborative predictive analytics with 8-layer approval process
      </Typography>

      {/* Workflow Status Banner */}
      <Alert 
        severity={workflowStatus === 'in-progress' ? 'info' : 'success'} 
        sx={{ mb: 3, borderRadius: 2 }}
      >
        <AlertTitle>Q2 2024 Predictive Analysis - Step 4 of 8</AlertTitle>
        Currently with Senior Predictive Analyst (Jennifer Kim) for methodology review. 
        {workflowStatus === 'in-progress' && ' Expected completion: 2 hours remaining.'}
      </Alert>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab icon={<DataUsage />} label="Data Sources" />
          <Tab icon={<Timeline />} label="Approval Workflow" />
          <Tab icon={<Assessment />} label="Predictive Review" />
          <Tab icon={<Group />} label="Stakeholder Dashboard" />
        </Tabs>
      </Paper>

      {/* Data Sources Tab */}
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Data Platform Integration Status
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Real-time data feeds from 8 disparate source systems
                </Typography>

                <Grid container spacing={2}>
                  {dataSources.map((source) => (
                    <Grid item xs={12} md={6} key={source.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          p: 2,
                          border: source.status === 'error' ? '2px solid' : '1px solid',
                          borderColor: source.status === 'error' ? 'error.main' : 'divider',
                          '&:hover': { boxShadow: 2 }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: 1, 
                            bgcolor: source.status === 'connected' || source.status === 'completed' ? 'success.light' :
                                     source.status === 'syncing' ? 'warning.light' :
                                     source.status === 'error' ? 'error.light' :
                                     source.status === 'in-progress' ? 'info.light' : 'grey.200',
                            color: source.status === 'connected' || source.status === 'completed' ? 'success.main' :
                                   source.status === 'syncing' ? 'warning.main' :
                                   source.status === 'error' ? 'error.main' :
                                   source.status === 'in-progress' ? 'info.main' : 'grey.600'
                          }}>
                            {getDataSourceIcon(source.type)}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {source.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {source.records} records
                            </Typography>
                          </Box>
                          <Chip 
                            label={source.status} 
                            color={source.status === 'connected' || source.status === 'completed' ? 'success' :
                                   source.status === 'in-progress' ? 'info' :
                                   source.status === 'error' ? 'error' :
                                   source.status === 'syncing' ? 'warning' : 'default'}
                            size="small"
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Last sync: {source.lastSync}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Data Quality Metrics
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Overall Data Health
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={87} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="h6" color="primary">87%</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Completeness" 
                      secondary="94%" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Accuracy" 
                      secondary="91%" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Timeliness" 
                      secondary="89%" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Consistency" 
                      secondary="85%" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>

                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    Treasury data connection error - manual intervention required
                  </Typography>
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Approval Workflow Tab */}
      {activeTab === 1 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  8-Stage Approval Process
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Collaborative forecasting workflow with multi-level validation
                </Typography>

                <Timeline>
                  {predictiveWorkflow.map((step, index) => (
                    <TimelineItem key={step.id}>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                        {step.completedAt || step.startedAt || 'Pending'}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot 
                          color={step.status === 'completed' ? 'success' :
                                 step.status === 'in-progress' ? 'info' :
                                 step.status === 'error' ? 'error' :
                                 step.status === 'syncing' ? 'warning' : 'grey'} 
                          sx={{ p: 1 }}
                        >
                          {getWorkflowIcon(step.status)}
                        </TimelineDot>
                        {index < predictiveWorkflow.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Card 
                          variant="outlined"
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: step.status === 'in-progress' ? '2px solid' : '1px solid',
                            borderColor: step.status === 'in-progress' ? 'primary.main' : 'divider',
                            '&:hover': { boxShadow: 2 }
                          }}
                          onClick={() => setSelectedStep(step)}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {step.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {step.description}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Chip 
                                  label={step.owner} 
                                  size="small" 
                                  avatar={step.avatar ? <Avatar sx={{ width: 24, height: 24 }}>{step.avatar}</Avatar> : undefined}
                                />
                                <Chip 
                                  label={step.duration} 
                                  size="small" 
                                  variant="outlined"
                                  icon={<AccessTime />}
                                />
                              </Box>
                            </Box>
                            <Chip 
                              label={step.status} 
                              color={step.status === 'completed' ? 'success' :
                                     step.status === 'in-progress' ? 'info' :
                                     step.status === 'error' ? 'error' :
                                     step.status === 'syncing' ? 'warning' : 'default'}
                              size="small"
                            />
                          </Box>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Current Review Details
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                    JK
                  </Avatar>
                  <Typography variant="h6">Jennifer Kim</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Senior FP&A Analyst
                  </Typography>
                  <Chip 
                    label="Currently Reviewing" 
                    color="info" 
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Review Focus"
                      secondary="Forecast assumptions and methodology validation"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Time Remaining"
                      secondary="~2 hours (Est. completion: 11:00 AM)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Comments"
                      secondary="3 review notes added"
                    />
                  </ListItem>
                </List>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContactMail />}
                  sx={{ mt: 2 }}
                >
                  Send Reminder
                </Button>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Bottleneck Analysis
                </Typography>
                
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    Average approval time: 18 hours (Target: 12 hours)
                  </Typography>
                </Alert>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Common delays by stage:
                </Typography>

                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Controller Review" 
                      secondary="avg 6.2 hours (complexity)"
                    />
                    <ListItemSecondaryAction>
                      <Chip label="High" color="error" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Finance Director" 
                      secondary="avg 4.8 hours (availability)"
                    />
                    <ListItemSecondaryAction>
                      <Chip label="Medium" color="warning" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="FP&A Manager" 
                      secondary="avg 2.1 hours (standard)"
                    />
                    <ListItemSecondaryAction>
                      <Chip label="Low" color="success" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Forecast Review Tab */}
      {activeTab === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Q2 2024 Financial Forecast
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Current forecast version {currentForecast.version} - Last updated {currentForecast.lastUpdated}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">Revenue</Typography>
                      <Typography variant="h4" color="primary.main">
                        {formatCurrency(currentForecast.revenue)}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={78} 
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        78% vs. budget
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">COGS</Typography>
                      <Typography variant="h4" color="error.main">
                        {formatCurrency(currentForecast.cogs)}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={62} 
                        color="secondary"
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        62% of revenue
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">Gross Margin</Typography>
                      <Typography variant="h4" color="success.main">
                        {currentForecast.grossMargin}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={currentForecast.grossMargin} 
                        color="success"
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Target: 35%
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">EBITDA</Typography>
                      <Typography variant="h4" color="info.main">
                        {formatCurrency(currentForecast.ebitda)}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        color="info"
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        9.6% margin
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Scenario Analysis
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Scenario</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">EBITDA</TableCell>
                        <TableCell align="right">Margin %</TableCell>
                        <TableCell align="center">Probability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow selected>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label="Base Case" color="primary" size="small" />
                          </Box>
                        </TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.revenue)}</TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.ebitda)}</TableCell>
                        <TableCell align="right">{currentForecast.grossMargin}%</TableCell>
                        <TableCell align="center">
                          <Chip label="60%" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label="Optimistic" color="success" size="small" />
                          </Box>
                        </TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.revenue * 1.12)}</TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.ebitda * 1.28)}</TableCell>
                        <TableCell align="right">42.1%</TableCell>
                        <TableCell align="center">
                          <Chip label="25%" color="warning" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label="Conservative" color="warning" size="small" />
                          </Box>
                        </TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.revenue * 0.88)}</TableCell>
                        <TableCell align="right">{formatCurrency(currentForecast.ebitda * 0.65)}</TableCell>
                        <TableCell align="right">31.2%</TableCell>
                        <TableCell align="center">
                          <Chip label="15%" color="error" size="small" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Forecast Confidence
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={currentForecast.confidence} 
                      sx={{ 
                        height: 12, 
                        borderRadius: 6, 
                        width: 200,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 6,
                          background: 'linear-gradient(90deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)'
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ mt: 2, color: 'success.main' }}>
                    {currentForecast.confidence}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data Quality & Model Accuracy
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Key Assumptions
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Market Growth"
                      secondary="8.5% YoY regional expansion"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Raw Materials"
                      secondary="12% cost inflation expected"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Competition"
                      secondary="2 new entrants in Q2"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Supply Chain"
                      secondary="95% on-time delivery rate"
                    />
                  </ListItem>
                </List>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Risk Factors
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="High Impact"
                      secondary="Regulatory changes affecting pricing"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="warning" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Medium Impact"
                      secondary="Seasonal demand variance"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Low Impact"
                      secondary="Currency exchange fluctuations"
                    />
                  </ListItem>
                </List>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    Monte Carlo simulation suggests 75% probability of achieving base case scenario
                  </Typography>
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Stakeholder Dashboard Tab */}
      {activeTab === 3 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Approval Stakeholder Matrix
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  The complexity of FP&A: 8 different approvers, each with specific focus areas
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Approver</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Review Focus</TableCell>
                        <TableCell align="center">Avg. Time</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {predictiveWorkflow.map((step) => (
                        <TableRow key={step.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {step.avatar && (
                                <Avatar sx={{ width: 32, height: 32 }}>{step.avatar}</Avatar>
                              )}
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {step.owner}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {step.role || step.owner}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={step.role?.includes('Data') ? 'Data' : 
                                    step.role?.includes('FP&A') ? 'FP&A' : 
                                    step.role?.includes('Controller') ? 'Accounting' :
                                    step.role?.includes('Director') ? 'Finance' :
                                    step.role?.includes('CFO') ? 'Executive' : 'Operations'} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {step.description}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">{step.duration}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={step.status} 
                              color={step.status === 'completed' ? 'success' :
                                     step.status === 'in-progress' ? 'info' :
                                     step.status === 'error' ? 'error' :
                                     step.status === 'syncing' ? 'warning' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {step.status === 'in-progress' && (
                              <Button size="small" variant="outlined" startIcon={<ContactMail />}>
                                Remind
                              </Button>
                            )}
                            {step.status === 'pending' && (
                              <Button size="small" variant="text" startIcon={<Notifications />}>
                                Notify
                              </Button>
                            )}
                            {step.status === 'completed' && (
                              <IconButton size="small">
                                <CheckCircle color="success" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Why FP&A is Complex: Multi-Layer Validation
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle1" gutterBottom color="error.main">
                        Common Bottlenecks
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <ErrorOutline color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Controller Review"
                            secondary="Complex accounting standards validation"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Warning color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Executive Availability"
                            secondary="C-level scheduling conflicts"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PriorityHigh color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Cross-Functional Dependencies"
                            secondary="Multiple departments must align"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle1" gutterBottom color="success.main">
                        Process Improvements
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Parallel Reviews"
                            secondary="Some steps can run concurrently"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Analytics color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Automated Validations"
                            secondary="Reduce manual check time"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Schedule color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="SLA Monitoring"
                            secondary="Track and optimize approval times"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Workflow Metrics
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Cycle Time
                  </Typography>
                  <Typography variant="h4" color="warning.main">18.2 hrs</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Target: 12 hours
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Active Workflows"
                      secondary="12 forecasts in various stages"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Completed This Week"
                      secondary="8 forecasts approved"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Escalations"
                      secondary="2 requiring executive intervention"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Success Rate"
                      secondary="94% first-pass approval rate"
                    />
                  </ListItem>
                </List>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Stakeholder Workload
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Current review queue by approver:
                </Typography>

                {predictiveWorkflow.filter(step => step.status === 'pending' || step.status === 'in-progress').map((step) => (
                  <Box key={step.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2">{step.owner}</Typography>
                      <Badge 
                        badgeContent={step.status === 'in-progress' ? 1 : 3} 
                        color={step.status === 'in-progress' ? 'warning' : 'default'}
                      >
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                          {step.avatar}
                        </Avatar>
                      </Badge>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={step.status === 'in-progress' ? 60 : 25} 
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                ))}

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    Jennifer Kim has the highest current workload with 4 pending reviews
                  </Typography>
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
} 