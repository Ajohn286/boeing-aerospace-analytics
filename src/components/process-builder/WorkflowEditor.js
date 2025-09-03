'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  Tooltip,
  Drawer,
  Badge,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  Add,
  Edit,
  Delete,
  ExpandMore,
  Timeline,
  Settings,
  Code,
  Schedule,
  Person,
  CheckCircle,
  Error,
  Warning,
  Info,
  Refresh,
  SaveAlt,
  CameraAlt,
  Psychology,
  Storage,
  Assessment,
  CloudUpload,
  GroupWork,
  DataUsage,
  TrendingUp,
  Inventory,
  Security,
  LocalShipping,
  AttachMoney,
  Assignment,
  HighQuality,
  Notifications,
  Analytics,
  Speed,
  CompareArrows,
  PrecisionManufacturing,
  VerifiedUser,
  CloudDownload,
  DonutLarge,
  BusinessCenter,
  Description,
  Send,
  Archive,
  Calculate,
  AccountBalance,
} from '@mui/icons-material';

// Template-specific node libraries
const getTemplateLibrary = (template) => {
  const libraries = {
    'boeing-predictive-maintenance': {
      'Aircraft Data Collection': {
        color: '#2196f3',
        nodes: [
          { id: 'engine-sensor-data', name: 'Engine Sensor Data', icon: <Speed />, description: 'Collect real-time engine performance data' },
          { id: 'structural-sensors', name: 'Structural Sensors', icon: <Assessment />, description: 'Monitor airframe stress and fatigue' },
          { id: 'avionics-data', name: 'Avionics Data', icon: <Settings />, description: 'Collect flight control and navigation data' },
          { id: 'maintenance-records', name: 'Maintenance Records', icon: <Description />, description: 'Historical maintenance and repair data' },
          { id: 'flight-data-recorder', name: 'Flight Data Recorder', icon: <Storage />, description: 'Extract flight operational data' },
        ]
      },
      'Data Processing & Validation': {
        color: '#9c27b0',
        nodes: [
          { id: 'sensor-data-cleaning', name: 'Sensor Data Cleaning', icon: <VerifiedUser />, description: 'Clean and validate sensor readings' },
          { id: 'anomaly-detection', name: 'Anomaly Detection', icon: <Warning />, description: 'Identify unusual patterns in sensor data' },
          { id: 'data-normalization', name: 'Data Normalization', icon: <CompareArrows />, description: 'Normalize data across different sensors' },
          { id: 'quality-assurance', name: 'Quality Assurance', icon: <CheckCircle />, description: 'Ensure data quality and completeness' },
        ]
      },
      'Predictive Analytics': {
        color: '#4caf50',
        nodes: [
          { id: 'engine-health-monitoring', name: 'Engine Health Monitoring', icon: <TrendingUp />, description: 'Monitor engine performance trends' },
          { id: 'component-life-prediction', name: 'Component Life Prediction', icon: <Timeline />, description: 'Predict remaining useful life of components' },
          { id: 'failure-mode-analysis', name: 'Failure Mode Analysis', icon: <Psychology />, description: 'Analyze potential failure scenarios' },
          { id: 'risk-assessment', name: 'Risk Assessment', icon: <Security />, description: 'Assess operational risks and safety factors' },
        ]
      },
      'Maintenance Planning': {
        color: '#ff9800',
        nodes: [
          { id: 'maintenance-scheduling', name: 'Maintenance Scheduling', icon: <Schedule />, description: 'Optimize maintenance schedules' },
          { id: 'parts-inventory', name: 'Parts Inventory', icon: <Inventory />, description: 'Manage spare parts inventory' },
          { id: 'technician-allocation', name: 'Technician Allocation', icon: <Person />, description: 'Allocate maintenance technicians' },
          { id: 'cost-optimization', name: 'Cost Optimization', icon: <AttachMoney />, description: 'Optimize maintenance costs' },
        ]
      },
      'Alert & Reporting': {
        color: '#f44336',
        nodes: [
          { id: 'critical-alerts', name: 'Critical Alerts', icon: <Notifications />, description: 'Send immediate critical maintenance alerts' },
          { id: 'maintenance-reports', name: 'Maintenance Reports', icon: <Assessment />, description: 'Generate detailed maintenance reports' },
          { id: 'regulatory-compliance', name: 'Regulatory Compliance', icon: <AccountBalance />, description: 'Ensure regulatory compliance reporting' },
          { id: 'performance-dashboard', name: 'Performance Dashboard', icon: <Analytics />, description: 'Real-time fleet performance monitoring' },
        ]
      }
    },
    'engine-health-monitoring': {
      'Engine Data Collection': {
        color: '#2196f3',
        nodes: [
          { id: 'vibration-sensors', name: 'Vibration Sensors', icon: <Speed />, description: 'Monitor engine vibration patterns' },
          { id: 'temperature-sensors', name: 'Temperature Sensors', icon: <TrendingUp />, description: 'Track engine temperature variations' },
          { id: 'pressure-sensors', name: 'Pressure Sensors', icon: <Assessment />, description: 'Monitor fuel and oil pressure' },
          { id: 'performance-parameters', name: 'Performance Parameters', icon: <Analytics />, description: 'Track thrust and efficiency metrics' },
        ]
      },
      'Engine Analysis': {
        color: '#9c27b0',
        nodes: [
          { id: 'vibration-analysis', name: 'Vibration Analysis', icon: <Psychology />, description: 'Analyze vibration signatures for anomalies' },
          { id: 'thermal-analysis', name: 'Thermal Analysis', icon: <TrendingUp />, description: 'Analyze thermal patterns and hotspots' },
          { id: 'performance-trending', name: 'Performance Trending', icon: <Timeline />, description: 'Track performance degradation trends' },
          { id: 'wear-pattern-analysis', name: 'Wear Pattern Analysis', icon: <Assessment />, description: 'Analyze component wear patterns' },
        ]
      },
      'Predictive Models': {
        color: '#4caf50',
        nodes: [
          { id: 'ml-prediction-models', name: 'ML Prediction Models', icon: <PrecisionManufacturing />, description: 'Machine learning prediction models' },
          { id: 'failure-prediction', name: 'Failure Prediction', icon: <Warning />, description: 'Predict potential engine failures' },
          { id: 'life-extension', name: 'Life Extension', icon: <Timeline />, description: 'Optimize component life extension' },
          { id: 'efficiency-optimization', name: 'Efficiency Optimization', icon: <Speed />, description: 'Optimize engine efficiency' },
        ]
      },
      'Maintenance Actions': {
        color: '#ff9800',
        nodes: [
          { id: 'inspection-scheduling', name: 'Inspection Scheduling', icon: <Schedule />, description: 'Schedule engine inspections' },
          { id: 'component-replacement', name: 'Component Replacement', icon: <Settings />, description: 'Plan component replacements' },
          { id: 'overhaul-planning', name: 'Overhaul Planning', icon: <PrecisionManufacturing />, description: 'Plan engine overhauls' },
          { id: 'quality-control', name: 'Quality Control', icon: <CheckCircle />, description: 'Ensure maintenance quality' },
        ]
      }
    },
    'structural-health-monitoring': {
      'Structural Data Collection': {
        color: '#2196f3',
        nodes: [
          { id: 'strain-gauges', name: 'Strain Gauges', icon: <Assessment />, description: 'Monitor structural strain and stress' },
          { id: 'fatigue-sensors', name: 'Fatigue Sensors', icon: <Timeline />, description: 'Track fatigue accumulation' },
          { id: 'corrosion-monitoring', name: 'Corrosion Monitoring', icon: <Warning />, description: 'Monitor corrosion development' },
          { id: 'load-monitoring', name: 'Load Monitoring', icon: <Speed />, description: 'Track structural loads and forces' },
        ]
      },
      'Structural Analysis': {
        color: '#9c27b0',
        nodes: [
          { id: 'stress-analysis', name: 'Stress Analysis', icon: <Psychology />, description: 'Analyze structural stress patterns' },
          { id: 'fatigue-analysis', name: 'Fatigue Analysis', icon: <Timeline />, description: 'Analyze fatigue damage accumulation' },
          { id: 'crack-detection', name: 'Crack Detection', icon: <Warning />, description: 'Detect structural cracks and defects' },
          { id: 'integrity-assessment', name: 'Integrity Assessment', icon: <VerifiedUser />, description: 'Assess structural integrity' },
        ]
      },
      'Predictive Maintenance': {
        color: '#4caf50',
        nodes: [
          { id: 'life-prediction', name: 'Life Prediction', icon: <Timeline />, description: 'Predict structural component life' },
          { id: 'repair-planning', name: 'Repair Planning', icon: <Settings />, description: 'Plan structural repairs' },
          { id: 'reinforcement-planning', name: 'Reinforcement Planning', icon: <Security />, description: 'Plan structural reinforcements' },
          { id: 'inspection-optimization', name: 'Inspection Optimization', icon: <Assessment />, description: 'Optimize inspection intervals' },
        ]
      },
      'Safety & Compliance': {
        color: '#f44336',
        nodes: [
          { id: 'safety-assessment', name: 'Safety Assessment', icon: <Security />, description: 'Assess structural safety' },
          { id: 'regulatory-reporting', name: 'Regulatory Reporting', icon: <AccountBalance />, description: 'Generate regulatory reports' },
          { id: 'airworthiness-certification', name: 'Airworthiness Certification', icon: <VerifiedUser />, description: 'Maintain airworthiness certification' },
          { id: 'emergency-procedures', name: 'Emergency Procedures', icon: <Warning />, description: 'Define emergency procedures' },
        ]
      }
    },
    'avionics-predictive-maintenance': {
      'Avionics Data Collection': {
        color: '#2196f3',
        nodes: [
          { id: 'flight-control-data', name: 'Flight Control Data', icon: <Settings />, description: 'Collect flight control system data' },
          { id: 'navigation-systems', name: 'Navigation Systems', icon: <Timeline />, description: 'Monitor navigation system performance' },
          { id: 'communication-systems', name: 'Communication Systems', icon: <Send />, description: 'Track communication system health' },
          { id: 'electrical-systems', name: 'Electrical Systems', icon: <Speed />, description: 'Monitor electrical system performance' },
        ]
      },
      'System Analysis': {
        color: '#9c27b0',
        nodes: [
          { id: 'system-performance', name: 'System Performance', icon: <Analytics />, description: 'Analyze system performance metrics' },
          { id: 'error-log-analysis', name: 'Error Log Analysis', icon: <Warning />, description: 'Analyze system error logs' },
          { id: 'software-health', name: 'Software Health', icon: <Code />, description: 'Monitor software system health' },
          { id: 'hardware-diagnostics', name: 'Hardware Diagnostics', icon: <Assessment />, description: 'Run hardware diagnostics' },
        ]
      },
      'Predictive Actions': {
        color: '#4caf50',
        nodes: [
          { id: 'software-updates', name: 'Software Updates', icon: <CloudDownload />, description: 'Plan software updates' },
          { id: 'hardware-replacement', name: 'Hardware Replacement', icon: <Settings />, description: 'Plan hardware replacements' },
          { id: 'system-calibration', name: 'System Calibration', icon: <PrecisionManufacturing />, description: 'Schedule system calibration' },
          { id: 'backup-systems', name: 'Backup Systems', icon: <Security />, description: 'Ensure backup system readiness' },
        ]
      },
      'Quality Assurance': {
        color: '#ff9800',
        nodes: [
          { id: 'system-testing', name: 'System Testing', icon: <CheckCircle />, description: 'Test system functionality' },
          { id: 'certification-maintenance', name: 'Certification Maintenance', icon: <VerifiedUser />, description: 'Maintain system certifications' },
          { id: 'documentation-updates', name: 'Documentation Updates', icon: <Description />, description: 'Update system documentation' },
          { id: 'training-coordination', name: 'Training Coordination', icon: <Person />, description: 'Coordinate crew training' },
        ]
      }
    }
  };

  // Default to boeing-predictive-maintenance if template not found
  return libraries[template.id] || libraries['boeing-predictive-maintenance'];
};

