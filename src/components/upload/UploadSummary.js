'use client';

import { 
  Box, 
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

export default function UploadSummary({ summary }) {
  const { 
    fileName, 
    fileSize, 
    rowCount, 
    columnCount, 
    sampleColumns, 
    dataQuality 
  } = summary;

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
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Data Review & Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your file has been processed successfully. Here's a summary of your data.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              File Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="File Name" 
                  secondary={fileName} 
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="File Size" 
                  secondary={fileSize} 
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Row Count" 
                  secondary={rowCount.toLocaleString()} 
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Column Count" 
                  secondary={columnCount} 
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Data Quality
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Completeness
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getQualityIcon(dataQuality.completeness)}
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {dataQuality.completeness}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={dataQuality.completeness} 
                color={getQualityColor(dataQuality.completeness)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Potential Issues
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {dataQuality.duplicates > 0 && (
                  <Chip 
                    icon={<WarningIcon />} 
                    label={`${dataQuality.duplicates} Duplicate Records`} 
                    color="warning" 
                    variant="outlined"
                  />
                )}
                {dataQuality.issues > 0 && (
                  <Chip 
                    icon={<ErrorIcon />} 
                    label={`${dataQuality.issues} Data Issues`} 
                    color="error" 
                    variant="outlined"
                  />
                )}
                {dataQuality.duplicates === 0 && dataQuality.issues === 0 && (
                  <Chip 
                    icon={<CheckCircleIcon />} 
                    label="No issues detected" 
                    color="success" 
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Sample Columns
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {sampleColumns.map((column, index) => (
                <Chip 
                  key={index} 
                  label={column} 
                  color="primary" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 