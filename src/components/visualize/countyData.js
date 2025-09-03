// Load county transportation project data
export const loadCountyData = () => {
  // Transportation infrastructure project data by county - major counties across all states
  return [
    // California
    { FIPS: 6075, County_Name: "San Francisco County", State: "CA", Total_Projects: 127, Projects_Funded: 98, Projects_Behind_Schedule: 12, Projects_On_Track: 86, Project_Value: 2850000000 },
    { FIPS: 6037, County_Name: "Los Angeles County", State: "CA", Total_Projects: 456, Projects_Funded: 389, Projects_Behind_Schedule: 45, Projects_On_Track: 344, Project_Value: 8900000000 },
    { FIPS: 6073, County_Name: "San Diego County", State: "CA", Total_Projects: 178, Projects_Funded: 142, Projects_Behind_Schedule: 18, Projects_On_Track: 124, Project_Value: 3400000000 },
    { FIPS: 6001, County_Name: "Alameda County", State: "CA", Total_Projects: 134, Projects_Funded: 112, Projects_Behind_Schedule: 14, Projects_On_Track: 98, Project_Value: 2650000000 },
    
    // Texas
    { FIPS: 48029, County_Name: "Bexar County", State: "TX", Total_Projects: 156, Projects_Funded: 134, Projects_Behind_Schedule: 18, Projects_On_Track: 116, Project_Value: 2100000000 },
    { FIPS: 48201, County_Name: "Harris County", State: "TX", Total_Projects: 298, Projects_Funded: 256, Projects_Behind_Schedule: 32, Projects_On_Track: 224, Project_Value: 4800000000 },
    { FIPS: 48113, County_Name: "Dallas County", State: "TX", Total_Projects: 234, Projects_Funded: 198, Projects_Behind_Schedule: 26, Projects_On_Track: 172, Project_Value: 3900000000 },
    { FIPS: 48453, County_Name: "Travis County", State: "TX", Total_Projects: 89, Projects_Funded: 76, Projects_Behind_Schedule: 9, Projects_On_Track: 67, Project_Value: 1650000000 },
    
    // Florida
    { FIPS: 12086, County_Name: "Miami-Dade County", State: "FL", Total_Projects: 203, Projects_Funded: 167, Projects_Behind_Schedule: 22, Projects_On_Track: 145, Project_Value: 3200000000 },
    { FIPS: 12095, County_Name: "Orange County", State: "FL", Total_Projects: 145, Projects_Funded: 118, Projects_Behind_Schedule: 15, Projects_On_Track: 103, Project_Value: 2400000000 },
    { FIPS: 12103, County_Name: "Pinellas County", State: "FL", Total_Projects: 78, Projects_Funded: 65, Projects_Behind_Schedule: 8, Projects_On_Track: 57, Project_Value: 1200000000 },
    
    // New York
    { FIPS: 36061, County_Name: "New York County", State: "NY", Total_Projects: 245, Projects_Funded: 189, Projects_Behind_Schedule: 28, Projects_On_Track: 161, Project_Value: 4200000000 },
    { FIPS: 36047, County_Name: "Kings County", State: "NY", Total_Projects: 187, Projects_Funded: 154, Projects_Behind_Schedule: 21, Projects_On_Track: 133, Project_Value: 3100000000 },
    { FIPS: 36081, County_Name: "Queens County", State: "NY", Total_Projects: 156, Projects_Funded: 128, Projects_Behind_Schedule: 17, Projects_On_Track: 111, Project_Value: 2700000000 },
    
    // Illinois
    { FIPS: 17031, County_Name: "Cook County", State: "IL", Total_Projects: 312, Projects_Funded: 278, Projects_Behind_Schedule: 35, Projects_On_Track: 243, Project_Value: 5800000000 },
    
    // Pennsylvania
    { FIPS: 42101, County_Name: "Philadelphia County", State: "PA", Total_Projects: 167, Projects_Funded: 134, Projects_Behind_Schedule: 19, Projects_On_Track: 115, Project_Value: 2900000000 },
    { FIPS: 42003, County_Name: "Allegheny County", State: "PA", Total_Projects: 98, Projects_Funded: 82, Projects_Behind_Schedule: 11, Projects_On_Track: 71, Project_Value: 1800000000 },
    
    // Ohio
    { FIPS: 39035, County_Name: "Cuyahoga County", State: "OH", Total_Projects: 123, Projects_Funded: 102, Projects_Behind_Schedule: 13, Projects_On_Track: 89, Project_Value: 2100000000 },
    { FIPS: 39061, County_Name: "Hamilton County", State: "OH", Total_Projects: 87, Projects_Funded: 71, Projects_Behind_Schedule: 9, Projects_On_Track: 62, Project_Value: 1500000000 },
    
    // Georgia
    { FIPS: 13121, County_Name: "Fulton County", State: "GA", Total_Projects: 134, Projects_Funded: 108, Projects_Behind_Schedule: 14, Projects_On_Track: 94, Project_Value: 2300000000 },
    { FIPS: 13135, County_Name: "Gwinnett County", State: "GA", Total_Projects: 89, Projects_Funded: 74, Projects_Behind_Schedule: 9, Projects_On_Track: 65, Project_Value: 1600000000 },
    
    // North Carolina
    { FIPS: 37119, County_Name: "Mecklenburg County", State: "NC", Total_Projects: 98, Projects_Funded: 81, Projects_Behind_Schedule: 10, Projects_On_Track: 71, Project_Value: 1700000000 },
    { FIPS: 37183, County_Name: "Wake County", State: "NC", Total_Projects: 76, Projects_Funded: 63, Projects_Behind_Schedule: 8, Projects_On_Track: 55, Project_Value: 1400000000 },
    
    // Virginia
    { FIPS: 51059, County_Name: "Fairfax County", State: "VA", Total_Projects: 112, Projects_Funded: 94, Projects_Behind_Schedule: 12, Projects_On_Track: 82, Project_Value: 2000000000 },
    
    // Maryland
    { FIPS: 24031, County_Name: "Montgomery County", State: "MD", Total_Projects: 87, Projects_Funded: 72, Projects_Behind_Schedule: 9, Projects_On_Track: 63, Project_Value: 1550000000 },
    
    // Massachusetts
    { FIPS: 25025, County_Name: "Suffolk County", State: "MA", Total_Projects: 89, Projects_Funded: 72, Projects_Behind_Schedule: 8, Projects_On_Track: 64, Project_Value: 1650000000 },
    { FIPS: 25017, County_Name: "Middlesex County", State: "MA", Total_Projects: 134, Projects_Funded: 111, Projects_Behind_Schedule: 14, Projects_On_Track: 97, Project_Value: 2400000000 },
    
    // Michigan
    { FIPS: 26163, County_Name: "Wayne County", State: "MI", Total_Projects: 145, Projects_Funded: 118, Projects_Behind_Schedule: 16, Projects_On_Track: 102, Project_Value: 2500000000 },
    { FIPS: 26125, County_Name: "Oakland County", State: "MI", Total_Projects: 98, Projects_Funded: 82, Projects_Behind_Schedule: 10, Projects_On_Track: 72, Project_Value: 1750000000 },
    
    // Washington
    { FIPS: 53033, County_Name: "King County", State: "WA", Total_Projects: 156, Projects_Funded: 128, Projects_Behind_Schedule: 17, Projects_On_Track: 111, Project_Value: 2800000000 },
    
    // Arizona
    { FIPS: 4013, County_Name: "Maricopa County", State: "AZ", Total_Projects: 178, Projects_Funded: 145, Projects_Behind_Schedule: 19, Projects_On_Track: 126, Project_Value: 3000000000 },
    
    // Tennessee
    { FIPS: 47037, County_Name: "Davidson County", State: "TN", Total_Projects: 78, Projects_Funded: 64, Projects_Behind_Schedule: 8, Projects_On_Track: 56, Project_Value: 1350000000 },
    
    // Missouri
    { FIPS: 29095, County_Name: "Jackson County", State: "MO", Total_Projects: 67, Projects_Funded: 55, Projects_Behind_Schedule: 7, Projects_On_Track: 48, Project_Value: 1200000000 },
    { FIPS: 29189, County_Name: "St. Louis County", State: "MO", Total_Projects: 89, Projects_Funded: 73, Projects_Behind_Schedule: 9, Projects_On_Track: 64, Project_Value: 1580000000 },
    
    // Louisiana
    { FIPS: 22071, County_Name: "Orleans Parish", State: "LA", Total_Projects: 56, Projects_Funded: 45, Projects_Behind_Schedule: 6, Projects_On_Track: 39, Project_Value: 980000000 },
    
    // Nevada
    { FIPS: 32003, County_Name: "Clark County", State: "NV", Total_Projects: 112, Projects_Funded: 91, Projects_Behind_Schedule: 12, Projects_On_Track: 79, Project_Value: 1950000000 },
    
    // Colorado
    { FIPS: 8031, County_Name: "Denver County", State: "CO", Total_Projects: 87, Projects_Funded: 71, Projects_Behind_Schedule: 9, Projects_On_Track: 62, Project_Value: 1550000000 },
    
    // Oregon
    { FIPS: 41051, County_Name: "Multnomah County", State: "OR", Total_Projects: 78, Projects_Funded: 64, Projects_Behind_Schedule: 8, Projects_On_Track: 56, Project_Value: 1400000000 },
    
    // Utah
    { FIPS: 49035, County_Name: "Salt Lake County", State: "UT", Total_Projects: 67, Projects_Funded: 55, Projects_Behind_Schedule: 7, Projects_On_Track: 48, Project_Value: 1250000000 },
    
    // New Mexico
    { FIPS: 35001, County_Name: "Bernalillo County", State: "NM", Total_Projects: 45, Projects_Funded: 37, Projects_Behind_Schedule: 5, Projects_On_Track: 32, Project_Value: 820000000 },
    
    // Oklahoma
    { FIPS: 40109, County_Name: "Oklahoma County", State: "OK", Total_Projects: 56, Projects_Funded: 46, Projects_Behind_Schedule: 6, Projects_On_Track: 40, Project_Value: 1050000000 },
    
    // Kansas
    { FIPS: 20173, County_Name: "Sedgwick County", State: "KS", Total_Projects: 45, Projects_Funded: 37, Projects_Behind_Schedule: 5, Projects_On_Track: 32, Project_Value: 850000000 },
    
    // Arkansas
    { FIPS: 5119, County_Name: "Pulaski County", State: "AR", Total_Projects: 34, Projects_Funded: 28, Projects_Behind_Schedule: 4, Projects_On_Track: 24, Project_Value: 650000000 },
    
    // Mississippi
    { FIPS: 28049, County_Name: "Hinds County", State: "MS", Total_Projects: 29, Projects_Funded: 24, Projects_Behind_Schedule: 3, Projects_On_Track: 21, Project_Value: 550000000 },
    
    // Alabama
    { FIPS: 1073, County_Name: "Jefferson County", State: "AL", Total_Projects: 45, Projects_Funded: 37, Projects_Behind_Schedule: 5, Projects_On_Track: 32, Project_Value: 820000000 },
    
    // South Carolina
    { FIPS: 45019, County_Name: "Charleston County", State: "SC", Total_Projects: 56, Projects_Funded: 46, Projects_Behind_Schedule: 6, Projects_On_Track: 40, Project_Value: 1000000000 },
    
    // Kentucky
    { FIPS: 21111, County_Name: "Jefferson County", State: "KY", Total_Projects: 45, Projects_Funded: 37, Projects_Behind_Schedule: 5, Projects_On_Track: 32, Project_Value: 780000000 },
    
    // Indiana
    { FIPS: 18097, County_Name: "Marion County", State: "IN", Total_Projects: 67, Projects_Funded: 55, Projects_Behind_Schedule: 7, Projects_On_Track: 48, Project_Value: 1200000000 },
    
    // Wisconsin
    { FIPS: 55079, County_Name: "Milwaukee County", State: "WI", Total_Projects: 78, Projects_Funded: 64, Projects_Behind_Schedule: 8, Projects_On_Track: 56, Project_Value: 1350000000 },
    
    // Minnesota
    { FIPS: 27053, County_Name: "Hennepin County", State: "MN", Total_Projects: 89, Projects_Funded: 73, Projects_Behind_Schedule: 9, Projects_On_Track: 64, Project_Value: 1580000000 },
    
    // Iowa
    { FIPS: 19153, County_Name: "Polk County", State: "IA", Total_Projects: 45, Projects_Funded: 37, Projects_Behind_Schedule: 5, Projects_On_Track: 32, Project_Value: 850000000 }
  ];
};

