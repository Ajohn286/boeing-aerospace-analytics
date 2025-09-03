'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Flight, 
  Build, 
  Engineering, 
  Speed,
  Warning,
  CheckCircle,
  Assessment,
  Psychology
} from '@mui/icons-material';
import dynamic from 'next/dynamic';

// Dynamic imports for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });

// Aircraft fleet data
const maintenanceFacilities = [
      { id: 'MF001', name: 'Boeing Maintenance - Everett', lat: 47.9298, lng: -122.2817, capacity: 25, status: 'operational' },
    { id: 'MF002', name: 'Boeing Maintenance - Renton', lat: 47.4907, lng: -122.2146, capacity: 18, status: 'operational' },
    { id: 'MF003', name: 'Boeing Maintenance - North Charleston', lat: 32.8998, lng: -80.0414, capacity: 12, status: 'maintenance' },
    { id: 'MF004', name: 'Boeing Maintenance - Seattle Service Center', lat: 30.6954, lng: -88.0399, capacity: 8, status: 'operational' },
    { id: 'MF005', name: 'Boeing Global Services - Seattle', lat: 47.6062, lng: -122.3321, capacity: 15, status: 'operational' },
    { id: 'MF006', name: 'Boeing Global Services - Miami', lat: 25.7617, lng: -80.1918, capacity: 10, status: 'operational' }
];

const regionalCenters = [
  { id: 'RC001', name: 'European Regional Center - Paris', lat: 48.8566, lng: 2.3522, capacity: 30, utilization: 78, status: 'operational' },
  { id: 'RC002', name: 'Asia-Pacific Regional Center - Singapore', lat: 1.3521, lng: 103.8198, capacity: 25, utilization: 82, status: 'operational' },
  { id: 'RC003', name: 'North American Regional Center - Atlanta', lat: 33.7490, lng: -84.3880, capacity: 28, utilization: 65, status: 'operational' },
  { id: 'RC004', name: 'Middle East Regional Center - Dubai', lat: 25.2048, lng: 55.2708, capacity: 22, utilization: 71, status: 'operational' },
  { id: 'RC005', name: 'African Regional Center - Johannesburg', lat: -26.2041, lng: 28.0473, capacity: 15, utilization: 89, status: 'high_demand' },
  { id: 'RC006', name: 'South American Regional Center - São Paulo', lat: -23.5505, lng: -46.6333, capacity: 20, utilization: 75, status: 'operational' },
  { id: 'RC007', name: 'Indian Regional Center - Mumbai', lat: 19.0760, lng: 72.8777, capacity: 18, utilization: 93, status: 'critical' },
  { id: 'RC008', name: 'Australian Regional Center - Sydney', lat: -33.8688, lng: 151.2093, capacity: 12, utilization: 87, status: 'high_demand' }
];

