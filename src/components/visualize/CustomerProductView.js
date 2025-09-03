'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

// Mock supplier data
const supplierData = {
  overview: {
    totalSuppliers: 3200,
    activeSuppliers: 2780,
    inactiveSuppliers: 420,
    averageContractValue: '$1,250,000',
    topCategory: 'Raw Materials',
    recentContracts: 112
  },
  dataSources: {
    erp: {
      name: 'ERP Systems',
      sources: ['SAP ERP', 'NetSuite'],
      lastUpdated: '2024-03-15 08:45 AM',
      recordCount: 3124,
      status: 'Connected',
      confidence: 93,
    },
    procurement: {
      name: 'Procurement Systems',
      sources: ['Supplier Portal', 'Contract Management'],
      lastUpdated: '2024-03-15 09:30 AM',
      recordCount: 2987,
      status: 'Connected',
      confidence: 95,
    },
    compliance: {
      name: 'Compliance Systems',
      sources: ['Quality Control', 'Food Safety'],
      lastUpdated: '2024-03-14 06:15 PM',
      recordCount: 2890,
      status: 'Connected',
      confidence: 91,
    }
  },
  suppliers: [
    {
      id: 'SUP-00123',
      companyName: 'Boeing Aerospace Components',
      contact: {
        name: 'Alice Johnson',
        email: 'alice.johnson@boeing.com',
        phone: '(555) 321-9876',
        location: 'Dallas, TX'
      },
      category: 'Aerospace Components',
      contractValue: '$2,500,000',
      status: 'Active',
      complianceStatus: 'Compliant',
      riskScore: 'Low',
      sourceRecords: {
        erp: {
          source: 'SAP ERP',
          id: 'ERP-200123',
          companyName: 'Boeing Aerospace Components',
          contact: 'Alice Johnson',
          email: 'alice.johnson@boeing.com',
          phone: '(555) 321-9876',
          location: 'Dallas, TX',
          contractValue: '$2,500,000',
          lastContract: '2024-03-10',
          supplierSince: '2015-03-22',
          matchConfidence: 98,
          variants: ['Boeing Components', 'Boeing Aerospace'],
          category: 'Aerospace Components'
        },
        procurement: {
          source: 'Supplier Portal',
          id: 'SP-90012',
          companyName: 'Boeing Aerospace Components',
          contact: 'Alice Johnson',
          email: 'alice.johnson@boeing.com',
          phone: '(555) 321-9876',
          location: 'Dallas, TX',
          contractId: 'CON-2024-001',
          contractValue: '$2,500,000',
          complianceStatus: 'Compliant',
          matchConfidence: 97,
          lastAward: '2024-03-10',
          status: 'Active'
        },
        compliance: {
          source: 'Quality Control',
          id: 'QC-123456',
          companyName: 'Boeing Aerospace Components',
          contact: 'Alice Johnson',
          email: 'alice.johnson@boeing.com',
          phone: '(555) 321-9876',
          location: 'Dallas, TX',
          complianceStatus: 'Compliant',
          matchConfidence: 96,
          registrationDate: '2015-03-15',
          status: 'Active'
        }
      },
      reconciliation: {
        conflictFields: ['companyName', 'location'],
        resolvedFields: ['email', 'phone'],
        matchingRules: ['Email Exact Match', 'Company Name Fuzzy Match'],
        consolidationDate: '2024-03-15',
        goldenRecord: true,
        dataQualityScore: 95,
        processingSteps: [
          'Initial data ingestion',
          'Standardization and cleansing',
          'Duplicate detection',
          'Record linking',
          'Survivorship rules application',
          'Golden record creation'
        ]
      },
      recentActivity: [
        { id: 'CON-2024-001', type: 'Contract Awarded', date: '2024-03-10', details: 'Raw materials supply agreement', source: 'Supplier Portal' },
        { id: 'CMP-2024-002', type: 'Compliance Check', date: '2024-03-05', details: 'Quality control audit passed', source: 'Quality Control' },
        { id: 'UPD-2024-003', type: 'Profile Update', date: '2024-02-20', details: 'Contact info updated', source: 'SAP ERP' }
      ],
      contracts: [
        {
          id: 'CON-2024-001',
          date: '2024-03-10',
          type: 'Raw Materials',
          status: 'Active',
          value: '$2,500,000',
          agency: 'Procurement',
          riskLevel: 'Low',
          complianceStatus: 'Compliant'
        },
        {
          id: 'CON-2023-015',
          date: '2023-06-18',
          type: 'Packaging',
          status: 'Completed',
          value: '$1,200,000',
          agency: 'Procurement',
          riskLevel: 'Medium',
          complianceStatus: 'Compliant'
        },
        {
          id: 'CON-2023-008',
          date: '2023-03-12',
          type: 'Quality Testing',
          status: 'Completed',
          value: '$800,000',
          agency: 'Quality Control',
          riskLevel: 'Low',
          complianceStatus: 'Compliant'
        }
      ]
    }
  ]
};

