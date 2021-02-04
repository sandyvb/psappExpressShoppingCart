import React, { useState, useEffect } from 'react'
import request from 'request'

const Blockonomics = ({ name, description, price, links }) => {
  const [data, setData] = useState('0')

  //variables for blockonomics
  const parentUid = 'dac8778e542911eb'
  const url = 'https://www.blockonomics.co/api/create_child_product'
  const urlDelete = 'https://www.blockonomics.co/api/button?uid='
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const bearer = '3t8D7CeQ3MDn2MLIrx48NQA5JljODRXMBM8iO4PADCI'
  const header = { Authorization: `Bearer ${bearer}` }

  let dataBody = {
    parent_uid: parentUid,
    product_name: name,
    product_description: JSON.stringify(description),
    value: parseFloat(price).toFixed(2),
    extra_data: JSON.stringify(links) || '0',
  }

  request.get('https://powershotz.com:5000')

  useEffect(() => {
    request.post(
      {
        headers: header,
        url: proxyUrl + url,
        body: JSON.stringify(dataBody),
      },
      function (err, res, body) {
        if (err) console.log(err)
        if (body) {
          let parsed = JSON.parse(body)
          let uid = parsed.uid
          setData(uid)
          //wait 30 minutes and delete child uid
          setTimeout(() => handleDelete(uid), 1800000)
        }
      }
    )
  })

  function handleDelete(item) {
    request.delete(
      {
        headers: header,
        url: `${urlDelete}${item}`,
      },
      (response, body, err) => {
        if (err) console.log(err)
        if (response) console.log(response.body)
      }
    )
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
