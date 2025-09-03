'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Chip, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { Flight, Build, CheckCircle, Warning, TrendingUp, Psychology, FlightTakeoff, FlightLand, Engineering, Security, Speed, Assessment } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamic imports for Leaflet (only on client side)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

// Boeing manufacturing and maintenance facilities data
const manufacturingPlants = [
  { id: 'MP001', name: 'Everett Final Assembly Line', type: '787-9', lat: 47.9298, lng: -122.2817, status: 'operational', efficiency: 94, location: 'Everett', productionRate: 12, maintenanceSchedule: 'optimal' },
  { id: 'MP002', name: 'Renton 737 Assembly', type: '737 MAX', lat: 47.4907, lng: -122.2146, status: 'maintenance', efficiency: 87, location: 'Renton', productionRate: 8, maintenanceSchedule: 'scheduled' },
  { id: 'MP003', name: 'North Charleston 787 Assembly', type: '787-8', lat: 32.8998, lng: -80.0414, status: 'operational', efficiency: 96, location: 'North Charleston', productionRate: 10, maintenanceSchedule: 'optimal' },
  { id: 'MP004', name: 'Mobile 737 Assembly', type: '737-800', lat: 30.6954, lng: -88.0399, status: 'operational', efficiency: 91, location: 'Mobile', productionRate: 6, maintenanceSchedule: 'optimal' },
  { id: 'MP005', name: 'Seattle 777 Wing Assembly', type: '777X', lat: 47.6062, lng: -122.3321, status: 'maintenance', efficiency: 82, location: 'Seattle', productionRate: 4, maintenanceSchedule: 'urgent' },
  { id: 'MP006', name: 'Boeing MRO Center', type: 'Multi-Type', lat: 25.2048, lng: 55.2708, status: 'operational', efficiency: 93, location: 'Dubai', productionRate: 15, maintenanceSchedule: 'optimal' },
  { id: 'MP007', name: 'Singapore Engine Assembly', type: 'GEnx', lat: 1.3521, lng: 103.8198, status: 'operational', efficiency: 89, location: 'Singapore', productionRate: 8, maintenanceSchedule: 'optimal' },
  { id: 'MP008', name: 'São Paulo Component Assembly', type: '737 Components', lat: -23.5505, lng: -46.6333, status: 'maintenance', efficiency: 78, location: 'São Paulo', productionRate: 5, maintenanceSchedule: 'scheduled' }
];

const predictiveMaintenanceCenters = [
  { id: 'PMC001', name: 'Everett Predictive Analytics Hub', lat: 47.9298, lng: -122.2817, capacity: 25, utilization: 78, status: 'operational', type: 'major', aiModels: 12, predictionAccuracy: 96.5 },
  { id: 'PMC002', name: 'Renton IoT Monitoring Center', lat: 47.4907, lng: -122.2146, capacity: 18, utilization: 82, status: 'operational', type: 'major', aiModels: 8, predictionAccuracy: 94.2 },
  { id: 'PMC003', name: 'North Charleston Sensor Analytics Hub', lat: 32.8998, lng: -80.0414, capacity: 12, utilization: 65, status: 'operational', type: 'regional', aiModels: 6, predictionAccuracy: 92.8 },
  { id: 'PMC004', name: 'Mobile Edge Computing Center', lat: 30.6954, lng: -88.0399, capacity: 8, utilization: 71, status: 'operational', type: 'regional', aiModels: 4, predictionAccuracy: 91.5 },
  { id: 'PMC005', name: 'Seattle Machine Learning Hub', lat: 47.6062, lng: -122.3321, capacity: 15, utilization: 89, status: 'high_demand', type: 'major', aiModels: 10, predictionAccuracy: 95.8 },
  { id: 'PMC006', name: 'Boeing Digital Twin Center', lat: 25.2048, lng: 55.2708, capacity: 20, utilization: 75, status: 'operational', type: 'major', aiModels: 9, predictionAccuracy: 93.7 },
  { id: 'PMC007', name: 'Singapore AI Operations Hub', lat: 1.3521, lng: 103.8198, capacity: 22, utilization: 93, status: 'critical', type: 'major', aiModels: 15, predictionAccuracy: 97.2 },
  { id: 'PMC008', name: 'São Paulo Predictive Maintenance', lat: -23.5505, lng: -46.6333, capacity: 10, utilization: 87, status: 'high_demand', type: 'regional', aiModels: 5, predictionAccuracy: 90.3 }
];

