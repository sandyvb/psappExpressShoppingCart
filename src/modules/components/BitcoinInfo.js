import React from 'react'

export default function BitcoinInfo() {
  // misc styles
  const styles = {
    why: {
      display: 'block',
      margin: '30px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    whyDiv: {
      width: '100%',
      margin: '0 auto',
    },
    p: {
      margin: '10px',
    },
    whyP: {
      color: 'red',
      fontStyle: 'italic',
      textAlign: 'center',
    },
    whyCenter: {
      textAlign: 'center',
    },
    bitcoin: {
      color: '#f0ad4e',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '15px',
    },
    lime: {
      textAlign: 'center',
      color: 'lime',
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
          href="https://www.buybitcoinworldwide.com/united-states/"
          target="_blank"
          rel="noopener noreferrer"
        >
          read this.
        </a>
      </p>

      <p style={styles.lime}>
        <i>
          Shopping cart coming soon! Meanwhile,{' '}
          <a href="mailto:alexandra@powershotz.com">email me</a> to order
          downloads by cash, check, or money order.
        </i>
      </p>
    </div>
  )
}
