import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Blockonomics = ({ name, description, price, links }) => {
  const [data, setData] = useState('0')
  const parentUid = '11ecd54e6d6011eb'
  const url = 'https://blockonomics.powershotz.workers.dev'
  const pzDelete = 'https://powershotz.com/php/delete.php?uid='

  useEffect(() => {
    callBlockonomics()
    return () => {
      handleDelete()
    }
  })

  const callBlockonomics = async () => {
    await axios
      .post(url, {
        parent_uid: parentUid,
        product_name: name,
        product_description: JSON.stringify(description),
        value: parseFloat(price).toFixed(2),
        extra_data: JSON.stringify(links) || '0',
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data)
          console.log('created: ', response.data)
        } else {
          console.log(`Error: ${response.status} ${response.message}`)
        }
      })
      .catch((err) => console.log(`callBlockonomics error: ${err}`))
  }

  const checkState = () => {
    if (document.visibilityState === 'hidden') {
      const urlDelete = `${pzDelete}${data}`
      console.log('beacon: ', data)
      navigator.sendBeacon(urlDelete)
    } else {
      callBlockonomics()
    }
  }

  window.addEventListener('visibilitychange', () => checkState(), {
    capture: true,
  })

  const handleDelete = async () => {
    const urlDelete = `${pzDelete}${data}`
    await axios.post(urlDelete).then((response) => {
      console.log('handleDelete: ', response)
    })
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
