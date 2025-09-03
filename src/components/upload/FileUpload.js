'use client';

import { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FileUpload({ onFileUpload, uploadedFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload your data file
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Upload a CSV, Excel, or JSON file containing your data
      </Typography>
      
      {!uploadedFile ? (
        <Paper
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: isDragging 
              ? '2px dashed #1976d2' 
              : '2px dashed #e0e0e0',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={handleButtonClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            accept=".csv,.xlsx,.xls,.json"
          />
          <UploadFileIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag and drop your file here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            or
          </Typography>
          <Button variant="contained" component="span">
            Select File
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Supported file types: CSV, Excel, JSON
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected File
          </Typography>
          <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleRemoveFile}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText 
                primary={uploadedFile.name} 
                secondary={formatFileSize(uploadedFile.size)} 
              />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
} 