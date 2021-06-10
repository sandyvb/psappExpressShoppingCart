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
      <button style={styles.help} title="Payment Options">
        {hide ? 'Help me choose' : 'close'}
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

        <h2>Available Apps</h2>
        <p>
          If you'd like to use{' '}
          <a
            href="https://cash.app/"
            target="_blank"
            rel="noopener noreferrer"
            alt="Cash App"
          >
            <b style={{ fontSize: '1.3rem' }}>Cash App</b>
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>
          ,{' '}
          <a
            href="https://wise.com/"
            target="_blank"
            rel="noopener noreferrer"
            alt="Cash App"
          >
            <b style={{ fontSize: '1.3rem' }}>Wise</b>
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>
          , or{' '}
          <a
            href="https://www.zellepay.com/"
            target="_blank"
            rel="noopener noreferrer"
            alt="Zelle"
          >
            <b style={{ fontSize: '1.3rem' }}>Zelle</b>
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>
          , you need to install that app on your phone.{' '}
          <b style={{ fontSize: '1.2rem', color: 'lime' }}>Easy!</b>
        </p>

        <h2>Cryptocurrency</h2>

        <em>
          All cryptocurrency wallets are different, so be sure to read the
          instructions about how to use your wallet.
        </em>
        <p>On the Powershotz order form:</p>
        <ol>
          <li>Choose a coin</li>
          <li>Send the amount to our address from your wallet.</li>
          <li>
            Enter your email and click "SEND" so we know where to send your
            order.
          </li>
        </ol>
        <p
          style={{
            ...styles.p,
            marginTop: '25px',
            fontSize: '1.25rem',
            color: 'lime',
          }}
        >
          You're done!
        </p>

        <p>As soon as your payment is confirmed, the links are sent out.</p>

        <p
          style={{
            ...styles.p,
            marginTop: '25px',
            fontSize: '1.25rem',
          }}
        >
          Need more help with crypto?
        </p>
        <BitcoinInfo heading={false} />
        <p>
          We accept over 35 different cryptocurrencies. If you don't see your
          coin, <Link to="/contact">contact us</Link> and we'll try to
          accommodate you.
        </p>
        <p>
          Don't hesitate to <Link to="/contact">contact us</Link> if you have
          any questions.
        </p>

        <Link to="/contact">
          <h2>Click to ask me about other payment options!</h2>
        </Link>
        <p style={{ marginBottom: 30 }}>
          (cash, check, money order, gold... &#128521;)
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
    height: 30,
    fontSize: '0.9rem',
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
