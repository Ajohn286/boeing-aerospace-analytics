'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Tooltip,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import TimelineIcon from '@mui/icons-material/Timeline';

// Mock data for data quality metrics
const mockDataQualityMetrics = {
  overall: {
    score: 87,
    trend: '+2.3%',
    lastUpdated: '2024-03-15T14:30:00Z'
  },
  dimensions: [
    { name: 'Completeness', score: 92, trend: '+1.5%', issues: 12 },
    { name: 'Accuracy', score: 85, trend: '-0.8%', issues: 28 },
    { name: 'Consistency', score: 90, trend: '+3.2%', issues: 15 },
    { name: 'Timeliness', score: 78, trend: '+4.1%', issues: 32 },
    { name: 'Uniqueness', score: 95, trend: '+0.5%', issues: 8 },
    { name: 'Validity', score: 82, trend: '+2.7%', issues: 24 }
  ]
};

// Mock data for data quality issues
const mockDataQualityIssues = [
  {
    id: 'DQ-101',
    entity: 'Aircraft',
    field: 'wingspan',
    rule: 'Wingspan must follow standard measurement format',
    severity: 'Critical',
    count: 5,
    status: 'Open',
    trend: '-10%',
    lastDetected: '2024-03-14T09:15:00Z'
  },
  {
    id: 'DQ-102',
    entity: 'Manufacturing Plant',
    field: 'production_capacity',
    rule: 'Production capacity must be a positive number',
    severity: 'High',
    count: 12,
    status: 'In Progress',
    trend: '-3%',
    lastDetected: '2024-03-15T11:30:00Z'
  },
  {
    id: 'DQ-103',
    entity: 'Aerospace Supplier',
    field: 'certification',
    rule: 'Certification must be AS9100, ISO9001, or equivalent',
    severity: 'Medium',
    count: 7,
    status: 'Open',
    trend: '+2%',
    lastDetected: '2024-03-15T08:45:00Z'
  },
  {
    id: 'DQ-104',
    entity: 'Aircraft Component',
    field: 'part_number',
    rule: 'Part number must follow Boeing naming convention',
    severity: 'Low',
    count: 18,
    status: 'Open',
    trend: '-1%',
    lastDetected: '2024-03-14T16:20:00Z'
  },
  {
    id: 'DQ-105',
    entity: 'Facility',
    field: 'status',
    rule: 'Status must be Active, Maintenance, or Inactive',
    severity: 'High',
    count: 3,
    status: 'Resolved',
    trend: '-100%',
    lastDetected: '2024-03-13T14:10:00Z'
  },
  {
    id: 'DQ-106',
    entity: 'Supplier',
    field: 'category',
    rule: 'Category must be from approved list',
    severity: 'Medium',
    count: 9,
    status: 'In Progress',
    trend: '-8%',
    lastDetected: '2024-03-15T10:05:00Z'
  }
];

// Mock data for data quality trends
const mockDataQualityTrends = {
  dates: ['2023-09-15', '2023-09-22', '2023-09-29', '2023-10-06', '2023-10-13'],
  overall: [82, 83, 85, 84.5, 87],
  dimensions: {
    Completeness: [88, 89, 90, 91, 92],
    Accuracy: [86, 87, 86, 84, 85],
    Consistency: [84, 85, 87, 88, 90],
    Timeliness: [72, 74, 75, 76, 78],
    Uniqueness: [93, 93, 94, 94.5, 95],
    Validity: [78, 79, 80, 81, 82]
  }
};

// Mock data for entity quality scores
const mockEntityQualityScores = [
  { entity: 'Product', score: 91, issues: 28, criticalIssues: 1 },
  { entity: 'Facility', score: 88, issues: 17, criticalIssues: 0 },
  { entity: 'Supplier', score: 84, issues: 22, criticalIssues: 2 },
  { entity: 'Inventory', score: 93, issues: 8, criticalIssues: 0 },
  { entity: 'Shipment', score: 89, issues: 12, criticalIssues: 0 }
];

