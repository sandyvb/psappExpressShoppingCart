import React, { useState } from 'react'
import bluex from '../../../images/bluex.webp'
// import { Link } from 'react-router-dom'

export default function WhyBanned() {
  const [hideWhy, setHideWhy] = useState(true)

  const styles = {
    why: {
      display: 'block',
      margin: '0px auto',
      padding: '0 20px 0 20px',
    },
    whyDiv: {
      width: '100%',
      margin: '0 auto',
    },
    p: {
      margin: '10px',
    },
  }

  // why block
  const handleWhy = () => {
    setHideWhy(!hideWhy)
  }

  return (
    <div style={styles.whyDiv} onClick={handleWhy}>
      <button style={styles.why} title="Why do authorities hate good porn?">
        Why can't I use a credit card?
      </button>
      <div
        className={hideWhy ? 'hideWhy' : ''}
        style={{
          textAlign: 'center',
          backgroundColor: 'var(--textColor)',
          color: 'var(--backgroundColor)',
          padding: '5px 20px 15px 20px',
          marginBottom: '20px',
          marginTop: '15px',
          borderRadius: '4px',
        }}
      >
        <img
          src={bluex}
          alt="close"
          style={{ width: '50px', float: 'right', cursor: 'pointer' }}
        />
        <h3 style={styles.p}>Why can't Powershotz accept credit cards?</h3>
        <p style={styles.p}>
          Depicting the use of force in videos is against credit card rules.
          "Force" is when a performer “looks and sounds” to be in fear, is under
          excessive duress, is in extreme pain, is intensely struggling while
          crying or calling for help, is repeatedly saying “no”, or is shaking
          their head negatively during the scene.
        </p>
        <p style={styles.p}>
          Also, as per credit card rules, the performers must not act out or
          appear to be intoxicated in a sexual context in any clip, video, or
          image. This includes, but is not limited to alcohol, drugs, and all
          other substances that cause intoxication or can cause someone to be
          considered as being under the influence.
        </p>
        <p>
          Obviously, the storylines of Powershotz videos are fictitious and the
          models are acting. We did NOT film any crimes!
        </p>
        <p style={(styles.p, { fontStyle: 'italic', fontWeight: 'bold' })}>
          We are sorry for the inconvenience, the puritanical nature of our
          society, and the legislation of your morality...
        </p>

        {/* <Link to={'/letter'}>
          <button style={{ paddingRight: '20px', paddingLeft: '20px' }}>
            Steve's Letter to MasterCard
          </button>
        </Link> */}
      </div>
    </div>
  )
}