export default function SupplierView() {
  // Always use Acme Infrastructure Inc. (first supplier) and remove the ability to select suppliers
  const selectedSupplier = supplierData.suppliers[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState('pie');
  const [activeSource, setActiveSource] = useState('golden'); // 'golden', 'erp', 'procurement', 'compliance'

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleSourceChange = (event, newSource) => {
    if (newSource !== null) {
      setActiveSource(newSource);
    }
  };

  // Get the current supplier data based on the selected source
  const getCurrentSupplierView = () => {
    if (activeSource === 'golden') {
      return selectedSupplier;
    } else {
      const sourceData = selectedSupplier.sourceRecords[activeSource];
      if (!sourceData) return selectedSupplier; // fallback to golden if missing
      return {
        ...selectedSupplier,
        companyName: sourceData.companyName,
        contact: {
          name: sourceData.contact,
          email: sourceData.email,
          phone: sourceData.phone,
          location: sourceData.location
        },
        contractValue: sourceData.contractValue,
        complianceStatus: sourceData.complianceStatus,
        sourceInfo: sourceData
      };
    }
  };

  const currentSupplierView = getCurrentSupplierView();

  // Sample chart elements (in a real implementation, we'd use a charting library)
  const renderBarChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative' }}>
      <Box sx={{ 
        display: 'flex', 
        height: '100%', 
        alignItems: 'flex-end', 
        justifyContent: 'space-around',
        px: 2 
      }}>
        {selectedSupplier.contracts.map((contract, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 40, 
                height: `${(parseFloat(contract.value.replace(/[$,]/g, '')) / 1000000) * 100}%`, 
                bgcolor: index === 0 ? 'primary.main' : index === 1 ? 'secondary.main' : 'success.main',
                borderRadius: 1,
                minHeight: 30
              }} 
            />
            <Typography variant="caption" sx={{ mt: 1, width: 70, textAlign: 'center' }}>
              {contract.type}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0 }}>
        Contracts by Type
      </Typography>
    </Box>
  );

  const renderLineChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative' }}>
      <Box sx={{ 
        display: 'flex', 
        height: '100%', 
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        position: 'relative'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 300 200">
          <polyline
            points="0,180 100,100 200,130 300,60"
            style={{ fill: 'none', stroke: '#1976d2', strokeWidth: 3 }}
          />
          <circle cx="0" cy="180" r="5" fill="#1976d2" />
          <circle cx="100" cy="100" r="5" fill="#1976d2" />
          <circle cx="200" cy="130" r="5" fill="#1976d2" />
          <circle cx="300" cy="60" r="5" fill="#1976d2" />
        </svg>
      </Box>
      <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0 }}>
        Contracts History (Past 3 Years)
      </Typography>
    </Box>
  );

  const renderPieChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f0f0f0" strokeWidth="20" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1976d2" strokeWidth="20" 
          strokeDasharray="251.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9c27b0" strokeWidth="20" 
          strokeDasharray="62.8" strokeDashoffset="-188.4" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4caf50" strokeWidth="20" 
          strokeDasharray="37.68" strokeDashoffset="-125.6" transform="rotate(-90 50 50)" />
      </svg>
      <Box sx={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%' }} />
          <Typography variant="caption">Raw Materials (40%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'secondary.main', borderRadius: '50%' }} />
          <Typography variant="caption">Packaging (35%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'success.main', borderRadius: '50%' }} />
          <Typography variant="caption">Quality Testing (25%)</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Box>
      {/* Simplified header without supplier selection */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Master Data Management - Supplier Data 360
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Unified 360-degree view of supplier data from multiple enterprise systems with automatic reconciliation, matching, and merging to create a complete supplier profile.
        </Typography>
      </Box>

      {/* Remove the Integrated Data Sources section */}

      {/* Data source toggle */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={activeSource}
          exclusive
          onChange={handleSourceChange}
          aria-label="data source view"
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="golden" aria-label="golden record">
            Golden Record
          </ToggleButton>
          <ToggleButton value="erp" aria-label="erp source">
            ERP (SAP/NetSuite)
          </ToggleButton>
          <ToggleButton value="procurement" aria-label="procurement source">
            Supplier Portal
          </ToggleButton>
          <ToggleButton value="compliance" aria-label="compliance source">
            Quality Control
          </ToggleButton>
        </ToggleButtonGroup>
        {activeSource !== 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing source data from {supplierData.dataSources[activeSource]?.name} •
            Match confidence: {currentSupplierView.sourceInfo?.matchConfidence ?? '--'}% •
            Source ID: {currentSupplierView.sourceInfo?.id ?? '--'}
          </Typography>
        )}
        {activeSource === 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing consolidated golden record • Data quality score: {selectedSupplier.reconciliation.dataQualityScore}% • 
            Last consolidated: {selectedSupplier.reconciliation.consolidationDate}
          </Typography>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{currentSupplierView.companyName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentSupplierView.category} Supplier
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <EmailIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Email" 
                    secondary={currentSupplierView.contact.email} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <PhoneIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Phone" 
                    secondary={currentSupplierView.contact.phone} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <LocationOnIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Location" 
                    secondary={currentSupplierView.contact.location} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                {activeSource === 'erp' && (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                          <AccountBalanceWalletIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Contract Value" 
                        secondary={currentSupplierView.contractValue} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Supplier Since" 
                        secondary={currentSupplierView.sourceInfo.supplierSince} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'procurement' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Contract ID" 
                        secondary={currentSupplierView.sourceInfo.contractId} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Last Award" 
                        secondary={currentSupplierView.sourceInfo.lastAward} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'compliance' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Registration Date" 
                        secondary={currentSupplierView.sourceInfo.registrationDate} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'golden' && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                        <AccountBalanceWalletIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Contract Value" 
                      secondary={selectedSupplier.contractValue} 
                      primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                    />
                  </ListItem>
                )}
              </List>
              
              {activeSource === 'golden' && (
                <>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Reconciliation Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" display="block" color="warning.main">
                      Conflicting Fields: {selectedSupplier.reconciliation.conflictFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block" color="success.main">
                      Resolved Fields: {selectedSupplier.reconciliation.resolvedFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Matching Rules Applied: {selectedSupplier.reconciliation.matchingRules.join(', ')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" fontWeight="bold">Reconciliation Process:</Typography>
                    <List dense disablePadding>
                      {selectedSupplier.reconciliation.processingSteps.map((step, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0 }}>
                          <ListItemText 
                            primary={`${index + 1}. ${step}`} 
                            primaryTypographyProps={{ variant: 'caption' }}
                            sx={{ m: 0 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Recent Activity
              </Typography>
              <List dense>
                {selectedSupplier.recentActivity.map((activity) => (
                  <ListItem key={activity.id} disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                        <ShoppingCartIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${activity.type} (${activity.id})`} 
                      secondary={`${activity.date} • ${activity.details} • Source: ${activity.source}`} 
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Contracts History & Analysis
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    placeholder="Search contracts..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                {renderPieChart()}
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 4, mb: 2 }}>
                  Contracts Details
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>Contract ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Agency</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedSupplier.contracts
                        .filter(contract => 
                          contract.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contract.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contract.id.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((contract) => {
                          return (
                            <TableRow key={contract.id}>
                              <TableCell>{contract.id}</TableCell>
                              <TableCell>{contract.date}</TableCell>
                              <TableCell>{contract.type}</TableCell>
                              <TableCell>{contract.status}</TableCell>
                              <TableCell>{contract.value}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={contract.riskLevel} 
                                  size="small"
                                  color={
                                    contract.riskLevel === 'High' ? 'error' :
                                    contract.riskLevel === 'Medium' ? 'warning' : 'success'
                                  }
                                />
                              </TableCell>
                              <TableCell>{contract.agency}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
} 