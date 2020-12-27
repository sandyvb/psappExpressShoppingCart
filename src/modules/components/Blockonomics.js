import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'

const Blockonomics = (props) => {
  const [data, setData] = useState('')
  const title = props.title
  const productDescription = props.productDescription
  const price = parseFloat(props.price)
  const downloadLink = props.downloadLink || '0'
  const parentUid = 'c410a2f48e2311ea'

  useEffect(() => {
    callBlockonomics()
      .then((res) => setData(res.data))
      .catch((err) => console.log('callBlockonomics error: ', err))
  })

  const callBlockonomics = async () => {
    const response = await fetch('https://app.powershotz.com/product', {
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
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
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
