import React, { useState } from 'react'
import '../../css/chat.css'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:5000/'
const socket = socketIOClient(ENDPOINT)

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messagePlaceholder, setMessagePlaceholder] = useState('Message')
  const [handle, setHandle] = useState('')
  const [handlePlaceholder, setHandlePlaceholder] = useState('Handle')
  let output = [{ handle: 'test', message: 'message' }]
  const [array, setArray] = useState(output)

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }

  const handleHandle = (event) => {
    setHandle(event.target.value)
  }

  const handleSend = () => {
    if (message.length > 0 && handle.length > 0) {
      socket.emit('chat', {
        message: message,
        handle: handle,
      })
      setMessagePlaceholder('Message')
      setHandlePlaceholder('Handle')
      setMessage('')
    }
    if (handle.length < 1) {
      setHandlePlaceholder('Handle required')
    }
    if (message.length < 1) {
      setMessagePlaceholder('Message required')
    }
  }

  let test
  socket.on('chat', (data) => {
    handleData(data)
    console.log('socket', array)
  })

  function handleData(data) {
    output.unshift({ ...data })
    setArray(output)
    console.log('handleData', array)
  }

  let allMessages = array.map((item) => {
    return (
      <p key={Math.random()}>
        <strong>{item.handle}: </strong>
        {item.message}
      </p>
    )
  })

  return (
    <div className="chat">
      <div id="chat-window">{allMessages}</div>
      <input
        value={handle}
        id="handle"
        type="text"
        placeholder={handlePlaceholder}
        maxLength="25"
        onChange={handleHandle}
      />
      <input
        value={message}
        id="message"
        type="text"
        placeholder={messagePlaceholder}
        maxLength="400"
        onChange={handleMessage}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default Chat
