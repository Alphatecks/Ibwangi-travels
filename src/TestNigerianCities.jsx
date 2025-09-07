import React from 'react';
import { nigerianCities, searchNigerianCities } from './utils/nigerianCities.js';
import { convertAndFormatUSDToNGN } from './utils/currency.js';

function TestNigerianCities() {
  const testSearch = searchNigerianCities('Lagos');
  const testPrice = convertAndFormatUSDToNGN(100);

  return (
    <div style={{padding: '20px', backgroundColor: '#f0f0f0', margin: '20px', borderRadius: '10px'}}>
      <h2>Test Nigerian Cities & Currency</h2>
      <div>
        <h3>Nigerian Cities Test:</h3>
        <p>Total cities loaded: {nigerianCities.length}</p>
        <p>Cities: {nigerianCities.map(city => city.name).join(', ')}</p>
        <p>Search for "Lagos": {testSearch.length} results</p>
        {testSearch.length > 0 && (
          <p>First result: {testSearch[0].fullName}</p>
        )}
      </div>
      <div>
        <h3>Currency Test:</h3>
        <p>Convert $100 to NGN: {testPrice}</p>
      </div>
    </div>
  );
}

export default TestNigerianCities;