const aircraftFleets = [
  { id: 'AF001', name: 'Lufthansa 787 Fleet', lat: 50.1109, lng: 8.6821, type: '787', demand: 'high' },
  { id: 'AF002', name: 'Emirates 777X Fleet', lat: 25.2048, lng: 55.2708, type: '777X', demand: 'medium' },
  { id: 'AF003', name: 'Delta 737 MAX Fleet', lat: 33.7490, lng: -84.3880, type: '737 MAX', demand: 'high' },
  { id: 'AF004', name: 'British Airways 787 Fleet', lat: 51.5074, lng: -0.1278, type: '787', demand: 'medium' },
  { id: 'AF005', name: 'Air France 777 Fleet', lat: 48.8566, lng: 2.3522, type: '777', demand: 'high' },
  { id: 'AF006', name: 'Qatar Airways 787 Fleet', lat: 25.2854, lng: 51.5310, type: '787', demand: 'low' },
  { id: 'AF007', name: 'Singapore Airlines 777X Fleet', lat: 1.3521, lng: 103.8198, type: '777X', demand: 'medium' },
  { id: 'AF008', name: 'United Airlines 737 MAX Fleet', lat: 41.8781, lng: -87.6298, type: '737 MAX', demand: 'high' },
  { id: 'AF009', name: 'American Airlines 787 Fleet', lat: 32.7767, lng: -96.7970, type: '787', demand: 'high' },
  { id: 'AF010', name: 'Cathay Pacific 787 Fleet', lat: 22.3193, lng: 114.1694, type: '787', demand: 'medium' },
  
  // Additional fleets - European region
  { id: 'AF011', name: 'KLM 777 Fleet', lat: 52.3676, lng: 4.9041, type: '777', demand: 'medium' },
  { id: 'AF012', name: 'Iberia 787 Fleet', lat: 40.4168, lng: -3.7038, type: '787', demand: 'high' },
  { id: 'AF013', name: 'Swiss 737 MAX Fleet', lat: 47.3769, lng: 8.5417, type: '737 MAX', demand: 'medium' },
  { id: 'AF014', name: 'Austrian Airlines 737 MAX Fleet', lat: 48.2082, lng: 16.3738, type: '737 MAX', demand: 'medium' },
  { id: 'AF015', name: 'SAS 787 Fleet', lat: 59.3293, lng: 18.0686, type: '787', demand: 'low' },
  
  // Asia-Pacific region
  { id: 'AF016', name: 'ANA 777X Fleet', lat: 35.6762, lng: 139.6503, type: '777X', demand: 'medium' },
  { id: 'AF017', name: 'JAL 787 Fleet', lat: 35.6762, lng: 139.6503, type: '787', demand: 'low' },
  { id: 'AF018', name: 'Korean Air 777X Fleet', lat: 37.5665, lng: 126.9780, type: '777X', demand: 'medium' },
  { id: 'AF019', name: 'China Southern 787 Fleet', lat: 23.1291, lng: 113.2644, type: '787', demand: 'high' },
  { id: 'AF020', name: 'Air India 787 Fleet', lat: 28.6139, lng: 77.2090, type: '787', demand: 'low' },
  
  // North American region
  { id: 'AF021', name: 'Air Canada 777 Fleet', lat: 43.6532, lng: -79.3832, type: '777', demand: 'high' },
  { id: 'AF022', name: 'WestJet 737 MAX Fleet', lat: 51.0447, lng: -114.0719, type: '737 MAX', demand: 'medium' },
  { id: 'AF023', name: 'JetBlue 737 MAX Fleet', lat: 40.7128, lng: -74.0060, type: '737 MAX', demand: 'high' },
  { id: 'AF024', name: 'Southwest 737 MAX Fleet', lat: 32.7767, lng: -96.7970, type: '737 MAX', demand: 'medium' },
  { id: 'AF025', name: 'Alaska Airlines 737 MAX Fleet', lat: 47.6062, lng: -122.3321, type: '737 MAX', demand: 'medium' },
  
  // Middle East region
  { id: 'AF026', name: 'Etihad 787 Fleet', lat: 24.4539, lng: 54.3773, type: '787', demand: 'high' },
  { id: 'AF027', name: 'Turkish Airlines 787 Fleet', lat: 41.0082, lng: 28.9784, type: '787', demand: 'medium' },
  { id: 'AF028', name: 'EgyptAir 777 Fleet', lat: 30.0444, lng: 31.2357, type: '777', demand: 'high' },
  { id: 'AF029', name: 'Royal Jordanian 737 MAX Fleet', lat: 31.9539, lng: 35.9106, type: '737 MAX', demand: 'medium' },
  { id: 'AF030', name: 'Oman Air 777 Fleet', lat: 23.5880, lng: 58.3829, type: '777', demand: 'low' },
  
  // African region
  { id: 'AF031', name: 'Ethiopian Airlines 787 Fleet', lat: 9.0320, lng: 38.7488, type: '787', demand: 'high' },
  { id: 'AF032', name: 'Kenya Airways 777 Fleet', lat: -1.2921, lng: 36.8219, type: '777', demand: 'medium' },
  { id: 'AF033', name: 'South African Airways 787 Fleet', lat: -26.2041, lng: 28.0473, type: '787', demand: 'medium' },
  { id: 'AF034', name: 'Royal Air Maroc 777 Fleet', lat: 33.9716, lng: -6.8498, type: '777', demand: 'low' },
  { id: 'AF035', name: 'Air Algerie 777 Fleet', lat: 36.7538, lng: 3.0588, type: '777', demand: 'medium' },
  
  // South American region
  { id: 'AF036', name: 'LATAM 787 Fleet', lat: -33.4489, lng: -70.6693, type: '787', demand: 'high' },
  { id: 'AF037', name: 'Avianca 737 MAX Fleet', lat: 4.7110, lng: -74.0721, type: '737 MAX', demand: 'medium' },
  { id: 'AF038', name: 'Copa Airlines 737 MAX Fleet', lat: 8.5380, lng: -80.7821, type: '737 MAX', demand: 'medium' },
  { id: 'AF039', name: 'Aeromexico 787 Fleet', lat: 19.4326, lng: -99.1332, type: '787', demand: 'high' },
  { id: 'AF040', name: 'TAM 777 Fleet', lat: -23.5505, lng: -46.6333, type: '777', demand: 'medium' }
];

