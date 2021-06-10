import React from 'react'
import newTab from '../../images/newTab.png'

export const BitcoinInfo = ({ heading = true }) => {
  // misc styles
  // const styles = {
  //   whyCenter: {
  //     textAlign: 'center',
  //   },
  //   bitcoin: {
  //     color: '#f0ad4e',
  //     fontSize: '2rem',
  //     textAlign: 'center',
  //     marginBottom: '15px',
  //     display: 'block',
  //   },
  // }

  return (
    <div>
      {/* <p style={styles.bitcoin}>Buy instant downloads using Bitcoin!</p> */}
      <p>
        {heading && <span style={{ color: 'lime' }}>New to Crypto?</span>} Read{' '}
        <a
          href="https://bitcoin.org/en/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Getting started with Bitcoin
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
            alt=""
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
            alt=""
          />
        </a>
      </p>

      <p
        style={{
          ...styles.p,
          marginTop: '25px',
          fontSize: '1.25rem',
        }}
      >
        {' '}
        Want to easily buy crypto with a credit card?
      </p>
      <p>
        Try{' '}
        <a
          href="https://www.blockchain.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
            alt=""
          />
        </a>
        ,{' '}
        <a href="https://bitpay.com/" target="_blank" rel="noopener noreferrer">
          Bitpay
          <img
            src={newTab}
            style={{ opacity: '0.5', width: '10px', marginLeft: '3px' }}
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
          />
        </a>
        ,{' '}
        <a
          href="https://www.benzinga.com/money/best-altcoin-exchanges/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Best Altcoin Exchanges
          <img
            src={newTab}
            alt=""
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
            alt=""
          />
        </a>
        .
      </p>
      <p>
        We aren't recommending any particular exchange or wallet. These links
        are just a place to get started.
      </p>
    </div>
  )
}

const styles = {
  p: {
    margin: '10px 0',
    fontWeight: 'bold',
  },
}

export default BitcoinInfo
