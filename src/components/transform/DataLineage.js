'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import StorageIcon from '@mui/icons-material/Storage';
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SchemaIcon from '@mui/icons-material/Schema';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildIcon from '@mui/icons-material/Build';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TransformIcon from '@mui/icons-material/Transform';

// Updated lineage data for insurance claims
const lineageData = {
  stages: [
    {
      id: 'source',
      name: 'Source Systems (Raw Data Ingestion)',
      icon: <StorageIcon />,
      description: 'Raw data ingestion from source systems',
      artifacts: [
        { name: 'policy_administration', type: 'Database', schema: 'src.policy_admin', timestamp: '2023-10-20 08:00:15' },
        { name: 'customer_data', type: 'Database', schema: 'src.customer_data', timestamp: '2023-10-20 08:00:30' },
        { name: 'medical_data', type: 'API', schema: 'src.medical_data', timestamp: '2023-10-20 08:00:45' },
        { name: 'death_registry', type: 'External API', schema: 'src.death_registry', timestamp: '2023-10-20 08:01:00' },
        { name: 'hospital_reports', type: 'Files', schema: 'src.hospital_reports', timestamp: '2023-10-20 08:01:15' }
      ],
      transformations: [
        { name: 'Data extraction', description: 'Extraction of raw data from source systems' },
        { name: 'Initial loading', description: 'Loading data into the data lake' }
      ]
    },
    {
      id: 'format',
      name: 'Format Transformation (Standardization & Structuring)',
      icon: <TransformIcon />,
      description: 'Standardization and structuring of raw data',
      artifacts: [
        { name: 'structured_policies', type: 'Parquet', schema: 'transform.policies', timestamp: '2023-10-20 08:15:00' },
        { name: 'structured_customers', type: 'Parquet', schema: 'transform.customers', timestamp: '2023-10-20 08:15:15' },
        { name: 'structured_claims', type: 'Parquet', schema: 'transform.claims', timestamp: '2023-10-20 08:15:30' },
        { name: 'structured_medical', type: 'Parquet', schema: 'transform.medical_data', timestamp: '2023-10-20 08:15:45' }
      ],
      transformations: [
        { name: 'Schema standardization', description: 'Converting raw inputs into structured format' },
        { name: 'Field normalization', description: 'Standardizing claim types, policy IDs, and beneficiary details' },
        { name: 'Data type conversion', description: 'Ensuring consistent data types across sources' }
      ]
    },
    {
      id: 'quality',
      name: 'Quality Control (Validation & Cleansing)',
      icon: <VerifiedUserIcon />,
      description: 'Data validation and cleansing',
      artifacts: [
        { name: 'validated_claims', type: 'Table', schema: 'quality.claims', timestamp: '2023-10-20 08:30:00' },
        { name: 'validated_policies', type: 'Table', schema: 'quality.policies', timestamp: '2023-10-20 08:30:15' },
        { name: 'validated_customers', type: 'Table', schema: 'quality.customers', timestamp: '2023-10-20 08:30:30' },
        { name: 'quality_metrics', type: 'Dashboard', schema: 'quality.metrics', timestamp: '2023-10-20 08:30:45' }
      ],
      transformations: [
        { name: 'Eligibility verification', description: 'Verify claim eligibility & completeness' },
        { name: 'Duplicate removal', description: 'Remove duplicate claims and consolidate records' },
        { name: 'Missing value handling', description: 'Identify and handle missing values' },
        { name: 'Anomaly detection', description: 'Flag potential fraud or anomalies' }
      ]
    },
    {
      id: 'business',
      name: 'Transformations (Business Rules & Processing)',
      icon: <BuildIcon />,
      description: 'Application of business rules and processing logic',
      artifacts: [
        { name: 'processed_claims', type: 'Table', schema: 'business.processed_claims', timestamp: '2023-10-20 08:45:00' },
        { name: 'claim_beneficiaries', type: 'Table', schema: 'business.claim_beneficiaries', timestamp: '2023-10-20 08:45:15' },
        { name: 'payment_instructions', type: 'Table', schema: 'business.payment_instructions', timestamp: '2023-10-20 08:45:30' },
        { name: 'audit_trail', type: 'Log', schema: 'business.audit_trail', timestamp: '2023-10-20 08:45:45' }
      ],
      transformations: [
        { name: 'Underwriting logic', description: 'Apply underwriting rules to claims' },
        { name: 'Policy mapping', description: 'Map claims to correct policies & financial accounts' },
        { name: 'Status assignment', description: 'Assign claim statuses (Approved, Denied, Pending)' },
        { name: 'Benefit calculation', description: 'Calculate benefit amounts based on policy terms' }
      ]
    },
    {
      id: 'golden',
      name: 'Golden Source of Data (Final Authoritative Claims Repository)',
      icon: <DataObjectIcon />,
      description: 'Final authoritative source for claims data',
      artifacts: [
        { name: 'master_claims', type: 'Table', schema: 'golden.claims', timestamp: '2023-10-20 09:00:00' },
        { name: 'master_beneficiaries', type: 'Table', schema: 'golden.beneficiaries', timestamp: '2023-10-20 09:00:15' },
        { name: 'master_payouts', type: 'Table', schema: 'golden.payouts', timestamp: '2023-10-20 09:00:30' },
        { name: 'master_audit', type: 'Table', schema: 'golden.audit', timestamp: '2023-10-20 09:00:45' }
      ],
      transformations: [
        { name: 'Data consolidation', description: 'Consolidate all validated claims into master repository' },
        { name: 'Version control', description: 'Maintain history and versioning of claim changes' },
        { name: 'Access control', description: 'Apply security and access control policies' }
      ]
    },
    {
      id: 'consumption',
      name: 'Data Consumption Layers',
      icon: <LocalShippingIcon />,
      description: 'Data prepared for downstream consumption',
      artifacts: [
        { name: 'claims_analytics', type: 'Materialized View', schema: 'viz.claims_analytics', timestamp: '2023-10-20 09:15:00' },
        { name: 'claims_reporting', type: 'Materialized View', schema: 'viz.claims_reporting', timestamp: '2023-10-20 09:15:15' },
        { name: 'regulatory_reporting', type: 'Materialized View', schema: 'viz.regulatory', timestamp: '2023-10-20 09:15:30' },
        { name: 'executive_dashboard', type: 'Dashboard', schema: 'viz.executive', timestamp: '2023-10-20 09:15:45' }
      ],
      transformations: [
        { name: 'Aggregation', description: 'Pre-calculated metrics and summaries for claims' },
        { name: 'Format optimization', description: 'Structured data for fast query and visualization' },
        { name: 'API preparation', description: 'Prepare data for API access by applications' }
      ]
    }
  ]
};

