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
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock ontology data
const ontologyData = {
  sourceSchemas: [
    {
      name: 'Product Management',
      fields: [
        { name: 'product_id', type: 'string', mapped: true },
        { name: 'product_name', type: 'string', mapped: true },
        { name: 'category', type: 'string', mapped: true },
        { name: 'package_type', type: 'string', mapped: true },
        { name: 'unit_size', type: 'string', mapped: true },
        { name: 'sku', type: 'string', mapped: true },
        { name: 'production_facility', type: 'string', mapped: true },
        { name: 'status', type: 'string', mapped: true }
      ]
    },
    {
      name: 'Supply Chain Operations',
      fields: [
        { name: 'facility_id', type: 'string', mapped: true },
        { name: 'facility_name', type: 'string', mapped: true },
        { name: 'facility_type', type: 'string', mapped: true },
        { name: 'location', type: 'string', mapped: true },
        { name: 'capacity', type: 'number', mapped: true },
        { name: 'current_inventory', type: 'number', mapped: true },
        { name: 'supplier_id', type: 'string', mapped: true },
        { name: 'operational_status', type: 'string', mapped: true }
      ]
    }
  ],
  targetOntology: {
    entities: [
      {
        name: 'Aircraft',
        description: 'Boeing aircraft information',
        fields: [
          { name: 'aircraftId', type: 'string' },
          { name: 'model', type: 'string' },
          { name: 'configuration', type: 'object' },
          { name: 'specifications', type: 'object' }
        ]
      },
      {
        name: 'Facility',
        description: 'Aerospace manufacturing and service facilities',
        fields: [
          { name: 'facilityId', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'type', type: 'string' },
          { name: 'capacity', type: 'number' }
        ]
      },
      {
        name: 'Supplier',
        description: 'Raw material and service suppliers',
        fields: [
          { name: 'supplierId', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'category', type: 'string' },
          { name: 'rating', type: 'string' }
        ]
      }
    ],
    relationships: [
      { from: 'Product', to: 'Facility', type: 'MANUFACTURED_AT', cardinality: 'N:1' },
      { from: 'Facility', to: 'Supplier', type: 'SUPPLIED_BY', cardinality: 'N:N' },
      { from: 'Product', to: 'Supplier', type: 'USES_MATERIALS_FROM', cardinality: 'N:N' }
    ]
  },
  mappings: [
    { source: 'Product Management.product_id', target: 'Product.productId', confidence: 100 },
    { source: 'Product Management.product_name', target: 'Product.name', confidence: 100 },
    { source: 'Product Management.package_type', target: 'Product.packaging', confidence: 95 },
    { source: 'Product Management.unit_size', target: 'Product.specifications', confidence: 95 },
    { source: 'Product Management.production_facility', target: 'Facility.facilityId', confidence: 90 },
    { source: 'Supply Chain Operations.facility_id', target: 'Facility.facilityId', confidence: 100 },
    { source: 'Supply Chain Operations.facility_name', target: 'Facility.name', confidence: 100 },
    { source: 'Supply Chain Operations.facility_type', target: 'Facility.type', confidence: 100 },
    { source: 'Supply Chain Operations.capacity', target: 'Facility.capacity', confidence: 100 },
    { source: 'Supply Chain Operations.supplier_id', target: 'Supplier.supplierId', confidence: 95 },
    { source: 'Supply Chain Operations.operational_status', target: 'Facility.status', confidence: 90 }
  ]
};

export default function OntologyMapping() {
  const [showConfidence, setShowConfidence] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState('Person');

  const handleToggleConfidence = () => {
    setShowConfidence(!showConfidence);
  };

  const handleEntityClick = (entity) => {
    setSelectedEntity(entity);
  };

  const getEntityMappings = (entityName) => {
    return ontologyData.mappings.filter(mapping => 
      mapping.target.startsWith(entityName)
    );
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'success';
    if (confidence >= 80) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ontology Mapping
        </Typography>
        <FormControlLabel
          control={
            <Switch 
              checked={showConfidence} 
              onChange={handleToggleConfidence}
              size="small"
            />
          }
          label="Show confidence scores"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Ontology mapping connects your source data fields to a standardized data model, enabling consistent analysis across different data sources.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountTreeIcon fontSize="small" sx={{ mr: 1 }} />
              Target Ontology
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The standardized data model
            </Typography>
            <List dense>
              {ontologyData.targetOntology.entities.map((entity) => (
                <ListItem 
                  key={entity.name}
                  onClick={() => handleEntityClick(entity.name)}
                  sx={{ 
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: selectedEntity === entity.name ? 'action.selected' : 'transparent',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Avatar 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        fontSize: '0.75rem', 
                        bgcolor: selectedEntity === entity.name ? 'primary.main' : 'action.disabledBackground' 
                      }}
                    >
                      {entity.name.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={entity.name} 
                    secondary={`${entity.fields.length} fields`}
                  />
                  <Tooltip title={entity.description}>
                    <IconButton size="small">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Relationships
            </Typography>
            <List dense>
              {ontologyData.targetOntology.relationships.map((rel, idx) => (
                <ListItem key={idx}>
                  <ListItemText 
                    primary={`${rel.from} ${rel.type} ${rel.to}`} 
                    secondary={`Cardinality: ${rel.cardinality}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Mappings for {selectedEntity}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fields in target ontology:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {ontologyData.targetOntology.entities
                  .find(e => e.name === selectedEntity)?.fields
                  .map((field) => (
                    <Chip 
                      key={field.name} 
                      label={field.name} 
                      size="small" 
                      variant="outlined"
                    />
                  ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Source to Target Mappings
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {getEntityMappings(selectedEntity).map((mapping, idx) => (
                <Grid item xs={12} key={idx}>
                  <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Source Field
                        </Typography>
                        <Typography variant="body1">
                          {mapping.source}
                        </Typography>
                      </Box>
                      <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon color="action" />
                        {showConfidence && (
                          <Chip 
                            label={`${mapping.confidence}%`} 
                            size="small" 
                            color={getConfidenceColor(mapping.confidence)}
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Target Field
                        </Typography>
                        <Typography variant="body1">
                          {mapping.target}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 