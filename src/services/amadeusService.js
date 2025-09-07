// Direct API calls to Amadeus instead of using the SDK (which has Node.js dependencies)
let apiCredentials = null;

try {
  // Get credentials from environment variables
  const clientId = process.env.VITE_AMADEUS_API_KEY || process.env.REACT_APP_AMADEUS_API_KEY;
  const clientSecret = process.env.VITE_AMADEUS_API_SECRET || process.env.REACT_APP_AMADEUS_API_SECRET;
  
  console.log('Environment check:', {
    clientId: clientId ? `${clientId.substring(0, 8)}...` : 'Not found',
    clientSecret: clientSecret ? `${clientSecret.substring(0, 8)}...` : 'Not found',
    hasViteApiKey: !!process.env.VITE_AMADEUS_API_KEY,
    hasReactApiKey: !!process.env.REACT_APP_AMADEUS_API_KEY
  });
  
  if (clientId && clientSecret && clientId !== 'YOUR_CLIENT_ID' && clientSecret !== 'YOUR_CLIENT_SECRET') {
    apiCredentials = { clientId, clientSecret };
    console.log('✅ Amadeus API credentials loaded successfully');
  } else {
    console.warn('⚠️ Amadeus API credentials not configured. Using mock data.');
    console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('AMADEUS')));
  }
} catch (error) {
  console.error('❌ Failed to load API credentials:', error);
}

// Helper function to extract airport code from location string
const extractAirportCode = (locationString) => {
  const match = locationString.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : locationString;
};

// Helper function to format date for Amadeus API
const formatDateForAPI = (date) => {
  if (!date) return null;
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Get access token from Amadeus API
const getAccessToken = async () => {
  if (!apiCredentials) {
    throw new Error('API credentials not configured');
  }

  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: apiCredentials.clientId,
      client_secret: apiCredentials.clientSecret,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Token generation failed:', errorData);
    throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  console.log('🔑 Access token received:', data.access_token ? `${data.access_token.substring(0, 20)}...` : 'No token');
  
  if (!data.access_token) {
    throw new Error('No access token received from Amadeus API');
  }
  
  return data.access_token;
};

// Search for flights using Amadeus API
export const searchFlights = async (searchParams) => {
  try {
    console.log('🔍 Starting flight search with params:', searchParams);
    
    // Check if API credentials are available
    if (!apiCredentials) {
      console.warn('⚠️ Amadeus API credentials not configured. Returning mock data.');
      return {
        success: true,
        data: [], // Empty array - will fall back to mock data in component
        meta: { count: 0 },
        isMockData: true
      };
    }
    
    console.log('✅ API credentials available, making API call...');

    const {
      fromLocation,
      toLocation,
      departDate,
      returnDate,
      adults = 1,
      minors = 0
    } = searchParams;

    // Extract airport codes
    const originLocationCode = extractAirportCode(fromLocation);
    const destinationLocationCode = extractAirportCode(toLocation);

    // Format dates
    const departureDate = formatDateForAPI(departDate);
    const returnDateFormatted = returnDate ? formatDateForAPI(returnDate) : null;

    // Get access token
    console.log('🔑 Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained');

    // Build search parameters
    const urlSearchParams = new URLSearchParams({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: adults.toString(),
      children: minors.toString(),
      max: '10' // Limit results for better performance
    });

    // Add return date if it's a round trip
    if (returnDateFormatted) {
      urlSearchParams.append('returnDate', returnDateFormatted);
    }

    console.log('📡 Making API call with params:', Object.fromEntries(urlSearchParams));

    // Try Flight Inspiration API first (better coverage for some routes)
    try {
      console.log('🔄 Trying Flight Inspiration API first...');
      const inspirationResponse = await fetch(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${originLocationCode}&departureDate=${departureDate}&oneWay=${!returnDateFormatted}&max=10`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (inspirationResponse.ok) {
        const inspirationData = await inspirationResponse.json();
        console.log('✅ Flight Inspiration API successful!');
        return {
          success: true,
          data: inspirationData.data || [],
          meta: inspirationData.meta || { count: 0 },
          isInspirationData: true
        };
      }
    } catch (error) {
      console.log('⚠️ Flight Inspiration API failed, trying Flight Offers API...');
    }

    // Make API call to test environment only (test credentials only work with test API)
    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${urlSearchParams}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    console.log('✅ API call successful! Found', data.data?.length || 0, 'flights');
    console.log('📊 Response meta:', data.meta);
    
    return {
      success: true,
      data: data.data,
      meta: data.meta
    };

  } catch (error) {
    console.error('❌ Error searching flights:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    return {
      success: false,
      error: error.message || 'Failed to search flights'
    };
  }
};

// Search for airport/city suggestions
export const searchAirports = async (keyword) => {
  try {
    if (!apiCredentials) {
      console.warn('API credentials not configured. Returning empty results.');
      return {
        success: true,
        data: []
      };
    }

    const accessToken = await getAccessToken();
    
    const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=AIRPORT,CITY`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error searching airports:', error);
    return {
      success: false,
      error: error.message || 'Failed to search airports'
    };
  }
};

// Get flight offers by ID (for booking)
export const getFlightOffer = async (offerId) => {
  try {
    if (!apiCredentials) {
      console.warn('API credentials not configured.');
      return {
        success: false,
        error: 'API credentials not configured'
      };
    }

    const accessToken = await getAccessToken();
    
    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers/${offerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error getting flight offer:', error);
    return {
      success: false,
      error: error.message || 'Failed to get flight offer'
    };
  }
};

// Create flight booking
export const createFlightBooking = async (bookingData) => {
  try {
    if (!apiCredentials) {
      console.warn('API credentials not configured.');
      return {
        success: false,
        error: 'API credentials not configured'
      };
    }

    const accessToken = await getAccessToken();
    
    const response = await fetch('https://test.api.amadeus.com/v1/booking/flight-orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error.message || 'Failed to create booking'
    };
  }
};
