import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'

const Blockonomics = ({ name, description, price, links = '0' }) => {
  const [data, setData] = useState('0')

  useEffect(() => {
    callBlockonomics()
  })

  const callBlockonomics = async () => {
    await fetch('/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: name,
        product_description: JSON.stringify(description),
        value: parseFloat(price).toFixed(2),
        extra_data: JSON.stringify(links),
      }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.uid))
      .catch((err) => console.log(err))
  }

  const styles = {
    button: {
      display: 'block',
      margin: '0px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  }

  return (
    <button
      key={data}
      title="Pay with Bitcoin"
      style={styles.button}
      className="blockoPayBtn"
      data-toggle="modal"
      data-uid={data}
    >
      pay with bitcoin
    </button>
  )
}

export default Blockonomics
