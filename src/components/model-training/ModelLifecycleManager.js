'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Timeline,
  CheckCircle,
  Schedule,
  Error,
  Warning,
  ModelTraining,
  Assessment,
  Person,
  Tune,
  CloudDone,
  Refresh,
  TrendingUp,
  PlayArrow,
  Pause,
  Stop,
  Visibility,
  Download,
} from '@mui/icons-material';

const lifecycleStages = [
  { id: 'data_prep', name: 'Data Preparation', icon: <Timeline />, color: '#2196f3' },
  { id: 'training', name: 'Model Training', icon: <ModelTraining />, color: '#ff9800' },
  { id: 'validation', name: 'Validation', icon: <Assessment />, color: '#9c27b0' },
  { id: 'human_review', name: 'Human Review', icon: <Person />, color: '#f44336' },
  { id: 'tuning', name: 'Model Tuning', icon: <Tune />, color: '#4caf50' },
  { id: 'deployment', name: 'Deployment', icon: <CloudDone />, color: '#607d8b' },
];

const mockProjects = [
  {
    id: 1,
    name: 'Supply Chain Demand Forecasting',
    type: 'supply_chain',
    stage: 'tuning',
    progress: 75,
    accuracy: 0.91,
    status: 'active',
    lastUpdated: '2 hours ago',
    team: ['Alice Johnson', 'Bob Smith'],
    iterations: 3,
  },
  {
    id: 2,
    name: 'Quality Control Vision Model',
    type: 'computer_vision',
    stage: 'human_review',
    progress: 60,
    accuracy: 0.87,
    status: 'review_pending',
    lastUpdated: '1 day ago',
    team: ['Carol Davis', 'David Wilson'],
    iterations: 2,
  },
  {
    id: 3,
    name: 'Inventory Optimization',
    type: 'supply_chain',
    stage: 'deployment',
    progress: 100,
    accuracy: 0.94,
    status: 'deployed',
    lastUpdated: '3 days ago',
    team: ['Eve Brown'],
    iterations: 5,
  },
];

export default function ModelLifecycleManager({ models = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const allProjects = [...mockProjects, ...models.map(model => ({
    id: model.id,
    name: model.name,
    type: model.type,
    stage: 'validation',
    progress: 50,
    accuracy: model.accuracy,
    status: 'active',
    lastUpdated: 'Just now',
    team: ['You'],
    iterations: 1,
  }))];

  const getStageIcon = (stageId, status) => {
    const stage = lifecycleStages.find(s => s.id === stageId);
    if (!stage) return <Schedule />;
    
    if (status === 'deployed') return <CheckCircle sx={{ color: 'success.main' }} />;
    if (status === 'review_pending') return <Warning sx={{ color: 'warning.main' }} />;
    if (status === 'error') return <Error sx={{ color: 'error.main' }} />;
    
    return React.cloneElement(stage.icon, { sx: { color: stage.color } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'success';
      case 'active': return 'primary';
      case 'review_pending': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const renderProjectCard = (project) => (
    <Card 
      key={project.id} 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
      }}
      onClick={() => setSelectedProject(project)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {project.name}
            </Typography>
            <Chip 
              label={project.type.replace('_', ' ')} 
              size="small" 
              color={project.type === 'computer_vision' ? 'primary' : 'secondary'}
              sx={{ mb: 1 }}
            />
          </Box>
          {getStageIcon(project.stage, project.status)}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={project.progress} 
            color={getStatusColor(project.status)}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Accuracy
            </Typography>
            <Typography variant="h6">
              {(project.accuracy * 100).toFixed(1)}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Iterations
            </Typography>
            <Typography variant="h6">
              {project.iterations}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="caption" color="text.secondary">
          Updated {project.lastUpdated}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button size="small" startIcon={<Visibility />}>
          View Details
        </Button>
        <Button size="small" startIcon={<TrendingUp />}>
          Metrics
        </Button>
      </CardActions>
    </Card>
  );

  const renderLifecycleTimeline = () => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        ML Lifecycle Overview
      </Typography>
      <Grid container spacing={2}>
        {lifecycleStages.map((stage, index) => (
          <Grid item xs={12} md={2} key={stage.id}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: stage.color, 
                  mx: 'auto', 
                  mb: 1,
                  width: 48,
                  height: 48,
                }}
              >
                {stage.icon}
              </Avatar>
              <Typography variant="body2" fontWeight="bold">
                {stage.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Stage {index + 1}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderProjectsList = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Active Projects ({allProjects.length})
        </Typography>
        <Button variant="contained" startIcon={<PlayArrow />}>
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {allProjects.map(renderProjectCard)}
      </Grid>
    </Box>
  );

  const renderMetricsDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="primary">
              {allProjects.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Projects
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="success.main">
              {allProjects.filter(p => p.status === 'deployed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Deployed Models
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="secondary">
              {(allProjects.reduce((sum, p) => sum + p.accuracy, 0) / allProjects.length * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Accuracy
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Project Status Distribution
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Stage</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Accuracy</TableCell>
                    <TableCell align="right">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={project.type.replace('_', ' ')} 
                          size="small"
                          color={project.type === 'computer_vision' ? 'primary' : 'secondary'}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStageIcon(project.stage, project.status)}
                          {lifecycleStages.find(s => s.id === project.stage)?.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={project.status.replace('_', ' ')} 
                          size="small"
                          color={getStatusColor(project.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {(project.accuracy * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={project.progress} 
                            sx={{ width: 60 }}
                            size="small"
                          />
                          {project.progress}%
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderTeamCollaboration = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Team Collaboration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <ModelTraining />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Model training completed"
                    secondary="Quality Control Vision Model • 2 hours ago"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Human review requested"
                    secondary="Supply Chain Demand Forecasting • 4 hours ago"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <CloudDone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Model deployed to production"
                    secondary="Inventory Optimization • 1 day ago"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Team Performance
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <AlertTitle>Team Insights</AlertTitle>
                Your team has completed 12 models this month with an average accuracy of 89.3%
              </Alert>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Models Deployed This Month
                </Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                <Typography variant="caption">9/12 models successfully deployed</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Average Review Time
                </Typography>
                <Typography variant="h6">2.3 days</Typography>
                <Typography variant="caption" color="success.main">
                  15% improvement from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      {renderLifecycleTimeline()}
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Projects" icon={<Timeline />} iconPosition="start" />
          <Tab label="Metrics" icon={<Assessment />} iconPosition="start" />
          <Tab label="Team" icon={<Person />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderProjectsList()}
          {activeTab === 1 && renderMetricsDashboard()}
          {activeTab === 2 && renderTeamCollaboration()}
        </Box>
      </Paper>
    </Box>
  );
} 