export default function DataLineage() {
  const [expandedStages, setExpandedStages] = useState({});

  const toggleStage = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Data Lineage
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Track the complete journey of your data from ingestion to visualization, with detailed transformation steps.
      </Typography>

      <Box sx={{ position: 'relative', mb: 4 }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            left: '50%', 
            top: 40, 
            bottom: 40, 
            width: 4, 
            backgroundColor: 'divider',
            transform: 'translateX(-50%)',
            zIndex: 0
          }} 
        />
        {lineageData.stages.map((stage, index) => (
          <Box 
            key={stage.id}
            sx={{ 
              display: 'flex', 
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Box 
              sx={{ 
                width: '50%', 
                display: 'flex', 
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                pr: index % 2 === 0 ? 4 : 0,
                pl: index % 2 === 1 ? 4 : 0
              }}
            >
              <Card 
                sx={{ 
                  maxWidth: 450, 
                  width: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'primary.main', 
                        color: 'primary.contrastText',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        mr: 2
                      }}
                    >
                      {stage.icon}
                    </Box>
                    <Typography variant="subtitle1">
                      {stage.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      sx={{ ml: 'auto' }}
                      onClick={() => toggleStage(stage.id)}
                    >
                      {expandedStages[stage.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {stage.description}
                  </Typography>
                  
                  {(expandedStages[stage.id] || stage.id === 'source') && (
                    <>
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                        Artifacts
                      </Typography>
                      <List dense disablePadding>
                        {stage.artifacts.map((artifact, idx) => (
                          <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                            <ListItemText 
                              primary={artifact.name}
                              secondary={
                                artifact.size ? 
                                  `${artifact.size} • ${artifact.timestamp}` : 
                                  `${(artifact.records?.toLocaleString() || 'Unknown')} records • ${artifact.timestamp}`
                              }
                              primaryTypographyProps={{ variant: 'body2' }}
                              secondaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      {stage.transformations && (
                        <>
                          <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'medium' }}>
                            Transformations
                          </Typography>
                          <List dense disablePadding>
                            {stage.transformations.map((transformation, idx) => (
                              <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                <ListItemText 
                                  primary={transformation.name}
                                  secondary={transformation.description}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                  secondaryTypographyProps={{ variant: 'caption' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
            
            <Box 
              sx={{ 
                width: 40, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: 'background.paper', 
                  border: '2px solid',
                  borderColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  zIndex: 2
                }}
              >
                {index + 1}
              </Box>
              {index < lineageData.stages.length - 1 && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'action.active',
                    zIndex: 2
                  }}
                >
                  <ArrowForwardIcon sx={{ transform: 'rotate(90deg)' }} />
                </Box>
              )}
            </Box>
            
            <Box sx={{ width: '50%' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
} 