import React from 'react'
import '../../css/error.css'
import RandomGif from '../components/RandomGif'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="errorPage">
      <div className="oops">
        <h1>Oops! Page Not Found!</h1>
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          The preview is coming, or
        </p>{' '}
        <p style={{ textAlign: 'center' }}>
          try removing ".html" from the address bar, or...
        </p>
        <Link to="/home" className="homebtn">
          <div className="homebtndiv">Click to Powershotz Home Page</div>
        </Link>
        <RandomGif />
      </div>
    </div>
  )
}
