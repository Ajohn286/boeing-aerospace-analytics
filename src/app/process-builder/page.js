'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow,
  Settings,
  Timeline,
  Build,
  Flight,
  Assessment,
  TrendingUp,
  Security,
  Speed,
  Engineering,
  Psychology,
  AutoGraph,
  Warning,
  CheckCircle,
  CloudDownload,
} from '@mui/icons-material';
import WorkflowEditor from '../../components/process-builder/WorkflowEditor';

const processTemplates = [
  {
    id: 'boeing-predictive-maintenance',
    title: 'Boeing Predictive Maintenance',
    description: 'Comprehensive predictive maintenance workflow for aircraft health monitoring and proactive maintenance scheduling',
    icon: <Psychology />,
    complexity: 'Advanced',
    duration: '4-6 hours',
    steps: 21,
    category: 'Predictive Maintenance',
    color: '#1565c0',
    agents: ['Engine Health Monitor', 'Structural Analyst', 'Avionics Specialist', 'Maintenance Scheduler'],
  },
  {
    id: 'engine-health-monitoring',
    title: 'Engine Health Monitoring',
    description: 'Real-time engine performance analysis with vibration monitoring and fuel efficiency optimization',
    icon: <Speed />,
    complexity: 'Advanced',
    duration: '2-4 hours',
    steps: 12,
    category: 'Engine Maintenance',
    color: '#1976d2',
    agents: ['Engine Data Analyst', 'Vibration Monitor', 'Performance Optimizer'],
  },
  {
    id: 'structural-health-monitoring',
    title: 'Structural Health Monitoring',
    description: 'Airframe stress analysis and fatigue monitoring with automated inspection scheduling',
    icon: <Assessment />,
    complexity: 'Advanced',
    duration: '3-5 hours',
    steps: 15,
    category: 'Structural Maintenance',
    color: '#388e3c',
    agents: ['Structural Analyst', 'Fatigue Monitor', 'Inspection Scheduler'],
  },
  {
    id: 'avionics-predictive-maintenance',
    title: 'Avionics Predictive Maintenance',
    description: 'Flight control systems monitoring with software updates and component health tracking',
    icon: <Engineering />,
    complexity: 'Advanced',
    duration: '2-3 hours',
    steps: 10,
    category: 'Avionics',
    color: '#f57c00',
    agents: ['Avionics Specialist', 'Software Manager', 'Component Monitor'],
  },
  {
    id: 'maintenance-scheduling',
    title: 'Intelligent Maintenance Scheduling',
    description: 'AI-driven maintenance planning with resource optimization and downtime minimization',
    icon: <Timeline />,
    complexity: 'Intermediate',
    duration: '1-2 hours',
    steps: 8,
    category: 'Scheduling',
    color: '#7b1fa2',
    agents: ['Scheduler Agent', 'Resource Optimizer', 'Downtime Minimizer'],
  },
  {
    id: 'quality-assurance',
    title: 'Aircraft Quality Assurance',
    description: 'Comprehensive quality control with compliance checking and safety validation',
    icon: <CheckCircle />,
    complexity: 'Advanced',
    duration: '2-4 hours',
    steps: 14,
    category: 'Quality Control',
    color: '#d32f2f',
    agents: ['Quality Inspector', 'Compliance Checker', 'Safety Validator'],
  },
  {
    id: 'fleet-optimization',
    title: 'Fleet Optimization Management',
    description: 'Fleet-wide maintenance coordination with capacity planning and efficiency optimization',
    icon: <Flight />,
    complexity: 'Intermediate',
    duration: '1-3 hours',
    steps: 9,
    category: 'Fleet Management',
    color: '#00796b',
    agents: ['Fleet Coordinator', 'Capacity Planner', 'Efficiency Optimizer'],
  },
  {
    id: 'safety-monitoring',
    title: 'Safety Monitoring System',
    description: 'Real-time safety monitoring with incident prevention and risk assessment',
    icon: <Security />,
    complexity: 'Advanced',
    duration: '2-3 hours',
    steps: 11,
    category: 'Safety',
    color: '#5d4037',
    agents: ['Safety Monitor', 'Risk Assessor', 'Incident Preventer'],
  },
  {
    id: 'data-collection-automation',
    title: 'Aircraft Data Collection',
    description: 'Automated sensor data collection and processing for maintenance analytics',
    icon: <CloudDownload />,
    complexity: 'Basic',
    duration: '30-60 min',
    steps: 6,
    category: 'Data Collection',
    color: '#303f9f',
    agents: ['Data Collector', 'Sensor Manager', 'Analytics Processor'],
  },
];

export default function ProcessBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setWorkflowDialogOpen(true);
  };

  const handleCloseWorkflow = () => {
    setWorkflowDialogOpen(false);
    setSelectedTemplate(null);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Basic': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Boeing Maintenance Process Builder
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Design and automate aircraft maintenance workflows with AI-powered predictive analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose from pre-built maintenance templates or create custom workflows for your Boeing fleet operations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {processTemplates.map((template) => (
          <Grid item xs={12} md={6} lg={4} key={template.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: template.color, 
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {template.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3">
                      {template.title}
                    </Typography>
                    <Chip 
                      label={template.category} 
                      size="small" 
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip 
                    label={template.complexity} 
                    size="small" 
                    color={getComplexityColor(template.complexity)}
                  />
                  <Chip 
                    label={`${template.steps} steps`} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    label={template.duration} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>AI Agents:</strong>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {template.agents.map((agent, index) => (
                    <Chip 
                      key={index}
                      label={agent} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={() => handleTemplateSelect(template)}
                  sx={{ 
                    bgcolor: template.color,
                    '&:hover': {
                      bgcolor: template.color,
                      filter: 'brightness(0.9)',
                    }
                  }}
                >
                  Use Template
                </Button>
                <IconButton size="small">
                  <Settings />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Workflow Editor Dialog */}
      <Dialog 
        open={workflowDialogOpen} 
        onClose={handleCloseWorkflow}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selectedTemplate && (
              <Avatar sx={{ bgcolor: selectedTemplate.color }}>
                {selectedTemplate.icon}
              </Avatar>
            )}
            <Box>
              <Typography variant="h6">
                {selectedTemplate?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure and customize your Boeing maintenance workflow
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedTemplate && (
            <WorkflowEditor template={selectedTemplate} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWorkflow}>Cancel</Button>
          <Button variant="contained">Deploy Maintenance Workflow</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 