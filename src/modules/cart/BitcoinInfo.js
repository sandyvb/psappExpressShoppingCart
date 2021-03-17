import React from 'react'
import newTab from '../../images/newTab.png'
import { Link } from 'react-router-dom'

export default function BitcoinInfo() {
  // misc styles
  const styles = {
    whyCenter: {
      textAlign: 'center',
    },
    bitcoin: {
      color: '#f0ad4e',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '15px',
      display: 'block',
    },
  }

  return (
    <div>
      <p style={styles.bitcoin}>Buy instant downloads using Bitcoin!</p>
      <p style={styles.whyCenter}>
        New to Bitcoin? Read{' '}
        <a
          href="https://bitcoin.org/en/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Getting started with Bitcoin
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>{' '}
        or{' '}
        <a
          href="https://99bitcoins.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          We Translate Bitcoin to Plain English
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        . <br />
        Want to easily buy Bitcoin with a credit card? Try{' '}
        <a
          href="https://www.blockchain.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        ,{' '}
        <a
          href="https://changelly.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Changelly
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        ,{' '}
        <a
          href="https://www.coinmama.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinMama
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        ,{' '}
        <a
          href="https://www.binance.com/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Binance
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        , or{' '}
        <a
          href="https://www.buybitcoinworldwide.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          read this
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
          />
        </a>
        .<br />
        Want to use altcoins like Monero or Zcash?{' '}
        <Link to="/contact">Send us a message</Link> and we'll try to
        accommodate you.
        <br />
      </p>
    </div>
  )
}
