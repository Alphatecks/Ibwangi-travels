import { useState } from 'react'
import './SignInPage.css'

function SignInPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const handleEmailContinue = () => {
    if (email) {
      setShowPassword(true)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`)
    // Placeholder for social login functionality
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { email, password, isSignUp })
    // Placeholder for authentication
  }

  return (
    <div className="signin-page">
      {/* Header/Navigation - Same as main app */}
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
            >
              Hotels
            </a>
            <a href="#packages">Packages</a>
            <a href="#signin" className="active">Sign in</a>
          </nav>
          <button className="signup-btn" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </header>

      {/* Main Sign-in Content */}
      <main className="signin-main">
        <div className="signin-container">
          <div className="signin-form">
            <h1 className="signin-title">
              {isSignUp ? 'Create your account' : 'Sign in or create an account'}
            </h1>
            
            <p className="signin-subtitle">
              {isSignUp 
                ? 'Create an account to access our services and save your preferences.'
                : 'You can sign in using your Ibwangi travel account to access our services.'
              }
            </p>

            {!showPassword ? (
              <div className="email-section">
                <div className="input-group">
                  <label htmlFor="email" className="input-label">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="email-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  className="continue-btn"
                  onClick={handleEmailContinue}
                  disabled={!email}
                >
                  Continue with email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="password-section">
                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="password-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="signin-btn">
                  {isSignUp ? 'Create account' : 'Sign in'}
                </button>
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setShowPassword(false)}
                >
                  ← Back to email
                </button>
              </form>
            )}

            <div className="separator">
              <span>or use one of these options</span>
            </div>

            <div className="social-login">
              <button 
                className="social-btn google-btn"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button 
                className="social-btn apple-btn"
                onClick={() => handleSocialLogin('Apple')}
              >
                <svg className="apple-icon" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
              
              <button 
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <svg className="facebook-icon" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>

            <div className="legal-text">
              <p>
                By signing in or creating an account, you agree with our{' '}
                <a href="#terms" className="legal-link">Terms & Conditions</a> and{' '}
                <a href="#privacy" className="legal-link">Privacy Statement</a>.
              </p>
            </div>

            <div className="copyright">
              <p>All rights reserved.</p>
              <p>Copyright (2006-2025) - Ibwangi travel™</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignInPage
