import { useState } from 'react'
import './HotelsPage.css'

function HotelsPage({ onNavigate }) {
  const [destination, setDestination] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState('2 adults • 0 children • 1 room')
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleSearch = () => {
    console.log('Searching hotels...', {
      destination,
      checkInDate,
      checkOutDate,
      adults,
      children,
      rooms
    })
  }

  const updateGuestDisplay = () => {
    const guestText = `${adults} adult${adults !== 1 ? 's' : ''} • ${children} children • ${rooms} room${rooms !== 1 ? 's' : ''}`
    setGuests(guestText)
  }

  const handleGuestChange = (type, operation) => {
    if (type === 'adults') {
      if (operation === 'increment') setAdults(prev => prev + 1)
      else if (operation === 'decrement' && adults > 1) setAdults(prev => prev - 1)
    } else if (type === 'children') {
      if (operation === 'increment') setChildren(prev => prev + 1)
      else if (operation === 'decrement' && children > 0) setChildren(prev => prev - 1)
    } else if (type === 'rooms') {
      if (operation === 'increment') setRooms(prev => prev + 1)
      else if (operation === 'decrement' && rooms > 1) setRooms(prev => prev - 1)
    }
    setTimeout(updateGuestDisplay, 0)
  }

  return (
    <div className="hotels-page">
      {/* Header - Same as existing */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/images/logo.png" alt="Tripma logo" style={{ height: '160px', width: 'auto' }} />
          </div>
          <nav className="nav-links">
            <a 
              href="#flights" 
              onClick={(e) => { e.preventDefault(); onNavigate('flights'); }}
            >
              Flights
            </a>
            <a 
              href="#hotels" 
              onClick={(e) => { e.preventDefault(); onNavigate('hotels'); }}
              className="active"
            >
              Hotels
            </a>
            <a href="#packages">Packages</a>
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

      {/* Hero Section with Search */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find your next stay</h1>
          <p>Search deals on hotels, homes, and much more...</p>
          
          <div className="search-form">
            <div className="search-container">
              <div className="search-inputs">
                <div className="input-group destination-input">
                  <span className="input-icon">🏨</span>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                
                <div className="input-group dates-input">
                  <span className="input-icon">📅</span>
                  <input
                    type="text"
                    placeholder="Check-in date — Check-out date"
                    value={checkInDate && checkOutDate ? `${checkInDate} — ${checkOutDate}` : ''}
                    readOnly
                    onClick={() => {
                      // Date picker functionality would go here
                      setCheckInDate('Dec 15')
                      setCheckOutDate('Dec 18')
                    }}
                  />
                </div>
                
                <div className="input-group guests-input" onClick={() => setShowGuestSelector(!showGuestSelector)}>
                  <span className="input-icon">👥</span>
                  <input
                    type="text"
                    placeholder="2 adults • 0 children • 1 room"
                    value={guests}
                    readOnly
                  />
                  
                  {showGuestSelector && (
                    <div className="guest-selector">
                      <div className="guest-row">
                        <div className="guest-label">
                          <span>Adults</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={() => handleGuestChange('adults', 'decrement')} disabled={adults <= 1}>-</button>
                          <span>{adults}</span>
                          <button onClick={() => handleGuestChange('adults', 'increment')}>+</button>
                        </div>
                      </div>
                      
                      <div className="guest-row">
                        <div className="guest-label">
                          <span>Children</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={() => handleGuestChange('children', 'decrement')} disabled={children <= 0}>-</button>
                          <span>{children}</span>
                          <button onClick={() => handleGuestChange('children', 'increment')}>+</button>
                        </div>
                      </div>
                      
                      <div className="guest-row">
                        <div className="guest-label">
                          <span>Rooms</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={() => handleGuestChange('rooms', 'decrement')} disabled={rooms <= 1}>-</button>
                          <span>{rooms}</span>
                          <button onClick={() => handleGuestChange('rooms', 'increment')}>+</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Offers Section */}
        <section className="offers-section">
          <h2>Offers</h2>
          <p>Promotions, deals, and special offers for you</p>
          
          <div className="offer-card">
            <div className="offer-content">
              <h3>Quick escape, quality time</h3>
              <p>Save up to 20% with a Getaway Deal</p>
              <button className="offer-button">Save on stays</button>
            </div>
            <div className="offer-image">
              <img src="/images/image.png" alt="Getaway deal" />
            </div>
          </div>
        </section>

        {/* Browse by Property Type */}
        <section className="property-types-section">
          <h2>Browse by property type</h2>
          
          <div className="property-grid">
            <div className="property-card">
              <img src="/images/image.png" alt="Hotels" />
              <div className="property-info">
                <h3>Hotels</h3>
                <span>873,726 properties</span>
              </div>
            </div>
            
            <div className="property-card">
              <img src="/images/image 2.png" alt="Apartments" />
              <div className="property-info">
                <h3>Apartments</h3>
                <span>834,564 properties</span>
              </div>
            </div>
            
            <div className="property-card">
              <img src="/images/image 3.png" alt="Resorts" />
              <div className="property-info">
                <h3>Resorts</h3>
                <span>17,189 properties</span>
              </div>
            </div>
            
            <div className="property-card">
              <img src="/images/image 4.png" alt="Villas" />
              <div className="property-info">
                <h3>Villas</h3>
                <span>417,896 properties</span>
              </div>
            </div>
            
            <div className="property-card">
              <img src="/images/image 5.png" alt="Cabins" />
              <div className="property-info">
                <h3>Cabins</h3>
                <span>34,552 properties</span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="destinations-section">
          <h2>Explore popular destinations</h2>
          
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="/images/image 2.png" alt="Tokyo" />
              <div className="destination-info">
                <h3>Tokyo</h3>
                <p>1,234 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="/images/image 3.png" alt="Kyoto" />
              <div className="destination-info">
                <h3>Kyoto</h3>
                <p>892 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="/images/image 4.png" alt="Osaka" />
              <div className="destination-info">
                <h3>Osaka</h3>
                <p>756 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="/images/image 5.png" alt="Hiroshima" />
              <div className="destination-info">
                <h3>Hiroshima</h3>
                <p>423 properties</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as existing */}
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

export default HotelsPage