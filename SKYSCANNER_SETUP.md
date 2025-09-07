# Skyscanner API Setup Guide

## 🚀 **Hybrid API Implementation**

Your flight search app now uses **both Amadeus and Skyscanner APIs** intelligently:

- **Amadeus API**: International flights (Lagos → London, Lagos → Dubai, etc.)
- **Skyscanner API**: Nigerian domestic flights (Lagos → Abuja, Port Harcourt → Lagos, etc.)

## 📋 **Setup Instructions**

### 1. **Get Skyscanner API Key**

1. Go to [RapidAPI Skyscanner](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
2. Sign up for a free account
3. Subscribe to the **free plan** (500 requests/month)
4. Copy your **X-RapidAPI-Key**

### 2. **Add API Key to Environment**

Create a `.env` file in your project root:

```bash
# Amadeus API Credentials
VITE_AMADEUS_API_KEY=your_amadeus_api_key_here
VITE_AMADEUS_API_SECRET=your_amadeus_api_secret_here

# Skyscanner API Credentials
VITE_SKYSCANNER_API_KEY=your_skyscanner_api_key_here
```

### 3. **Test the Implementation**

1. **Nigerian Domestic Routes** (will use Skyscanner):
   - Lagos → Abuja
   - Lagos → Port Harcourt
   - Abuja → Enugu
   - Port Harcourt → Lagos

2. **International Routes** (will use Amadeus):
   - Lagos → London
   - Lagos → Dubai
   - Lagos → New York

## 🔧 **How It Works**

The app automatically determines which API to use based on the route:

```javascript
// Nigerian domestic routes → Skyscanner
if (isFromNigeria && isToNigeria) {
  useSkyscanner = true
}

// Routes to/from Nigeria → Skyscanner (better coverage)
if (isFromNigeria || isToNigeria) {
  useSkyscanner = true
}

// Other international routes → Amadeus
else {
  useAmadeus = true
}
```

## 🎯 **Expected Results**

- **Nigerian Domestic**: Real flight data from Skyscanner
- **International**: Real flight data from Amadeus
- **All Prices**: Displayed in Nigerian Naira (₦)
- **API Indicator**: Shows which API powered the search

## 🚨 **Troubleshooting**

### If Skyscanner API fails:
- Check your API key in `.env`
- Verify you're subscribed to the Skyscanner API on RapidAPI
- Check console for error messages

### If Amadeus API fails:
- Check your Amadeus credentials in `.env`
- Verify you're using test environment credentials

## 📊 **API Limits**

- **Skyscanner Free**: 500 requests/month
- **Amadeus Test**: 2000 requests/month

## 🎉 **Benefits**

✅ **Better Nigerian Coverage**: Skyscanner has more domestic Nigerian flights  
✅ **International Coverage**: Amadeus excels at international routes  
✅ **Real Data**: No more mock data fallbacks  
✅ **Smart Routing**: Automatically chooses the best API  
✅ **Naira Pricing**: All prices in Nigerian currency  

---

**Ready to test!** Try searching for Lagos → Abuja (Skyscanner) and Lagos → London (Amadeus) to see both APIs in action! 🛫
