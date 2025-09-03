'use client';

import { useState, useEffect } from 'react';
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
  Chip,
  TextField,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Button,
  ButtonGroup,
  Slider,
  Switch,
  FormControlLabel,
  Tooltip,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentIcon from '@mui/icons-material/Whatshot';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TerrainIcon from '@mui/icons-material/Terrain';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

// Mock data for Boeing aerospace manufacturing geospatial visualization
const mockGeospatialData = {
  regions: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'],
  mapTypes: ['Supply Chain Network', 'Distribution Routes', 'Inventory Levels', 'Delivery Performance', 'Demand Heatmap'],
  metrics: ['Production Volume', 'Inventory Level', 'Delivery Time', 'Coverage Area', 'Demand Score'],
  facilityTypes: ['Manufacturing Plant', 'Distribution Center', 'Warehouse', 'Retail Hub', 'Cross-Dock'],
  facilities: [
    {
      id: 1,
      name: 'Boeing Everett Assembly Plant',
      address: '2304 Century Center Blvd, Irving, TX 75062',
      coordinates: { lat: 32.8554, lng: -96.9989 },
      productionVolume: 12500000,
      avgDeliveryTime: 2.3,
      demandScore: 89,
      region: 'Southwest',
      recentActivity: [
        { id: 'ACF-2024-001', type: 'Production', volume: 'High', status: 'Active', date: '2024-06-01', product: '787-9 Dreamliner' },
        { id: 'PRD-2024-002', type: 'Maintenance', severity: 'Low', status: 'Completed', date: '2024-05-28', details: 'Routine Check' },
        { id: 'PRD-2024-003', type: 'Shipment', volume: 'Medium', status: 'Completed', date: '2024-05-25', destination: 'Dallas DC' },
        { id: 'ACF-2024-004', type: 'Quality Check', result: 'Pass', status: 'Completed', date: '2024-05-22', batch: 'BA24052201' }
      ]
    },
    {
      id: 2,
      name: 'St. Louis Distribution Center',
      address: '1001 Distribution Pkwy, St. Louis, MO 63102',
      coordinates: { lat: 38.6270, lng: -90.1994 },
      inventoryLevel: 850000,
      avgDeliveryTime: 1.8,
      demandScore: 76,
      region: 'Midwest',
      recentActivity: [
        { id: 'DC-2024-001', type: 'Receiving', volume: 'High', status: 'Completed', date: '2024-05-30', source: 'Northlake Plant' },
        { id: 'DC-2024-002', type: 'Shipping', volume: 'Medium', status: 'In Progress', date: '2024-05-27', destination: 'Retail Hub' },
        { id: 'DC-2024-003', type: 'Inventory', type: 'Cycle Count', status: 'Completed', date: '2024-05-20', accuracy: '99.2%' },
        { id: 'DC-2024-004', type: 'Quality Hold', severity: 'Low', status: 'Resolved', date: '2024-05-18', batch: 'BA24051502' }
      ]
    },
    {
      id: 3,
      name: 'Atlanta Distribution Hub',
      address: '2750 Logistics Way, Atlanta, GA 30339',
      coordinates: { lat: 33.8919, lng: -84.3915 },
      inventoryLevel: 720000,
      avgDeliveryTime: 1.5,
      demandScore: 82,
      region: 'Southeast',
      recentActivity: [
        { id: 'DC-2024-005', type: 'Receiving', volume: 'Medium', status: 'Completed', date: '2024-05-29', source: 'Northlake Plant' },
        { id: 'DC-2024-006', type: 'Shipping', volume: 'High', status: 'Scheduled', date: '2024-05-26', destination: 'Southeast Region' },
        { id: 'DC-2024-007', type: 'Maintenance', severity: 'Medium', status: 'Completed', date: '2024-05-23', details: 'Equipment Upgrade' },
        { id: 'DC-2024-008', type: 'Inventory', type: 'Audit', status: 'Completed', date: '2024-05-19', result: 'Pass' }
      ]
    }
  ],
  demandHotspots: [
    { id: 1, location: 'Seattle Metro Area', coordinates: { lat: 47.6062, lng: -122.3321 }, demandIntensity: 91, productType: '787 Dreamliner', marketSize: 2500000, totalSales: 450000, lastUpdate: '2024-05-15' },
    { id: 2, location: 'Chicago Urban Region', coordinates: { lat: 41.8781, lng: -87.6298 }, demandIntensity: 85, productType: '737 MAX', marketSize: 3100000, totalSales: 380000, lastUpdate: '2024-05-10' },
    { id: 3, location: 'North Charleston Region', coordinates: { lat: 32.8998, lng: -80.0414 }, demandIntensity: 88, productType: '787-8 Dreamliner', marketSize: 2800000, totalSales: 410000, lastUpdate: '2024-05-05' }
  ]
};

