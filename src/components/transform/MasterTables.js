'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for master tables
const masterTableData = {
  products: {
    name: 'Products Master',
    icon: <InventoryIcon />,
    color: '#1976d2',
    recordCount: 583,
    resolvedCount: 12,
    fields: ['Aircraft ID', 'Name', 'Category', 'Price Type', 'Production Unit', 'SKU'],
    samples: [
      { id: 'ACF001', name: '787-9 Dreamliner', category: 'Wide-body Aircraft', price: 'List Price', supplier: 'Boeing Production', sku: 'BA787-9' },
      { id: 'ACF002', name: '737 MAX 8', category: 'Narrow-body Aircraft', price: 'List Price', supplier: 'Boeing Production', sku: 'BA737M8' },
      { id: 'ACF003', name: '787-8 Dreamliner', category: 'Wide-body Aircraft', price: 'List Price', supplier: 'Boeing Production', sku: 'BA787-8' },
      { id: 'ACF004', name: '777X', category: 'Next-Gen Wide-body', price: 'List Price', supplier: 'Boeing Production', sku: 'BA777X' },
      { id: 'ACF005', name: '777-300ER', category: 'Long-Range Aircraft', price: 'List Price', supplier: 'Boeing Production', sku: 'BA777-3ER' }
    ]
  },
  facilities: {
    name: 'Facilities Master',
    icon: <MiscellaneousServicesIcon />,
    color: '#ff9800',
    recordCount: 147,
    resolvedCount: 8,
    fields: ['Facility ID', 'Name', 'Type', 'Location', 'Production Capacity', 'Status'],
    samples: [
      { id: 'FAC001', name: 'Everett Assembly Plant', category: 'Manufacturing', duration: 'Everett, WA', department: '150 aircraft/year', cost: 'Active' },
      { id: 'FAC002', name: 'Renton Factory', category: 'Manufacturing', duration: 'Renton, WA', department: '450 aircraft/year', cost: 'Active' },
      { id: 'FAC003', name: 'Charleston Assembly', category: 'Manufacturing', duration: 'North Charleston, SC', department: '120 aircraft/year', cost: 'Active' },
      { id: 'FAC004', name: 'Seattle Service Center', category: 'Service Center', duration: 'Seattle, WA', department: '200 aircraft/year', cost: 'Active' },
      { id: 'FAC005', name: 'Global Services Hub', category: 'Service Center', duration: 'Miami, FL', department: '100 aircraft/year', cost: 'Active' }
    ]
  },
  suppliers: {
    name: 'Supplier Master',
    icon: <PersonIcon />,
    color: '#4caf50',
    recordCount: 328,
    resolvedCount: 15,
    fields: ['Supplier ID', 'Name', 'Specialty', 'Rating', 'Location', 'Status'],
    samples: [
      { id: 'SUP001', name: 'Spirit AeroSystems', department: 'Fuselage Components', role: 'A', location: 'Wichita, KS', email: 'Active' },
      { id: 'SUP002', name: 'Safran Group', department: 'Engine Systems', role: 'A+', location: 'Paris, France', email: 'Active' },
      { id: 'SUP003', name: 'Honeywell Aerospace', department: 'Avionics Systems', role: 'A', location: 'Phoenix, AZ', email: 'Active' },
      { id: 'SUP004', name: 'Collins Aerospace', department: 'Interior Systems', role: 'A', location: 'Charlotte, NC', email: 'Active' },
      { id: 'SUP005', name: 'Parker Hannifin', department: 'Hydraulic Systems', role: 'A-', location: 'Cleveland, OH', email: 'Active' }
    ]
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MasterTables() {
  const [value, setValue] = useState(0);
  const tableKeys = Object.keys(masterTableData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Master Data Tables
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Master data tables provide a consolidated view of your core business entities, resolving duplicates and standardizing formats.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tableKeys.map((key, index) => {
          const table = masterTableData[key];
          return (
            <Grid item xs={12} md={4} key={key}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  },
                  border: value === index ? `2px solid ${table.color}` : 'none'
                }}
                onClick={(e) => handleChange(e, index)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: table.color }}>
                      {table.icon}
                    </Avatar>
                  }
                  action={
                    <Tooltip title="Entity resolution has identified and merged duplicate records">
                      <Badge badgeContent={table.resolvedCount} color="error" sx={{ mr: 1 }}>
                        <IconButton size="small">
                          <MergeTypeIcon fontSize="small" />
                        </IconButton>
                      </Badge>
                    </Tooltip>
                  }
                  title={table.name}
                  subheader={`${table.recordCount} records`}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {table.fields.map((field) => (
                      <Chip 
                        key={field} 
                        label={field} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '0.9rem',
            }
          }}
        >
          {tableKeys.map((key) => (
            <Tab 
              key={key}
              label={masterTableData[key].name} 
              icon={masterTableData[key].icon} 
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {tableKeys.map((key, index) => {
        const table = masterTableData[key];
        return (
          <TabPanel value={value} index={index} key={key}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Records with entity resolution applied:
              </Typography>
              <Chip 
                icon={<CheckCircleIcon fontSize="small" />}
                label={`${table.resolvedCount} duplicates resolved`} 
                size="small" 
                color="success"
              />
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    {table.fields.map((field) => (
                      <TableCell key={field}>
                        <Typography variant="subtitle2">{field}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.samples.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category || row.department}</TableCell>
                      <TableCell>{row.price || row.duration || row.role}</TableCell>
                      <TableCell>{row.supplier || row.department || row.location}</TableCell>
                      <TableCell>{row.sku || row.cost || row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Showing 5 of {table.recordCount} records
              </Typography>
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
} 