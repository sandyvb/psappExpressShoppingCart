import React, { useState, useEffect } from 'react'

const Blockonomics = ({
  title,
  productDescription,
  price,
  productTitles,
  links,
}) => {
  const [data, setData] = useState('0')

  // "Download"
  const parentUid = 'dac8778e542911eb'
  const parsedPrice = parseFloat(price)
  console.log('Blockonomics.js 12 props: ', productTitles, links)

  useEffect(() => {
    callBlockonomics()
  })

  const callBlockonomics = async () => {
    await fetch('/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent_uid: parentUid,
        product_name: title,
        product_description: productDescription,
        value: price,
        extra_data: downloadLink,
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