// React Leaflet Map Component
const MapComponent = ({ 
  selectedFacility, 
  selectedHotspot, 
  onSelectFacility, 
  onSelectHotspot, 
  showHotspots,
  mapZoom,
  onZoomChange,
  mapStyle,
  selectedMapType,
  selectedFacilityType
}) => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load Leaflet dynamically on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This is dynamic import for Leaflet CSS and JS
      // We're doing this because Leaflet requires window/document objects
      const loadLeaflet = async () => {
        try {
          await import('leaflet/dist/leaflet.css');
          const L = await import('leaflet');
          
          // Only initialize if map container exists and map not already initialized
          if (!map && document.getElementById('map-container')) {
            // Initialize map
            const mapInstance = L.default.map('map-container', {
              center: [47.9298, -122.2817], // Center of Boeing Everett Assembly Plant
              zoom: mapZoom,
              zoomControl: false,
            });
            
            // Add OpenStreetMap tile layer
            L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
            
            // Set map reference in state
            setMap(mapInstance);
            setMapLoaded(true);
            
            // Listen for zoom changes
            mapInstance.on('zoom', () => {
              onZoomChange(mapInstance.getZoom());
            });
          }
        } catch (error) {
          console.error("Error loading Leaflet:", error);
        }
      };
      
      loadLeaflet();
    }
    
    return () => {
      // Clean up map on unmount
      if (map) {
        map.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Update map zoom when prop changes
  useEffect(() => {
    if (map && map.getZoom() !== mapZoom) {
      map.setZoom(mapZoom);
    }
  }, [mapZoom, map]);
  
  // Add/update markers when map is ready or when data changes
  useEffect(() => {
    if (!map || !mapLoaded) return;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });
    
    // Keep the base tile layer
    const baseLayers = [];
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        baseLayers.push(layer);
      }
    });
    
    // Add the proper tile layer based on map style
    if (baseLayers.length > 0) {
      // Remove existing tile layers
      baseLayers.forEach(layer => map.removeLayer(layer));
    }
    
    // Add the selected tile layer
    if (mapStyle === 'standard') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    } else if (mapStyle === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(map);
    } else if (mapStyle === 'terrain') {
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }).addTo(map);
    }
    
    // Create icon for facilities
    const createFacilityIcon = (isSelected) => {
      return L.icon({
        iconUrl: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isSelected ? '%23f50057' : '%231976d2'}"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: isSelected ? 'marker-selected' : ''
      });
    };
    
    // Filter facilities based on type if needed
    const filteredFacilities = selectedFacilityType === 'All' 
      ? mockGeospatialData.facilities
      : mockGeospatialData.facilities.filter(facility => 
          facility.recentActivity.some(activity => 
            activity.type.toLowerCase().includes(selectedFacilityType.toLowerCase())
          )
        );
    
    // Add facility markers
    filteredFacilities.forEach(facility => {
      const isSelected = selectedFacility && selectedFacility.id === facility.id;
      const icon = createFacilityIcon(isSelected);
      
      const marker = L.marker([facility.coordinates.lat, facility.coordinates.lng], { 
        icon,
        zIndexOffset: isSelected ? 1000 : 0
      }).addTo(map);
      
      // Add tooltip
      marker.bindTooltip(facility.name, { 
        permanent: false, 
        direction: 'top',
        offset: [0, -10]
      });
      
      // Add click handler
      marker.on('click', () => {
        onSelectFacility(facility);
        
        // Center map on marker
        map.setView([facility.coordinates.lat, facility.coordinates.lng], 8);
      });
      
      // If this is the selected facility, center the map on it
      if (isSelected && selectedMapType !== 'Coverage Area') {
        map.setView([facility.coordinates.lat, facility.coordinates.lng], 8);
      }
    });
    
    // Add hotspot markers if enabled
    if (showHotspots) {
      // Filter hotspots based on facility type
      const filteredHotspots = selectedFacilityType === 'All'
        ? mockGeospatialData.demandHotspots
        : mockGeospatialData.demandHotspots.filter(hotspot => 
            hotspot.productType.toLowerCase().includes(selectedFacilityType.toLowerCase())
          );
          
      filteredHotspots.forEach(hotspot => {
        const isSelected = selectedHotspot && selectedHotspot.id === hotspot.id;
        const icon = createFacilityIcon(isSelected);
        
        // Add circle to represent intensity
        const circle = L.circle([hotspot.coordinates.lat, hotspot.coordinates.lng], {
          radius: hotspot.demandIntensity * 5000, // Scale radius by intensity
          fillColor: `rgba(255, ${255 - hotspot.demandIntensity * 2}, 0, 0.3)`,
          fillOpacity: 0.3,
          stroke: true,
          color: `rgba(255, ${255 - hotspot.demandIntensity * 2}, 0, 0.7)`,
          weight: 1
        }).addTo(map);
        
        const marker = L.marker([hotspot.coordinates.lat, hotspot.coordinates.lng], { 
          icon,
          zIndexOffset: isSelected ? 2000 : 500
        }).addTo(map);
        
        // Add tooltip
        marker.bindTooltip(`${hotspot.location} - ${hotspot.productType}`, {
          permanent: false,
          direction: 'top',
          offset: [0, -10]
        });
        
        // Add click handler
        marker.on('click', () => {
          onSelectHotspot(hotspot);
          
          // Center map on marker
          map.setView([hotspot.coordinates.lat, hotspot.coordinates.lng], 8);
        });
        
        // If this is the selected hotspot, center the map on it
        if (isSelected) {
          map.setView([hotspot.coordinates.lat, hotspot.coordinates.lng], 8);
        }
      });
    }
    
    // Special view for Coverage Area
    if (selectedMapType === 'Coverage Area' && selectedFacility) {
      // Create a coverage area polygon for the selected facility
      const center = [selectedFacility.coordinates.lat, selectedFacility.coordinates.lng];
      const points = 8;
      const radius = 150000; // meters
      
      const coordinates = [];
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const offset = (Math.random() - 0.5) * 0.3; // Random variation to make shape irregular
        
        // Calculate point on polygon
        const lat = center[0] + (Math.cos(angle) * (radius + offset * radius)) / 111300;
        const lng = center[1] + (Math.sin(angle) * (radius + offset * radius)) / (111300 * Math.cos(center[0] * (Math.PI / 180)));
        
        coordinates.push([lat, lng]);
      }
      
      // Add the polygon to the map
      L.polygon(coordinates, {
        color: '#1976d2',
        fillColor: '#1976d2',
        fillOpacity: 0.2,
        weight: 2
      }).addTo(map);
      
      // Center the map on the facility
      map.setView(center, 7);
    }
    
    // If showing demand heatmap
    if (selectedMapType === 'Demand Heatmap') {
      // Simple representation - this would be more sophisticated in a real implementation
      mockGeospatialData.demandHotspots.forEach(hotspot => {
        L.circle([hotspot.coordinates.lat, hotspot.coordinates.lng], {
          radius: hotspot.demandIntensity * 8000, // Scale radius by intensity
          fillColor: '#ff5722',
          fillOpacity: 0.2,
          stroke: false
        }).addTo(map);
      });
    }
  }, [map, mapLoaded, selectedFacility, selectedHotspot, showHotspots, selectedMapType, mapStyle, selectedFacilityType]);
  
  return (
    <>
      <div id="map-container" style={{ height: '100%', width: '100%', borderRadius: '4px' }}>
        {!mapLoaded && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <CircularProgress />
            <Typography variant="body2">Loading map...</Typography>
          </Box>
        )}
      </div>
    </>
  );
};

