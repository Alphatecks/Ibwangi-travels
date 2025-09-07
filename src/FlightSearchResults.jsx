import { useState } from 'react'
import './FlightSearchResults.css'
import PassengerInformation from './PassengerInformation'
// import { convertAndFormatUSDToNGN, formatNaira, convertUSDToNGN } from './utils/currency.js'

function FlightSearchResults({ searchData, onNavigate }) {
  console.log('🚀 FlightSearchResults component loaded!')
  console.log('📊 Search data received:', searchData)
  
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null)
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null)
  const [showPassengerInfo, setShowPassengerInfo] = useState(false)
  const [showAllFlights, setShowAllFlights] = useState(false)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedAirline, setSelectedAirline] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')

  // Mock flight data (fallback) - Updated to match the design
  const mockFlights = [
    {
      id: 1,
      airline: 'Hawaiian Airlines',
      airlineLogo: '✈️',
      departure: '7:00AM',
      arrival: '4:15PM',
      duration: '16h 45m',
      stops: '1 stop, 2h 45m in HNL',
      price: 624, // USD amount
      priceNGN: '₦936,000',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    },
    {
      id: 2,
      airline: 'Japan Airlines (JAL)',
      airlineLogo: '✈️',
      departure: '11:30AM',
      arrival: '8:45PM',
      duration: '18h 22m',
      stops: '1 stop, 2h 45m in HNL',
      price: 663,
      priceNGN: '₦994,500',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    },
    {
      id: 3,
      airline: 'Delta',
      airlineLogo: '✈️',
      departure: '2:15PM',
      arrival: '11:30PM',
      duration: '18h 22m',
      stops: 'Nonstop',
      price: 837,
      priceNGN: '₦1,255,500',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    },
    {
      id: 4,
      airline: 'United',
      airlineLogo: '✈️',
      departure: '9:45AM',
      arrival: '7:00PM',
      duration: '18h 22m',
      stops: '1 stop, 2h 45m in HNL',
      price: 789,
      priceNGN: '₦1,183,500',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    },
    {
      id: 5,
      airline: 'American Airlines',
      airlineLogo: '✈️',
      departure: '6:30AM',
      arrival: '3:45PM',
      duration: '18h 22m',
      stops: '1 stop, 2h 45m in HNL',
      price: 839,
      priceNGN: '₦1,258,500',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    },
    {
      id: 6,
      airline: 'Air Canada',
      airlineLogo: '✈️',
      departure: '1:00PM',
      arrival: '10:15PM',
      duration: '18h 22m',
      stops: 'Nonstop',
      price: 724,
      priceNGN: '₦1,086,000',
      type: 'round trip',
      from: 'SFO',
      to: 'NRT'
    }
  ]

  // Transform Amadeus API data to match existing UI format
  const transformAmadeusData = (amadeusFlights) => {
    if (!amadeusFlights || !Array.isArray(amadeusFlights)) {
      return []
    }

    return amadeusFlights.map((offer, index) => {
      const itinerary = offer.itineraries[0]
      const segments = itinerary.segments
      const firstSegment = segments[0]
      const lastSegment = segments[segments.length - 1]
      
      // Calculate total duration
      const departureTime = new Date(firstSegment.departure.at)
      const arrivalTime = new Date(lastSegment.arrival.at)
      const durationMs = arrivalTime - departureTime
      const hours = Math.floor(durationMs / (1000 * 60 * 60))
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
      
      // Format stops
      const stops = segments.length - 1
      const stopsText = stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`
      
      return {
        id: offer.id || index,
        airline: firstSegment.carrierCode || 'Unknown',
        airlineLogo: '✈️',
        departure: departureTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        arrival: arrivalTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        duration: `${hours}h ${minutes}m`,
        stops: stopsText,
        price: Math.round(parseFloat(offer.price.total)),
        priceNGN: '₦' + (Math.round(parseFloat(offer.price.total)) * 1500).toLocaleString(),
        type: searchData?.returnDate ? 'round trip' : 'one way',
        originalData: offer // Keep original data for booking
      }
    })
  }

  // Transform Skyscanner API data to match existing UI format
  const transformSkyscannerData = (skyscannerFlights) => {
    if (!skyscannerFlights || !Array.isArray(skyscannerFlights)) {
      return []
    }

    return skyscannerFlights.map((itinerary, index) => {
      const outboundLeg = itinerary.OutboundLegId
      const inboundLeg = itinerary.InboundLegId
      
      // For now, return basic structure - Skyscanner data is complex
      // This would need to be expanded based on actual Skyscanner response format
      return {
        id: itinerary.Id || index,
        airline: 'Skyscanner Flight',
        airlineLogo: '✈️',
        departure: 'TBD',
        arrival: 'TBD',
        duration: 'TBD',
        stops: 'TBD',
        price: Math.round(parseFloat(itinerary.PricingOptions?.[0]?.Price || 0)),
        priceNGN: '₦' + (Math.round(parseFloat(itinerary.PricingOptions?.[0]?.Price || 0)) * 1500).toLocaleString(),
        type: searchData?.returnDate ? 'round trip' : 'one way',
        originalData: itinerary,
        isSkyscannerData: true
      }
    })
  }

  // Use real data if available, otherwise fall back to mock data
  const flights = searchData?.flightOffers ? 
    (searchData.isSkyscannerData ? 
      transformSkyscannerData(searchData.flightOffers) : 
      transformAmadeusData(searchData.flightOffers)
    ) : mockFlights

  const airlines = ['all', ...new Set(flights.map(flight => flight.airline))]
  const seatClasses = ['all', 'Economy', 'Premium Economy', 'Business', 'First']

  // Handle flight selection
  const handleFlightSelection = (flight) => {
    if (searchData?.returnDate) {
      // Round trip - determine if this is departure or return
      if (!selectedDepartureFlight) {
        setSelectedDepartureFlight(flight)
      } else if (!selectedReturnFlight) {
        setSelectedReturnFlight(flight)
      } else {
        // Both selected, replace the return flight
        setSelectedReturnFlight(flight)
      }
    } else {
      // One way - just set departure
      setSelectedDepartureFlight(flight)
    }
  }

  // Check if flight is selected
  const isFlightSelected = (flight) => {
    return selectedDepartureFlight?.id === flight.id || selectedReturnFlight?.id === flight.id
  }

  // Handle passenger information button click
  const handlePassengerInfoClick = () => {
    setShowPassengerInfo(true)
  }

  // Handle back from passenger information
  const handleBackFromPassengerInfo = () => {
    setShowPassengerInfo(false)
  }

  const filteredFlights = flights.filter(flight => {
    const priceMatch = flight.price <= maxPrice
    const airlineMatch = selectedAirline === 'all' || flight.airline === selectedAirline
    return priceMatch && airlineMatch
  })

  const displayedFlights = showAllFlights ? filteredFlights : filteredFlights.slice(0, 3)

  // Generate price grid data from API results
  const generatePriceGrid = () => {
    if (!searchData?.flightOffers || searchData.flightOffers.length === 0) {
      // Return mock data if no API data
      return {
        headers: ['2/12', '2/13', '2/14', '2/15', '2/16'],
        rows: [
          { date: '3/7', prices: ['₦1,255,500', '₦887,000', '₦1,255,500', '₦1,255,500', '₦1,255,500'] },
          { date: '3/8', prices: ['₦887,000', '₦887,000', '₦887,000', '₦887,000', '₦887,000'] },
          { date: '3/9', prices: ['₦1,255,500', '₦887,000', '₦1,255,500', '₦1,255,500', '₦1,255,500'] },
          { date: '3/10', prices: ['₦1,962,000', '₦1,962,000', '₦1,962,000', '₦1,962,000', '₦1,962,000'] },
          { date: '3/11', prices: ['₦1,255,500', '₦887,000', '₦1,255,500', '₦1,255,500', '₦1,255,500'] }
        ]
      }
    }

    // Generate price grid from actual flight data
    const basePrice = flights.length > 0 ? flights[0].price : 624
    const priceVariation = 0.3 // 30% variation
    
    // Generate realistic date headers (next 5 days)
    const today = new Date()
    const headers = []
    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i + 1)
      headers.push(`${date.getMonth() + 1}/${date.getDate()}`)
    }
    
    const rows = []
    
    // Generate departure dates (next 5 days starting from day 7)
    for (let i = 0; i < 5; i++) {
      const rowPrices = []
      const departureDate = new Date(today)
      departureDate.setDate(today.getDate() + 7 + i)
      
      for (let j = 0; j < 5; j++) {
        // Generate varied prices based on base price and day of week
        const dayOfWeek = (departureDate.getDay() + j) % 7
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.2 : 1.0 // Weekend prices higher
        const variation = (Math.random() - 0.5) * priceVariation
        const price = Math.round(basePrice * (1 + variation) * weekendMultiplier)
        const priceNGN = Math.round(price * 1500)
        rowPrices.push(`₦${priceNGN.toLocaleString()}`)
      }
      
      rows.push({
        date: `${departureDate.getMonth() + 1}/${departureDate.getDate()}`,
        prices: rowPrices
      })
    }
    
    return { headers, rows }
  }

  const priceGridData = generatePriceGrid()

  // Show passenger information page if requested
  if (showPassengerInfo) {
    return (
      <PassengerInformation 
        selectedFlights={{
          departure: selectedDepartureFlight,
          return: selectedReturnFlight
        }}
        onNavigate={onNavigate}
        onBack={handleBackFromPassengerInfo}
      />
    )
  }

  return (
    <div className="flight-search-results">
      {/* Header - Same as homepage */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/images/logo.png" alt="Ibwangi travel logo" style={{ height: '160px', width: 'auto' }} />
          </div>
          <nav className="nav-links">
            <a 
              href="#flights" 
              onClick={(e) => { e.preventDefault(); onNavigate('flights'); }}
              className="active"
            >
              Flights
            </a>
            <a 
              href="#hotels" 
              onClick={(e) => { e.preventDefault(); onNavigate('hotels'); }}
            >
              Hotels
            </a>
            <a href="#faq">FAQ</a>
            <a 
              href="#signin" 
              onClick={(e) => { e.preventDefault(); onNavigate('signin'); }}
              className={onNavigate === 'signin' ? 'active' : ''}
            >
              Sign in
            </a>
          </nav>
          <button 
            className="signup-btn"
            onClick={() => onNavigate('signin')}
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Flight Search Form */}
      <div className="search-form-container">
        <div className="search-form">
          <div className="form-row">
            <div className="input-group">
              <span className="icon">✈️</span>
              <input 
                type="text" 
                placeholder="From where?" 
                value={searchData?.from || 'SFO'} 
                readOnly 
              />
            </div>
            <div className="input-group">
              <span className="icon">✈️</span>
              <input 
                type="text" 
                placeholder="Where to?" 
                value={searchData?.to || 'NRT'} 
                readOnly 
              />
            </div>
            <div className="input-group">
              <span className="icon">📅</span>
              <input 
                type="text" 
                placeholder="Depart - Return" 
                value={
                  searchData?.departDate && searchData?.returnDate 
                    ? `${searchData.departDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${searchData.returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : searchData?.departDate 
                    ? searchData.departDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'Feb 12 - Feb 16'
                } 
                readOnly 
              />
            </div>
            <div className="input-group">
              <span className="icon">👤</span>
              <input 
                type="text" 
                placeholder="1 adult" 
                value={`${searchData?.adults || 1} adult${(searchData?.adults || 1) > 1 ? 's' : ''}${searchData?.minors > 0 ? `, ${searchData.minors} minor${searchData.minors > 1 ? 's' : ''}` : ''}`} 
                readOnly 
              />
            </div>
            <button className="search-btn">Search</button>
          </div>
          
          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <label>Max price</label>
              <select>
                <option>Any price</option>
                <option>Under ₦500,000</option>
                <option>Under ₦1,000,000</option>
                <option>Under ₦1,500,000</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Stops</label>
              <select>
                <option>All</option>
                <option>Direct</option>
                <option>1 stop</option>
                <option>2+ stops</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Times</label>
              <select>
                <option>All</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Airlines</label>
              <select value={selectedAirline} onChange={(e) => setSelectedAirline(e.target.value)}>
                {airlines.map(airline => (
                  <option key={airline} value={airline}>{airline === 'all' ? 'All Airlines' : airline}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Seat class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                {seatClasses.map(seatClass => (
                  <option key={seatClass} value={seatClass}>{seatClass === 'all' ? 'All Classes' : seatClass}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>More</label>
              <select>
                <option>All</option>
                <option>Flexible dates</option>
                <option>Nearby airports</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-results">
        <div className="results-container">
          {/* Flight Listings */}
          <div className="flight-listings">
            <h2>
              {selectedDepartureFlight && !selectedReturnFlight && searchData?.returnDate 
                ? 'Choose a returning flight' 
                : 'Choose a Departing Flight'
              }
            </h2>
            <p className="route-info">
              {searchData?.from || 'Lagos (LOS)'} → {searchData?.to || 'Abuja (ABV)'} • 
              {searchData?.departDate ? searchData.departDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Feb 12'}
              {searchData?.returnDate ? ` - ${searchData.returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ' - Feb 16'} • 
              {searchData?.totalPassengers || 1} passenger{(searchData?.totalPassengers || 1) > 1 ? 's' : ''}
              {searchData?.apiUsed && (
                <span className="api-indicator"> • Powered by {searchData.apiUsed}</span>
              )}
            </p>
            
            {displayedFlights.map(flight => (
              <div 
                key={flight.id} 
                className={`flight-card ${isFlightSelected(flight) ? 'selected' : ''}`}
                onClick={() => handleFlightSelection(flight)}
              >
                <div className="flight-header">
                  <div className="airline-info">
                    <span className="airline-logo">{flight.airlineLogo}</span>
                    <span className="airline-name">{flight.airline}</span>
                  </div>
                  <div className="flight-price">{flight.priceNGN || '₦' + (flight.price * 1500).toLocaleString()} round trip</div>
                </div>
                
                <div className="flight-details">
                  <div className="time-info">
                    <div className="departure">
                      <span className="time">{flight.departure}</span>
                      <span className="airport">{flight.from ? flight.from.split('(')[1]?.replace(')', '') : 'LOS'}</span>
                    </div>
                    <div className="duration">
                      <span className="duration-text">{flight.duration}</span>
                      <span className="stops">{flight.stops}</span>
                    </div>
                    <div className="arrival">
                      <span className="time">{flight.arrival}</span>
                      <span className="airport">{flight.to ? flight.to.split('(')[1]?.replace(')', '') : 'ABV'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {!showAllFlights && filteredFlights.length > 3 && (
              <button 
                className="show-all-btn"
                onClick={() => setShowAllFlights(true)}
              >
                Show all flights
              </button>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            {/* Selected Flight Details */}
            {(selectedDepartureFlight || selectedReturnFlight) && (
              <div className="selected-flight-details">
                {/* Departure Flight */}
                {selectedDepartureFlight && (
                  <div className="selected-flight-card">
                    <div className="selected-flight-header">
                      <div className="airline-info">
                        <span className="airline-logo">{selectedDepartureFlight.airlineLogo}</span>
                        <span className="airline-name">{selectedDepartureFlight.airline}</span>
                      </div>
                      <div className="flight-number">FIG4312</div>
                    </div>
                    
                    <div className="selected-flight-info">
                      <div className="total-duration">{selectedDepartureFlight.duration} (+1d)</div>
                      <div className="flight-times">{selectedDepartureFlight.departure} - {selectedDepartureFlight.arrival}</div>
                      <div className="layover-info">{selectedDepartureFlight.stops}</div>
                    </div>
                  </div>
                )}

                {/* Return Flight */}
                {selectedReturnFlight && (
                  <div className="selected-flight-card">
                    <div className="selected-flight-header">
                      <div className="airline-info">
                        <span className="airline-logo">{selectedReturnFlight.airlineLogo}</span>
                        <span className="airline-name">{selectedReturnFlight.airline}</span>
                      </div>
                      <div className="flight-number">FIG4312</div>
                    </div>
                    
                    <div className="selected-flight-info">
                      <div className="total-duration">{selectedReturnFlight.duration} (+1d)</div>
                      <div className="flight-times">{selectedReturnFlight.departure} - {selectedReturnFlight.arrival}</div>
                      <div className="layover-info">{selectedReturnFlight.stops}</div>
                    </div>
                  </div>
                )}
                
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>₦{Math.round((selectedDepartureFlight?.price || 0) * 1500 * 0.8).toLocaleString()}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Taxes and Fees</span>
                    <span>₦{Math.round((selectedDepartureFlight?.price || 0) * 1500 * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>{selectedDepartureFlight?.priceNGN || '₦' + ((selectedDepartureFlight?.price || 0) * 1500).toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="save-close-btn" onClick={handlePassengerInfoClick}>
                  {selectedDepartureFlight && selectedReturnFlight ? 'Passenger information' : 'Save and close'}
                </button>
              </div>
            )}

            {/* Price Grid and History */}
            <div className="price-grid">
              <h3>Price grid (flexible dates)</h3>
              <div className="price-table">
                <div className="price-header">
                  <div className="empty-cell"></div>
                  {priceGridData.headers.map((header, index) => (
                    <div key={index} className="date-header">{header}</div>
                  ))}
                </div>
                {priceGridData.rows.map((row, index) => (
                  <div key={index} className="price-row">
                    <div className="date-label">{row.date}</div>
                    {row.prices.map((price, priceIndex) => (
                      <div key={priceIndex} className="price-cell">{price}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="price-history">
              <h3>Price history</h3>
              <div className="chart-placeholder">
                <div className="chart-line"></div>
                <div className="chart-points">
                  <span>₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 0.3).toLocaleString()}</span>
                  <span>₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 0.6).toLocaleString()}</span>
                  <span>₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 0.9).toLocaleString()}</span>
                  <span>₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 1.2).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="price-rating">
              <h3>Price rating</h3>
              <div className="rating-content">
                <div className="rating-badge">Buy soon</div>
                <p>We recommend booking soon. The average cost of this flight is ₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 0.9).toLocaleString()}, but could rise 18% to ₦{Math.round((priceGridData.rows[0]?.prices[0]?.replace(/[₦,]/g, '') || 1255500) * 1.06).toLocaleString()} in two weeks.</p>
                <p>Ibwangi analyzes thousands of flights, prices, and trends to ensure you get the best deal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Route Map */}
      <div className="flight-map-section">
        <h3>Flight Route</h3>
        <div className="map-container">
          <img src="/images/flights/flight-map.png" alt="Flight route from SFO to NRT" className="flight-route-map" />
          <div className="route-info-overlay">
            <div className="route-points">
              <span className="origin">SFO</span>
              <span className="route-line">✈️</span>
              <span className="destination">NRT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Places to Stay */}
      <div className="places-to-stay">
        <div className="section-header">
          <h2>Find Places to Stay in Japan</h2>
          <a href="#all-stays" className="all-link">All →</a>
        </div>
        <div className="stays-grid">
          <div className="stay-card">
            <div className="stay-image hotel-kaneyamaen"></div>
            <div className="stay-content">
              <h3>Hotel Kaneyamaen and Bessho SASA</h3>
              <p>Mount Fuji, traditional ryokan, onsen bath, kaiseki dinner</p>
            </div>
          </div>
          <div className="stay-card">
            <div className="stay-image hotel-flag"></div>
            <div className="stay-content">
              <h3>HOTEL THE FLAG 大阪市</h3>
              <p>Osaka, Dotonbori food culture, Shinsaibashi shopping street</p>
            </div>
          </div>
          <div className="stay-card">
            <div className="stay-image capsule-hotel"></div>
            <div className="stay-content">
              <h3>9 Hours Shinjuku</h3>
              <p>Unique Japanese capsule hotel, Shinjuku, proximity to train stations</p>
            </div>
          </div>
        </div>
      </div>

      {/* People Also Searched For */}
      <div className="people-searched">
        <div className="section-header">
          <h2>People in San Francisco also searched for</h2>
          <a href="#all-searches" className="all-link">All →</a>
        </div>
        <div className="searches-grid">
          <div className="search-card">
            <div className="search-image shanghai"></div>
            <div className="search-content">
              <h3>Shanghai, China</h3>
              <p>An international city rich in culture</p>
              <div className="search-price">$598</div>
            </div>
          </div>
          <div className="search-card">
            <div className="search-image nairobi"></div>
            <div className="search-content">
              <h3>Nairobi, Kenya</h3>
              <p>Dubbed the Safari Capital of the World</p>
              <div className="search-price">$1,248</div>
            </div>
          </div>
          <div className="search-card">
            <div className="search-image seoul"></div>
            <div className="search-content">
              <h3>Seoul, South Korea</h3>
              <p>This modern city is a traveler's dream</p>
              <div className="search-price">$589</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Same as homepage */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Ibwangi travel logo" style={{ height: '160px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Ibwangi travel</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#forum">Forum</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Partner with us</h4>
            <ul>
              <li><a href="#partnerships">Partnership programs</a></li>
              <li><a href="#affiliate">Affiliate program</a></li>
              <li><a href="#connectivity">Connectivity partners</a></li>
              <li><a href="#promotions">Promotions and events</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#loyalty">Loyalty program</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact us</a></li>
              <li><a href="#privacy">Privacy policy</a></li>
              <li><a href="#terms">Terms of service</a></li>
              <li><a href="#trust">Trust and safety</a></li>
              <li><a href="#accessibility">Accessibility</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Get the app</h4>
            <p>Ibwangi for Android</p>
            <p>Ibwangi for iOS</p>
            <p>Mobile site</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">© 2020 Ibwangi travel incorporated</div>
        </div>
      </footer>
    </div>
  )
}

export default FlightSearchResults
