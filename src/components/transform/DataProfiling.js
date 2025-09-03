'use client';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// Mock data profiling data
const profilingData = {
  summary: {
    totalRows: 15352,
    totalColumns: 27,
    dataQualityScore: 84,
    completeness: 92,
    accuracy: 87,
    consistency: 81,
    suggestions: 6
  },
  columnStats: [
    {
      name: 'customer_id',
      type: 'string',
      completeness: 100,
      uniqueness: 100,
      validity: 100,
      issues: 0,
      sample: ['CU12345', 'CU12346', 'CU12347'],
      patterns: ['CU[0-9]{5}'],
      suggestions: []
    },
    {
      name: 'full_name',
      type: 'string',
      completeness: 98,
      uniqueness: 95,
      validity: 99,
      issues: 2,
      sample: ['John Smith', 'Jane Doe', 'Michael Johnson'],
      patterns: ['[A-Z][a-z]+ [A-Z][a-z]+'],
      suggestions: ['Fix 47 records with missing names']
    },
    {
      name: 'email',
      type: 'string',
      completeness: 94,
      uniqueness: 99,
      validity: 97,
      issues: 2,
      sample: ['john@example.com', 'jane.doe@company.co', 'michael.j@domain.org'],
      patterns: ['[a-z.]+@[a-z]+\\.[a-z]{2,3}'],
      suggestions: ['Fix 159 invalid email formats']
    },
    {
      name: 'purchase_date',
      type: 'date',
      completeness: 100,
      uniqueness: 40,
      validity: 96,
      issues: 1,
      sample: ['2023-10-15', '2023-10-16', '2023-10-17'],
      patterns: ['YYYY-MM-DD'],
      suggestions: ['Fix 42 dates with invalid format']
    },
    {
      name: 'purchase_amount',
      type: 'number',
      completeness: 100,
      uniqueness: 30,
      validity: 100,
      issues: 0,
      sample: ['99.99', '149.99', '29.99'],
      patterns: ['[0-9]+\\.[0-9]{2}'],
      suggestions: []
    },
    {
      name: 'product_id',
      type: 'string',
      completeness: 100,
      uniqueness: 25,
      validity: 100,
      issues: 0,
      sample: ['PROD-123', 'PROD-456', 'PROD-789'],
      patterns: ['PROD-[0-9]{3}'],
      suggestions: []
    },
    {
      name: 'customer_segment',
      type: 'string',
      completeness: 75,
      uniqueness: 10,
      validity: 95,
      issues: 2,
      sample: ['Premium', 'Standard', 'Basic'],
      patterns: ['[A-Za-z]+'],
      suggestions: ['Fill 3838 missing segment values']
    }
  ]
};

export default function DataProfiling() {
  const getQualityColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  const getQualityIcon = (percentage) => {
    if (percentage >= 90) return <CheckCircleIcon color="success" />;
    if (percentage >= 70) return <WarningIcon color="warning" />;
    return <ErrorIcon color="error" />;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Data Profiling
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Comprehensive analysis of your data's quality, structure, and potential issues.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
                Data Overview
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Total Rows" 
                    secondary={profilingData.summary.totalRows.toLocaleString()} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                    secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Total Columns" 
                    secondary={profilingData.summary.totalColumns} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                    secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Overall Data Quality
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Quality Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getQualityIcon(profilingData.summary.dataQualityScore)}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {profilingData.summary.dataQualityScore}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={profilingData.summary.dataQualityScore} 
                  color={getQualityColor(profilingData.summary.dataQualityScore)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Completeness
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {getQualityIcon(profilingData.summary.completeness)}
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {profilingData.summary.completeness}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Accuracy
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {getQualityIcon(profilingData.summary.accuracy)}
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {profilingData.summary.accuracy}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Consistency
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {getQualityIcon(profilingData.summary.consistency)}
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {profilingData.summary.consistency}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AutoFixHighIcon fontSize="small" sx={{ mr: 1 }} />
                Suggestions & Improvements
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profilingData.summary.suggestions} potential improvements identified
              </Typography>
              <List dense>
                {profilingData.columnStats
                  .filter(col => col.suggestions.length > 0)
                  .map((col, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {col.completeness < 90 ? 
                          <WarningIcon color="warning" fontSize="small" /> : 
                          <InfoOutlinedIcon color="info" fontSize="small" />
                        }
                      </ListItemIcon>
                      <ListItemText 
                        primary={col.suggestions[0]}
                        secondary={`Column: ${col.name}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell>Column Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Completeness</TableCell>
                  <TableCell>Uniqueness</TableCell>
                  <TableCell>Validity</TableCell>
                  <TableCell>Sample Values</TableCell>
                  <TableCell>Issues</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profilingData.columnStats.map((column) => (
                  <TableRow key={column.name}>
                    <TableCell>{column.name}</TableCell>
                    <TableCell>
                      <Chip size="small" label={column.type} variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={column.completeness} 
                          color={getQualityColor(column.completeness)}
                          sx={{ width: 60, height: 6, borderRadius: 3, mr: 1 }}
                        />
                        <Typography variant="body2">
                          {column.completeness}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={column.uniqueness} 
                          color={getQualityColor(column.uniqueness)}
                          sx={{ width: 60, height: 6, borderRadius: 3, mr: 1 }}
                        />
                        <Typography variant="body2">
                          {column.uniqueness}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={column.validity} 
                          color={getQualityColor(column.validity)}
                          sx={{ width: 60, height: 6, borderRadius: 3, mr: 1 }}
                        />
                        <Typography variant="body2">
                          {column.validity}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {column.sample.join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {column.issues > 0 ? (
                        <Chip 
                          icon={<ErrorIcon />}
                          label={`${column.issues} issues`}
                          size="small"
                          color={column.issues > 1 ? "error" : "warning"}
                          variant="outlined"
                        />
                      ) : (
                        <Chip 
                          icon={<CheckCircleIcon />}
                          label="No issues"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
} 