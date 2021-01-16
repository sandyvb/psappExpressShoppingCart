import React, { useState } from 'react'
import bluex from '../../images/bluex.webp'

export default function SendInvoice() {
  const [hideInvoice, setHideInvoice] = useState(true)

  const styles = {
    inv: {
      display: 'block',
      margin: '0px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    invDiv: {
      width: '100%',
      margin: '0 auto',
    },
    h: {
      paddingLeft: '38px',
    },
  }

  // inv block
  const handleClick = () => {
    setHideInvoice(!hideInvoice)
  }

  return (
    <div style={styles.invDiv} onClick={handleClick}>
      <button style={styles.inv} title="Pay with Cash, Check, or Money Order">
        Send me an invoice
      </button>
      <div
        className={hideInvoice ? 'hideInvoice' : ''}
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
        <h3 style={styles.h}>Email my Invoice</h3>
        <p>name</p>
        <p>email</p>
        <p>send button</p>
      </div>
    </div>
  )
}
