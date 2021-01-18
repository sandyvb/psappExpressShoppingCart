import React from 'react'

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
    },
  }

  return (
    <div>
      <hr />
      <p style={styles.bitcoin}>Buy an instant download using Bitcoin!</p>
      <p style={styles.whyCenter}>
        New to Bitcoin? Read{' '}
        <a
          href="https://bitcoin.org/en/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Getting started with Bitcoin
        </a>
        . Want to easily buy Bitcoin with a credit card? Try{' '}
        <a
          href="https://atomicwallet.io/buy-bitcoin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Atomic Wallet
        </a>
        ,{' '}
        <a
          href="https://www.blockchain.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain
        </a>
        ,{' '}
        <a
          href="https://www.paypal.com/us/webapps/mpp/crypto?utm_medium=cpc&utm_source=Google&utm_campaign=crypto_sem&kid=p58952945210&gclid=Cj0KCQiA2uH-BRCCARIsAEeef3lnRTS5vh695RO8yIg2TM27Bm-II7PtnSxkYCNY7qEzG1jcgFSyTBUaAlBPEALw_wcB&gclsrc=aw.ds"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paypal
        </a>
        , or{' '}
        <a
          href="https://www.buybitcoinworldwide.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          read this.
        </a>
      </p>
    </div>
  )
}
