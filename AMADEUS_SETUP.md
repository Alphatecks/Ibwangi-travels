# Amadeus API Integration Setup

## Overview
Your Tripma application now has Amadeus API integration for real-time flight search functionality. The search component on the homepage can now interact with the Amadeus API to fetch live flight data.

## Setup Instructions

### 1. Get Amadeus API Credentials
1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Create a free account
3. Create a new application to get your API credentials
4. Note down your `Client ID` and `Client Secret`

### 2. Configure Environment Variables
1. Copy `env.example` to `.env` in your project root
2. Replace the placeholder values with your actual credentials:
   ```
   REACT_APP_AMADEUS_CLIENT_ID=your_actual_client_id
   REACT_APP_AMADEUS_CLIENT_SECRET=your_actual_client_secret
   ```

### 3. Test the Integration
1. Start your development server: `npm run dev`
2. Fill out the search form on the homepage
3. Click "Search" to see real flight data from Amadeus API

## Features Implemented

### ✅ Flight Search
- Real-time flight search using Amadeus API
- Support for round-trip and one-way flights
- Multiple passenger support (adults and minors)
- Date range selection

### ✅ Data Transformation
- Converts Amadeus API response to match your existing UI
- Displays flight duration, stops, airlines, and prices
- Maintains backward compatibility with mock data

### ✅ Error Handling
- Loading states during API calls
- Error messages for failed requests
- Graceful fallback to mock data if API fails

### ✅ User Experience
- Disabled search button during loading
- Loading spinner animation
- Error display with user-friendly messages

## API Endpoints Used

- **Flight Offers Search**: `amadeus.shopping.flightOffersSearch.get()`
- **Airport Search**: `amadeus.referenceData.locations.get()`
- **Flight Offer Details**: `amadeus.shopping.flightOffers.get()`
- **Flight Booking**: `amadeus.booking.flightOrders.post()`

## File Structure

```
src/
├── services/
│   └── amadeusService.js    # API service layer
├── App.jsx                  # Updated with API integration
├── FlightSearchResults.jsx  # Updated to display real data
└── App.css                  # Added loading/error styles
```

## Next Steps

1. **Authentication**: Set up your Amadeus API credentials
2. **Testing**: Test with different routes and dates
3. **Booking Flow**: Implement the booking functionality
4. **Error Handling**: Add more specific error handling for different API errors
5. **Caching**: Consider adding response caching for better performance

## Troubleshooting

### Common Issues
- **401 Unauthorized**: Check your API credentials
- **429 Too Many Requests**: You've hit the rate limit (free tier has limits)
- **No Results**: Try different dates or routes

### Debug Mode
The integration includes console logging. Check your browser's developer console for detailed API request/response information.

## Support
- [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- [Amadeus API Reference](https://developers.amadeus.com/self-service/category/air/api-doc)