// Maintenance routes
const maintenanceRoutes = [
  { from: 'MF001', to: 'RC001', volume: 15, status: 'active' },
  { from: 'MF001', to: 'RC002', volume: 10, status: 'active' },
  { from: 'MF002', to: 'RC001', volume: 12, status: 'active' },
  { from: 'MF002', to: 'RC005', volume: 6, status: 'active' },
  { from: 'MF003', to: 'RC002', volume: 8, status: 'delayed' },
  { from: 'MF003', to: 'RC006', volume: 4, status: 'delayed' },
  { from: 'MF004', to: 'RC003', volume: 14, status: 'active' },
  { from: 'MF004', to: 'RC007', volume: 8, status: 'active' },
  { from: 'MF005', to: 'RC005', volume: 13, status: 'active' },
  { from: 'MF005', to: 'RC008', volume: 6, status: 'active' },
  { from: 'MF006', to: 'RC004', volume: 15, status: 'active' },
  { from: 'MF006', to: 'RC003', volume: 6, status: 'active' }
];

const fleetRoutes = [
  { from: 'RC001', to: 'AF001', volume: 25, frequency: 'daily' },
  { from: 'RC001', to: 'AF008', volume: 18, frequency: 'daily' },
  { from: 'RC002', to: 'AF002', volume: 20, frequency: 'daily' },
  { from: 'RC002', to: 'AF009', volume: 35, frequency: 'daily' },
  { from: 'RC003', to: 'AF003', volume: 15, frequency: 'twice_weekly' },
  { from: 'RC004', to: 'AF004', volume: 12, frequency: 'daily' },
  { from: 'RC005', to: 'AF005', volume: 28, frequency: 'daily' },
  { from: 'RC006', to: 'AF006', volume: 8, frequency: 'weekly' },
  { from: 'RC007', to: 'AF007', volume: 22, frequency: 'daily' },
  { from: 'RC008', to: 'AF010', volume: 16, frequency: 'daily' },
  
  // European region distribution
  { from: 'RC001', to: 'AF011', volume: 18, frequency: 'daily' },
  { from: 'RC001', to: 'AF012', volume: 22, frequency: 'daily' },
  { from: 'RC001', to: 'AF013', volume: 9, frequency: 'twice_weekly' },
  { from: 'RC001', to: 'AF014', volume: 15, frequency: 'daily' },
  { from: 'RC001', to: 'AF015', volume: 17, frequency: 'daily' },
  
  // Asia-Pacific region distribution
  { from: 'RC002', to: 'AF016', volume: 16, frequency: 'daily' },
  { from: 'RC002', to: 'AF017', volume: 11, frequency: 'twice_weekly' },
  { from: 'RC002', to: 'AF018', volume: 14, frequency: 'daily' },
  { from: 'RC002', to: 'AF019', volume: 13, frequency: 'daily' },
  { from: 'RC002', to: 'AF020', volume: 8, frequency: 'weekly' },
  
  // North American region distribution
  { from: 'RC003', to: 'AF021', volume: 20, frequency: 'daily' },
  { from: 'RC003', to: 'AF022', volume: 15, frequency: 'daily' },
  { from: 'RC003', to: 'AF023', volume: 19, frequency: 'daily' },
  { from: 'RC003', to: 'AF024', volume: 10, frequency: 'twice_weekly' },
  { from: 'RC003', to: 'AF025', volume: 14, frequency: 'daily' },
  
  // Middle East region distribution
  { from: 'RC004', to: 'AF026', volume: 21, frequency: 'daily' },
  { from: 'RC004', to: 'AF027', volume: 13, frequency: 'daily' },
  { from: 'RC004', to: 'AF028', volume: 18, frequency: 'daily' },
  { from: 'RC004', to: 'AF029', volume: 25, frequency: 'daily' },
  { from: 'RC004', to: 'AF030', volume: 12, frequency: 'twice_weekly' },
  
  // African region distribution
  { from: 'RC005', to: 'AF031', volume: 24, frequency: 'daily' },
  { from: 'RC005', to: 'AF032', volume: 17, frequency: 'daily' },
  { from: 'RC005', to: 'AF033', volume: 22, frequency: 'daily' },
  { from: 'RC005', to: 'AF034', volume: 16, frequency: 'daily' },
  { from: 'RC005', to: 'AF035', volume: 14, frequency: 'daily' },
  
  // South American region distribution
  { from: 'RC006', to: 'AF036', volume: 20, frequency: 'daily' },
  { from: 'RC006', to: 'AF037', volume: 13, frequency: 'twice_weekly' },
  { from: 'RC006', to: 'AF038', volume: 11, frequency: 'daily' },
  { from: 'RC006', to: 'AF039', volume: 18, frequency: 'daily' },
  { from: 'RC006', to: 'AF040', volume: 15, frequency: 'daily' }
];

