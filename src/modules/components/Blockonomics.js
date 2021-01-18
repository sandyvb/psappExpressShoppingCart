import React, { useState, useEffect } from 'react'

const Blockonomics = ({ name, description, price, links }) => {
  const [data, setData] = useState('0')

  const parentUid = 'dac8778e542911eb'

  useEffect(() => {
    callBlockonomics()
  })

  const callBlockonomics = async () => {
    await fetch('/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent_uid: parentUid,
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