export default function GeospatialView() {
  const [selectedMapType, setSelectedMapType] = useState('Supply Chain Network');
  const [selectedFacilityType, setSelectedFacilityType] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [mapZoom, setMapZoom] = useState(5);
  const [showHotspots, setShowHotspots] = useState(true);
  const [mapStyle, setMapStyle] = useState('standard');

  // Handle map type change
  const handleMapTypeChange = (event) => {
    setSelectedMapType(event.target.value);
  };
  
  // Handle facility type change
  const handleFacilityTypeChange = (event) => {
    setSelectedFacilityType(event.target.value);
    // Reset selections when changing facility type
    setSelectedFacility(null);
    setSelectedHotspot(null);
  };
  
  // Handle facility selection
  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    setSelectedHotspot(null);
    setMapZoom(8); // Zoom in when a facility is selected
  };

  // Handle hotspot selection
  const handleHotspotSelect = (hotspot) => {
    setSelectedHotspot(hotspot);
    setSelectedFacility(null);
    setMapZoom(8); // Zoom in when a hotspot is selected
  };
  
  // Handle zoom actions
  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };
  
  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 3));
  };
  
  // Handle map reset
  const handleResetView = () => {
    setSelectedFacility(null);
    setSelectedHotspot(null);
    setMapZoom(5);
    setShowHotspots(true);
    setSelectedFacilityType('All');
    setSelectedMapType('Supply Chain Network');
  };
  
  // Handle map zoom change from the map component
  const handleMapZoomChange = (newZoom) => {
    setMapZoom(newZoom);
  };
  
  // Toggle hotspots
  const handleToggleHotspots = (event) => {
    setShowHotspots(event.target.checked);
  };
  
  // Get metric value for a facility
  const getMetricValue = (facility, metric) => {
    switch(metric) {
      case 'Production Volume':
        return facility.productionVolume.toLocaleString();
      case 'Inventory Level':
        return facility.inventoryLevel.toLocaleString();
      case 'Delivery Time':
        return facility.avgDeliveryTime.toFixed(2);
      case 'Demand Score':
        return facility.demandScore;
      default:
        return 'N/A';
    }
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Boeing Aerospace Manufacturing Geospatial Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Visualize supply chain data across different geographic regions, identifying patterns, hotspots, and trends.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Map Controls & Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Map Controls
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Map Type</InputLabel>
              <Select
                value={selectedMapType}
                label="Map Type"
                onChange={handleMapTypeChange}
                size="small"
              >
                {mockGeospatialData.mapTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
                <MenuItem value="Coverage Area">Coverage Area</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Facility Type</InputLabel>
              <Select
                value={selectedFacilityType}
                label="Facility Type"
                onChange={handleFacilityTypeChange}
                size="small"
              >
                <MenuItem value="All">All Types</MenuItem>
                {mockGeospatialData.facilityTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Divider sx={{ my: 2 }} />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={showHotspots} 
                  onChange={handleToggleHotspots} 
                />
              }
              label="Show Demand Hotspots"
            />
            
            <Box sx={{ mt: 2 }}>
              <ButtonGroup variant="outlined" size="small" fullWidth>
                <Button onClick={handleZoomIn} startIcon={<ZoomInIcon />}>
                  Zoom In
                </Button>
                <Button onClick={handleZoomOut} startIcon={<ZoomOutIcon />}>
                  Zoom Out
                </Button>
              </ButtonGroup>
              
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mt: 1 }}
                startIcon={<RestartAltIcon />}
                onClick={handleResetView}
              >
                Reset View
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Map Style
            </Typography>
            <ButtonGroup variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
              <Button 
                variant={mapStyle === 'standard' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('standard')}
                startIcon={<MapIcon />}
              >
                Standard
              </Button>
              <Button 
                variant={mapStyle === 'satellite' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('satellite')}
                startIcon={<SatelliteAltIcon />}
              >
                Satellite
              </Button>
              <Button 
                variant={mapStyle === 'terrain' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('terrain')}
                startIcon={<TerrainIcon />}
              >
                Terrain
              </Button>
            </ButtonGroup>
            
            <Typography variant="subtitle2" gutterBottom>
              Legend
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BusinessIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Facility</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalFireDepartmentIcon sx={{ color: 'orange', mr: 1 }} fontSize="small" />
              <Typography variant="body2">Demand Hotspot</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                bgcolor: 'rgba(255, 87, 34, 0.2)', 
                border: '1px solid rgba(255, 87, 34, 0.7)', 
                mr: 1 
              }} />
              <Typography variant="body2">Demand Intensity</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Map Visualization */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              {selectedMapType} - United States
            </Typography>
            
            <Box sx={{ height: 500, mt: 2 }}>
              <MapComponent 
                selectedFacility={selectedFacility}
                selectedHotspot={selectedHotspot}
                onSelectFacility={handleFacilitySelect}
                onSelectHotspot={handleHotspotSelect}
                showHotspots={showHotspots}
                mapZoom={mapZoom}
                onZoomChange={handleMapZoomChange}
                mapStyle={mapStyle}
                selectedMapType={selectedMapType}
                selectedFacilityType={selectedFacilityType}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Zoom Level: {mapZoom}
              </Typography>
              {(selectedFacility || selectedHotspot) && (
                <Button 
                  size="small" 
                  startIcon={<RestartAltIcon />}
                  onClick={handleResetView}
                >
                  Reset View
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Details Panel */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            {selectedFacility ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Facility Details
                </Typography>
                <Typography variant="h6">{selectedFacility.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedFacility.address}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Region</Typography>
                    <Typography variant="subtitle2">{selectedFacility.region}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Demand Score</Typography>
                    <Typography variant="subtitle2">{selectedFacility.demandScore}/100</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Production Volume</Typography>
                    <Typography variant="subtitle2">{selectedFacility.productionVolume.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Delivery Time</Typography>
                    <Typography variant="subtitle2">{selectedFacility.avgDeliveryTime.toFixed(2)} minutes</Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" gutterBottom>
                  Recent Activity
                </Typography>
                <List dense disablePadding>
                  {selectedFacility.recentActivity.map((activity, idx) => (
                    <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <Chip 
                          label={idx + 1} 
                          size="small" 
                          sx={{ height: 20, minWidth: 20, fontSize: '0.625rem' }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${activity.id} - ${activity.type}`}
                        secondary={`${activity.status} • ${activity.date}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : selectedHotspot ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Demand Hotspot Details
                </Typography>
                <Typography variant="h6" color="error">{selectedHotspot.location}</Typography>
                <Chip 
                  label={selectedHotspot.productType} 
                  color="error" 
                  size="small" 
                  sx={{ mt: 1 }} 
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Last Update</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.lastUpdate}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Intensity</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.demandIntensity}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Market Size</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.marketSize.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Total Sales</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.totalSales.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="body2" paragraph>
                  This area experienced a significant {selectedHotspot.productType.toLowerCase()} event on {selectedHotspot.lastUpdate}, affecting {selectedHotspot.marketSize} people across multiple facilities. Total sales reached {selectedHotspot.totalSales.toLocaleString()}.
                </Typography>
                
                <Button variant="outlined" size="small" fullWidth>
                  View Detailed Report
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" gutterBottom>
                  Select a facility or hotspot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click on a marker on the map to view detailed information
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 