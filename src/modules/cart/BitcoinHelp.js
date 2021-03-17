import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bluex from '../../images/bluex.webp'
import bitcoin_payment_1 from '../../images/bitcoin_payment_1.png'
import bitcoin_payment_2 from '../../images/bitcoin_payment_2.png'

export default function BitcoinHelp() {
  const [hide, setHide] = useState(true)
  let displayType = hide ? 'none' : ''

  const styles = {
    help: {
      display: 'block',
      padding: '0 20px',
      margin: '0px auto',
    },
    helpDiv: {
      width: '100%',
      margin: '0 auto',
    },
    p: {
      margin: '10px 0',
      fontWeight: 'bold',
    },
    ol: {
      fontSize: '1rem',
      margin: '0 10px',
    },
  }

  const handleClick = () => {
    setHide(!hide)
  }

  return (
    <div style={styles.helpDiv} onClick={handleClick}>
      <button style={styles.help} title="Bitcoin Payment Help">
        Help with order form
      </button>
      <div
        style={{
          textAlign: 'left',
          backgroundColor: 'var(--textColor)',
          color: 'var(--backgroundColor)',
          padding: '5px 20px 15px 20px',
          marginBottom: '20px',
          marginTop: '15px',
          borderRadius: '4px',
          display: displayType,
        }}
      >
        <img
          src={bluex}
          alt="close"
          style={{ width: '50px', float: 'right', cursor: 'pointer' }}
        />
        <h3 style={styles.p}>Bitcoin Payment Help</h3>
        <small style={{ fontStyle: 'italic' }}>
          All Bitcoin wallets are different, so be sure to read the instructions
          about how to use your wallet.
        </small>

        <p style={{ ...styles.p, marginTop: '20px' }}>In the first screen:</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '25px',
          }}
        >
          <img
            src={bitcoin_payment_1}
            alt="First Screen"
            width="25%"
            height="25%"
          />
          <ol style={styles.ol}>
            <li style={{ marginTop: '0' }}>
              Enter your the email address where you would like your download
              links sent.
            </li>
            <li>Press the yellow pay button.</li>
          </ol>
        </div>
        <p style={{ ...styles.p, marginTop: '40px' }}>In the second screen:</p>
        <small style={{ fontStyle: 'italic' }}>
          Go to your wallet and find the "send" section.
        </small>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '25px',
          }}
        >
          <img
            src={bitcoin_payment_2}
            alt="Second Screen"
            width="25%"
            height="25%"
          />
          <ol style={styles.ol}>
            <li style={{ marginTop: '0' }}>
              <span style={{ fontStyle: 'italic', color: 'red' }}>
                Optional:{' '}
              </span>
              Use the QR to capture payment information.
            </li>
            <li>
              Copy &amp; paste the amount of Bitcoin that you will be sending.
            </li>
            <li>Copy &amp; paste our BTC address.</li>
            <li>
              You have 30 minutes to complete the payment. Don't worry, if you
              don't complete the payment in time just refresh the page and try
              again.
            </li>
            <li>
              The payment amount is shown in your currency and in Bitcoin for
              convenience.
            </li>
          </ol>
        </div>
        <p style={{ ...styles.p, marginTop: '25px' }}>
          When you hit "send" in your wallet, you're done!
        </p>

        <p>You will automatically be taken to a "Thank You" page.</p>
        <p>
          Usually the process only takes a few moments, but sometimes it can
          take longer for the blockchain to process a payment. As soon as your
          payment is confirmed, the links are automatically sent out.
        </p>
        <p>
          If the button does not appear to be working correctly, just refresh
          the page.
        </p>
        <p>
          Don't hesitate to <Link to="/contact">contact us</Link> if you have
          any questions.
        </p>
      </div>
    </div>
  )
}
