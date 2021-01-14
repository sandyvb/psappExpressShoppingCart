import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'

const Blockonomics = (props) => {
  const [data, setData] = useState('0')

  const title = props.title
  const productDescription = props.productDescription
  const price = parseFloat(props.price)
  const downloadLink = props.downloadLink || '0'
  const parentUid = 'c410a2f48e2311ea'

  const styles = {
    button: {
      display: 'block',
      margin: '0px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  })

  async function fetchData() {
    // await fetch('https://revoltwind.com/product', {
    await fetch('/product', {
      // fetch('/product', {
      method: 'POST',
      // mode: 'cors',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent_uid: parentUid,
        product_name: title,
        product_description: productDescription,
        value: price,
        extra_data: downloadLink,
      }),
    })
      .then((response) => {
        return response.text()
      })
      .then((data) => setData(data))
      .then(console.log(data))
      .catch((e) => console.log('fetch data error: ', e))
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
