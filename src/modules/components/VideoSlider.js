import React, { useState, useEffect } from 'react'
import '../../css/slider.css'
import GifData from '../../data/GifData'

const VideoSlider = (props) => {
  const [gifdata, setGifdata] = useState()
  const pzcode = props.pzcode
  const lcpzcode = pzcode.toLowerCase().replace(/ /g, '')

  useEffect(() => {
    setGifdata(GifData)
  }, [])

  // FIND ANY GIFS WITH 'pzcode'
  const gifs = []
  let gifSrc
  if (gifdata) {
    for (let i = 0; i < gifdata.length; i++) {
      if (gifdata[i].includes(lcpzcode)) {
        gifSrc = 'https://powershotz.com/gif/' + gifdata[i]
        gifs.push(
          <div key={i}>
            <img src={gifSrc} alt={pzcode} />
          </div>
        )
      }
    }
  }

  return (
    <div id="slider">
      <div className="slider">
        <div style={{ display: 'block', margin: '0 auto' }}>
          <img src={props.poster} alt={pzcode} />
        </div>
        {gifs}
      </div>
      <small className={gifs.length === 0 ? 'hide' : null}>
        Swipe or use slider for more images!
      </small>
    </div>
  )
}

export default VideoSlider
