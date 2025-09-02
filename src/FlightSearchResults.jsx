import { useState } from 'react'
import './FlightSearchResults.css'

function FlightSearchResults({ onNavigate }) {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [showAllFlights, setShowAllFlights] = useState(false)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedAirline, setSelectedAirline] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')

  // Realistic flight data
  const flights = [
    {
      id: 1,
      airline: 'Hawaiian Airlines',
      airlineLogo: '✈️',
      departure: '7:00AM',
      arrival: '4:15PM',
      duration: '16h 45m',
      stops: '1 stop, 2h 45m in HNL',
      price: 624,
      type: 'round trip'
    },
    {
      id: 2,
      airline: 'Japan Airlines',
      airlineLogo: '✈️',
      departure: '11:30AM',
      arrival: '8:45PM',
      duration: '15h 15m',
      stops: 'Nonstop',
      price: 689,
      type: 'round trip'
    },
    {
      id: 3,
      airline: 'Delta',
      airlineLogo: '✈️',
      departure: '2:15PM',
      arrival: '11:30PM',
      duration: '17h 15m',
      stops: '1 stop, 3h 15m in LAX',
      price: 739,
      type: 'round trip'
    },
    {
      id: 4,
      airline: 'United',
      airlineLogo: '✈️',
      departure: '9:45AM',
      arrival: '7:00PM',
      duration: '16h 15m',
      stops: '1 stop, 1h 45m in SFO',
      price: 789,
      type: 'round trip'
    },
    {
      id: 5,
      airline: 'American Airlines',
      airlineLogo: '✈️',
      departure: '6:30AM',
      arrival: '3:45PM',
      duration: '18h 15m',
      stops: '2 stops, 4h total',
      price: 839,
      type: 'round trip'
    },
    {
      id: 6,
      airline: 'Korean Air',
      airlineLogo: '✈️',
      departure: '1:00PM',
      arrival: '10:15PM',
      duration: '16h 15m',
      stops: '1 stop, 2h 30m in ICN',
      price: 724,
      type: 'round trip'
    }
  ]

  const airlines = ['all', 'Hawaiian Airlines', 'Japan Airlines', 'Delta', 'United', 'American Airlines', 'Korean Air']
  const seatClasses = ['all', 'Economy', 'Premium Economy', 'Business', 'First']

  const filteredFlights = flights.filter(flight => {
    const priceMatch = flight.price <= maxPrice
    const airlineMatch = selectedAirline === 'all' || flight.airline === selectedAirline
    return priceMatch && airlineMatch
  })

  const displayedFlights = showAllFlights ? filteredFlights : filteredFlights.slice(0, 3)

  return (
    <div className="flight-search-results">
      {/* Header - Same as homepage */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/images/logo.png" alt="Tripma logo" style={{ height: '160px', width: 'auto' }} />
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
            <a href="#packages">Packages</a>
            <a href="#signin">Sign in</a>
          </nav>
          <button className="signup-btn">Sign up</button>
        </div>
      </header>

      {/* Flight Search Form */}
      <div className="search-form-container">
        <div className="search-form">
          <div className="form-row">
            <div className="input-group">
              <span className="icon">✈️</span>
              <input type="text" placeholder="From where?" value="SFO" readOnly />
            </div>
            <div className="input-group">
              <span className="icon">✈️</span>
              <input type="text" placeholder="Where to?" value="NRT" readOnly />
            </div>
            <div className="input-group">
              <span className="icon">📅</span>
              <input type="text" placeholder="Depart - Return" value="Feb 12 - Feb 16" readOnly />
            </div>
            <div className="input-group">
              <span className="icon">👤</span>
              <input type="text" placeholder="1 adult" value="1 adult" readOnly />
            </div>
            <button className="search-btn">Search</button>
          </div>
          
          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <label>Max price: ${maxPrice}</label>
              <input 
                type="range" 
                min="500" 
                max="1500" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="filter-group">
              <label>Shops</label>
              <select>
                <option>All</option>
                <option>Direct</option>
                <option>1 stop</option>
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
            <h2>Choose a Departing Flight</h2>
            <p className="route-info">SFO → NRT • Feb 12 - Feb 16 • 1 adult</p>
            
            {displayedFlights.map(flight => (
              <div 
                key={flight.id} 
                className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}
                onClick={() => setSelectedFlight(flight)}
              >
                <div className="flight-header">
                  <div className="airline-info">
                    <span className="airline-logo">{flight.airlineLogo}</span>
                    <span className="airline-name">{flight.airline}</span>
                  </div>
                  <div className="flight-price">${flight.price} round trip</div>
                </div>
                
                <div className="flight-details">
                  <div className="time-info">
                    <div className="departure">
                      <span className="time">{flight.departure}</span>
                      <span className="airport">SFO</span>
                    </div>
                    <div className="duration">
                      <span className="duration-text">{flight.duration}</span>
                      <span className="stops">{flight.stops}</span>
                    </div>
                    <div className="arrival">
                      <span className="time">{flight.arrival}</span>
                      <span className="airport">NRT</span>
                    </div>
                  </div>
                </div>
                
                <div className="flight-actions">
                  <button className="select-flight-btn">Select</button>
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

          {/* Price Grid and History */}
          <div className="price-sidebar">
            <div className="price-grid">
              <h3>Price grid (flexible dates)</h3>
              <div className="price-table">
                <div className="price-row">
                  <span>Feb 12 - Feb 16</span>
                  <span className="price">$624</span>
                </div>
                <div className="price-row">
                  <span>Feb 19 - Feb 23</span>
                  <span className="price">$592</span>
                </div>
                <div className="price-row">
                  <span>Mar 7 - Mar 11</span>
                  <span className="price">$837</span>
                </div>
                <div className="price-row">
                  <span>Mar 14 - Mar 18</span>
                  <span className="price">$1,308</span>
                </div>
              </div>
            </div>
            
            <div className="price-history">
              <h3>Price history</h3>
              <div className="chart-placeholder">
                <div className="chart-line"></div>
                <div className="chart-points">
                  <span>$250</span>
                  <span>$500</span>
                  <span>$750</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>
            
            <div className="price-rating">
              <h3>Price rating</h3>
              <div className="rating-content">
                <div className="rating-badge">Buy soon</div>
                <p>The average cost of this flight is $750, but could rise 18% to $885 in two weeks. Tripma analyzes thousands of flights, prices, and trends to ensure you get the best deal.</p>
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
      </div>

      {/* Footer - Same as homepage */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Tripma logo" style={{ height: '160px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Tripma</a></li>
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
            <p>Tripma for Android</p>
            <p>Tripma for iOS</p>
            <p>Mobile site</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#instagram">📷</a>
            <a href="#twitter">🐦</a>
            <a href="#facebook">📘</a>
          </div>
          <div className="copyright">© 2020 Tripma incorporated</div>
        </div>
      </footer>
    </div>
  )
}

export default FlightSearchResults
