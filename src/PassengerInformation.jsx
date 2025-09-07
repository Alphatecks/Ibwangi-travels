import { useState } from 'react'
import './PassengerInformation.css'

function PassengerInformation({ selectedFlights, onNavigate, onBack }) {
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    redressNumber: '',
    knownTravellerNumber: ''
  })

  const [emergencyContact, setEmergencyContact] = useState({
    sameAsPassenger: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const [checkedBags, setCheckedBags] = useState(1)

  const handlePassengerInfoChange = (field, value) => {
    setPassengerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (field, value) => {
    setEmergencyContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSameAsPassengerChange = (checked) => {
    setEmergencyContact(prev => ({
      ...prev,
      sameAsPassenger: checked,
      firstName: checked ? passengerInfo.firstName : '',
      lastName: checked ? passengerInfo.lastName : '',
      email: checked ? passengerInfo.email : '',
      phone: checked ? passengerInfo.phone : ''
    }))
  }

  const handleBagCountChange = (increment) => {
    const newCount = checkedBags + increment
    if (newCount >= 0) {
      setCheckedBags(newCount)
    }
  }

  const calculateTotalPrice = () => {
    if (!selectedFlights.departure) return 0
    // Convert USD to Naira (1 USD = 1500 NGN)
    const departurePriceNGN = selectedFlights.departure.price * 1500
    const returnPriceNGN = (selectedFlights.return?.price || 0) * 1500
    return departurePriceNGN + returnPriceNGN
  }

  const totalPrice = calculateTotalPrice()
  const subtotal = Math.round(totalPrice * 0.8)
  const taxes = Math.round(totalPrice * 0.2)

  return (
    <div className="passenger-information">
      {/* Header */}
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

      {/* Main Content */}
      <div className="main-content-passenger">
        <div className="passenger-container">
          {/* Left Side - Form */}
          <div className="passenger-form">
            <div className="form-header">
              <h1>Passenger information</h1>
              <p>Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.</p>
            </div>

            {/* Passenger 1 Section */}
            <div className="passenger-section">
              <h3>Passenger 1 (Adult)</h3>
              
              <div className="form-row">
                <div className="input-group">
                  <label>First name*</label>
                  <input 
                    type="text" 
                    placeholder="First name*"
                    value={passengerInfo.firstName}
                    onChange={(e) => handlePassengerInfoChange('firstName', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Middle</label>
                  <input 
                    type="text" 
                    placeholder="Middle"
                    value={passengerInfo.middleName}
                    onChange={(e) => handlePassengerInfoChange('middleName', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Last name*</label>
                  <input 
                    type="text" 
                    placeholder="Last name*"
                    value={passengerInfo.lastName}
                    onChange={(e) => handlePassengerInfoChange('lastName', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Suffix</label>
                  <input 
                    type="text" 
                    placeholder="Suffix"
                    value={passengerInfo.suffix}
                    onChange={(e) => handlePassengerInfoChange('suffix', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Date of birth*</label>
                  <input 
                    type="text" 
                    placeholder="Date of birth*"
                    value={passengerInfo.dateOfBirth}
                    onChange={(e) => handlePassengerInfoChange('dateOfBirth', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email address*</label>
                  <input 
                    type="email" 
                    placeholder="Email address*"
                    value={passengerInfo.email}
                    onChange={(e) => handlePassengerInfoChange('email', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Phone number*</label>
                  <input 
                    type="tel" 
                    placeholder="Phone number*"
                    value={passengerInfo.phone}
                    onChange={(e) => handlePassengerInfoChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Redress number</label>
                  <input 
                    type="text" 
                    placeholder="Redress number"
                    value={passengerInfo.redressNumber}
                    onChange={(e) => handlePassengerInfoChange('redressNumber', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Known traveller number*</label>
                  <input 
                    type="text" 
                    placeholder="Known traveller number*"
                    value={passengerInfo.knownTravellerNumber}
                    onChange={(e) => handlePassengerInfoChange('knownTravellerNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="emergency-contact-section">
              <h3>Emergency contact information</h3>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={emergencyContact.sameAsPassenger}
                    onChange={(e) => handleSameAsPassengerChange(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Same as Passenger 1
                </label>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>First name*</label>
                  <input 
                    type="text" 
                    placeholder="First name*"
                    value={emergencyContact.firstName}
                    onChange={(e) => handleEmergencyContactChange('firstName', e.target.value)}
                    disabled={emergencyContact.sameAsPassenger}
                  />
                </div>
                <div className="input-group">
                  <label>Last name*</label>
                  <input 
                    type="text" 
                    placeholder="Last name*"
                    value={emergencyContact.lastName}
                    onChange={(e) => handleEmergencyContactChange('lastName', e.target.value)}
                    disabled={emergencyContact.sameAsPassenger}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email address*</label>
                  <input 
                    type="email" 
                    placeholder="Email address*"
                    value={emergencyContact.email}
                    onChange={(e) => handleEmergencyContactChange('email', e.target.value)}
                    disabled={emergencyContact.sameAsPassenger}
                  />
                </div>
                <div className="input-group">
                  <label>Phone number*</label>
                  <input 
                    type="tel" 
                    placeholder="Phone number*"
                    value={emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    disabled={emergencyContact.sameAsPassenger}
                  />
                </div>
              </div>
            </div>

            {/* Bag Information Section */}
            <div className="bag-information-section">
              <h3>Bag information</h3>
              <p>Each passenger is allowed one free carry-on bag and one personal item. First checked bag for each passenger is also free. Second bag check fees are waived for loyalty program members. <a href="#bag-policy">See the full bag policy</a>.</p>
              
              <div className="bag-counter">
                <div className="bag-counter-header">
                  <h4>Passenger 1</h4>
                  <p>{passengerInfo.firstName && passengerInfo.lastName ? `${passengerInfo.firstName} ${passengerInfo.lastName}` : 'First Last'}</p>
                </div>
                <div className="bag-counter-controls">
                  <span>Checked bags</span>
                  <div className="counter">
                    <button onClick={() => handleBagCountChange(-1)}>-</button>
                    <span>{checkedBags}</span>
                    <button onClick={() => handleBagCountChange(1)}>+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="save-close-btn" onClick={onBack}>
                Save and close
              </button>
              <button className="select-seats-btn">
                Select seats
              </button>
            </div>

            {/* Luggage Images */}
            <div className="luggage-section">
              <div className="luggage-images">
                <div className="luggage-item backpack">
                  <img src="/images/luggage.png" alt="Backpack" className="backpack-img" />
                  <div className="dimensions">
                    <span>14" / 36cm</span>
                  </div>
                </div>
                <div className="luggage-item suitcase">
                  <img src="/images/luggage.png" alt="Suitcase" className="suitcase-img" />
                  <div className="dimensions">
                    <span>9" / 23cm</span>
                    <span>22" / 56cm</span>
                  </div>
                </div>
              </div>
              <p className="dimensions-note">*Dimensions include handles and wheels</p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="passenger-sidebar">
            {/* Flight Summary */}
            {selectedFlights.departure && (
              <div className="flight-summary-card">
                <div className="flight-header">
                  <div className="airline-info">
                    <span className="airline-logo">{selectedFlights.departure.airlineLogo}</span>
                    <span className="airline-name">{selectedFlights.departure.airline}</span>
                  </div>
                  <div className="flight-number">FIG4312</div>
                </div>
                
                <div className="flight-info">
                  <div className="total-duration">{selectedFlights.departure.duration} (+1d)</div>
                  <div className="flight-times">{selectedFlights.departure.departure} - {selectedFlights.departure.arrival}</div>
                  <div className="layover-info">{selectedFlights.departure.stops}</div>
                </div>
              </div>
            )}

            {selectedFlights.return && (
              <div className="flight-summary-card">
                <div className="flight-header">
                  <div className="airline-info">
                    <span className="airline-logo">{selectedFlights.return.airlineLogo}</span>
                    <span className="airline-name">{selectedFlights.return.airline}</span>
                  </div>
                  <div className="flight-number">FIG4312</div>
                </div>
                
                <div className="flight-info">
                  <div className="total-duration">{selectedFlights.return.duration} (+1d)</div>
                  <div className="flight-times">{selectedFlights.return.departure} - {selectedFlights.return.arrival}</div>
                  <div className="layover-info">{selectedFlights.return.stops}</div>
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="breakdown-row">
                <span>Taxes and Fees</span>
                <span>₦{taxes.toLocaleString()}</span>
              </div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button className="select-seats-sidebar-btn">
              Select seats
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PassengerInformation