const DataQualityView = () => {
  const [selectedDimension, setSelectedDimension] = useState('All');
  const [selectedEntity, setSelectedEntity] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showTrends, setShowTrends] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter issues based on selected filters
  const filteredIssues = mockDataQualityIssues.filter(issue => {
    if (selectedEntity !== 'All' && issue.entity !== selectedEntity) return false;
    if (selectedSeverity !== 'All' && issue.severity !== selectedSeverity) return false;
    if (selectedStatus !== 'All' && issue.status !== selectedStatus) return false;
    return true;
  });

  // Handle refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Get severity icon
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical':
        return <ErrorIcon color="error" />;
      case 'High':
        return <WarningIcon sx={{ color: 'orange' }} />;
      case 'Medium':
        return <WarningIcon sx={{ color: 'gold' }} />;
      case 'Low':
        return <WarningIcon sx={{ color: 'lightgreen' }} />;
      default:
        return <WarningIcon />;
    }
  };

  // Get status chip
  const getStatusChip = (status) => {
    switch (status) {
      case 'Open':
        return <Chip label="Open" color="error" size="small" />;
      case 'In Progress':
        return <Chip label="In Progress" color="warning" size="small" />;
      case 'Resolved':
        return <Chip label="Resolved" color="success" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Get trend indicator
  const getTrendIndicator = (trend) => {
    const value = parseFloat(trend);
    if (value > 0) {
      return <Typography color="error" variant="body2">{trend} ↑</Typography>;
    } else if (value < 0) {
      return <Typography color="success" variant="body2">{trend} ↓</Typography>;
    }
    return <Typography variant="body2">{trend}</Typography>;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Quality Dashboard
        </Typography>
        <Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Export report">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show trends">
            <IconButton 
              color={showTrends ? "primary" : "default"}
              onClick={() => setShowTrends(!showTrends)}
            >
              <TimelineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Overall Quality Score */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Overall Data Quality Score</Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={mockDataQualityMetrics.overall.score}
                  size={120}
                  thickness={5}
                  sx={{ color: mockDataQualityMetrics.overall.score > 90 ? 'success.main' : 
                                mockDataQualityMetrics.overall.score > 80 ? 'info.main' : 
                                mockDataQualityMetrics.overall.score > 70 ? 'warning.main' : 'error.main' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" component="div" color="text.secondary">
                    {mockDataQualityMetrics.overall.score}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Trend: {mockDataQualityMetrics.overall.trend} | Last updated: {new Date(mockDataQualityMetrics.overall.lastUpdated).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>Quality Dimensions</Typography>
            <Grid container spacing={2}>
              {mockDataQualityMetrics.dimensions.map((dimension) => (
                <Grid item xs={12} sm={6} md={4} key={dimension.name}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>{dimension.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={dimension.score} 
                            sx={{ 
                              height: 10, 
                              borderRadius: 5,
                              backgroundColor: 'grey.300',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: dimension.score > 90 ? 'success.main' : 
                                                dimension.score > 80 ? 'info.main' : 
                                                dimension.score > 70 ? 'warning.main' : 'error.main',
                                borderRadius: 5,
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {dimension.score}%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Issues: {dimension.issues}
                        </Typography>
                        <Typography variant="body2" color={dimension.trend.startsWith('+') ? 'error.main' : 'success.main'}>
                          {dimension.trend}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Entity Quality Scores */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Entity Quality Scores</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Entity</TableCell>
                <TableCell>Quality Score</TableCell>
                <TableCell>Total Issues</TableCell>
                <TableCell>Critical Issues</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEntityQualityScores.map((entity) => (
                <TableRow key={entity.entity}>
                  <TableCell>{entity.entity}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 100, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={entity.score} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 5,
                            backgroundColor: 'grey.300',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: entity.score > 90 ? 'success.main' : 
                                              entity.score > 80 ? 'info.main' : 
                                              entity.score > 70 ? 'warning.main' : 'error.main',
                              borderRadius: 5,
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{entity.score}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{entity.issues}</TableCell>
                  <TableCell>{entity.criticalIssues}</TableCell>
                  <TableCell>
                    {entity.criticalIssues > 0 ? (
                      <Chip label="Needs Attention" color="error" size="small" />
                    ) : entity.score < 85 ? (
                      <Chip label="Needs Improvement" color="warning" size="small" />
                    ) : (
                      <Chip label="Good" color="success" size="small" icon={<CheckCircleIcon />} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Data Quality Issues */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Data Quality Issues</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="entity-select-label">Entity</InputLabel>
              <Select
                labelId="entity-select-label"
                value={selectedEntity}
                label="Entity"
                onChange={(e) => setSelectedEntity(e.target.value)}
              >
                <MenuItem value="All">All Entities</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Facility">Facility</MenuItem>
                <MenuItem value="Supplier">Supplier</MenuItem>
                <MenuItem value="Inventory">Inventory</MenuItem>
                <MenuItem value="Shipment">Shipment</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="severity-select-label">Severity</InputLabel>
              <Select
                labelId="severity-select-label"
                value={selectedSeverity}
                label="Severity"
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <MenuItem value="All">All Severities</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Field</TableCell>
                <TableCell>Rule</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Trend</TableCell>
                <TableCell>Last Detected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.id}</TableCell>
                  <TableCell>{issue.entity}</TableCell>
                  <TableCell>{issue.field}</TableCell>
                  <TableCell>{issue.rule}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getSeverityIcon(issue.severity)}
                      <Typography variant="body2">{issue.severity}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{issue.count}</TableCell>
                  <TableCell>{getStatusChip(issue.status)}</TableCell>
                  <TableCell>{getTrendIndicator(issue.trend)}</TableCell>
                  <TableCell>{new Date(issue.lastDetected).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Data Quality Trends (Conditional) */}
      {showTrends && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Data Quality Trends</Typography>
          <Box sx={{ height: 300, p: 2 }}>
            {/* Placeholder for chart - in a real implementation, you would use a charting library */}
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              border: '1px dashed grey',
              p: 2,
              borderRadius: 1
            }}>
              <Typography variant="subtitle1" align="center">
                Quality Score Trends (Last 5 Weeks)
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                height: '70%', 
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                mt: 2
              }}>
                {mockDataQualityTrends.dates.map((date, index) => (
                  <Box key={date} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 30, 
                        height: `${mockDataQualityTrends.overall[index]}%`, 
                        backgroundColor: 'primary.main',
                        borderRadius: '4px 4px 0 0'
                      }} 
                    />
                    <Typography variant="caption" sx={{ mt: 1 }}>
                      {date.split('-')[1]}/{date.split('-')[2]}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                {mockDataQualityMetrics.dimensions.map((dimension) => (
                  <Chip 
                    key={dimension.name}
                    label={dimension.name}
                    size="small"
                    sx={{ 
                      backgroundColor: dimension.name === selectedDimension ? 'primary.main' : 'default',
                      color: dimension.name === selectedDimension ? 'white' : 'inherit'
                    }}
                    onClick={() => setSelectedDimension(dimension.name === selectedDimension ? 'All' : dimension.name)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DataQualityView; 