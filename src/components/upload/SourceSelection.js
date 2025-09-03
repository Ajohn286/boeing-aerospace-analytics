'use client';

import { 
  Box, 
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Radio,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export default function SourceSelection({ dataSource, onSourceChange }) {
  const handleSourceChange = (source) => {
    onSourceChange(source);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select your data source
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose how you want to provide your enterprise data
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%',
              border: dataSource === 'file' ? '2px solid #1976d2' : 'none',
              boxShadow: dataSource === 'file' ? '0 0 10px rgba(25, 118, 210, 0.3)' : undefined
            }}
          >
            <CardActionArea 
              sx={{ height: '100%' }}
              onClick={() => handleSourceChange('file')}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Radio
                    checked={dataSource === 'file'}
                    value="file"
                    name="data-source-radio"
                  />
                  <Typography variant="h6" component="div">
                    File Upload
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
                  <UploadFileIcon sx={{ fontSize: 60, color: 'primary.main', opacity: dataSource === 'file' ? 1 : 0.6 }} />
                </Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Upload CSV, Excel, or JSON files" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <AutoGraphIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Visualize and analyze batch data" />
                  </ListItem>
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%',
              border: dataSource === 'crm' ? '2px solid #1976d2' : 'none',
              boxShadow: dataSource === 'crm' ? '0 0 10px rgba(25, 118, 210, 0.3)' : undefined,
              opacity: 0.7 // Optional: Makes it clear this is a future feature
            }}
          >
            <CardActionArea 
              sx={{ height: '100%' }}
              onClick={() => handleSourceChange('crm')}
              disabled={true} // Optional: Disable this option for the demo
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Radio
                    checked={dataSource === 'crm'}
                    value="crm"
                    name="data-source-radio"
                    disabled={true} // Optional: Disable this option for the demo
                  />
                  <Typography variant="h6" component="div">
                    CRM Connection (Coming Soon)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
                  <CloudSyncIcon sx={{ fontSize: 60, color: 'primary.main', opacity: 0.6 }} />
                </Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Connect to Salesforce, Dynamics, etc." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <AutoGraphIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Real-time data synchronization" />
                  </ListItem>
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 