const supplyChainHubs = [
  // Major Supply Chain and Logistics Hubs
  { id: 'SCH001', name: 'Everett Supply Chain Hub', lat: 47.9298, lng: -122.2817, traffic: 'high', type: 'manufacturing', throughput: 1500, efficiency: 94.2 },
  { id: 'SCH002', name: 'Renton Logistics Center', lat: 47.4907, lng: -122.2146, traffic: 'high', type: 'distribution', throughput: 1200, efficiency: 91.8 },
  { id: 'SCH003', name: 'North Charleston Manufacturing Hub', lat: 32.8998, lng: -80.0414, traffic: 'high', type: 'manufacturing', throughput: 1800, efficiency: 89.5 },
  { id: 'SCH004', name: 'Mobile Assembly Hub', lat: 30.6954, lng: -88.0399, traffic: 'medium', type: 'assembly', throughput: 800, efficiency: 92.1 },
  { id: 'SCH005', name: 'Seattle Component Hub', lat: 47.6062, lng: -122.3321, traffic: 'high', type: 'manufacturing', throughput: 1100, efficiency: 93.7 },
  { id: 'SCH006', name: 'Boeing Distribution Center', lat: 25.2048, lng: 55.2708, traffic: 'high', type: 'distribution', throughput: 1600, efficiency: 95.3 },
  { id: 'SCH007', name: 'Singapore Global Hub', lat: 1.3521, lng: 103.8198, traffic: 'high', type: 'logistics', throughput: 2000, efficiency: 96.8 },
  { id: 'SCH008', name: 'São Paulo Regional Hub', lat: -23.5505, lng: -46.6333, traffic: 'medium', type: 'distribution', throughput: 900, efficiency: 88.9 }
];

// Supply chain routes (manufacturing plants to hubs)
const supplyChainRoutes = [
  { from: 'MP001', to: 'SCH001', status: 'active', duration: '2h 30m', volume: 150 },
  { from: 'MP002', to: 'SCH002', status: 'scheduled', duration: '3h 15m', volume: 120 },
  { from: 'MP003', to: 'SCH003', status: 'active', duration: '1h 45m', volume: 200 },
  { from: 'MP004', to: 'SCH004', status: 'maintenance', duration: 'N/A', volume: 0 },
  { from: 'MP005', to: 'SCH005', status: 'active', duration: '4h 20m', volume: 180 },
  { from: 'MP006', to: 'SCH006', status: 'active', duration: '5h 10m', volume: 250 }
];

// Boeing aircraft fleet data
const aircraft = [
  { id: 'AC001', registration: 'N787BA', type: '787-9', lat: 47.4502, lng: -122.3088, status: 'active', health: 94, location: 'Seattle', flightHours: 12543 },
  { id: 'AC002', registration: 'N737BG', type: '737 MAX', lat: 40.6413, lng: -73.7781, status: 'maintenance', health: 87, location: 'New York', flightHours: 8932 },
  { id: 'AC003', registration: 'N777BH', type: '777X', lat: 34.0522, lng: -118.2437, status: 'active', health: 91, location: 'Los Angeles', flightHours: 15678 },
  { id: 'AC004', registration: 'N787BC', type: '787-8', lat: 32.8998, lng: -80.0414, status: 'active', health: 89, location: 'Charleston', flightHours: 9876 },
  { id: 'AC005', registration: 'N737BD', type: '737-800', lat: 30.1944, lng: -85.7986, status: 'grounded', health: 76, location: 'Mobile', flightHours: 18234 }
];

