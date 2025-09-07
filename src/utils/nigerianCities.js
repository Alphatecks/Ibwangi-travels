// Nigerian cities and airports data with IATA codes
console.log('Loading Nigerian cities...')

export const nigerianCities = [
  {
    name: 'Lagos',
    iata: 'LOS',
    fullName: 'Lagos (LOS)',
    airport: 'Murtala Muhammed International Airport',
    state: 'Lagos State'
  },
  {
    name: 'Abuja',
    iata: 'ABV',
    fullName: 'Abuja (ABV)',
    airport: 'Nnamdi Azikiwe International Airport',
    state: 'Federal Capital Territory'
  },
  {
    name: 'Port Harcourt',
    iata: 'PHC',
    fullName: 'Port Harcourt (PHC)',
    airport: 'Port Harcourt International Airport',
    state: 'Rivers State'
  },
  {
    name: 'Owerri',
    iata: 'QOW',
    fullName: 'Owerri (QOW)',
    airport: 'Sam Mbakwe Airport',
    state: 'Imo State'
  },
  {
    name: 'Enugu',
    iata: 'ENU',
    fullName: 'Enugu (ENU)',
    airport: 'Akanu Ibiam International Airport',
    state: 'Enugu State'
  },
  {
    name: 'Asaba',
    iata: 'ABB',
    fullName: 'Asaba (ABB)',
    airport: 'Asaba International Airport',
    state: 'Delta State'
  }
];

console.log('Nigerian cities loaded:', nigerianCities.length, 'cities')

// Helper function to search Nigerian cities
export const searchNigerianCities = (keyword) => {
  if (!keyword || keyword.length < 2) return [];
  
  const searchTerm = keyword.toLowerCase();
  const results = nigerianCities.filter(city => 
    city.name.toLowerCase().includes(searchTerm) ||
    city.iata.toLowerCase().includes(searchTerm) ||
    city.fullName.toLowerCase().includes(searchTerm) ||
    city.airport.toLowerCase().includes(searchTerm) ||
    city.state.toLowerCase().includes(searchTerm)
  );
  
  console.log('Search for "' + keyword + '":', results.length, 'results')
  
  return results;
};

// Helper function to get city by IATA code
export const getCityByIATA = (iataCode) => {
  return nigerianCities.find(city => city.iata === iataCode.toUpperCase());
};

// Helper function to get city by name
export const getCityByName = (cityName) => {
  return nigerianCities.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase() ||
    city.fullName.toLowerCase() === cityName.toLowerCase()
  );
};

// Popular Nigerian routes for suggestions
export const popularNigerianRoutes = [
  { from: 'Lagos (LOS)', to: 'Abuja (ABV)', description: 'Lagos to Abuja' },
  { from: 'Abuja (ABV)', to: 'Lagos (LOS)', description: 'Abuja to Lagos' },
  { from: 'Lagos (LOS)', to: 'Port Harcourt (PHC)', description: 'Lagos to Port Harcourt' },
  { from: 'Port Harcourt (PHC)', to: 'Lagos (LOS)', description: 'Port Harcourt to Lagos' },
  { from: 'Abuja (ABV)', to: 'Enugu (ENU)', description: 'Abuja to Enugu' },
  { from: 'Enugu (ENU)', to: 'Abuja (ABV)', description: 'Enugu to Abuja' },
  { from: 'Lagos (LOS)', to: 'Asaba (ABB)', description: 'Lagos to Asaba' },
  { from: 'Asaba (ABB)', to: 'Lagos (LOS)', description: 'Asaba to Lagos' },
  { from: 'Port Harcourt (PHC)', to: 'Owerri (QOW)', description: 'Port Harcourt to Owerri' },
  { from: 'Owerri (QOW)', to: 'Port Harcourt (PHC)', description: 'Owerri to Port Harcourt' }
];
