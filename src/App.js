import logo from './logo.svg'
import './App.css'
import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import axios from 'axios'

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    sendProductData()
    callBlockonomics()
      .then((res) => setData(res.data))
      .catch((err) => console.log('callBlockonomics error: ', err))
  })

  const sendProductData = async () => {
    await axios
      .post('/productData', {
        title: 'the title',
        productDescription: 'the description',
        price: 2.99,
        downloadLink: 'the download link',
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{data}</p>
        <button className="blockoPayBtn" data-toggle="modal" data-uid={data}>
          download
        </button>
      </header>
    </div>
  )
}

export default App

// to run: from root/client: npm start