// Airport data
const airports = [
  { id: 'AP001', name: 'Seattle-Tacoma International', code: 'SEA', lat: 47.4502, lng: -122.3088, traffic: 'high', type: 'international' },
  { id: 'AP002', name: 'John F. Kennedy International', code: 'JFK', lat: 40.6413, lng: -73.7781, traffic: 'high', type: 'international' },
  { id: 'AP003', name: 'Los Angeles International', code: 'LAX', lat: 34.0522, lng: -118.2437, traffic: 'high', type: 'international' },
  { id: 'AP004', name: 'Charleston International', code: 'CHS', lat: 32.8998, lng: -80.0414, traffic: 'medium', type: 'regional' },
  { id: 'AP005', name: 'Mobile Regional Airport', code: 'MOB', lat: 30.6954, lng: -88.0399, traffic: 'low', type: 'regional' }
];

// Flight routes between aircraft and airports
const flightRoutes = [
  { from: 'AC001', to: 'AP002', status: 'active', duration: '5h 30m', distance: '2400 nm' },
  { from: 'AC002', to: 'AP001', status: 'scheduled', duration: '6h 15m', distance: '2850 nm' },
  { from: 'AC003', to: 'AP004', status: 'active', duration: '4h 45m', distance: '2100 nm' },
  { from: 'AC004', to: 'AP005', status: 'active', duration: '1h 20m', distance: '280 nm' },
  { from: 'AC005', to: 'AP001', status: 'maintenance', duration: 'N/A', distance: '2650 nm' }
];

// Manufacturing and predictive maintenance zones
const manufacturingZones = [
  // European Manufacturing Hub
  {
    id: 'MZ001',
    name: 'European Manufacturing Hub',
    lat: 48.8566,
    lng: 2.3522,
    radius: 300000, // 300km radius
    plantCount: 8,
    predictiveCenters: 3,
    avgEfficiency: 92.5,
    operationalEfficiency: 94.2,
    keyMetrics: { activePlants: 7, maintenanceInProgress: 1, predictiveModels: 25 },
    maintenanceOpportunity: 'high_efficiency',
    keyInsights: 'Strong manufacturing infrastructure, advanced predictive maintenance'
  },
  {
    id: 'MZ002',
    name: 'North American Manufacturing',
    lat: 40.7128,
    lng: -74.0060,
    radius: 400000,
    plantCount: 6,
    predictiveCenters: 2,
    avgEfficiency: 89.8,
    operationalEfficiency: 91.5,
    keyMetrics: { activePlants: 5, maintenanceInProgress: 1, predictiveModels: 18 },
    maintenanceOpportunity: 'growing_market',
    keyInsights: 'Growing manufacturing market, expanding predictive capabilities'
  },
  {
    id: 'MZ003',
    name: 'Asia-Pacific Manufacturing',
    lat: 35.6762,
    lng: 139.6503,
    radius: 350000,
    plantCount: 5,
    predictiveCenters: 2,
    avgEfficiency: 91.2,
    operationalEfficiency: 93.8,
    keyMetrics: { activePlants: 4, maintenanceInProgress: 1, predictiveModels: 15 },
    maintenanceOpportunity: 'strategic_growth',
    keyInsights: 'Strategic growth region, high manufacturing efficiency'
  },
  {
    id: 'MZ004',
    name: 'Middle East Manufacturing',
    lat: 25.2048,
    lng: 55.2708,
    radius: 250000,
    plantCount: 3,
    predictiveCenters: 1,
    avgEfficiency: 93.1,
    operationalEfficiency: 95.2,
    keyMetrics: { activePlants: 3, maintenanceInProgress: 0, predictiveModels: 12 },
    maintenanceOpportunity: 'premium_service',
    keyInsights: 'Premium manufacturing market, excellent predictive standards'
  },
  {
    id: 'MZ005',
    name: 'South American Manufacturing',
    lat: -23.5505,
    lng: -46.6333,
    radius: 300000,
    plantCount: 2,
    predictiveCenters: 1,
    avgEfficiency: 87.5,
    operationalEfficiency: 89.1,
    keyMetrics: { activePlants: 1, maintenanceInProgress: 1, predictiveModels: 8 },
    maintenanceOpportunity: 'development_region',
    keyInsights: 'Development region, improving predictive infrastructure'
  }
];

