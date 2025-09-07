// Skyscanner API Service for flight searches
// This service handles Nigerian domestic flights and other routes not well covered by Amadeus

const SKYSCANNER_API_KEY = import.meta.env.VITE_SKYSCANNER_API_KEY;
const SKYSCANNER_BASE_URL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

// Check if Skyscanner API key is available
if (!SKYSCANNER_API_KEY) {
  console.warn('⚠️ Skyscanner API key not found. Please add VITE_SKYSCANNER_API_KEY to your .env file');
}

// Get access token for Skyscanner API
async function getSkyscannerAccessToken() {
  try {
    console.log('🔑 Getting Skyscanner access token...');
    
    const response = await fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SKYSCANNER_API_KEY,
        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Skyscanner token request failed: ${response.status} ${response.statusText}`);
    }

    // Skyscanner doesn't require a separate token, we can use the API key directly
    console.log('✅ Skyscanner API key validated');
    return SKYSCANNER_API_KEY;
  } catch (error) {
    console.error('❌ Skyscanner token generation failed:', error);
    throw error;
  }
}

// Search flights using Skyscanner API
export async function searchFlightsSkyscanner(searchParams) {
  try {
    console.log('🔄 Starting Skyscanner flight search...');
    console.log('📊 Search params:', searchParams);

    const {
      fromLocation,
      toLocation,
      departDate,
      returnDate,
      adults = 1,
      children = 0,
      maxResults = 10
    } = searchParams;

    // Validate required parameters
    if (!fromLocation || !toLocation || !departDate) {
      throw new Error('Missing required search parameters');
    }

    // Get access token
    const apiKey = await getSkyscannerAccessToken();

    // Create search session
    const createSessionResponse = await fetch(`${SKYSCANNER_BASE_URL}/apiservices/pricing/v1.0`, {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'country': 'NG',
        'currency': 'NGN',
        'locale': 'en-NG',
        'originPlace': fromLocation,
        'destinationPlace': toLocation,
        'outboundDate': departDate,
        'inboundDate': returnDate || '',
        'adults': adults,
        'children': children,
        'infants': 0,
        'cabinClass': 'economy'
      })
    });

    if (!createSessionResponse.ok) {
      const errorData = await createSessionResponse.text();
      throw new Error(`Skyscanner session creation failed: ${createSessionResponse.status} ${createSessionResponse.statusText} - ${errorData}`);
    }

    // Get session key from response headers
    const sessionKey = createSessionResponse.headers.get('Location')?.split('/').pop();
    if (!sessionKey) {
      throw new Error('No session key received from Skyscanner');
    }

    console.log('✅ Skyscanner session created:', sessionKey);

    // Poll for results
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const resultsResponse = await fetch(`${SKYSCANNER_BASE_URL}/apiservices/pricing/uk2/v1.0/${sessionKey}`, {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
      });

      if (!resultsResponse.ok) {
        throw new Error(`Skyscanner results fetch failed: ${resultsResponse.status} ${resultsResponse.statusText}`);
      }

      const resultsData = await resultsResponse.json();
      
      if (resultsData.Status === 'UpdatesComplete') {
        console.log('✅ Skyscanner search completed successfully!');
        return {
          success: true,
          data: resultsData.Itineraries || [],
          meta: {
            count: resultsData.Itineraries?.length || 0,
            sessionKey: sessionKey
          },
          isSkyscannerData: true
        };
      }
      
      attempts++;
      console.log(`⏳ Skyscanner search in progress... (attempt ${attempts}/${maxAttempts})`);
    }

    throw new Error('Skyscanner search timed out');

  } catch (error) {
    console.error('❌ Skyscanner search failed:', error);
    return {
      success: false,
      error: error.message,
      isSkyscannerData: false
    };
  }
}

// Get airport suggestions from Skyscanner
export async function getAirportSuggestionsSkyscanner(query) {
  try {
    if (!query || query.length < 2) return [];

    const apiKey = await getSkyscannerAccessToken();
    
    const response = await fetch(`${SKYSCANNER_BASE_URL}/apiservices/autosuggest/v1.0/NG/NGN/en-NG/?query=${encodeURIComponent(query)}`, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Skyscanner suggestions failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.Places || [];

  } catch (error) {
    console.error('❌ Skyscanner suggestions failed:', error);
    return [];
  }
}

// Check if route is likely to work better with Skyscanner
export function shouldUseSkyscanner(fromLocation, toLocation) {
  // Nigerian domestic routes
  const nigerianAirports = ['LOS', 'ABV', 'PHC', 'KAN', 'ENU', 'CBQ'];
  
  const isFromNigeria = nigerianAirports.includes(fromLocation);
  const isToNigeria = nigerianAirports.includes(toLocation);
  
  // Use Skyscanner for Nigerian domestic routes
  if (isFromNigeria && isToNigeria) {
    return true;
  }
  
  // Use Skyscanner for routes to/from Nigeria that might not be well covered by Amadeus
  if (isFromNigeria || isToNigeria) {
    return true;
  }
  
  return false;
}
