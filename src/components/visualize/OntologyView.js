'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
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
  TableRow
} from '@mui/material';
import SchemaIcon from '@mui/icons-material/Schema';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HubIcon from '@mui/icons-material/Hub';
import StorageIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import dynamic from 'next/dynamic';

// Import specific packages directly as recommended in the documentation
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

// Import AFrameLoader for proper A-Frame initialization
// const AFrameLoader = dynamic(() => import('./wrappers/AFrameLoader'), { ssr: false });

// Import ForceGraphVR separately - this automatically uses A-Frame
const ForceGraphVR = dynamic(() => import('react-force-graph-vr'), { ssr: false });

// Mock data for Boeing aerospace manufacturing ontology
const ontologyData = {
  rootEntities: [
    'Manufacturing ERP System',
    'Inventory Management System',
    'Supply Chain Management System',
    'Quality Control Database',
    'Supplier Portal',
    'Customer Orders System',
    'Aircraft Design System',
    'Equipment Maintenance System',
    'Compliance Database',
    'Sales Analytics Platform'
  ],
  entityDetails: {
    'Manufacturing ERP System': {
      name: 'Manufacturing ERP System',
      icon: <StorageIcon />,
      color: '#1976d2',
      description: 'Production planning and execution data from manufacturing facilities',
      instances: 234567,
      fields: [
        { name: 'batch_id', type: 'string', description: 'Unique identifier for production batch' },
        { name: 'product_id', type: 'string', description: 'Product identifier' },
        { name: 'quantity', type: 'number', description: 'Production quantity' },
        { name: 'facility_id', type: 'string', description: 'Manufacturing facility ID' }
      ],
      relationships: [
        { entity: 'Aircraft Design System', type: 'uses', cardinality: 'N:1', description: 'Production batch uses aircraft design specifications' },
        { entity: 'Inventory Management System', type: 'updates', cardinality: '1:N', description: 'Production updates inventory' },
        { entity: 'Quality Control Database', type: 'requires', cardinality: '1:N', description: 'Production requires quality checks' }
      ]
    },
    'Inventory Management System': {
      name: 'Inventory Management System',
      icon: <StorageIcon />,
      color: '#388e3c',
      description: 'Real-time inventory levels across all warehouses and DCs',
      instances: 789012,
      fields: [
        { name: 'inventory_id', type: 'string', description: 'Unique identifier for inventory record' },
        { name: 'location_id', type: 'string', description: 'Warehouse/DC location' },
        { name: 'product_id', type: 'string', description: 'Product identifier' },
        { name: 'quantity', type: 'number', description: 'Current quantity' }
      ],
      relationships: [
        { entity: 'Supply Chain Management System', type: 'informs', cardinality: '1:N', description: 'Inventory informs logistics' },
        { entity: 'Customer Orders System', type: 'fulfills', cardinality: '1:N', description: 'Inventory fulfills orders' }
      ]
    },
    'Supply Chain Management System': {
      name: 'Supply Chain Management System',
      icon: <StorageIcon />,
      color: '#fbc02d',
      description: 'Transportation and logistics data for product distribution',
      instances: 456789,
      fields: [
        { name: 'shipment_id', type: 'string', description: 'Unique identifier for shipment' },
        { name: 'route_id', type: 'string', description: 'Distribution route' },
        { name: 'vehicle_id', type: 'string', description: 'Transport vehicle' },
        { name: 'status', type: 'string', description: 'Shipment status' }
      ],
      relationships: [
        { entity: 'Inventory Management System', type: 'updates', cardinality: '1:N', description: 'Shipments update inventory' },
        { entity: 'Customer Orders System', type: 'delivers', cardinality: '1:N', description: 'Logistics delivers orders' }
      ]
    },
    'Quality Control Database': {
      name: 'Quality Control Database',
      icon: <StorageIcon />,
      color: '#e53935',
      description: 'Product quality metrics and testing results',
      instances: 123456,
      fields: [
        { name: 'test_id', type: 'string', description: 'Unique identifier for quality test' },
        { name: 'batch_id', type: 'string', description: 'Production batch' },
        { name: 'result', type: 'string', description: 'Test result' },
        { name: 'parameters', type: 'json', description: 'Test parameters' }
      ],
      relationships: [
        { entity: 'Manufacturing ERP System', type: 'validates', cardinality: 'N:1', description: 'QC validates production' },
        { entity: 'Compliance Database', type: 'reports to', cardinality: 'N:1', description: 'QC reports compliance' }
      ]
    },
    'Supplier Portal': {
      name: 'Supplier Portal',
      icon: <StorageIcon />,
      color: '#43a047',
      description: 'Supplier portal for managing supplier relationships',
      instances: 15432,
      fields: [
        { name: 'supplier_id', type: 'string', description: 'Unique identifier for supplier' },
        { name: 'business_name', type: 'string', description: 'Supplier business name' }
      ],
      relationships: []
    },
    'Customer Orders System': {
      name: 'Customer Orders System',
      icon: <StorageIcon />,
      color: '#00838f',
      description: 'System for managing customer orders',
      instances: 11234,
      fields: [
        { name: 'order_id', type: 'string', description: 'Unique identifier for order' },
        { name: 'customer_id', type: 'string', description: 'Customer identifier' },
        { name: 'status', type: 'string', description: 'Order status' }
      ],
      relationships: []
    },
    'Aircraft Design System': {
      name: 'Aircraft Design System',
      icon: <StorageIcon />,
      color: '#388e3c',
      description: 'System for managing aircraft design specifications and blueprints',
      instances: 12890,
      fields: [
        { name: 'design_id', type: 'string', description: 'Unique identifier for aircraft design' },
        { name: 'aircraft_model', type: 'string', description: 'Aircraft model name' },
        { name: 'components', type: 'json', description: 'Aircraft components and parts' }
      ],
      relationships: []
    },
    'Equipment Maintenance System': {
      name: 'Equipment Maintenance System',
      icon: <StorageIcon />,
      color: '#fbc02d',
      description: 'System for managing equipment maintenance',
      instances: 34567,
      fields: [
        { name: 'equipment_id', type: 'string', description: 'Unique identifier for equipment' },
        { name: 'maintenance_id', type: 'string', description: 'Maintenance record ID' },
        { name: 'status', type: 'string', description: 'Equipment status' }
      ],
      relationships: []
    },
    'Compliance Database': {
      name: 'Compliance Database',
      icon: <StorageIcon />,
      color: '#e53935',
      description: 'Database for managing compliance regulations',
      instances: 12345,
      fields: [
        { name: 'regulation_id', type: 'string', description: 'Unique identifier for regulation' },
        { name: 'status', type: 'string', description: 'Compliance status' }
      ],
      relationships: []
    },
    'Sales Analytics Platform': {
      name: 'Sales Analytics Platform',
      icon: <StorageIcon />,
      color: '#7e57c2',
      description: 'Platform for analyzing sales data',
      instances: 65432,
      fields: [
        { name: 'report_id', type: 'string', description: 'Unique identifier for sales report' },
        { name: 'date', type: 'date', description: 'Report date' },
        { name: 'revenue', type: 'number', description: 'Total revenue' },
        { name: 'profit', type: 'number', description: 'Total profit' }
      ],
      relationships: []
    }
  }
};

