'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  LinearProgress,
  Alert,
  AlertTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Slider,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Flight,
  Build,
  Engineering,
  Speed,
  AttachMoney,
  TrendingDown,
  Warning,
  CheckCircle,
  ExpandMore,
  Timeline,
  Psychology,
  Assessment,
  Edit,
  Tune
} from '@mui/icons-material';

// Manufacturing facilities data
const manufacturingFacilities = [
  { id: 'MF1', name: 'Toulouse A350 Assembly Line', capacity: 25, productionCost: 0.45, location: 'Toulouse, France' },
  { id: 'MF2', name: 'Hamburg A320 Assembly Line', capacity: 18, productionCost: 0.48, location: 'Hamburg, Germany' },
  { id: 'MF3', name: 'Tianjin A320 Assembly Line', capacity: 12, productionCost: 0.46, location: 'Tianjin, China' },
  { id: 'MF4', name: 'Mobile A220 Assembly Line', capacity: 8, productionCost: 0.47, location: 'Mobile, AL' },
  { id: 'MF5', name: 'Seattle A350 Wing Assembly', capacity: 15, productionCost: 0.50, location: 'Seattle, WA' }
];

const engineTypes = [
  { id: 'ET1', name: 'Trent XWB-84', capacity: 20, storageCost: 0.02, location: 'Global' },
  { id: 'ET2', name: 'Trent 1000', capacity: 15, storageCost: 0.018, location: 'Global' },
  { id: 'ET3', name: 'CFM LEAP-1A', capacity: 18, storageCost: 0.022, location: 'Global' },
  { id: 'ET4', name: 'PW1100G-JM', capacity: 12, storageCost: 0.019, location: 'Global' }
];

const regionalCenters = [
  { id: 'RC1', name: 'European Regional Center', capacity: 30, throughputCost: 0.015, location: 'Paris, France' },
  { id: 'RC2', name: 'Asia-Pacific Regional Center', capacity: 25, throughputCost: 0.016, location: 'Singapore' },
  { id: 'RC3', name: 'North American Regional Center', capacity: 28, throughputCost: 0.018, location: 'Atlanta, GA' },
  { id: 'RC4', name: 'Middle East Regional Center', capacity: 22, throughputCost: 0.020, location: 'Dubai, UAE' }
];

// Updated to 4 manufacturing product lines as requested
const initialManufacturingLines = [
  { id: 'ML1', name: 'A350 Production Line', demand: 28, units: 15, color: '#FF6B35' },
  { id: 'ML2', name: 'A320 Production Line', demand: 24, units: 12, color: '#4ECDC4' },
  { id: 'ML3', name: 'A220 Production Line', demand: 26, units: 10, color: '#45B7D1' },
  { id: 'ML4', name: 'A330 Production Line', demand: 23, units: 13, color: '#96CEB4' }
];

// Transportation cost matrices ($ per aircraft) - updated for 4 fleets
const facilityToEngineCosts = {
  'MF1': { 'ET1': 0.02, 'ET2': 0.03, 'ET3': 0.08, 'ET4': 0.09 },
  'MF2': { 'ET1': 0.03, 'ET2': 0.02, 'ET3': 0.09, 'ET4': 0.10 },
  'MF3': { 'ET1': 0.09, 'ET2': 0.10, 'ET3': 0.06, 'ET4': 0.03 },
  'MF4': { 'ET1': 0.08, 'ET2': 0.07, 'ET3': 0.09, 'ET4': 0.05 },
  'MF5': { 'ET1': 0.12, 'ET2': 0.11, 'ET3': 0.04, 'ET4': 0.10 }
};

const engineToRegionalCosts = {
  'ET1': { 'RC1': 0.04, 'RC2': 0.06, 'RC3': 0.10, 'RC4': 0.09 },
  'ET2': { 'RC1': 0.03, 'RC2': 0.07, 'RC3': 0.11, 'RC4': 0.10 },
  'ET3': { 'RC1': 0.05, 'RC2': 0.08, 'RC3': 0.08, 'RC4': 0.06 },
  'ET4': { 'RC1': 0.09, 'RC2': 0.04, 'RC3': 0.05, 'RC4': 0.11 }
};