// Generate workflow nodes based on template
const generateWorkflowNodes = (template) => {
  const baseNodes = {
    'boeing-predictive-maintenance': [
      // Aircraft Data Collection (5 steps)
      { id: 'node-1', type: 'engine-sensor-data', position: { x: 200, y: 100 }, category: 'Aircraft Data Collection', status: 'completed' },
      { id: 'node-2', type: 'structural-sensors', position: { x: 200, y: 180 }, category: 'Aircraft Data Collection', status: 'completed' },
      { id: 'node-3', type: 'avionics-data', position: { x: 200, y: 260 }, category: 'Aircraft Data Collection', status: 'completed' },
      { id: 'node-4', type: 'maintenance-records', position: { x: 200, y: 340 }, category: 'Aircraft Data Collection', status: 'completed' },
      { id: 'node-5', type: 'flight-data-recorder', position: { x: 200, y: 420 }, category: 'Aircraft Data Collection', status: 'completed' },
      
      // Data Processing & Validation (3 steps)
      { id: 'node-6', type: 'sensor-data-cleaning', position: { x: 200, y: 520 }, category: 'Data Processing & Validation', status: 'running' },
      { id: 'node-7', type: 'anomaly-detection', position: { x: 200, y: 600 }, category: 'Data Processing & Validation', status: 'pending' },
      { id: 'node-8', type: 'data-normalization', position: { x: 200, y: 680 }, category: 'Data Processing & Validation', status: 'pending' },
      
      // Predictive Analytics (4 steps)
      { id: 'node-9', type: 'engine-health-monitoring', position: { x: 200, y: 780 }, category: 'Predictive Analytics', status: 'pending' },
      { id: 'node-10', type: 'component-life-prediction', position: { x: 200, y: 860 }, category: 'Predictive Analytics', status: 'pending' },
      { id: 'node-11', type: 'failure-mode-analysis', position: { x: 200, y: 940 }, category: 'Predictive Analytics', status: 'pending' },
      { id: 'node-12', type: 'risk-assessment', position: { x: 200, y: 1020 }, category: 'Predictive Analytics', status: 'pending' },
      
      // Maintenance Planning (3 steps)
      { id: 'node-13', type: 'maintenance-scheduling', position: { x: 200, y: 1120 }, category: 'Maintenance Planning', status: 'pending' },
      { id: 'node-14', type: 'parts-inventory', position: { x: 200, y: 1200 }, category: 'Maintenance Planning', status: 'pending' },
      { id: 'node-15', type: 'technician-allocation', position: { x: 200, y: 1280 }, category: 'Maintenance Planning', status: 'pending' },
      
      // Alert & Reporting (4 steps)
      { id: 'node-16', type: 'critical-alerts', position: { x: 200, y: 1380 }, category: 'Alert & Reporting', status: 'pending' },
      { id: 'node-17', type: 'maintenance-reports', position: { x: 200, y: 1460 }, category: 'Alert & Reporting', status: 'pending' },
      { id: 'node-18', type: 'regulatory-compliance', position: { x: 200, y: 1540 }, category: 'Alert & Reporting', status: 'pending' },
      { id: 'node-19', type: 'performance-dashboard', position: { x: 200, y: 1620 }, category: 'Alert & Reporting', status: 'pending' },
    ],
    'engine-health-monitoring': [
      { id: 'node-1', type: 'vibration-sensors', position: { x: 200, y: 100 }, category: 'Engine Data Collection', status: 'completed' },
      { id: 'node-2', type: 'temperature-sensors', position: { x: 200, y: 220 }, category: 'Engine Data Collection', status: 'completed' },
      { id: 'node-3', type: 'pressure-sensors', position: { x: 200, y: 340 }, category: 'Engine Data Collection', status: 'running' },
      { id: 'node-4', type: 'performance-parameters', position: { x: 200, y: 460 }, category: 'Engine Data Collection', status: 'pending' },
      { id: 'node-5', type: 'vibration-analysis', position: { x: 200, y: 580 }, category: 'Engine Analysis', status: 'pending' },
      { id: 'node-6', type: 'thermal-analysis', position: { x: 200, y: 700 }, category: 'Engine Analysis', status: 'pending' },
      { id: 'node-7', type: 'performance-trending', position: { x: 200, y: 820 }, category: 'Engine Analysis', status: 'pending' },
      { id: 'node-8', type: 'wear-pattern-analysis', position: { x: 200, y: 940 }, category: 'Engine Analysis', status: 'pending' },
      { id: 'node-9', type: 'ml-prediction-models', position: { x: 200, y: 1060 }, category: 'Predictive Models', status: 'pending' },
      { id: 'node-10', type: 'failure-prediction', position: { x: 200, y: 1180 }, category: 'Predictive Models', status: 'pending' },
      { id: 'node-11', type: 'life-extension', position: { x: 200, y: 1300 }, category: 'Predictive Models', status: 'pending' },
      { id: 'node-12', type: 'efficiency-optimization', position: { x: 200, y: 1420 }, category: 'Predictive Models', status: 'pending' },
      { id: 'node-13', type: 'inspection-scheduling', position: { x: 200, y: 1540 }, category: 'Maintenance Actions', status: 'pending' },
      { id: 'node-14', type: 'component-replacement', position: { x: 200, y: 1660 }, category: 'Maintenance Actions', status: 'pending' },
      { id: 'node-15', type: 'overhaul-planning', position: { x: 200, y: 1780 }, category: 'Maintenance Actions', status: 'pending' },
      { id: 'node-16', type: 'quality-control', position: { x: 200, y: 1900 }, category: 'Maintenance Actions', status: 'pending' },
    ],
    'structural-health-monitoring': [
      { id: 'node-1', type: 'strain-gauges', position: { x: 200, y: 100 }, category: 'Structural Data Collection', status: 'completed' },
      { id: 'node-2', type: 'fatigue-sensors', position: { x: 200, y: 220 }, category: 'Structural Data Collection', status: 'completed' },
      { id: 'node-3', type: 'corrosion-monitoring', position: { x: 200, y: 340 }, category: 'Structural Data Collection', status: 'running' },
      { id: 'node-4', type: 'load-monitoring', position: { x: 200, y: 460 }, category: 'Structural Data Collection', status: 'pending' },
      { id: 'node-5', type: 'stress-analysis', position: { x: 200, y: 580 }, category: 'Structural Analysis', status: 'pending' },
      { id: 'node-6', type: 'fatigue-analysis', position: { x: 200, y: 700 }, category: 'Structural Analysis', status: 'pending' },
      { id: 'node-7', type: 'crack-detection', position: { x: 200, y: 820 }, category: 'Structural Analysis', status: 'pending' },
      { id: 'node-8', type: 'integrity-assessment', position: { x: 200, y: 940 }, category: 'Structural Analysis', status: 'pending' },
      { id: 'node-9', type: 'life-prediction', position: { x: 200, y: 1060 }, category: 'Predictive Maintenance', status: 'pending' },
      { id: 'node-10', type: 'repair-planning', position: { x: 200, y: 1180 }, category: 'Predictive Maintenance', status: 'pending' },
      { id: 'node-11', type: 'reinforcement-planning', position: { x: 200, y: 1300 }, category: 'Predictive Maintenance', status: 'pending' },
      { id: 'node-12', type: 'inspection-optimization', position: { x: 200, y: 1420 }, category: 'Predictive Maintenance', status: 'pending' },
      { id: 'node-13', type: 'safety-assessment', position: { x: 200, y: 1540 }, category: 'Safety & Compliance', status: 'pending' },
      { id: 'node-14', type: 'regulatory-reporting', position: { x: 200, y: 1660 }, category: 'Safety & Compliance', status: 'pending' },
      { id: 'node-15', type: 'airworthiness-certification', position: { x: 200, y: 1780 }, category: 'Safety & Compliance', status: 'pending' },
      { id: 'node-16', type: 'emergency-procedures', position: { x: 200, y: 1900 }, category: 'Safety & Compliance', status: 'pending' },
    ],
    'avionics-predictive-maintenance': [
      { id: 'node-1', type: 'flight-control-data', position: { x: 200, y: 100 }, category: 'Avionics Data Collection', status: 'completed' },
      { id: 'node-2', type: 'navigation-systems', position: { x: 200, y: 220 }, category: 'Avionics Data Collection', status: 'completed' },
      { id: 'node-3', type: 'communication-systems', position: { x: 200, y: 340 }, category: 'Avionics Data Collection', status: 'running' },
      { id: 'node-4', type: 'electrical-systems', position: { x: 200, y: 460 }, category: 'Avionics Data Collection', status: 'pending' },
      { id: 'node-5', type: 'system-performance', position: { x: 200, y: 580 }, category: 'System Analysis', status: 'pending' },
      { id: 'node-6', type: 'error-log-analysis', position: { x: 200, y: 700 }, category: 'System Analysis', status: 'pending' },
      { id: 'node-7', type: 'software-health', position: { x: 200, y: 820 }, category: 'System Analysis', status: 'pending' },
      { id: 'node-8', type: 'hardware-diagnostics', position: { x: 200, y: 940 }, category: 'System Analysis', status: 'pending' },
      { id: 'node-9', type: 'software-updates', position: { x: 200, y: 1060 }, category: 'Predictive Actions', status: 'pending' },
      { id: 'node-10', type: 'hardware-replacement', position: { x: 200, y: 1180 }, category: 'Predictive Actions', status: 'pending' },
      { id: 'node-11', type: 'system-calibration', position: { x: 200, y: 1300 }, category: 'Predictive Actions', status: 'pending' },
      { id: 'node-12', type: 'backup-systems', position: { x: 200, y: 1420 }, category: 'Predictive Actions', status: 'pending' },
      { id: 'node-13', type: 'system-testing', position: { x: 200, y: 1540 }, category: 'Quality Assurance', status: 'pending' },
      { id: 'node-14', type: 'certification-maintenance', position: { x: 200, y: 1660 }, category: 'Quality Assurance', status: 'pending' },
      { id: 'node-15', type: 'documentation-updates', position: { x: 200, y: 1780 }, category: 'Quality Assurance', status: 'pending' },
      { id: 'node-16', type: 'training-coordination', position: { x: 200, y: 1900 }, category: 'Quality Assurance', status: 'pending' },
    ]
  };

  return baseNodes[template.id] || baseNodes['boeing-predictive-maintenance'];
};