// Get color based on county transportation project data
export const getCountyColor = (county, metric) => {
  switch (metric) {
    case 'total_projects':
      if (county.Total_Projects > 200) return '#1e40af';
      if (county.Total_Projects > 100) return '#3b82f6';
      if (county.Total_Projects > 50) return '#60a5fa';
      return '#93c5fd';
    
    case 'funded_projects':
      if (county.Projects_Funded > 150) return '#059669';
      if (county.Projects_Funded > 75) return '#10b981';
      if (county.Projects_Funded > 25) return '#34d399';
      return '#6ee7b7';
    
    case 'behind_schedule':
      if (county.Projects_Behind_Schedule > 30) return '#dc2626';
      if (county.Projects_Behind_Schedule > 15) return '#ef4444';
      if (county.Projects_Behind_Schedule > 5) return '#f87171';
      return '#fca5a5';
    
    case 'on_track':
      if (county.Projects_On_Track > 150) return '#059669';
      if (county.Projects_On_Track > 75) return '#10b981';
      if (county.Projects_On_Track > 25) return '#34d399';
      return '#6ee7b7';
    
    default:
      return '#e5e7eb';
  }
};

// Format transportation project values for display
export const formatDemographicValue = (value, metric) => {
  switch (metric) {
    case 'total_projects':
    case 'funded_projects':
    case 'behind_schedule':
    case 'on_track':
      return value.toLocaleString();
    default:
      return value.toLocaleString();
  }
}; 