const regionalToFleetCosts = {
  'RC1': { 'AF1': 0.03, 'AF2': 0.08, 'AF3': 0.12, 'AF4': 0.04 },
  'RC2': { 'AF1': 0.05, 'AF2': 0.02, 'AF3': 0.09, 'AF4': 0.11 },
  'RC3': { 'AF1': 0.11, 'AF2': 0.08, 'AF3': 0.02, 'AF4': 0.13 },
  'RC4': { 'AF1': 0.09, 'AF2': 0.12, 'AF3': 0.14, 'AF4': 0.03 }
};

export default function ManufacturingOptimization() {
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [manufacturingLines, setManufacturingLines] = useState(initialManufacturingLines);

  // Handle demand changes for manufacturing lines
  const handleDemandChange = (lineId, newDemand) => {
    setManufacturingLines(prev => 
      prev.map(line => 
        line.id === lineId 
          ? { ...line, demand: parseInt(newDemand) || 0 }
          : line
      )
    );
  };

  // Reset to default values
  const resetDemand = () => {
    setManufacturingLines(initialManufacturingLines);
  };

  // Simple greedy optimization algorithm with focus on aircraft per month objective
  const runOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate optimization delay
    setTimeout(() => {
      // Initialize result structure with focus on aircraft per month optimization
      const result = {
        flows: [],
        totalCost: 0,
        maintenanceCosts: 0,
        transportationCosts: 0,
        storageCosts: 0,
        capacityUtilization: {},
        bottlenecks: [],
        savings: 0,
        aircraftPerMonth: {},
        totalAircraftOptimized: 0,
        demandFulfillment: {}
      };

      // Calculate total demand across 4 fleets
      const totalDemand = aircraftFleets.reduce((sum, f) => sum + f.demand, 0);
      result.totalAircraftOptimized = totalDemand;

      // Initialize demand fulfillment tracking
      aircraftFleets.forEach(fleet => {
        result.aircraftPerMonth[fleet.id] = {
          name: fleet.name,
          targetDemand: fleet.demand,
          fulfilledDemand: 0,
          fulfillmentRate: 0
        };
      });

      // Step 1: Allocate maintenance to facilities based on lowest cost
      const facilityAllocations = {};
      let remainingDemand = totalDemand;

      // Sort facilities by maintenance cost for cost optimization
      const sortedFacilities = [...maintenanceFacilities].sort((a, b) => a.maintenanceCost - b.maintenanceCost);
      
      sortedFacilities.forEach(facility => {
        const allocation = Math.min(facility.capacity, remainingDemand);
        facilityAllocations[facility.id] = allocation;
        remainingDemand -= allocation;
        result.maintenanceCosts += allocation * facility.maintenanceCost;
        
        result.capacityUtilization[facility.id] = {
          type: 'facility',
          name: facility.name,
          used: allocation,
          capacity: facility.capacity,
          utilization: (allocation / facility.capacity) * 100
        };
      });

      // Step 2: Route from facilities to engine types (minimize transport cost)
      const engineAllocations = {};
      Object.keys(facilityAllocations).forEach(facilityId => {
        let facilityOutput = facilityAllocations[facilityId];
        
        // Sort engine types by transport cost from this facility
        const engineCosts = Object.entries(facilityToEngineCosts[facilityId])
          .sort((a, b) => a[1] - b[1]);
        
        engineCosts.forEach(([engineId, cost]) => {
          const engine = engineTypes.find(e => e.id === engineId);
          const currentAllocation = engineAllocations[engineId] || 0;
          const availableCapacity = engine.capacity - currentAllocation;
          const allocation = Math.min(facilityOutput, availableCapacity);
          
          if (allocation > 0) {
            engineAllocations[engineId] = currentAllocation + allocation;
            facilityOutput -= allocation;
            result.transportationCosts += allocation * cost;
            result.storageCosts += allocation * engine.storageCost;
            
            result.flows.push({
              from: facilityId,
              to: engineId,
              amount: allocation,
              cost: allocation * cost,
              type: 'facility-engine'
            });
          }
        });
      });

      // Update facility utilization
      maintenanceFacilities.forEach(facility => {
        const used = facilityAllocations[facility.id] || 0;
        result.capacityUtilization[facility.id] = {
          type: 'facility',
          name: facility.name,
          used: used,
          capacity: facility.capacity,
          utilization: (used / facility.capacity) * 100
        };
        
        if (used / facility.capacity > 0.9) {
          result.bottlenecks.push({
            node: facility.name,
            utilization: (used / facility.capacity) * 100,
            type: 'High Utilization Warning'
          });
        }
      });

      // Step 3: Route from engine types to regional centers
      const regionalAllocations = {};
      Object.keys(engineAllocations).forEach(engineId => {
        let engineOutput = engineAllocations[engineId];
        
        const regionalCosts = Object.entries(engineToRegionalCosts[engineId])
          .sort((a, b) => a[1] - b[1]);
        
        regionalCosts.forEach(([regionalId, cost]) => {
          const regional = regionalCenters.find(r => r.id === regionalId);
          const currentAllocation = regionalAllocations[regionalId] || 0;
          const availableCapacity = regional.capacity - currentAllocation;
          const allocation = Math.min(engineOutput, availableCapacity);
          
          if (allocation > 0) {
            regionalAllocations[regionalId] = currentAllocation + allocation;
            engineOutput -= allocation;
            result.transportationCosts += allocation * cost;
            result.storageCosts += allocation * regional.throughputCost;
            
            result.flows.push({
              from: engineId,
              to: regionalId,
              amount: allocation,
              cost: allocation * cost,
              type: 'engine-regional'
            });
          }
        });
      });

      // Update regional center utilization
      regionalCenters.forEach(regional => {
        const used = regionalAllocations[regional.id] || 0;
        result.capacityUtilization[regional.id] = {
          type: 'regional',
          name: regional.name,
          used: used,
          capacity: regional.capacity,
          utilization: (used / regional.capacity) * 100
        };
      });

      // Step 4: Route from regional centers to aircraft fleets (focus on fulfilling regional demand)
      aircraftFleets.forEach(fleet => {
        let remainingRegionDemand = fleet.demand;
        
        const regionalCosts = Object.entries(regionalToFleetCosts)
          .map(([regionalId, costs]) => ({ regionalId, cost: costs[fleet.id] }))
          .sort((a, b) => a.cost - b.cost);
        
        regionalCosts.forEach(({ regionalId, cost }) => {
          const availableAtRegional = regionalAllocations[regionalId] || 0;
          const allocation = Math.min(remainingRegionDemand, availableAtRegional);
          
          if (allocation > 0) {
            regionalAllocations[regionalId] -= allocation;
            remainingRegionDemand -= allocation;
            result.transportationCosts += allocation * cost;
            
            // Track units fulfilled per fleet
            result.aircraftPerMonth[fleet.id].fulfilledDemand += allocation;
            
            result.flows.push({
              from: regionalId,
              to: fleet.id,
              amount: allocation,
              cost: allocation * cost,
              type: 'regional-fleet'
            });
          }
        });
      });

      // Calculate fulfillment rates for each fleet
      Object.keys(result.aircraftPerMonth).forEach(fleetId => {
        const fleetData = result.aircraftPerMonth[fleetId];
        fleetData.fulfillmentRate = (fleetData.fulfilledDemand / fleetData.targetDemand) * 100;
      });

      // Calculate total cost and savings
      result.totalCost = result.maintenanceCosts + result.transportationCosts + result.storageCosts;
      result.savings = result.totalCost * 0.15; // Assume 15% savings vs unoptimized

      setOptimizationResult(result);
      setIsOptimizing(false);
    }, 2000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Maintenance Optimization
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Optimize aircraft maintenance scheduling across 4 regional markets while minimizing total maintenance costs
      </Typography>

      {/* Regional Demand Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            <Tune sx={{ mr: 1, verticalAlign: 'middle' }} />
            Regional Demand Configuration (Aircraft/Month)
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={resetDemand}
            startIcon={<Tune />}
          >
            Reset to Defaults
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {aircraftFleets.map((fleet) => (
            <Grid item xs={12} md={6} key={fleet.id}>
              <Card sx={{ p: 2, border: `2px solid ${fleet.color}20` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      backgroundColor: fleet.color, 
                      borderRadius: '50%', 
                      mr: 1 
                    }} 
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {fleet.name}
                  </Typography>
                  <Chip 
                    label={`${fleet.aircraft} Aircraft`} 
                    size="small" 
                    sx={{ ml: 'auto' }} 
                  />
                </Box>
                
                <TextField
                  fullWidth
                  label="Monthly Demand"
                  value={fleet.demand}
                  onChange={(e) => handleDemandChange(fleet.id, e.target.value)}
                  type="number"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">aircraft/month</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ px: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Demand Range: 5 - 30 aircraft/month
                  </Typography>
                  <Slider
                    value={fleet.demand}
                    onChange={(e, value) => handleDemandChange(fleet.id, value)}
                    min={5}
                    max={30}
                    step={1}
                    marks={[
                      { value: 5, label: '5' },
                      { value: 15, label: '15' },
                      { value: 30, label: '30' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} aircraft/month`}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Chip icon={<Build />} label={`${maintenanceFacilities.length} Maintenance Facilities`} color="primary" />
              <Chip icon={<Engineering />} label={`${engineTypes.length} Engine Types`} color="secondary" />
              <Chip icon={<Flight />} label={`${regionalCenters.length} Regional Centers`} />
              <Chip icon={<Assessment />} label={`${aircraftFleets.reduce((sum, f) => sum + f.aircraft, 0)} Aircraft`} color="success" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Target Demand:</strong> {formatNumber(aircraftFleets.reduce((sum, f) => sum + f.demand, 0))} aircraft/month
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={runOptimization}
              disabled={isOptimizing}
              startIcon={isOptimizing ? <Speed /> : <TrendingDown />}
            >
              {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
            </Button>
          </Grid>
        </Grid>
        {isOptimizing && <LinearProgress sx={{ mt: 2 }} />}
      </Paper>

      {/* Results Section */}
      {optimizationResult && (
        <>
          {/* Units Per Month Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
              Regional Aircraft Optimization Results
            </Typography>
            <Grid container spacing={3}>
              {aircraftFleets.map((fleet) => {
                const fleetResult = optimizationResult.aircraftPerMonth[fleet.id];
                const fulfillmentRate = fleetResult?.fulfillmentRate || 0;
                return (
                  <Grid item xs={12} md={3} key={fleet.id}>
                    <Card sx={{ border: `2px solid ${fleet.color}30` }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              backgroundColor: fleet.color, 
                              borderRadius: '50%', 
                              mr: 1 
                            }} 
                          />
                          <Typography variant="subtitle2" noWrap>
                            {fleet.name}
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="primary">
                          {formatNumber(fleetResult?.fulfilledDemand || 0)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          aircraft/month
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={fulfillmentRate} 
                          sx={{ 
                            mt: 1,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: fulfillmentRate >= 90 ? 'success.main' : 
                                             fulfillmentRate >= 70 ? 'warning.main' : 'error.main'
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {fulfillmentRate.toFixed(1)}% fulfilled
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>

          {/* Cost Summary */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoney color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Total Cost
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="primary">
                    {formatCurrency(optimizationResult.totalCost)}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Saved: {formatCurrency(optimizationResult.savings)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Maintenance Costs
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(optimizationResult.maintenanceCosts)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {((optimizationResult.maintenanceCosts / optimizationResult.totalCost) * 100).toFixed(1)}% of total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Transportation Costs
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(optimizationResult.transportationCosts)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {((optimizationResult.transportationCosts / optimizationResult.totalCost) * 100).toFixed(1)}% of total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Storage & Handling
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(optimizationResult.storageCosts)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {((optimizationResult.storageCosts / optimizationResult.totalCost) * 100).toFixed(1)}% of total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Bottlenecks Alert */}
          {optimizationResult.bottlenecks.length > 0 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <AlertTitle>Capacity Warnings</AlertTitle>
              {optimizationResult.bottlenecks.map((bottleneck, index) => (
                <Typography key={index} variant="body2">
                  • {bottleneck.node}: {bottleneck.utilization.toFixed(1)}% utilization
                </Typography>
              ))}
            </Alert>
          )}

          {/* Optimal Flow Paths */}
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">
                <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                Optimal Product Flow Paths
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {/* Facility to Engine Flows */}
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Maintenance Facility → Engine Type
                  </Typography>
                  <List dense>
                    {optimizationResult.flows
                      .filter(flow => flow.type === 'facility-engine')
                      .map((flow, index) => {
                        const facility = maintenanceFacilities.find(f => f.id === flow.from);
                        const engine = engineTypes.find(e => e.id === flow.to);
                        return (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Build color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${facility.name} → ${engine.name}`}
                              secondary={`${formatNumber(flow.amount)} aircraft (${formatCurrency(flow.cost)})`}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>

                {/* Engine to Regional Flows */}
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Engine Type → Regional Center
                  </Typography>
                  <List dense>
                    {optimizationResult.flows
                      .filter(flow => flow.type === 'engine-regional')
                      .map((flow, index) => {
                        const engine = engineTypes.find(e => e.id === flow.from);
                        const regional = regionalCenters.find(r => r.id === flow.to);
                        return (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Flight color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${engine.name} → ${regional.name}`}
                              secondary={`${formatNumber(flow.amount)} aircraft (${formatCurrency(flow.cost)})`}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>

                {/* Regional to Fleet Flows */}
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Regional Center → Aircraft Fleet
                  </Typography>
                  <List dense>
                    {optimizationResult.flows
                      .filter(flow => flow.type === 'regional-fleet')
                      .map((flow, index) => {
                        const regional = regionalCenters.find(r => r.id === flow.from);
                        const fleet = aircraftFleets.find(f => f.id === flow.to);
                        return (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Flight color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${regional.name} → ${fleet.name}`}
                              secondary={`${formatNumber(flow.amount)} aircraft (${formatCurrency(flow.cost)})`}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Capacity Utilization */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
              Capacity Utilization
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Facility</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                    <TableCell align="right">Used</TableCell>
                    <TableCell align="right">Utilization</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(optimizationResult.capacityUtilization).map((facility) => (
                    <TableRow key={facility.name}>
                      <TableCell>{facility.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={facility.type} 
                          size="small" 
                          color={
                            facility.type === 'facility' ? 'primary' : 
                            facility.type === 'regional' ? 'secondary' : 
                            'default'
                          }
                        />
                      </TableCell>
                      <TableCell align="right">{formatNumber(facility.capacity)}</TableCell>
                      <TableCell align="right">{formatNumber(facility.used)}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={facility.utilization} 
                            sx={{ 
                              width: 100, 
                              height: 8,
                              backgroundColor: 'grey.300',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 
                                  facility.utilization > 95 ? 'error.main' :
                                  facility.utilization >= 80 ? 'success.main' :
                                  facility.utilization >= 50 ? 'success.main' :
                                  'warning.main'
                              }
                            }}
                          />
                          <Typography variant="body2">
                            {facility.utilization.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {facility.utilization > 95 ? (
                          <Chip icon={<Warning />} label="Critical" color="error" size="small" />
                        ) : facility.utilization >= 80 ? (
                          <Chip icon={<CheckCircle />} label="Optimal" color="success" size="small" />
                        ) : facility.utilization >= 50 ? (
                          <Chip icon={<CheckCircle />} label="Good" color="success" size="small" />
                        ) : (
                          <Chip icon={<Warning />} label="Under-utilized" color="warning" size="small" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
} 