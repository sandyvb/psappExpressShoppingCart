import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:5000'
// const socket = io(ENDPOINT)

const Blockonomics = ({ name, description, price, links }) => {
  const [data, setData] = useState('0')
  let socket = io()
  socket = io('http://31.220.61.161:5000')

  useEffect(() => {
    socket.emit('sendData', {
      product_name: name,
      product_description: JSON.stringify(description),
      value: parseFloat(price).toFixed(2),
      extra_data: JSON.stringify(links),
    })
  })

  socket.on('getChildUid', (childUid) => {
    setData(childUid)
  })

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
