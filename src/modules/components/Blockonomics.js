import React, { useState, useEffect } from 'react'

const Blockonomics = (props) => {
  const [data, setData] = useState('0')

  // "Download"
  const parentUid = 'dac8778e542911eb'
  const title = props.title
  const productDescription = props.productDescription
  const price = parseFloat(props.price)
  const downloadLink = props.downloadLink || '0'

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
      style={styles.button}
      className="blockoPayBtn"
      data-toggle="modal"
      data-uid={data}
    >
      download
    </button>
  )
}

export default Blockonomics