export default function FleetNetworkMap() {
  const [selectedView, setSelectedView] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedFleet, setSelectedFleet] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);
  const [animatedMarkers, setAnimatedMarkers] = useState([]);
  const [supplyAnimatedMarkers, setSupplyAnimatedMarkers] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Import Leaflet on client side only
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
      
      // Fix Leaflet icon issue
      delete leaflet.default.Icon.Default.prototype._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Initialize animated markers for supply routes (factories to warehouses)
  useEffect(() => {
    if (!isClient || !L) return;

    const markers = [];
    maintenanceRoutes.forEach((route, index) => {
      const facility = maintenanceFacilities.find(f => f.id === route.from);
      const center = regionalCenters.find(c => c.id === route.to);
      
      if (facility && center) {
        // Create multiple markers per route for continuous flow effect
        const markersPerRoute = route.status === 'active' ? 3 : 2;
        
        for (let i = 0; i < markersPerRoute; i++) {
          markers.push({
            id: `supply-${route.from}-${route.to}-${i}`,
            start: [facility.lat, facility.lng],
            end: [center.lat, center.lng],
            progress: (i / markersPerRoute) * 100, // Stagger initial positions
            speed: route.status === 'active' ? 0.8 : 0.4,
            color: route.status === 'active' ? '#059669' : '#f59e0b',
            size: 10
          });
        }
      }
    });
    
    setSupplyAnimatedMarkers(markers);

    // Animation loop for supply routes
    const animationInterval = setInterval(() => {
      setSupplyAnimatedMarkers(prevMarkers => 
        prevMarkers.map(marker => {
          const newProgress = marker.progress + marker.speed;
          // Loop smoothly back to start
          return {
            ...marker,
            progress: newProgress >= 100 ? newProgress - 100 : newProgress
          };
        })
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(animationInterval);
  }, [isClient, L]);

  // Initialize animated markers for distribution routes
  useEffect(() => {
    if (!isClient || !L) return;

    const markers = [];
    fleetRoutes.forEach((route, index) => {
      const center = regionalCenters.find(c => c.id === route.from);
      const fleet = aircraftFleets.find(f => f.id === route.to);
      
      if (center && fleet) {
        // Create multiple markers per route for continuous flow effect
        const markersPerRoute = route.frequency === 'daily' ? 4 : route.frequency === 'twice_weekly' ? 3 : 2;
        
        for (let i = 0; i < markersPerRoute; i++) {
          markers.push({
            id: `${route.from}-${route.to}-${i}`,
            start: [center.lat, center.lng],
            end: [fleet.lat, fleet.lng],
            progress: (i / markersPerRoute) * 100, // Stagger initial positions
            speed: route.frequency === 'daily' ? 1.0 : route.frequency === 'twice_weekly' ? 0.6 : 0.3,
            color: route.frequency === 'daily' ? '#3b82f6' : route.frequency === 'twice_weekly' ? '#06b6d4' : '#0ea5e9',
            frequency: route.frequency
          });
        }
      }
    });
    
    setAnimatedMarkers(markers);

    // Animation loop
    const animationInterval = setInterval(() => {
      setAnimatedMarkers(prevMarkers => 
        prevMarkers.map(marker => {
          const newProgress = marker.progress + marker.speed;
          // Loop smoothly back to start
          return {
            ...marker,
            progress: newProgress >= 100 ? newProgress - 100 : newProgress
          };
        })
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(animationInterval);
  }, [isClient, L]);

  // Calculate position along route based on progress
  const getPositionAlongRoute = (start, end, progress) => {
    const lat = start[0] + (end[0] - start[0]) * (progress / 100);
    const lng = start[1] + (end[1] - start[1]) * (progress / 100);
    return [lat, lng];
  };

  // Calculate angle between two points for arrow rotation
  const calculateAngle = (start, end) => {
    const [lat1, lng1] = start;
    const [lat2, lng2] = end;
    const dLng = lng2 - lng1;
    const dLat = lat2 - lat1;
    const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
    return angle;
  };

  // Create arrow marker for animated deliveries
  const createArrowMarker = (position, angle, color, size = 20) => {
    if (!L) return null;
    
    const iconHtml = `
      <div style="
        position: relative; 
        width: ${size}px; 
        height: ${size}px;
        transform: rotate(${angle}deg);
        transition: transform 0.1s ease-out;
      ">
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
            <!-- Truck body -->
            <rect x="6" y="10" width="12" height="8" fill="${color}" stroke="white" stroke-width="1"/>
            <!-- Truck cab -->
            <path d="M18 10L18 6L14 4L6 4L6 10" fill="${color}" stroke="white" stroke-width="1"/>
            <!-- Direction arrow on top -->
            <path d="M12 2L9 6L11 6L11 8L13 8L13 6L15 6L12 2Z" fill="white"/>
            <!-- Windows -->
            <rect x="7" y="5" width="3" height="2" fill="white" opacity="0.7"/>
            <rect x="14" y="7" width="3" height="2" fill="white" opacity="0.7"/>
          </g>
        </svg>
      </div>
    `;
    
    return L.divIcon({
      html: iconHtml,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      className: 'arrow-marker'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'success';
      case 'maintenance': return 'warning';
      case 'critical': return 'error';
      case 'high_demand': return 'warning';
      default: return 'default';
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // Create custom icons for different location types
  const createFacilityIcon = (facility) => {
    if (!L) return null;
    const iconHtml = `
      <div style="position: relative; width: 40px; height: 40px;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="${facility.status === 'operational' ? '#059669' : '#f59e0b'}" stroke="white" stroke-width="3"/>
          <path d="M12 20L12 14L16 12L20 14L24 12L28 14L28 20L28 26L12 26L12 20Z" fill="white"/>
          <rect x="15" y="18" width="3" height="3" fill="#059669"/>
          <rect x="22" y="18" width="3" height="3" fill="#059669"/>
        </svg>
      </div>
    `;
    return L.divIcon({
      html: iconHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
      className: 'custom-div-icon'
    });
  };

  const createCenterIcon = (center) => {
    if (!L) return null;
    const getColor = () => {
      if (center.status === 'critical') return '#dc2626';
      if (center.status === 'high_demand') return '#f59e0b';
      return '#3b82f6';
    };
    
    const iconHtml = `
      <div style="position: relative; width: 36px; height: 36px;">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="30" height="30" rx="4" fill="${getColor()}" stroke="white" stroke-width="3"/>
          <rect x="8" y="8" width="20" height="20" fill="white" rx="2"/>
          <rect x="11" y="11" width="5" height="5" fill="${getColor()}"/>
          <rect x="20" y="11" width="5" height="5" fill="${getColor()}"/>
          <rect x="11" y="20" width="5" height="5" fill="${getColor()}"/>
          <rect x="20" y="20" width="5" height="5" fill="${getColor()}"/>
        </svg>
      </div>
    `;
    return L.divIcon({
      html: iconHtml,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
      className: 'custom-div-icon'
    });
  };

  const createFleetIcon = (fleet) => {
    if (!L) return null;
    const getColor = () => {
      if (fleet.demand === 'high') return '#dc2626';
      if (fleet.demand === 'medium') return '#f59e0b';
      return '#10b981';
    };
    
    const iconHtml = `
      <div style="position: relative; width: 32px; height: 32px;">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="${getColor()}" stroke="white" stroke-width="3"/>
          <path d="M10 18V12L16 10L22 12V18H10Z" fill="white"/>
          <rect x="13" y="18" width="6" height="6" fill="white"/>
          <rect x="15" y="20" width="2" height="4" fill="${getColor()}"/>
        </svg>
      </div>
    `;
    return L.divIcon({
      html: iconHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
      className: 'custom-div-icon'
    });
  };

  // Get route paths
  const getSupplyRoutePaths = () => {
    return maintenanceRoutes.map(route => {
      const facility = maintenanceFacilities.find(f => f.id === route.from);
      const center = regionalCenters.find(c => c.id === route.to);
      if (facility && center) {
        return {
          positions: [[facility.lat, facility.lng], [center.lat, center.lng]],
          color: route.status === 'active' ? '#059669' : '#f59e0b',
          weight: 3,
          opacity: 0.8,
          dashArray: route.status === 'active' ? null : '10, 10',
          volume: route.volume,
          status: route.status
        };
      }
      return null;
    }).filter(Boolean);
  };

  const getDistributionRoutePaths = () => {
    return fleetRoutes.map(route => {
      const center = regionalCenters.find(c => c.id === route.from);
      const fleet = aircraftFleets.find(f => f.id === route.to);
      if (center && fleet) {
        return {
          positions: [[center.lat, center.lng], [fleet.lat, fleet.lng]],
          color: '#3b82f6',
          weight: 2,
          opacity: 0.6,
          dashArray: route.frequency === 'daily' ? null : '5, 5',
          volume: route.volume,
          frequency: route.frequency
        };
      }
      return null;
    }).filter(Boolean);
  };

  if (!isClient || !L) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .arrow-marker {
          background: transparent !important;
          border: none !important;
          z-index: 1000 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-popup-content {
          margin: 0;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
        }
        .leaflet-pane path.leaflet-interactive[fill="#3b82f6"],
        .leaflet-pane path.leaflet-interactive[fill="#06b6d4"],
        .leaflet-pane path.leaflet-interactive[fill="#0ea5e9"],
        .leaflet-pane path.leaflet-interactive[fill="#059669"],
        .leaflet-pane path.leaflet-interactive[fill="#f59e0b"] {
          animation: pulse 2s infinite;
        }
      `}} />
      <Box sx={{ p: 3, backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4" gutterBottom>
          Soda Inc Network View
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Real-time visualization of production facilities, distribution centers, and retail locations
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>View</InputLabel>
              <Select
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                label="View"
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="factories">Factories Only</MenuItem>
                <MenuItem value="warehouses">Warehouses Only</MenuItem>
                <MenuItem value="retailers">Retailers Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<Build />}
                label={`${maintenanceFacilities.length} Maintenance Facilities`}
                color="success"
                size="small"
              />
              <Chip
                icon={<Flight />}
                label={`${regionalCenters.length} Regional Centers`}
                color="primary"
                size="small"
              />
              <Chip
                icon={<Assessment />}
                label={`${aircraftFleets.length} Aircraft Fleets`}
                color="error"
                size="small"
              />
              <Chip
                icon={<Psychology />}
                label={`${maintenanceRoutes.length + fleetRoutes.length} Active Routes`}
                color="default"
                size="small"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={showAnimation}
                  onChange={(e) => setShowAnimation(e.target.checked)}
                  size="small"
                />
              }
              label="Animate Deliveries"
              sx={{ mt: 0.5 }}
            />
          </Grid>
        </Grid>
        
        {showAnimation && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Live tracking: {maintenanceRoutes.filter(r => r.status === 'active').length + fleetRoutes.length} active delivery routes
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Map Container */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossOrigin=""
          />
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Supply Routes */}
            {getSupplyRoutePaths().map((route, index) => (
              <Polyline
                key={`supply-${index}`}
                positions={route.positions}
                color={route.color}
                weight={route.weight}
                opacity={route.opacity}
                dashArray={route.dashArray}
              />
            ))}

            {/* Animated Supply Chain Markers (Factories to Warehouses) */}
            {showAnimation && supplyAnimatedMarkers.map((marker) => {
              const currentPosition = getPositionAlongRoute(marker.start, marker.end, marker.progress);
              const angle = calculateAngle(marker.start, marker.end);
              return (
                <Marker
                  key={marker.id}
                  position={currentPosition}
                  icon={createArrowMarker(currentPosition, angle, marker.color, marker.size * 2)}
                >
                  <Popup>
                    <div style={{ minWidth: '150px' }}>
                      <p style={{ margin: '5px 0' }}><strong>Supply Transport</strong></p>
                      <p style={{ margin: '5px 0' }}>Progress: {Math.round(marker.progress)}%</p>
                      <p style={{ margin: '5px 0' }}>Status: {marker.color === '#059669' ? 'Active' : 'Delayed'}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Distribution Routes */}
            {getDistributionRoutePaths().map((route, index) => (
              <Polyline
                key={`dist-${index}`}
                positions={route.positions}
                color={route.color}
                weight={route.weight}
                opacity={route.opacity}
                dashArray={route.dashArray}
              />
            ))}

            {/* Animated Delivery Markers */}
            {showAnimation && animatedMarkers.map((marker) => {
              const currentPosition = getPositionAlongRoute(marker.start, marker.end, marker.progress);
              const angle = calculateAngle(marker.start, marker.end);
              return (
                <Marker
                  key={marker.id}
                  position={currentPosition}
                  icon={createArrowMarker(currentPosition, angle, marker.color, 16)}
                >
                  <Popup>
                    <div style={{ minWidth: '150px' }}>
                      <p style={{ margin: '5px 0' }}><strong>Delivery in Progress</strong></p>
                      <p style={{ margin: '5px 0' }}>Progress: {Math.round(marker.progress)}%</p>
                      <p style={{ margin: '5px 0' }}>Frequency: {marker.frequency === 'daily' ? 'Daily' : marker.frequency === 'twice_weekly' ? 'Twice Weekly' : 'Weekly'}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Factory Markers */}
            {(selectedView === 'all' || selectedView === 'factories') && maintenanceFacilities.map((facility) => (
              <Marker
                key={facility.id}
                position={[facility.lat, facility.lng]}
                icon={createFacilityIcon(facility)}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{facility.name}</h3>
                    <p style={{ margin: '5px 0' }}><strong>ID:</strong> {facility.id}</p>
                    <p style={{ margin: '5px 0' }}><strong>Capacity:</strong> {facility.capacity} aircraft</p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Status:</strong> 
                      <span style={{ color: facility.status === 'operational' ? '#059669' : '#f59e0b', marginLeft: '5px' }}>
                        {facility.status}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Warehouse Markers */}
            {(selectedView === 'all' || selectedView === 'warehouses') && regionalCenters.map((center) => (
              <Marker
                key={center.id}
                position={[center.lat, center.lng]}
                icon={createCenterIcon(center)}
              >
                <Popup>
                  <div style={{ minWidth: '250px' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{center.name}</h3>
                    <p style={{ margin: '5px 0' }}><strong>ID:</strong> {center.id}</p>
                    <p style={{ margin: '5px 0' }}><strong>Capacity:</strong> {center.capacity} aircraft</p>
                    <p style={{ margin: '5px 0' }}><strong>Utilization:</strong> {center.utilization}%</p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Status:</strong>
                      <span style={{ 
                        color: center.status === 'critical' ? '#dc2626' : 
                               center.status === 'high_demand' ? '#f59e0b' : '#3b82f6',
                        marginLeft: '5px'
                      }}>
                        {center.status.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Retailer Markers */}
            {(selectedView === 'all' || selectedView === 'retailers') && aircraftFleets.map((fleet) => (
              <Marker
                key={fleet.id}
                position={[fleet.lat, fleet.lng]}
                icon={createFleetIcon(fleet)}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{fleet.name}</h3>
                    <p style={{ margin: '5px 0' }}><strong>ID:</strong> {fleet.id}</p>
                    <p style={{ margin: '5px 0' }}><strong>Type:</strong> {fleet.type}</p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Demand:</strong>
                      <span style={{ 
                        color: fleet.demand === 'high' ? '#dc2626' : 
                               fleet.demand === 'medium' ? '#f59e0b' : '#10b981',
                        marginLeft: '5px'
                      }}>
                        {fleet.demand}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>

        {/* Side Panel */}
        <Paper
          sx={{
            width: 400,
            height: '100%',
            overflow: 'auto',
            p: 2,
            borderLeft: 1,
            borderColor: 'divider'
          }}
          elevation={0}
        >
          <Typography variant="h6" gutterBottom>
            Network Status
          </Typography>

          {/* Alerts */}
          <Box sx={{ mb: 3 }}>
            <Alert severity="warning" sx={{ mb: 1 }}>
              <AlertTitle>Maintenance Alert</AlertTitle>
              Tianjin maintenance facility operating at reduced capacity
            </Alert>
            <Alert severity="error" sx={{ mb: 1 }}>
              <AlertTitle>Critical Status</AlertTitle>
              Mumbai regional center at 93% utilization - urgent attention needed
            </Alert>
          </Box>

          {/* Factories Status */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Build /> Maintenance Facilities
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenanceFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell>{facility.name.split(' - ')[1]}</TableCell>
                      <TableCell align="right">{facility.capacity}</TableCell>
                      <TableCell>
                        <Chip
                          label={facility.status}
                          size="small"
                          color={getStatusColor(facility.status)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Warehouses Status */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Flight /> Regional Centers
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">Utilization</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regionalCenters.map((center) => (
                    <TableRow key={center.id}>
                      <TableCell>{center.name.split(' - ')[1]}</TableCell>
                      <TableCell align="right">{center.utilization}%</TableCell>
                      <TableCell>
                        <Chip
                          label={center.status.replace('_', ' ')}
                          size="small"
                          color={getStatusColor(center.status)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Key Metrics */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Key Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed color="primary" />
                      <Typography variant="h6">
                        8.5M
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Monthly Production
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment color="success" />
                      <Typography variant="h6">
                        79%
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Avg. Warehouse Utilization
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 