export default function OntologyView() {
  const [selectedEntity, setSelectedEntity] = useState(ontologyData.rootEntities[0]);
  const [expandedFields, setExpandedFields] = useState(true);
  const [expandedRelationships, setExpandedRelationships] = useState(true);
  const [showFields, setShowFields] = useState(true);
  const [showInstances, setShowInstances] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const nodesRef = useRef(null);
  
  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
  };
  
  const toggleExpandFields = () => {
    setExpandedFields(!expandedFields);
  };
  
  const toggleExpandRelationships = () => {
    setExpandedRelationships(!expandedRelationships);
  };
  
  const handleShowFieldsToggle = () => {
    setShowFields(!showFields);
  };
  
  const handleShowInstancesToggle = () => {
    setShowInstances(!showInstances);
  };
  
  const getEntityIcon = (entityName) => {
    return ontologyData.entityDetails[entityName]?.icon || <StorageIcon />;
  };
  
  const getEntityColor = (entityName) => {
    return ontologyData.entityDetails[entityName]?.color || '#757575';
  };

  // Convert ontology data to graph structure for ForceGraph
  useEffect(() => {
    const nodes = [];
    const links = [];
    
    // Add all entities as nodes
    for (const entityName of ontologyData.rootEntities) {
      const entityData = ontologyData.entityDetails[entityName];
      nodes.push({
        id: entityName,
        name: entityName,
        color: entityData.color,
        instances: entityData.instances,
        val: Math.log(entityData.instances) * 0.3,
        originalVal: Math.log(entityData.instances) * 0.3,
        // Pre-position nodes to help with initial layout
        x: Math.random() * 800 - 400,
        y: Math.random() * 800 - 400
      });
      
      // Add relationships as links
      if (entityData.relationships) {
        entityData.relationships.forEach(rel => {
          links.push({
            source: entityName,
            target: rel.entity,
            type: rel.type,
            cardinality: rel.cardinality
          });
        });
      }
    }
    
    // Store nodes reference
    nodesRef.current = nodes;
    setGraphData({ nodes, links });
  }, []);

  // ForceGraph reference for direct control
  const graphRef = useRef();
  
  // Higher zoom level for better visibility
  const DEFAULT_ZOOM = 4.3;

  // Apply zoom immediately and with multiple fallbacks to ensure it works
  useEffect(() => {
    if (!graphData || !graphRef.current) return;
    
    // Function to apply zoom with logging
    const applyZoom = (when) => {
      console.log(`Applying zoom (${when}): setting to ${DEFAULT_ZOOM}`);
      graphRef.current.zoom(DEFAULT_ZOOM);
      
      // Force a camera update
      if (graphRef.current._animateToZoom) {
        graphRef.current._animateToZoom(DEFAULT_ZOOM);
      }
    };
    
    // Apply zoom immediately
    applyZoom("immediate");
    
    // Apply zoom again after short delay (for safety)
    const zoomTimeout1 = setTimeout(() => applyZoom("short delay"), 300);
    
    // Apply zoom again after longer delay (as backup)
    const zoomTimeout2 = setTimeout(() => applyZoom("medium delay"), 800);
    
    // Apply zoom one more time after simulation has likely started
    const zoomTimeout3 = setTimeout(() => applyZoom("long delay"), 1500);
    
    // Force the simulation to stop after fixed time but AFTER applying final zoom
    const stopSimTimeout = setTimeout(() => {
      if (graphRef.current) {
        console.log("Forcing simulation to stop after timeout");
        
        // Apply zoom one final time before stopping
        applyZoom("before stopping simulation");
        
        // Access internal simulation and stop it
        if (graphData && graphData.nodes.length > 0) {
          graphRef.current.d3Force('center', null); // Remove centering force
          graphRef.current.d3Force('charge').strength(0); // Neutralize charge
          
          // Refresh the view with correct zoom
          graphRef.current._animateToZoom(DEFAULT_ZOOM);
          
          // Cancel the animation frame to stop physics
          if (graphRef.current._animationFrameRequestId) {
            cancelAnimationFrame(graphRef.current._animationFrameRequestId);
            graphRef.current._animationFrameRequestId = null;
          }
        }
      }
    }, 500);
    
    // Cleanup
    return () => {
      clearTimeout(zoomTimeout1);
      clearTimeout(zoomTimeout2);
      clearTimeout(zoomTimeout3);
      clearTimeout(stopSimTimeout);
    };
  }, [graphData]);
  
  // Handle zoom controls with direct access to the graph component
  const handleZoomIn = useCallback(() => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      const newZoom = currentZoom * 1.5;
      console.log(`Zooming in from ${currentZoom} to ${newZoom}`);
      graphRef.current.zoom(newZoom);
      
      // Force immediate update without waiting for physics
      if (graphRef.current._animateToZoom) {
        graphRef.current._animateToZoom(newZoom);
      }
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      const newZoom = currentZoom / 1.5;
      console.log(`Zooming out from ${currentZoom} to ${newZoom}`);
      graphRef.current.zoom(newZoom);
      
      // Force immediate update without waiting for physics
      if (graphRef.current._animateToZoom) {
        graphRef.current._animateToZoom(newZoom);
      }
    }
  }, []);

  // Reset zoom to default value
  const handleZoomReset = useCallback(() => {
    if (graphRef.current) {
      console.log(`Resetting zoom to ${DEFAULT_ZOOM}`);
      graphRef.current.zoom(DEFAULT_ZOOM);
      
      // Force immediate update without waiting for physics
      if (graphRef.current._animateToZoom) {
        graphRef.current._animateToZoom(DEFAULT_ZOOM);
      }
    }
  }, []);

  // Effect for selected entity changes
  useEffect(() => {
    if (!graphData || !nodesRef.current) return;
    
    const entity = ontologyData.entityDetails[selectedEntity];
    if (!entity) return;
    
    // Instead of recreating the entire graph data, just set a highlightedNode state
    // This will be used in the rendering functions without disrupting the layout
    setHighlightedNode(selectedEntity);
    
    // No need to call setGraphData here - we'll handle highlighting in the rendering functions
  }, [selectedEntity]); // Only depend on selectedEntity, not graphData

  // ForceGraph component with sophisticated visualization
  const OntologyGraph = () => {
    if (!graphData) {
      return <CircularProgress />;
    }
    
    // Common props for ForceGraph2D
    const graphProps = {
      graphData: graphData,
      ref: graphRef, // Add ref for direct control
      nodeLabel: node => `${node.name}: ${node.instances.toLocaleString()} instances`,
      nodeColor: node => node.id === selectedEntity ? node.color : `${node.color}60`,
      // Only increase the size of the selected node in the render function, not by modifying the data
      nodeVal: node => node.id === selectedEntity ? node.originalVal * 1.2 : node.originalVal,
      linkLabel: link => `${link.type} (${link.cardinality})`,
      // Highlight links connected to the selected entity
      linkColor: link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return (sourceId === selectedEntity || targetId === selectedEntity) ? '#000' : '#ccc';
      },
      linkWidth: link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return (sourceId === selectedEntity || targetId === selectedEntity) ? 2 : 0.5;
      },
      linkDirectionalArrowLength: 6,
      linkDirectionalArrowRelPos: 0.8,
      linkDirectionalParticles: link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return (sourceId === selectedEntity || targetId === selectedEntity) ? 4 : 0;
      },
      linkDirectionalParticleWidth: 2,
      linkDirectionalParticleSpeed: 0.01,
      
      // Much more aggressive physics simulation settings for faster convergence
      cooldownTicks: 50, // Reduced from 200
      warmupTicks: 50, // Reduced from 300
      cooldownTime: 0, // Reduced from 5000
      d3AlphaDecay: 0.1, // Much faster decay (0.01 -> 0.1)
      d3VelocityDecay: 0.6, // Much higher friction (0.2 -> 0.6)
      onNodeClick: node => setSelectedEntity(node.id),
      
      // Initial zoom level - set this as a prop to try to apply it earlier
      zoom: DEFAULT_ZOOM,

      // d3Force - even more aggressive settings for faster stabilization
      d3Force: {
        charge: {
          strength: -1000, // Slightly reduced to stabilize faster
          distanceMax: 300 // Reduced range
        },
        link: {
          distance: 250 // Reduced
        },
        collide: {
          strength: 0.5, // Reduced for faster stabilization
          radius: 60 // Reduced
        },
        center: {
          strength: 0.2 // Increased to pull toward center faster
        },
        x: { 
          strength: 0.2 // Increased for faster stabilization
        },
        y: { 
          strength: 0.2 // Increased for faster stabilization
        }
      }
    };
    
    return (
      <Box sx={{ position: 'relative', height: 'calc(100% - 10px)' }}>
        {/* Zoom controls */}
        <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 1, padding: '2px' }}>
          <IconButton 
            size="small" 
            onClick={handleZoomIn} 
            sx={{ bgcolor: 'background.paper', mr: 1, boxShadow: 1 }}
            title="Zoom In"
          >
            <ZoomInIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleZoomOut} 
            sx={{ bgcolor: 'background.paper', mr: 1, boxShadow: 1 }}
            title="Zoom Out"
          >
            <ZoomOutIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleZoomReset} 
            sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
            title="Reset Zoom"
          >
            <FilterAltIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Render ForceGraph2D with reference */}
        <ForceGraph2D
          {...graphProps}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
            
            // Determine if this node is highlighted
            const isHighlighted = node.id === selectedEntity;
            
            // Node circle/icon - use the selected entity state for highlighting
            ctx.fillStyle = isHighlighted ? node.color : `${node.color}50`;
            ctx.beginPath();
            
            // Use the original size for all nodes to prevent resizing
            const nodeVal = isHighlighted ? node.originalVal * 1.2 : node.originalVal;
            ctx.arc(node.x, node.y, nodeVal, 0, 2 * Math.PI, false);
            ctx.fill();
            
            // Draw border for better visibility
            ctx.strokeStyle = isHighlighted ? '#fff' : node.color;
            ctx.lineWidth = isHighlighted ? 2 : 0.8;
            ctx.stroke();
            
            // Always draw labels regardless of zoom since we're increasing the default zoom
            // This makes the graph more readable immediately
            // Increased label distance from node
            const labelYOffset = nodeVal + fontSize * 2.5;
            
            // Node label background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y + labelYOffset,
              bckgDimensions[0],
              bckgDimensions[1]
            );
            
            // Node label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isHighlighted ? '#000' : '#444';
            ctx.font = isHighlighted ? `bold ${fontSize}px Sans-Serif` : `${fontSize}px Sans-Serif`;
            ctx.fillText(
              label,
              node.x,
              node.y + labelYOffset + bckgDimensions[1] / 2
            );
          }}
          width={800}
          height={500}
          onEngineStop={() => {
            // Engine has stabilized
            console.log("Engine stopped naturally"); 
            
            // Apply zoom one final time when engine stops naturally
            if (graphRef.current) {
              console.log(`Applying zoom after engine stop: setting to ${DEFAULT_ZOOM}`);
              graphRef.current.zoom(DEFAULT_ZOOM);
              if (graphRef.current._animateToZoom) {
                graphRef.current._animateToZoom(DEFAULT_ZOOM);
              }
            }
          }}
          onNodeHover={node => {
            // We can keep track of hover state separately from selection
            if (node) {
              document.body.style.cursor = 'pointer';
            } else {
              document.body.style.cursor = 'default';
            }
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ontology & Object View
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Entity</InputLabel>
              <Select
                value={selectedEntity}
                onChange={handleEntityChange}
                label="Entity"
              >
                {ontologyData.rootEntities.map((entity) => (
                  <MenuItem key={entity} value={entity}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        color: getEntityColor(entity),
                        display: 'flex',
                        mr: 1
                      }}>
                        {getEntityIcon(entity)}
                      </Box>
                      {entity}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          Explore the data model ontology and relationships between entities.
        </Typography>

        {/* Full-width force graph section */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              {selectedEntity} Relationships
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={showFields} 
                      onChange={handleShowFieldsToggle}
                      size="small"
                    />
                  }
                  label="Fields"
                />
                <FormControlLabel
                  control={
                    <Switch 
                      checked={showInstances} 
                      onChange={handleShowInstancesToggle}
                      size="small"
                    />
                  }
                  label="Instances"
                />
              </Box>
              <IconButton size="small">
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ height: 500, width: '100%' }}> {/* Height increased to match the component height */}
            <OntologyGraph />
          </Box>
        </Paper>
        
        {/* Schema and details section in a grid layout */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Schema View */}
            <Paper 
              sx={{ 
                p: 2, 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Entity Schema: {selectedEntity}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    color: getEntityColor(selectedEntity),
                    display: 'flex',
                    mr: 1
                  }}>
                    {getEntityIcon(selectedEntity)}
                  </Box>
                  <Typography variant="subtitle1">
                    {selectedEntity}
                  </Typography>
                  <Chip 
                    label={`${ontologyData.entityDetails[selectedEntity].instances.toLocaleString()} instances`}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {ontologyData.entityDetails[selectedEntity].description}
                </Typography>
              </Paper>
              
              <Box sx={{ mb: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: 1
                  }}
                  onClick={toggleExpandFields}
                >
                  <Typography variant="subtitle2">
                    Fields
                  </Typography>
                  <IconButton size="small">
                    {expandedFields ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </IconButton>
                </Box>
                {expandedFields && (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ontologyData.entityDetails[selectedEntity].fields.map((field) => (
                          <TableRow key={field.name}>
                            <TableCell>{field.name}</TableCell>
                            <TableCell>
                              <Chip 
                                label={field.type} 
                                size="small" 
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{field.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
              
              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: 1
                  }}
                  onClick={toggleExpandRelationships}
                >
                  <Typography variant="subtitle2">
                    Relationships
                  </Typography>
                  <IconButton size="small">
                    {expandedRelationships ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </IconButton>
                </Box>
                {expandedRelationships && (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell>Related Entity</TableCell>
                          <TableCell>Relationship</TableCell>
                          <TableCell>Cardinality</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ontologyData.entityDetails[selectedEntity].relationships.map((rel, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ 
                                  color: getEntityColor(rel.entity),
                                  display: 'flex',
                                  mr: 1
                                }}>
                                  {getEntityIcon(rel.entity)}
                                </Box>
                                <Button 
                                  size="small"
                                  onClick={() => setSelectedEntity(rel.entity)}
                                >
                                  {rel.entity}
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell>{rel.type}</TableCell>
                            <TableCell>{rel.cardinality}</TableCell>
                            <TableCell>{rel.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Entity Details
                </Typography>
                
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: getEntityColor(selectedEntity),
                    color: 'white',
                    borderRadius: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getEntityIcon(selectedEntity)}
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {selectedEntity}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {ontologyData.entityDetails[selectedEntity].instances.toLocaleString()} instances
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" paragraph>
                  {ontologyData.entityDetails[selectedEntity].description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Key Fields
                </Typography>
                <List dense>
                  {ontologyData.entityDetails[selectedEntity].fields.slice(0, 3).map((field) => (
                    <ListItem key={field.name} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Chip 
                          label={field.type.charAt(0)} 
                          size="small"
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            fontSize: '0.625rem',
                            fontWeight: 'bold' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={field.name} 
                        secondary={field.description}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Sample Instances
                </Typography>
                <List dense>
                  {[1, 2, 3].map((idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {React.cloneElement(getEntityIcon(selectedEntity), { fontSize: 'small' })}
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${selectedEntity} ${1000 + idx}`} 
                        secondary={`ID: ${selectedEntity.substring(0, 3).toUpperCase()}${1000 + idx}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Related Entities
                </Typography>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {ontologyData.entityDetails[selectedEntity].relationships.map((rel, idx) => (
                    <Grid item key={idx}>
                      <Chip 
                        icon={getEntityIcon(rel.entity)}
                        label={rel.entity}
                        onClick={() => setSelectedEntity(rel.entity)}
                        sx={{ bgcolor: 'background.default' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
} 