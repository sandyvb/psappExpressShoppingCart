import React from 'react'
import GifData from '../../data/GifData'
import VideoData from '../../data/VideoData'
import { Link } from 'react-router-dom'

const RandomGif = () => {
  const num = Math.floor(Math.random() * GifData.length)
  const randomgif = GifData[num]
  let pzcode
  let c4sid

  if (randomgif.startsWith('p')) {
    pzcode = randomgif.substring(0, 6).toUpperCase()
    c4sid = VideoData.find((item) => item.pz_code === pzcode).id
  } else {
    pzcode = randomgif.substring(0, 5).toUpperCase()
    c4sid = VideoData.find((item) => item.pz_code === pzcode).id
  }

  const gif = 'https://powershotz.com/gif/' + randomgif

  return (
    <div>
      <img src={gif} alt={pzcode} style={{ width: '100%' }} />
      <Link to={`/${c4sid}`}>{pzcode}</Link>
    </div>
  )
}

export default RandomGif
