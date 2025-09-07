import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nigerianCities, searchNigerianCities } from './utils/nigerianCities.js'
import TestNigerianCities from './TestNigerianCities.jsx'

function HomePage() {
  const [fromLocation, setFromLocation] = useState('Lagos (LOS)')
  const [toLocation, setToLocation] = useState('Abuja (ABV)')
  const [departDate, setDepartDate] = useState('2/12')
  const [returnDate, setReturnDate] = useState('3/7')
  const [adults, setAdults] = useState(1)
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      from: fromLocation || 'Lagos (LOS)',
      to: toLocation || 'Abuja (ABV)',
      depart: departDate || '2/12',
      return: returnDate || '3/7',
      passengers: `${adults} adult${adults > 1 ? 's' : ''}`
    })

    const url = `/flight-results?${searchParams.toString()}`
    navigate(url)
  }

  const handleFromLocationChange = (e) => {
    const value = e.target.value
    setFromLocation(value)
    setShowFromSuggestions(value.length > 1)
  }

  const handleToLocationChange = (e) => {
    const value = e.target.value
    setToLocation(value)
    setShowToSuggestions(value.length > 1)
  }

  const selectFromLocation = (city) => {
    setFromLocation(city.fullName)
    setShowFromSuggestions(false)
  }

  const selectToLocation = (city) => {
    setToLocation(city.fullName)
    setShowToSuggestions(false)
  }

  const fromSuggestions = showFromSuggestions ? searchNigerianCities(fromLocation) : []
  const toSuggestions = showToSuggestions ? searchNigerianCities(toLocation) : []
  
  // Debug logging
  console.log('HomePage loaded')
  console.log('Nigerian cities:', nigerianCities)
  console.log('From suggestions:', fromSuggestions)
  console.log('To suggestions:', toSuggestions)
  
  // Simple alert to verify JavaScript is running
  if (nigerianCities.length === 0) {
    alert('ERROR: Nigerian cities not loaded!')
  } else {
    console.log('SUCCESS: Nigerian cities loaded:', nigerianCities.length)
  }
  

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/images/logo.png" alt="Tripma logo" />
          </div>
          <nav className="header-nav">
            <a href="#flights">Flights</a>
            <a href="#hotels">Hotels</a>
            <a href="#faq">FAQ</a>
            <a href="#signin">Sign in</a>
            <button className="signup-btn">Sign up</button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h1>Find your next adventure</h1>
          <p>Discover amazing destinations and book your perfect trip</p>
          <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>
            Available Nigerian cities: Lagos, Abuja, Port Harcourt, Owerri, Enugu, Asaba
          </p>
          <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
            <h4>Test: Nigerian Cities Loaded</h4>
            <p>Total cities: {nigerianCities.length}</p>
            <p>Cities: {nigerianCities.map(city => city.name).join(', ')}</p>
            <p>Test search for "Lagos": {searchNigerianCities('Lagos').length} results</p>
          </div>
        </div>

        <TestNigerianCities />

        <div className="search-form">
          <div className="form-row">
            <div className="input-group">
              <span className="icon">✈️</span>
              <input
                type="text"
                placeholder="From where?"
                value={fromLocation}
                onChange={handleFromLocationChange}
                onFocus={() => setShowFromSuggestions(fromLocation.length > 1)}
                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {fromSuggestions.slice(0, 6).map((city, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => selectFromLocation(city)}
                    >
                      <div className="suggestion-main">{city.fullName}</div>
                      <div className="suggestion-sub">{city.airport}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Debug info */}
              {fromSuggestions.length > 0 && (
                <div style={{fontSize: '12px', color: 'red', marginTop: '5px'}}>
                  Debug: {fromSuggestions.length} suggestions found
                </div>
              )}
            </div>
            <div className="input-group">
              <span className="icon">✈️</span>
              <input
                type="text"
                placeholder="Where to?"
                value={toLocation}
                onChange={handleToLocationChange}
                onFocus={() => setShowToSuggestions(toLocation.length > 1)}
                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {toSuggestions.slice(0, 6).map((city, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => selectToLocation(city)}
                    >
                      <div className="suggestion-main">{city.fullName}</div>
                      <div className="suggestion-sub">{city.airport}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Debug info */}
              {toSuggestions.length > 0 && (
                <div style={{fontSize: '12px', color: 'red', marginTop: '5px'}}>
                  Debug: {toSuggestions.length} suggestions found
                </div>
              )}
            </div>
            <div className="input-group">
              <span className="icon">📅</span>
              <input
                type="text"
                placeholder="Depart - Return"
                value={`${departDate} - ${returnDate}`}
                readOnly
              />
            </div>
            <div className="input-group">
              <span className="icon">👥</span>
              <input
                type="text"
                placeholder="Passengers"
                value={`${adults} adult${adults > 1 ? 's' : ''}`}
                readOnly
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
