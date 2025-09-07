// Currency conversion utilities for USD to NGN
// Current exchange rate (as of December 2024): 1 USD ≈ 1,500 NGN
// This should be updated regularly or fetched from an API

let USD_TO_NGN_RATE = 1500; // Approximate current rate

// Convert USD to NGN
export const convertUSDToNGN = (usdAmount) => {
  if (typeof usdAmount !== 'number' || isNaN(usdAmount)) {
    return 0;
  }
  return Math.round(usdAmount * USD_TO_NGN_RATE);
};

// Format currency in Naira
export const formatNaira = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₦0';
  }
  
  // Format with commas for thousands
  const formattedAmount = amount.toLocaleString('en-NG');
  return `₦${formattedAmount}`;
};

// Format currency in Naira with decimal places
export const formatNairaWithDecimals = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₦0.00';
  }
  
  // Format with commas and 2 decimal places
  const formattedAmount = amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `₦${formattedAmount}`;
};

// Convert and format USD to NGN in one function
export const convertAndFormatUSDToNGN = (usdAmount) => {
  const ngnAmount = convertUSDToNGN(usdAmount);
  return formatNaira(ngnAmount);
};

// Get current exchange rate
export const getCurrentExchangeRate = () => {
  return USD_TO_NGN_RATE;
};

// Update exchange rate (for future API integration)
export const updateExchangeRate = (newRate) => {
  if (typeof newRate === 'number' && newRate > 0) {
    USD_TO_NGN_RATE = newRate;
    return true;
  }
  return false;
};

// Currency symbols and names
export const CURRENCY_INFO = {
  USD: {
    symbol: '$',
    name: 'US Dollar',
    code: 'USD'
  },
  NGN: {
    symbol: '₦',
    name: 'Nigerian Naira',
    code: 'NGN'
  }
};