export default function DynamicControlMap({ selectedRegion, onRegionSelect }) {
  const [map, setMap] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const [showManufacturingPlants, setShowManufacturingPlants] = useState(true);
  const [showPredictiveCenters, setShowPredictiveCenters] = useState(true);
  const [showSupplyChainHubs, setShowSupplyChainHubs] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showAircraft, setShowAircraft] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [showAirports, setShowAirports] = useState(false);
  const [selectedPlantType, setSelectedPlantType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAircraftType, setSelectedAircraftType] = useState('all');

  // Use predictiveMaintenanceCenters as maintenance facilities
  const facilities = predictiveMaintenanceCenters;

  // Filter aircraft based on selected criteria
  const filteredAircraft = aircraft.filter(aircraft => {
    const typeMatch = selectedAircraftType === 'all' || aircraft.type === selectedAircraftType;
    const statusMatch = selectedStatus === 'all' || aircraft.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  // Filter facilities based on selected criteria
  const filteredFacilities = facilities.filter(facility => {
    const statusMatch = selectedStatus === 'all' || facility.status === selectedStatus;
    return statusMatch;
  });

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  // Reset map when filters change significantly
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [selectedPlantType, selectedStatus]);

  // Filter manufacturing plants based on selection
  const filteredManufacturingPlants = manufacturingPlants.filter(plant => {
    const typeMatch = selectedPlantType === 'all' || plant.type.includes(selectedPlantType);
    const statusMatch = selectedStatus === 'all' || plant.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  // Filter predictive centers based on selection
  const filteredPredictiveCenters = predictiveMaintenanceCenters.filter(center => {
    if (selectedPlantType === 'all') return true;
    // Filter based on center type and plant type compatibility
    return true; // For now, show all centers
  });

  const getHealthColor = (health) => {
    if (health >= 90) return '#4caf50';
    if (health >= 80) return '#ff9800';
    if (health >= 70) return '#f57c00';
    return '#f44336';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'maintenance': return '#ff9800';
      case 'grounded': return '#f44336';
      case 'scheduled': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FlightTakeoff />;
      case 'maintenance': return <Build />;
      case 'grounded': return <FlightLand />;
      case 'scheduled': return <Speed />;
      default: return <Flight />;
    }
  };

  const getFacilityColor = (status) => {
    switch (status) {
      case 'operational': return '#4caf50';
      case 'high_demand': return '#ff9800';
      case 'critical': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getFacilitySize = (type) => {
    switch (type) {
      case 'major': return 12;
      case 'regional': return 8;
      default: return 6;
    }
  };

  const getZoneColor = (efficiency) => {
    if (efficiency >= 95) return '#4caf50';
    if (efficiency >= 90) return '#8bc34a';
    if (efficiency >= 85) return '#ff9800';
    if (efficiency >= 80) return '#f57c00';
    return '#f44336';
  };

  const getZoneOpacity = (efficiency) => {
    return Math.max(0.1, Math.min(0.4, efficiency / 100));
  };

  const getZoneRadius = (efficiency) => {
    return Math.max(50000, Math.min(200000, efficiency * 2000));
  };

  const getAircraftIcon = (aircraft) => {
    const getColor = () => {
      return getHealthColor(aircraft.health);
    };

    const getIcon = () => {
      switch (aircraft.type) {
        case '787-10': return '🛩️';
        case '787-9': return '✈️';
        case '787-8': return '✈️';
        case '777X': return '✈️';
        case '777-300ER': return '✈️';
        case '737 MAX': return '🛩️';
        case '737-800': return '🛩️';
        default: return '✈️';
      }
    };

    return `
      <div
        style="
          width: 24px;
          height: 24px;
          background-color: ${getColor()};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        "
      >
        ${getIcon()}
      </div>
    `;
  };

  const getFacilityIcon = (facility) => {
    const getColor = () => {
      return getFacilityColor(facility.status);
    };

          return `
      <div
        style="
          width: ${getFacilitySize(facility.type)}px;
          height: ${getFacilitySize(facility.type)}px;
          background-color: ${getColor()};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        "
      ></div>
    `;
  };

  const getFlightRoutePaths = () => {
    return flightRoutes
      .filter(route => route.status === 'active')
      .map(route => {
        const aircraftData = aircraft.find(a => a.id === route.from);
        const airportData = airports.find(ap => ap.id === route.to);
        
        if (!aircraftData || !airportData) return null;
        
        return {
          id: route.from,
          path: [
            [aircraftData.lat, aircraftData.lng],
            [airportData.lat, airportData.lng]
          ],
          color: '#2196f3',
          weight: 2,
          opacity: 0.6
        };
      })
      .filter(Boolean);
  };

  if (typeof window === 'undefined') {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}>
        <Typography>Loading Boeing Fleet Map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      {/* Controls */}
      <Box sx={{ 
        position: 'absolute', 
        top: 10, 
        left: 10, 
        zIndex: 1000, 
        bgcolor: 'white', 
        p: 2, 
        borderRadius: 2, 
        boxShadow: 2,
        minWidth: 200
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Boeing Fleet Controls
        </Typography>
        
            <FormControlLabel
          control={<Switch checked={showAircraft} onChange={(e) => setShowAircraft(e.target.checked)} />}
          label="Aircraft"
          sx={{ display: 'block', mb: 0.5 }}
        />
            <FormControlLabel
          control={<Switch checked={showFacilities} onChange={(e) => setShowFacilities(e.target.checked)} />}
          label="Maintenance Facilities"
          sx={{ display: 'block', mb: 0.5 }}
        />
            <FormControlLabel
          control={<Switch checked={showAirports} onChange={(e) => setShowAirports(e.target.checked)} />}
          label="Airports"
          sx={{ display: 'block', mb: 0.5 }}
        />
            <FormControlLabel
          control={<Switch checked={showRoutes} onChange={(e) => setShowRoutes(e.target.checked)} />}
          label="Flight Routes"
          sx={{ display: 'block', mb: 1 }}
        />
            <FormControlLabel
          control={<Switch checked={showZones} onChange={(e) => setShowZones(e.target.checked)} />}
          label="Operational Zones"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel>Aircraft Type</InputLabel>
          <Select
            value={selectedAircraftType}
            onChange={(e) => setSelectedAircraftType(e.target.value)}
            label="Aircraft Type"
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="787-10">787-10</MenuItem>
            <MenuItem value="787-9">787-9</MenuItem>
            <MenuItem value="787-8">787-8</MenuItem>
            <MenuItem value="777X">777X</MenuItem>
            <MenuItem value="777-300ER">777-300ER</MenuItem>
            <MenuItem value="737 MAX">737 MAX</MenuItem>
            <MenuItem value="737-800">737-800</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="grounded">Grounded</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
          </Select>
        </FormControl>
        </Box>
        
      {/* Legend */}
        <Box sx={{ 
          position: 'absolute', 
        bottom: 10, 
        right: 10, 
          zIndex: 1000,
        bgcolor: 'white', 
        p: 2, 
        borderRadius: 2, 
        boxShadow: 2,
        minWidth: 180
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Legend
          </Typography>
          
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#4caf50', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Active (90%+ Health)</Typography>
                </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#ff9800', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Maintenance (80-89% Health)</Typography>
              </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#f44336', borderRadius: '50%', mr: 1 }} />
                          <Typography variant="caption">Grounded (&lt;80% Health)</Typography>
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: '#4caf50', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Major Facility</Typography>
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: '#2196f3', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Regional Facility</Typography>
        </Box>
          </Box>
          
      {/* Map */}
          <MapContainer
        key={`boeing-fleet-map-${mapKey}`}
        center={[30, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        ref={setMap}
          >
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Operational Zones */}
        {showZones && manufacturingZones.map((zone) => (
                  <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
                    pathOptions={{
              color: getZoneColor(zone.operationalEfficiency),
              fillColor: getZoneColor(zone.operationalEfficiency),
              fillOpacity: getZoneOpacity(zone.operationalEfficiency),
              weight: 1
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <h6 style={{ fontWeight: 'bold', marginBottom: 8, margin: 0 }}>
                  {zone.name}
                </h6>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Aircraft:</strong> {zone.aircraftCount}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Avg Health:</strong> {zone.avgHealth}%
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Efficiency:</strong> {zone.operationalEfficiency}%
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Facilities:</strong> {zone.maintenanceFacilities}
                </p>
                <span style={{ 
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                          borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid #2196f3'
                }}>
                  {zone.maintenanceOpportunity.replace('_', ' ')}
                </span>
                      </div>
                    </Popup>
                  </Circle>
        ))}

        {/* Flight Routes */}
        {showRoutes && getFlightRoutePaths().map((route) => (
              <Polyline
            key={route.id}
            positions={route.path}
            pathOptions={{
              color: route.color,
              weight: route.weight,
              opacity: route.opacity
            }}
              />
            ))}

        {/* Aircraft Markers */}
        {showAircraft && filteredAircraft.map((aircraft) => (
                <Marker
            key={aircraft.id}
            position={[aircraft.lat, aircraft.lng]}
            icon={L.divIcon({
              html: getAircraftIcon(aircraft),
              className: 'custom-aircraft-icon',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div style={{ minWidth: 250 }}>
                <h6 style={{ fontWeight: 'bold', marginBottom: 8, margin: 0 }}>
                  {aircraft.registration}
                </h6>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Type:</strong> {aircraft.type}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Status:</strong> {aircraft.status}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Health:</strong> {aircraft.health}%
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Location:</strong> {aircraft.location}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Flight Hours:</strong> {aircraft.flightHours}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: aircraft.status === 'active' ? '#e8f5e8' : aircraft.status === 'maintenance' ? '#fff3e0' : '#ffebee',
                    color: aircraft.status === 'active' ? '#2e7d32' : aircraft.status === 'maintenance' ? '#f57c00' : '#c62828',
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: `1px solid ${aircraft.status === 'active' ? '#4caf50' : aircraft.status === 'maintenance' ? '#ff9800' : '#f44336'}`
                  }}>
                    {aircraft.status}
                  </span>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    color: '#666',
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: '1px solid #ddd'
                  }}>
                    {aircraft.health}% Health
                  </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* Maintenance Facility Markers */}
        {showFacilities && filteredFacilities.map((facility) => (
              <Marker
            key={facility.id}
            position={[facility.lat, facility.lng]}
            icon={L.divIcon({
              html: getFacilityIcon(facility),
              className: 'custom-facility-icon',
              iconSize: [getFacilitySize(facility.type), getFacilitySize(facility.type)],
              iconAnchor: [getFacilitySize(facility.type) / 2, getFacilitySize(facility.type) / 2]
            })}
              >
                <Popup>
              <div style={{ minWidth: 200 }}>
                <h6 style={{ fontWeight: 'bold', marginBottom: 8, margin: 0 }}>
                  {facility.name}
                </h6>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Type:</strong> {facility.type}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Capacity:</strong> {facility.capacity} aircraft
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Utilization:</strong> {facility.utilization}%
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Status:</strong> {facility.status}
                </p>
                      <span style={{ 
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: facility.status === 'operational' ? '#e8f5e8' : facility.status === 'high_demand' ? '#fff3e0' : '#ffebee',
                  color: facility.status === 'operational' ? '#2e7d32' : facility.status === 'high_demand' ? '#f57c00' : '#c62828',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: `1px solid ${facility.status === 'operational' ? '#4caf50' : facility.status === 'high_demand' ? '#ff9800' : '#f44336'}`
                }}>
                  {facility.status.replace('_', ' ')}
                      </span>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* Airport Markers */}
        {showAirports && airports.map((airport) => (
              <Marker
            key={airport.id}
            position={[airport.lat, airport.lng]}
            icon={L.divIcon({
              html: '🛫',
              className: 'custom-airport-icon',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
              >
                <Popup>
              <div style={{ minWidth: 200 }}>
                <h6 style={{ fontWeight: 'bold', marginBottom: 8, margin: 0 }}>
                  {airport.name}
                </h6>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Traffic:</strong> {airport.traffic}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Type:</strong> {airport.type}
                </p>
                <span style={{ 
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: airport.traffic === 'high' ? '#e8f5e8' : '#e3f2fd',
                  color: airport.traffic === 'high' ? '#2e7d32' : '#1976d2',
                  borderRadius: '4px',
                        fontSize: '12px', 
                  border: `1px solid ${airport.traffic === 'high' ? '#4caf50' : '#2196f3'}`
                }}>
                  {airport.traffic}
                </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

      <style jsx global>{`
        .custom-aircraft-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-facility-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-airport-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </Box>
  );
} 