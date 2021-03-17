import React from 'react'
import '../../css/error.css'
import RandomGif from '../components/RandomGif'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="errorPage" style={{ maxWidth: '800px' }}>
      <div className="oops">
        <h1>Oops! Page Not Found!</h1>
        <p style={{ textAlign: 'center' }}>
          Try removing ".html" from the address bar, or...
        </p>
        <Link to="/home" className="homebtn">
          <button style={{ padding: '0 20px', marginBottom: '20px' }}>
            Go to Powershotz Home Page
          </button>
        </Link>
        <RandomGif />
      </div>
    </div>
  )
}
