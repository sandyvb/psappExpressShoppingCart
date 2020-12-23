import React, { useState, useEffect } from 'react'
import ApiUtils from '../utilities/ApiUtils'
import fetch from 'node-fetch'
import axios from 'axios'

const Blockonomics = (props) => {
  const [data, setData] = useState('')

  const sendTitle = props.title
  const sendProductDescription = props.productDescription
  const sendPrice = parseFloat(props.price)
  const sendDownloadLink = props.downloadLink || '0'

  useEffect(() => {
    sendProductData()
    callBlockonomics()
      .then((res) => setData(res.data))
      .catch((err) => console.log('callBlockonomics error: ', err))
  })

  const sendProductData = async () => {
    await axios
      .post('/productData', {
        title: sendTitle,
        productDescription: sendProductDescription,
        price: sendPrice,
        downloadLink: sendDownloadLink,
      })
      .then((res) => console.log('data sent: ', res))
      .catch((e) => console.log(e))
  }

  const callBlockonomics = async () => {
    const response = await fetch('/data', { todo: 'buy milk' })
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

// to run: from root/client: npm start
