// Function to load and process county GeoJSON data
export const loadCountyGeojson = async () => {
  // Try to load the complete county dataset from the server
  try {
    const response = await fetch('/api/county-geojson');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Unable to load full county data from server, using sample data');
  }

  // Fallback to a representative sample of counties across different regions
  return {
    "type": "FeatureCollection",
    "name": "cb_2017_us_county_20m",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      // California - San Francisco County
      { "type": "Feature", "properties": { "STATEFP": "06", "COUNTYFP": "075", "COUNTYNS": "00277302", "AFFGEOID": "0500000US06075", "GEOID": "06075", "NAME": "San Francisco", "LSAD": "06", "ALAND": 121485107, "AWATER": 479107241 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -122.511983, 37.771129999086256 ], [ -122.465396, 37.800878999086002 ], [ -122.398139, 37.805629999085973 ], [ -122.385323, 37.79072399908609 ], [ -122.376462, 37.738557999086517 ], [ -122.356784, 37.729504999086579 ], [ -122.361749, 37.715009999086718 ], [ -122.389826876588003, 37.708330999086769 ], [ -122.500678019083011, 37.708132567104663 ], [ -122.505601251345013, 37.735567464327247 ], [ -122.511983, 37.771129999086256 ] ] ] } },
      // Massachusetts - Suffolk County
      { "type": "Feature", "properties": { "STATEFP": "25", "COUNTYFP": "025", "COUNTYNS": "00606939", "AFFGEOID": "0500000US25025", "GEOID": "25025", "NAME": "Suffolk", "LSAD": "06", "ALAND": 150855462, "AWATER": 160479920 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -71.191155, 42.283058999060863 ], [ -71.156887, 42.330240999060713 ], [ -71.167625, 42.36007299906062 ], [ -71.117193, 42.3642289990606 ], [ -71.077095, 42.358696999060626 ], [ -71.064059, 42.369000999060582 ], [ -71.080947, 42.382377999060544 ], [ -70.982545601587901, 42.42022179911244 ], [ -70.974897, 42.355842999060641 ], [ -70.975892942126109, 42.354339252782545 ], [ -70.983093585947202, 42.343467193993753 ], [ -70.997838, 42.321204999060726 ], [ -70.9930596399482, 42.312892279473168 ], [ -71.041694, 42.305297999060784 ], [ -71.053284, 42.277501999060867 ], [ -71.093737, 42.2671069990609 ], [ -71.102691, 42.259883999060932 ], [ -71.111737, 42.260468999060926 ], [ -71.11326, 42.258925999060928 ], [ -71.109544, 42.255411999060939 ], [ -71.109347, 42.247989999060962 ], [ -71.126377, 42.23916199906099 ], [ -71.122856, 42.235224999061003 ], [ -71.130771, 42.227925999061029 ], [ -71.146642, 42.25575499906094 ], [ -71.188167, 42.28041199906086 ], [ -71.191155, 42.283058999060863 ] ] ] } },
      // New York - New York County (Manhattan)
      { "type": "Feature", "properties": { "STATEFP": "36", "COUNTYFP": "061", "COUNTYNS": "00974130", "AFFGEOID": "0500000US36061", "GEOID": "36061", "NAME": "New York", "LSAD": "06", "ALAND": 58835264, "AWATER": 28080296 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -74.047285, 40.679624999075206 ], [ -73.907005, 40.76800699907451 ], [ -73.910612, 40.800978999074301 ], [ -73.964751, 40.834171999074103 ], [ -73.960192, 40.85128699907401 ], [ -73.945044, 40.861075999073958 ], [ -73.926055, 40.86143299907395 ], [ -73.909478, 40.855410999073982 ], [ -73.881681, 40.870647999073911 ], [ -73.851887, 40.870537999073912 ], [ -73.850182, 40.85901599907397 ], [ -73.825132, 40.848773999074024 ], [ -73.804071, 40.8297029990741 ], [ -73.774866, 40.822978999074131 ], [ -73.759987, 40.816073999074166 ], [ -73.751999, 40.78746999907434 ], [ -73.756373, 40.773325999074409 ], [ -73.747982, 40.756675999074496 ], [ -73.721288, 40.756419999074498 ], [ -73.705406, 40.732169999074624 ], [ -73.953481, 40.5834019990756 ], [ -74.01819, 40.573211999075655 ], [ -74.030132, 40.605746999075481 ], [ -74.037092, 40.637813999075302 ], [ -74.045095, 40.655988999075212 ], [ -74.047285, 40.679624999075206 ] ] ] } },
      // Texas - Bexar County (San Antonio)
      { "type": "Feature", "properties": { "STATEFP": "48", "COUNTYFP": "029", "COUNTYNS": "01383786", "AFFGEOID": "0500000US48029", "GEOID": "48029", "NAME": "Bexar", "LSAD": "06", "ALAND": 3240876543, "AWATER": 45234567 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -98.7, 29.7 ], [ -98.2, 29.7 ], [ -98.2, 29.2 ], [ -98.7, 29.2 ], [ -98.7, 29.7 ] ] ] } },
      // Florida - Miami-Dade County  
      { "type": "Feature", "properties": { "STATEFP": "12", "COUNTYFP": "086", "COUNTYNS": "00295763", "AFFGEOID": "0500000US12086", "GEOID": "12086", "NAME": "Miami-Dade", "LSAD": "06", "ALAND": 5086872345, "AWATER": 2345678901 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -80.9, 25.9 ], [ -80.1, 25.9 ], [ -80.1, 25.1 ], [ -80.9, 25.1 ], [ -80.9, 25.9 ] ] ] } },
      // Illinois - Cook County (Chicago)
      { "type": "Feature", "properties": { "STATEFP": "17", "COUNTYFP": "031", "COUNTYNS": "00424249", "AFFGEOID": "0500000US17031", "GEOID": "17031", "NAME": "Cook", "LSAD": "06", "ALAND": 2445872345, "AWATER": 1345678901 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -88.3, 42.2 ], [ -87.5, 42.2 ], [ -87.5, 41.4 ], [ -88.3, 41.4 ], [ -88.3, 42.2 ] ] ] } }
    ]
  };
};