const generateConnections = (nodes) => {
  return nodes.slice(0, -1).map((node, index) => ({
    id: `connection-${index}`,
    from: node.id,
    to: nodes[index + 1].id
  }));
};

export default function WorkflowEditor({ template }) {
  const [activeTab, setActiveTab] = useState(0);
  const [workflowNodes, setWorkflowNodes] = useState(generateWorkflowNodes(template));
  const [connections, setConnections] = useState(generateConnections(generateWorkflowNodes(template)));
  const [selectedNode, setSelectedNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [draggedNodeType, setDraggedNodeType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Get template-specific library
  const templateLibrary = getTemplateLibrary(template);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'running': return '#ff9800';
      case 'failed': return '#f44336';
      case 'pending': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'running': return <Refresh sx={{ fontSize: 16, animation: 'spin 1s linear infinite' }} />;
      case 'failed': return <Error sx={{ fontSize: 16 }} />;
      case 'pending': return <Schedule sx={{ fontSize: 16 }} />;
      default: return <Info sx={{ fontSize: 16 }} />;
    }
  };

  const handleNodeClick = (node, event) => {
    // Prevent click when dragging
    if (isDragging) return;
    setSelectedNode(node);
  };

  const handleRunWorkflow = () => {
    setIsRunning(!isRunning);
  };

  const getNodeDetails = (nodeType) => {
    for (const [categoryName, category] of Object.entries(templateLibrary)) {
      const node = category.nodes.find(n => n.id === nodeType);
      if (node) return { ...node, categoryColor: category.color, categoryName };
    }
    return null;
  };

  // Enhanced curved path generator for connections
  const generateCurvedPath = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control points for smooth curves
    const cp1x = x1;
    const cp1y = y1 + Math.min(distance * 0.4, 80);
    const cp2x = x2;
    const cp2y = y2 - Math.min(distance * 0.4, 80);
    
    return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  };

  // Handle node dragging
  const handleMouseDown = (node, event) => {
    event.preventDefault();
    setIsDragging(true);
    setSelectedNode(node);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - node.position.x;
    const offsetY = event.clientY - rect.top - node.position.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !selectedNode) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = event.clientX - rect.left - dragOffset.x;
    const newY = event.clientY - rect.top - dragOffset.y;
    
    // Update node position
    setWorkflowNodes(nodes => 
      nodes.map(node => 
        node.id === selectedNode.id 
          ? { ...node, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const renderWorkflowCanvas = () => (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#f8fafc' }}>
      {/* Modern Library Sidebar */}
      <Drawer
        variant="persistent"
        open={libraryOpen}
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            position: 'relative',
            border: 'none',
            borderRight: '1px solid rgba(148, 163, 184, 0.1)',
            bgcolor: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                Process Library
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                Drag components to canvas
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setLibraryOpen(false)}
              sx={{ 
                bgcolor: '#f1f5f9', 
                '&:hover': { bgcolor: '#e2e8f0', transform: 'scale(1.05)' },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ExpandMore />
            </IconButton>
          </Box>
          
          <Chip 
            label={template.title} 
            sx={{ 
              mb: 3, 
              background: `linear-gradient(135deg, ${template.color} 0%, ${template.color}dd 100%)`,
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 2,
              py: 1,
              height: 36,
              boxShadow: `0 4px 14px ${template.color}40`,
              border: 'none',
              '& .MuiChip-label': { px: 1 }
            }}
          />

          <TextField
            fullWidth
            placeholder="Search process steps..."
            size="small"
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e2e8f0',
                '&:hover': {
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-focused': {
                  border: `1px solid ${template.color}`,
                  boxShadow: `0 0 0 3px ${template.color}20`,
                }
              }
            }}
          />

          {Object.entries(templateLibrary).map(([categoryName, category]) => (
            <Accordion 
              key={categoryName} 
              defaultExpanded
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #f1f5f9',
                '&:before': { display: 'none' },
                '& .MuiAccordionSummary-root': {
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#f8fafc' }
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore sx={{ color: '#64748b' }} />}
                sx={{ py: 1.5 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                      boxShadow: `0 2px 8px ${category.color}40`,
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {categoryName}
                  </Typography>
                  <Chip 
                    label={category.nodes.length} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#f1f5f9', 
                      color: '#64748b', 
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24
                    }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, pb: 1.5 }}>
                {category.nodes.map((node) => (
                  <Card
                    key={node.id}
                    sx={{
                      mb: 1.5,
                      cursor: 'grab',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: 2,
                      border: `1px solid ${category.color}15`,
                      bgcolor: 'white',
                      '&:hover': { 
                        transform: 'translateY(-2px) scale(1.02)', 
                        boxShadow: `0 8px 25px ${category.color}20`,
                        border: `1px solid ${category.color}30`,
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)',
                      }
                    }}
                    draggable
                    onDragStart={(e) => {
                      setDraggedNodeType(node.id);
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 1.5,
                            background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: `0 3px 12px ${category.color}40`,
                          }}
                        >
                          {node.icon}
                        </Box>
                        <Typography 
                          variant="body2" 
                          fontWeight="600" 
                          sx={{ 
                            fontSize: '0.875rem', 
                            color: '#1e293b',
                            lineHeight: 1.3
                          }}
                        >
                          {node.name}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontSize: '0.75rem',
                          color: '#64748b',
                          lineHeight: 1.4,
                          display: 'block'
                        }}
                      >
                        {node.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>

      {/* Modern Main Canvas */}
      <Box sx={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden', 
        background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
      }}>
        {/* Modern Canvas Header */}
        <Box sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.04)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconButton 
              onClick={() => setLibraryOpen(!libraryOpen)}
              sx={{
                bgcolor: libraryOpen ? `${template.color}15` : '#f1f5f9',
                color: libraryOpen ? template.color : '#64748b',
                '&:hover': { 
                  bgcolor: libraryOpen ? `${template.color}25` : '#e2e8f0',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Add />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                {template.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={`${workflowNodes.length} steps`} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#f1f5f9', 
                    color: '#64748b', 
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Workflow Designer
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button 
              variant="outlined" 
              startIcon={<SaveAlt />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                bgcolor: 'white',
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Save
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CloudUpload />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                bgcolor: 'white',
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={isRunning ? <Pause /> : <PlayArrow />}
              onClick={handleRunWorkflow}
              sx={{
                background: isRunning 
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : `linear-gradient(135deg, ${template.color} 0%, ${template.color}dd 100%)`,
                color: 'white',
                borderRadius: 2,
                px: 4,
                fontWeight: 600,
                boxShadow: isRunning 
                  ? '0 4px 20px rgba(245, 158, 11, 0.4)'
                  : `0 4px 20px ${template.color}40`,
                border: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isRunning 
                    ? '0 8px 25px rgba(245, 158, 11, 0.5)'
                    : `0 8px 25px ${template.color}50`,
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {isRunning ? 'Pause' : 'Run Workflow'}
            </Button>
          </Box>
        </Box>

        {/* Modern Canvas Area */}
        <Box 
          ref={canvasRef}
          sx={{ 
            position: 'relative', 
            width: '100%', 
            height: 'calc(100% - 100px)',
            overflow: 'auto',
            background: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
            backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedNodeType) {
              const rect = canvasRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left + canvasRef.current.scrollLeft;
              const y = e.clientY - rect.top + canvasRef.current.scrollTop;
              
              const nodeDetails = getNodeDetails(draggedNodeType);
              const newNode = {
                id: `node-${Date.now()}`,
                type: draggedNodeType,
                position: { x: x - 85, y: y - 40 },
                category: nodeDetails?.categoryName,
                status: 'pending'
              };
              
              setWorkflowNodes([...workflowNodes, newNode]);
              setDraggedNodeType(null);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Enhanced Modern Curved Connections */}
          <svg 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none', 
              zIndex: 1 
            }}
          >
            <defs>
              <filter id="modernGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <marker
                id="modernArrowhead"
                markerWidth="14"
                markerHeight="10"
                refX="13"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0,0 L0,10 L14,5 z"
                  fill="url(#modernConnectionGradient)"
                />
              </marker>
              <linearGradient id="modernConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="connectionShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
              </linearGradient>
            </defs>
            
            {connections.map((connection) => {
              const fromNode = workflowNodes.find(n => n.id === connection.from);
              const toNode = workflowNodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;
              
              const x1 = fromNode.position.x + 85;
              const y1 = fromNode.position.y + 80;
              const x2 = toNode.position.x + 85;
              const y2 = toNode.position.y;
              
              const pathData = generateCurvedPath(x1, y1, x2, y2);
              
              return (
                <g key={connection.id}>
                  {/* Shadow path */}
                  <path
                    d={pathData}
                    stroke="url(#connectionShadow)"
                    strokeWidth="12"
                    fill="none"
                    opacity="0.3"
                    filter="url(#modernGlow)"
                  />
                  {/* Main gradient path */}
                  <path
                    d={pathData}
                    stroke="url(#modernConnectionGradient)"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#modernArrowhead)"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    }}
                  />
                  {/* Animated flow particles */}
                  <circle r="5" fill="#6366f1" opacity="0.8">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={pathData}
                    />
                  </circle>
                  <circle r="3" fill="#8b5cf6" opacity="0.6">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={pathData}
                      begin="1s"
                    />
                  </circle>
                  <circle r="2" fill="#06b6d4" opacity="0.4">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={pathData}
                      begin="2s"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Modern Render Nodes */}
          {workflowNodes.map((node) => {
            const nodeDetails = getNodeDetails(node.type);
            if (!nodeDetails) return null;
            
            return (
              <Card
                key={node.id}
                sx={{
                  position: 'absolute',
                  left: node.position.x,
                  top: node.position.y,
                  width: 170,
                  cursor: isDragging && selectedNode?.id === node.id ? 'grabbing' : 'grab',
                  transition: isDragging && selectedNode?.id === node.id ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: selectedNode?.id === node.id ? 2 : 1,
                  borderColor: selectedNode?.id === node.id ? template.color : 'rgba(148, 163, 184, 0.2)',
                  borderRadius: 3,
                  zIndex: selectedNode?.id === node.id ? 10 : 2,
                  background: selectedNode?.id === node.id 
                    ? `linear-gradient(145deg, white 0%, ${template.color}05 100%)`
                    : 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: selectedNode?.id === node.id 
                    ? `0 12px 40px ${template.color}20, 0 4px 20px rgba(0,0,0,0.1)`
                    : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': isDragging ? {} : { 
                    transform: 'translateY(-4px) scale(1.02)', 
                    boxShadow: `0 16px 40px ${nodeDetails.categoryColor}20, 0 8px 20px rgba(0,0,0,0.1)`,
                    zIndex: 3,
                    border: `1px solid ${nodeDetails.categoryColor}40`,
                  },
                }}
                onClick={(e) => handleNodeClick(node, e)}
                onMouseDown={(e) => handleMouseDown(node, e)}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${nodeDetails.categoryColor} 0%, ${nodeDetails.categoryColor}dd 100%)`,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: `0 4px 16px ${nodeDetails.categoryColor}40`,
                      }}
                    >
                      {nodeDetails.icon}
                    </Box>
                    <Badge
                      color={node.status === 'completed' ? 'success' : node.status === 'running' ? 'warning' : 'default'}
                      variant="dot"
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          right: -2, 
                          top: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        } 
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: getStatusColor(node.status),
                        p: 0.5,
                        borderRadius: 1,
                        bgcolor: `${getStatusColor(node.status)}15`
                      }}>
                        {getStatusIcon(node.status)}
                      </Box>
                    </Badge>
                  </Box>
                  <Typography 
                    variant="body2" 
                    fontWeight="600" 
                    sx={{ 
                      fontSize: '0.875rem', 
                      lineHeight: 1.3, 
                      mb: 1,
                      color: '#1e293b'
                    }}
                  >
                    {nodeDetails.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.75rem', 
                      lineHeight: 1.4,
                      color: '#64748b',
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    {nodeDetails.description}
                  </Typography>
                  <Chip 
                    label={node.category?.toLowerCase().replace(/\s+/g, '-')} 
                    size="small" 
                    sx={{ 
                      fontSize: '0.7rem', 
                      height: 24,
                      background: `linear-gradient(135deg, ${nodeDetails.categoryColor}15 0%, ${nodeDetails.categoryColor}25 100%)`,
                      color: nodeDetails.categoryColor,
                      border: `1px solid ${nodeDetails.categoryColor}30`,
                      fontWeight: 600,
                      '& .MuiChip-label': { px: 1.5 }
                    }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* Modern Properties Panel */}
      {selectedNode && (
        <Box sx={{ 
          width: 360, 
          borderLeft: '1px solid rgba(148, 163, 184, 0.1)', 
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.04)'
        }}>
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Step Properties
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
              Configure workflow step settings
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            {(() => {
              const nodeDetails = getNodeDetails(selectedNode.type);
              return (
                <Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 3,
                    p: 2.5,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${nodeDetails?.categoryColor}08 0%, ${nodeDetails?.categoryColor}15 100%)`,
                    border: `1px solid ${nodeDetails?.categoryColor}20`
                  }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${nodeDetails?.categoryColor} 0%, ${nodeDetails?.categoryColor}dd 100%)`,
                        color: 'white',
                        boxShadow: `0 4px 16px ${nodeDetails?.categoryColor}40`,
                      }}
                    >
                      {nodeDetails?.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="600" sx={{ color: '#1e293b', mb: 0.5 }}>
                        {nodeDetails?.name}
                      </Typography>
                      <Chip 
                        label={nodeDetails?.categoryName} 
                        size="small" 
                        sx={{ 
                          background: `linear-gradient(135deg, ${nodeDetails?.categoryColor}20 0%, ${nodeDetails?.categoryColor}30 100%)`,
                          color: nodeDetails?.categoryColor,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label="Step Name"
                    value={nodeDetails?.name || ''}
                    margin="normal"
                    size="small"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 3px ${nodeDetails?.categoryColor}20`,
                        }
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Description"
                    value={nodeDetails?.description || ''}
                    margin="normal"
                    size="small"
                    multiline
                    rows={3}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 3px ${nodeDetails?.categoryColor}20`,
                        }
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Estimated Duration"
                    placeholder="e.g., 2 hours"
                    margin="normal"
                    size="small"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 3px ${nodeDetails?.categoryColor}20`,
                        }
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Aircraft Registration"
                    placeholder="e.g., F-WZNW"
                    margin="normal"
                    size="small"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 3px ${nodeDetails?.categoryColor}20`,
                        }
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Priority Level"
                    select
                    defaultValue="medium"
                    margin="normal"
                    size="small"
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 3px ${nodeDetails?.categoryColor}20`,
                        }
                      }
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </TextField>
                  
                  <Box sx={{ 
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: 'white',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                      Step Configuration
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch 
                          defaultChecked 
                          sx={{
                            '& .MuiSwitch-thumb': {
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '& .MuiSwitch-track': {
                              bgcolor: '#e2e8f0',
                            },
                            '&.Mui-checked .MuiSwitch-track': {
                              bgcolor: `${nodeDetails?.categoryColor}60`,
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                          Enable retry on failure
                        </Typography>
                      }
                      sx={{ display: 'block', mb: 1.5 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          sx={{
                            '& .MuiSwitch-thumb': {
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '& .MuiSwitch-track': {
                              bgcolor: '#e2e8f0',
                            },
                            '&.Mui-checked .MuiSwitch-track': {
                              bgcolor: `${nodeDetails?.categoryColor}60`,
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                          Real-time monitoring
                        </Typography>
                      }
                      sx={{ display: 'block', mb: 1.5 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          defaultChecked 
                          sx={{
                            '& .MuiSwitch-thumb': {
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '& .MuiSwitch-track': {
                              bgcolor: '#e2e8f0',
                            },
                            '&.Mui-checked .MuiSwitch-track': {
                              bgcolor: `${nodeDetails?.categoryColor}60`,
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                          Send maintenance alerts
                        </Typography>
                      }
                      sx={{ display: 'block', mb: 1.5 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          defaultChecked 
                          sx={{
                            '& .MuiSwitch-thumb': {
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '& .MuiSwitch-track': {
                              bgcolor: '#e2e8f0',
                            },
                            '&.Mui-checked .MuiSwitch-track': {
                              bgcolor: `${nodeDetails?.categoryColor}60`,
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                          Regulatory compliance tracking
                        </Typography>
                      }
                      sx={{ display: 'block' }}
                    />
                  </Box>
                </Box>
              );
            })()}
          </Box>
        </Box>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );

  const renderStepConfiguration = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
        Boeing Predictive Maintenance Configuration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Aircraft Configuration
            </Typography>
            <TextField
              fullWidth
              label="Aircraft Registration"
              defaultValue="F-WZNW"
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Aircraft Type"
              defaultValue="A350-900"
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Engine Type"
              defaultValue="Trent XWB-84"
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Flight Hours"
              defaultValue="2,450"
              margin="normal"
              size="small"
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Sensor Configuration
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Engine Vibration Sensors"
              sx={{ display: 'block', mb: 1 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Structural Strain Gauges"
              sx={{ display: 'block', mb: 1 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Temperature Sensors"
              sx={{ display: 'block', mb: 1 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Pressure Sensors"
              sx={{ display: 'block', mb: 1 }}
            />
            <FormControlLabel
              control={<Switch />}
              label="Corrosion Monitoring"
              sx={{ display: 'block', mb: 1 }}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Alert Thresholds
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Warning Threshold"
                  defaultValue="0.7"
                  margin="normal"
                  size="small"
                  helperText="Performance degradation warning level"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Critical Threshold"
                  defaultValue="0.85"
                  margin="normal"
                  size="small"
                  helperText="Critical maintenance required"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Emergency Threshold"
                  defaultValue="0.95"
                  margin="normal"
                  size="small"
                  helperText="Immediate grounding required"
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Regulatory Compliance
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip label="EASA-145" color="primary" variant="outlined" />
              <Chip label="FAA-PMA" color="primary" variant="outlined" />
              <Chip label="Boeing-AMM" color="primary" variant="outlined" />
              <Chip label="ISO-9001" color="primary" variant="outlined" />
              <Chip label="AS9100" color="primary" variant="outlined" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderWorkflowCode = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Boeing Predictive Maintenance Workflow</Typography>
        <Button startIcon={<SaveAlt />} variant="outlined">
          Export YAML
        </Button>
      </Box>
      
      <Paper sx={{ bgcolor: 'grey.900', color: 'white', p: 2, fontFamily: 'monospace' }}>
        <pre style={{ margin: 0, fontSize: '0.875rem' }}>
{`# Boeing Predictive Maintenance Workflow
apiVersion: boeing.io/v1alpha1
kind: PredictiveMaintenanceWorkflow
metadata:
  name: ${template.id}
  namespace: boeing-maintenance
  labels:
    aircraft-type: A350
    maintenance-type: predictive
    priority: high
spec:
  entrypoint: aircraft-monitoring
  aircraftConfig:
    fleet: A350-900
    registration: F-WZNW
    engineType: Trent XWB-84
    sensors:
      - engine-vibration
      - structural-strain
      - avionics-health
      - flight-data
  
  templates:
${workflowNodes.map(node => {
  const nodeDetails = getNodeDetails(node.type);
  return `  - name: ${node.type}
    type: ${node.category?.toLowerCase().replace(/\s+/g, '-')}
    category: ${node.category}
    timeout: 30m
    retryPolicy:
      maximumAttempts: 3
      backoffCoefficient: 2.0
    resources:
      cpu: "500m"
      memory: "1Gi"
    env:
      - name: AIRCRAFT_ID
        value: "F-WZNW"
      - name: SENSOR_TYPE
        value: "${node.type}"`;
}).join('\n')}
  
  dag:
    tasks:
${workflowNodes.map((node, index) => `    - name: ${node.type}
      template: ${node.type}${index > 0 ? `\n      dependencies: [${workflowNodes[index - 1].type}]` : ''}`).join('\n')}

  # Boeing-specific configurations
  maintenanceSchedule:
    inspectionInterval: "200h"
    criticalThreshold: 0.85
    alertLevels:
      - warning: 0.7
      - critical: 0.9
      - emergency: 0.95
    
  regulatoryCompliance:
    - EASA-145
    - FAA-PMA
    - Boeing-AMM
    
  dataRetention:
    sensorData: "2y"
    maintenanceRecords: "10y"
    flightData: "5y"`}
        </pre>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="Canvas" icon={<Timeline />} iconPosition="start" />
          <Tab label="Configuration" icon={<Settings />} iconPosition="start" />
          <Tab label="Code" icon={<Code />} iconPosition="start" />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 0 && renderWorkflowCanvas()}
        {activeTab === 1 && renderStepConfiguration()}
        {activeTab === 2 && renderWorkflowCode()}
      </Box>
    </Box>
  );
} 