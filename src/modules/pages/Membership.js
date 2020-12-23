import React from 'react'
import RandomGif from '../components/RandomGif'
import '../../css/membership.css'

export default function Membership() {
  return (
    <div className="membership">
      <header>
        <h1>Membership</h1>
        <p>No memberships are available at this time.</p>
      </header>
      <div className="gif">
        <RandomGif />
      </div>
    </div>
  )
}
