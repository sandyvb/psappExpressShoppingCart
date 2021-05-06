import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import x from '../../images/x.webp'
import BitcoinInfo from '../cart/BitcoinInfo'
import newTab from '../../images/newTab.png'

export const BitcoinHelp = () => {
  const [hide, setHide] = useState(true)
  let displayType = hide ? 'none' : ''

  const handleClick = () => {
    setHide(!hide)
  }

  return (
    <div style={styles.helpDiv} onClick={handleClick}>
      <button style={styles.help} title="Bitcoin Payment Help">
        Help me with crypto!
      </button>
      <div
        style={{
          textAlign: 'left',
          backgroundColor: 'var(--backgroundColor)',
          color: 'var(--textColor)',
          padding: '5px 20px 15px 20px',
          marginBottom: '20px',
          marginTop: '15px',
          borderRadius: '4px',
          display: displayType,
        }}
      >
        <img
          src={x}
          alt="close"
          style={{ width: '50px', float: 'right', cursor: 'pointer' }}
        />
        <h3 style={styles.p}>Help me, I'm new to Cryptocurrency!</h3>
        <BitcoinInfo heading={false} />

        <em>
          All cryptocurrency wallets are different, so be sure to read the
          instructions about how to use your wallet.
        </em>
        <ol>
          <li>
            <u>Choose a coin:</u> Which coin-type(s) does your wallet support?
            (Bitcoin, Litecoin, Tron, etc.)
          </li>
          <li>
            <u>Send this amount:</u> Copy and paste the amount to your wallet's
            'send' section. The amount has been calculated using the{' '}
            <a
              href="https://www.coingecko.com/en"
              target="_blank"
              rel="noopener noreferrer"
            >
              CoinGecko API.
            </a>{' '}
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
              alt=""
            />{' '}
          </li>
          <li>
            <u>To this address:</u> Copy and paste our wallet address to your
            wallet's 'send' section.
          </li>
          <li>Hit 'send' in your wallet.</li>
          <li>
            Make sure you entered your email so we know where to send your
            order.
          </li>
          <li>Hit 'send' on this form.</li>
        </ol>
        <p style={{ ...styles.p, marginTop: '25px' }}>You're done!</p>

        <p>You will automatically be taken to a "Thank You" page.</p>
        <p>
          Usually the process only takes a few moments, but sometimes it can
          take longer to process a payment. As soon as your payment is
          confirmed, the links are sent out.
        </p>

        <p>
          Don't hesitate to <Link to="/contact">contact us</Link> if you have
          any questions or you would like to request another way to pay.
        </p>
      </div>
    </div>
  )
}

const styles = {
  help: {
    display: 'block',
    margin: '0px auto',
    padding: '0 20px',
  },
  helpDiv: {
    width: '100%',
    margin: '0 auto 10px auto',
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

export default BitcoinHelp