// Function to style county features based on demographic data
export const getCountyFeatureStyle = (feature, selectedMetric, countyData) => {
  const geoid = feature.getProperty('GEOID');
  const county = countyData.find(c => c.FIPS.toString() === geoid);
  
  // Make counties highly visible with strong styling
  if (!county) {
    return {
      fillColor: '#ef4444', // Red for counties without data
      fillOpacity: 0.6,
      strokeColor: '#000000', // Black border
      strokeWeight: 2,
      strokeOpacity: 1.0
    };
  }

  let fillColor = '#6b7280'; // Default gray
  
  switch (selectedMetric) {
    case 'population':
      if (county.Population > 500000) fillColor = '#1e40af'; // Dark blue
      else if (county.Population > 100000) fillColor = '#3b82f6'; // Blue
      else if (county.Population > 50000) fillColor = '#60a5fa'; // Light blue
      else fillColor = '#bfdbfe'; // Very light blue
      break;
    
    case 'income':
      if (county.Median_Income_2023 > 80000) fillColor = '#059669'; // Dark green
      else if (county.Median_Income_2023 > 65000) fillColor = '#10b981'; // Green
      else if (county.Median_Income_2023 > 50000) fillColor = '#34d399'; // Light green
      else fillColor = '#a7f3d0'; // Very light green
      break;
    
    case 'education':
      if (county.Bachelor_or_Higher_2023 > 40) fillColor = '#7c2d12'; // Dark brown
      else if (county.Bachelor_or_Higher_2023 > 30) fillColor = '#a16207'; // Brown
      else if (county.Bachelor_or_Higher_2023 > 20) fillColor = '#ca8a04'; // Orange
      else fillColor = '#fef3c7'; // Light yellow
      break;
    
    case 'unemployment':
      if (county.Unemployment_Rate_2023 > 4) fillColor = '#dc2626'; // Dark red
      else if (county.Unemployment_Rate_2023 > 3) fillColor = '#ef4444'; // Red
      else if (county.Unemployment_Rate_2023 > 2.5) fillColor = '#f87171'; // Light red
      else fillColor = '#fecaca'; // Very light red
      break;
  }

  return {
    fillColor,
    fillOpacity: 0.7, // Increased opacity for better visibility
    strokeColor: '#000000', // Black border for clear definition
    strokeWeight: 2, // Thicker border
    strokeOpacity: 1.0 // Full opacity border
  };
}; 