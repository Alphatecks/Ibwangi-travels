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

  const handleGuestChange = (type, operation, event) => {
    event.stopPropagation()
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
            <img src="/images/logo.png" alt="Ibwangi travel logo" style={{ height: '160px', width: 'auto' }} />
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
                          <span className="guest-subtitle">Ages 13 or above</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={(e) => handleGuestChange('adults', 'decrement', e)} disabled={adults <= 1}>-</button>
                          <span>{adults}</span>
                          <button onClick={(e) => handleGuestChange('adults', 'increment', e)}>+</button>
                        </div>
                      </div>
                      
                      <div className="guest-row">
                        <div className="guest-label">
                          <span>Children</span>
                          <span className="guest-subtitle">Ages 0 to 12</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={(e) => handleGuestChange('children', 'decrement', e)} disabled={children <= 0}>-</button>
                          <span>{children}</span>
                          <button onClick={(e) => handleGuestChange('children', 'increment', e)}>+</button>
                        </div>
                      </div>
                      
                      <div className="guest-row">
                        <div className="guest-label">
                          <span>Rooms</span>
                          <span className="guest-subtitle">Number of rooms</span>
                        </div>
                        <div className="guest-controls">
                          <button onClick={(e) => handleGuestChange('rooms', 'decrement', e)} disabled={rooms <= 1}>-</button>
                          <span>{rooms}</span>
                          <button onClick={(e) => handleGuestChange('rooms', 'increment', e)}>+</button>
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
              <img src="https://res.klook.com/image/upload/fl_lossy.progressive,c_fill,f_auto,w_750,q_85/v1753091178/hotel/qo84pp0lk3dhctr01zkb.jpg" alt="Tokyo" />
              <div className="destination-info">
                <h3>Tokyo</h3>
                <p>1,234 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="https://assets.hiltonstatic.com/hilton-asset-cache/image/upload/c_fill,w_5333,h_3000,q_90,f_auto/c_fill,w_1920,h_1080,q_90,f_auto/Imagery/Property%20Photography/NoBrand/I/ITMOLOL/Exterior.jpg" alt="Kyoto" />
              <div className="destination-info">
                <h3>Kyoto</h3>
                <p>892 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="https://media-cdn.tripadvisor.com/media/photo-s/0d/e9/75/2f/caption.jpg" alt="Osaka" />
              <div className="destination-info">
                <h3>Osaka</h3>
                <p>756 properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img src="https://cdn-ilanhlf.nitrocdn.com/AzmJrPQohnwWLiYOIRijiymirQDdSgxs/assets/images/optimized/rev-1120628/theluxuryeditor.com/wp-content/uploads/2022/11/395763524.jpeg" alt="Hiroshima" />
              <div className="destination-info">
                <h3>Hiroshima</h3>
                <p>423 properties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekend Deals Section */}
        <section className="weekend-deals-section">
          <div className="section-header">
            <h2>Deals for the weekend</h2>
            <p>Save on stays for September 5 - September 7</p>
          </div>
          
          <div className="weekend-deals-grid">
            <div className="weekend-deal-card">
              <div className="deal-image">
                <img src="https://www.travelstart.com.ng/blog/wp-content/uploads/2014/02/Obudu-Cattle-Ranch1.jpg" alt="Obudu Cattle Ranch Resort" />
                <div className="genius-badge">Genius</div>
                <div className="heart-icon">❤️</div>
              </div>
              <div className="deal-content">
                <div className="deal-header">
                  <h3>Obudu Cattle Ranch Resort</h3>
                  <div className="deal-location">Cross River, Nigeria</div>
                </div>
                <div className="deal-rating">
                  <span className="rating-score">8.3</span>
                  <span className="rating-text">Very Good</span>
                  <span className="review-count">356 reviews</span>
                </div>
                <div className="deal-badge">Getaway Deal</div>
                <div className="deal-price">
                  <span className="current-price">NGN 207,969</span>
                  <span className="original-price">NGN 244,669</span>
                  <span className="price-duration">for 2 nights</span>
                </div>
              </div>
            </div>
            
            <div className="weekend-deal-card">
              <div className="deal-image">
                <img src="https://olatorera.com/wp-content/uploads/2020/11/Obudu-Mountain-Resort-water-park.jpg" alt="Obudu Mountain Resort" />
                <div className="heart-icon">❤️</div>
              </div>
              <div className="deal-content">
                <div className="deal-header">
                  <h3>Obudu Mountain Resort & Water Park</h3>
                  <div className="deal-location">Cross River, Nigeria</div>
                </div>
                <div className="deal-rating">
                  <span className="rating-score">7.0</span>
                  <span className="rating-text">Good</span>
                  <span className="review-count">266 reviews</span>
                </div>
                <div className="deal-badge">Getaway Deal</div>
                <div className="deal-price">
                  <span className="current-price">NGN 80,771</span>
                  <span className="original-price">NGN 95,023</span>
                  <span className="price-duration">for 2 nights</span>
                </div>
              </div>
            </div>
            
            <div className="weekend-deal-card">
              <div className="deal-image">
                <img src="https://images.nigeriapropertycentre.com/properties/images/1443085/06311388a8210b-luxurious-beach-resort-wall-shades-of-luxury-short-let-ilashe-lagos.jpg" alt="Luxurious Beach Resort" />
                <div className="genius-badge">Genius</div>
                <div className="heart-icon">❤️</div>
              </div>
              <div className="deal-content">
                <div className="deal-header">
                  <h3>Shades of Luxury Beach Resort</h3>
                  <div className="deal-location">Ilashe, Lagos</div>
                </div>
                <div className="deal-rating">
                  <span className="rating-score">7.9</span>
                  <span className="rating-text">Good</span>
                  <span className="review-count">13 reviews</span>
                </div>
                <div className="deal-price">
                  <span className="current-price">NGN 259,395</span>
                  <span className="original-price">NGN 418,384</span>
                  <span className="price-duration">for 2 nights</span>
                </div>
              </div>
            </div>
            
            <div className="weekend-deal-card">
              <div className="deal-image">
                <img src="https://www.mysaltbeach.com/wp-content/uploads/2022/08/Fluer-De-sel-room-768x660.jpg" alt="Fleur De Sel Beach Resort" />
                <div className="heart-icon">❤️</div>
                <div className="carousel-arrow">→</div>
              </div>
              <div className="deal-content">
                <div className="deal-header">
                  <h3>Fleur De Sel Beach Resort</h3>
                  <div className="deal-location">Lagos, Nigeria</div>
                </div>
                <div className="deal-rating">
                  <span className="rating-score">8.8</span>
                  <span className="rating-text">Excellent</span>
                  <span className="review-count">40 reviews</span>
                </div>
                <div className="deal-badge">Getaway Deal</div>
                <div className="deal-price">
                  <span className="current-price">NGN 187,172</span>
                  <span className="original-price">NGN 233,965</span>
                  <span className="price-duration">for 2 nights</span>
                </div>
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
            <p>Ibwangi travel for Android</p>
            <p>Ibwangi travel for iOS</p>
            <p>Mobile site</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#instagram">📷</a>
            <a href="#twitter">🐦</a>
            <a href="#facebook">📘</a>
          </div>
          <div className="copyright">© 2020 Ibwangi travel incorporated</div>
        </div>
      </footer>
    </div>
  )
}

export default HotelsPage