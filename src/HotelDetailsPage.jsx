import { useState } from 'react'
import './HotelDetailsPage.css'

function HotelDetailsPage({ hotelData, onNavigate, onBack }) {
  console.log('HotelDetailsPage rendered with data:', hotelData)
  
  if (!hotelData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>No hotel data provided</h1>
        <button onClick={onBack}>Go Back</button>
      </div>
    )
  }

  const [favorites, setFavorites] = useState(new Set())
  const [popAnimation, setPopAnimation] = useState(null)
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 300000 })

  const handleFavoriteToggle = (propertyId, event) => {
    event.stopPropagation()
    setPopAnimation(propertyId)
    
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId)
      } else {
        newFavorites.add(propertyId)
      }
      return newFavorites
    })
    
    setTimeout(() => {
      setPopAnimation(null)
    }, 300)
  }

  const handlePriceRangeChange = (type, value) => {
    const numValue = parseInt(value)
    if (type === 'min') {
      setPriceRange(prev => ({ ...prev, min: Math.min(numValue, prev.max - 1000) }))
    } else {
      setPriceRange(prev => ({ ...prev, max: Math.max(numValue, prev.min + 1000) }))
    }
  }

  const formatPrice = (price) => {
    return `NGN ${price.toLocaleString()}`
  }

  // Other hotels from weekend deals (excluding current one)
  const otherHotels = [
    {
      id: 'obudu-cattle-ranch',
      name: 'Obudu Cattle Ranch Resort',
      location: 'Cross River, Nigeria',
      rating: 8.3,
      ratingText: 'Very Good',
      reviewCount: 356,
      price: 'NGN 207,969',
      originalPrice: 'NGN 244,669',
      image: 'https://www.travelstart.com.ng/blog/wp-content/uploads/2014/02/Obudu-Cattle-Ranch1.jpg',
      badge: 'Getaway Deal'
    },
    {
      id: 'obudu-mountain-resort',
      name: 'Obudu Mountain Resort & Water Park',
      location: 'Cross River, Nigeria',
      rating: 7.0,
      ratingText: 'Good',
      reviewCount: 266,
      price: 'NGN 80,771',
      originalPrice: 'NGN 95,023',
      image: 'https://olatorera.com/wp-content/uploads/2020/11/Obudu-Mountain-Resort-water-park.jpg',
      badge: 'Getaway Deal'
    },
    {
      id: 'shades-of-luxury',
      name: 'Shades of Luxury Beach Resort',
      location: 'Ilashe, Lagos',
      rating: 7.9,
      ratingText: 'Good',
      reviewCount: 13,
      price: 'NGN 259,395',
      originalPrice: 'NGN 418,384',
      image: 'https://images.nigeriapropertycentre.com/properties/images/1443085/06311388a8210b-luxurious-beach-resort-wall-shades-of-luxury-short-let-ilashe-lagos.jpg'
    }
  ].filter(hotel => hotel.id !== hotelData.id)

  return (
    <div className="hotel-details-page">
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
            <a href="#faq">FAQ</a>
            <a 
              href="#signin" 
              onClick={(e) => { e.preventDefault(); onNavigate('signin'); }}
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


      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Left Sidebar - Filters */}
        <div className="filters-sidebar">
          <button className="back-to-hotels-btn" onClick={onBack}>
            ← Back to hotels
          </button>
          <h3 className="filter-title">Filter by:</h3>
          
          {/* Budget Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">Your budget (per night)</h4>
            <div className="price-range-container">
              <div className="price-chart">
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
                <div className="price-bar"></div>
              </div>
              <div className="price-slider">
                <div className="slider-container">
                  <div className="slider-track">
                    <div 
                      className="slider-range"
                      style={{
                        left: `${((priceRange.min - 10000) / (300000 - 10000)) * 100}%`,
                        width: `${((priceRange.max - priceRange.min) / (300000 - 10000)) * 100}%`
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="300000"
                    step="1000"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="range-input range-min"
                  />
                  <input
                    type="range"
                    min="10000"
                    max="300000"
                    step="1000"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="range-input range-max"
                  />
                </div>
                <div className="price-labels">
                  <span>{formatPrice(priceRange.min)}</span>
                  <span>{formatPrice(priceRange.max)}+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Filters */}
          <div className="filter-section">
            <h4 className="filter-section-title">Popular filters</h4>
            <div className="filter-checkboxes">
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Hotels <span className="count">(80)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Free Wifi <span className="count">(124)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Apartments <span className="count">(87)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Swimming pool <span className="count">(60)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                4 stars <span className="count">(32)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Free cancellation <span className="count">(131)</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Hotel or similar <span className="count">(84)</span>
              </label>
              <div className="filter-subtext">Chains, resorts & more</div>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Airport shuttle <span className="count">(58)</span>
              </label>
            </div>
          </div>

          {/* Property Type */}
          <div className="filter-section">
            <h4 className="filter-section-title">Property Type</h4>
            <div className="property-type-dropdown">
              <div className="dropdown-selected">Hotel or similar</div>
              <div className="dropdown-subtext">Chains, resorts & more</div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="content-area">
          {/* Map and Search Header */}
          <div className="search-header">
            <div className="map-section">
              <div className="mini-map">
                <div className="map-placeholder">Ikeja</div>
                <button className="show-map-btn">Show on map</button>
              </div>
              <div className="map-attribution">©2025 Google</div>
            </div>
            
            <div className="search-info">
              <h1 className="search-title">Ikeja: 156 properties found</h1>
              
              <div className="search-controls">
                <div className="sort-dropdown">
                  <span>Sort by: </span>
                  <select>
                    <option>Our top picks</option>
                  </select>
                </div>
                <div className="view-buttons">
                  <button className="view-btn active">List</button>
                  <button className="view-btn">Grid</button>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Advisory */}
          <div className="travel-advisory">
            <p>Review any travel advisories provided by your government to make an informed decision about your stay in this area, which may be considered conflict-affected.</p>
          </div>

          {/* Main Content */}
          <main className="hotel-details-main">
        <div className="hotel-details-container">
          {/* Hotel Image */}
          <div className="hotel-image-container">
            <img src={hotelData.image} alt={hotelData.name} className="hotel-main-image" />
            <div 
              className={`heart-icon ${favorites.has(hotelData.id) ? 'favorited' : ''} ${popAnimation === hotelData.id ? 'pop' : ''}`}
              onClick={(e) => handleFavoriteToggle(hotelData.id, e)}
            >
              {favorites.has(hotelData.id) ? '❤️' : '🤍'}
            </div>
          </div>

          {/* Hotel Info */}
          <div className="hotel-info-section">
            <div className="hotel-main-info">
              {/* Hotel Header with Name, Stars, and Featured Tag */}
              <div className="hotel-header">
                <div className="hotel-title-row">
                  <h1 className="hotel-name">{hotelData.name}</h1>
                  <div className="stars">
                    {(() => {
                      const rating = parseFloat(hotelData.rating) || 0;
                      const filledStars = Math.max(0, Math.min(5, Math.floor(rating)));
                      return '★'.repeat(filledStars);
                    })()}
                  </div>
                  <span className="featured-tag">Featured</span>
                </div>
              </div>

              {/* Location Row */}
              <div className="hotel-location">
                <span className="location-text">{hotelData.location}</span>
                <a href="#map" className="show-on-map">Show on map</a>
                <span className="distance">0.7 km from downtown</span>
              </div>

              {/* Deal Badge */}
              <div className="deal-badge">{hotelData.badge}</div>

              {/* Room Details */}
              <div className="room-details">
                <h3 className="room-type">Standard Studio</h3>
                <div className="room-info">
                  <span>Entire studio • 1 bathroom • 18 m²</span>
                  <span>1 twin bed</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="inclusions">
                <div className="inclusion-item">
                  <span className="checkmark">✓</span>
                  <span>Breakfast included</span>
                </div>
                <div className="inclusion-item">
                  <span className="checkmark">✓</span>
                  <span>No prepayment needed – pay at the property</span>
                </div>
              </div>

              {/* Availability Warning */}
              <div className="availability-warning">
                Only 1 left at this price on our site
              </div>
            </div>

            <div className="hotel-sidebar">
              {/* Rating Badge */}
              <div className="rating-badge">
                <div className="rating-text">{hotelData.ratingText}</div>
                <div className="rating-score">{hotelData.rating}</div>
                <div className="review-count">{hotelData.reviewCount} reviews</div>
              </div>

              {/* Pricing */}
              <div className="pricing-section">
                <div className="price-duration">2 nights, 2 adults</div>
                <div className="price-display">
                  <span className="original-price">{hotelData.originalPrice}</span>
                  <span className="current-price">{hotelData.price}</span>
                  <span className="price-info">Includes taxes and fees</span>
                </div>
                <button className="see-availability-btn">
                  See availability &gt;
                </button>
              </div>

              {/* Genius Program */}
              <div className="genius-section">
                <div className="genius-logo">Genius</div>
                <p>See if you can save 10% or more at this property – sign in</p>
              </div>
            </div>
          </div>
        </div>

        {/* More Properties Section */}
        <div className="more-properties-section">
          <h2>More properties you might like</h2>
          <p>Properties similar to {hotelData.name}</p>
          
          <div className="more-properties-grid">
            {otherHotels.slice(0, 3).map(hotel => (
              <div key={hotel.id} className="more-property-card">
                <div className="property-image-container">
                  <img src={hotel.image} alt={hotel.name} className="property-image" />
                  <div 
                    className={`heart-icon ${favorites.has(hotel.id) ? 'favorited' : ''} ${popAnimation === hotel.id ? 'pop' : ''}`}
                    onClick={(e) => handleFavoriteToggle(hotel.id, e)}
                  >
                    {favorites.has(hotel.id) ? '❤️' : '🤍'}
                  </div>
                </div>
                <div className="property-content">
                  <h3 className="property-name">{hotel.name}</h3>
                  <div className="property-location">{hotel.location}</div>
                  <div className="property-rating">
                    <span className="rating-score">{hotel.rating}</span>
                    <span className="rating-text">{hotel.ratingText}</span>
                    <span className="review-count">{hotel.reviewCount} reviews</span>
                  </div>
                  {hotel.badge && (
                    <div className="property-badge">{hotel.badge}</div>
                  )}
                  <div className="property-pricing">
                    <span className="original-price">{hotel.originalPrice}</span>
                    <span className="current-price">{hotel.price}</span>
                    <span className="price-duration">for 2 nights</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </main>
        </div>
      </div>

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
          <div className="copyright">© 2020 Ibwangi travel incorporated</div>
        </div>
      </footer>
    </div>
  )
}

export default HotelDetailsPage
