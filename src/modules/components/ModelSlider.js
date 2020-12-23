import React, { Component } from 'react'
import '../../css/slider.css'
import ModelData from '../../data/ModelData'
import GifData from '../../data/GifData'

class ModelSlider extends Component {
  constructor() {
    super()
    this.state = {
      modeldata: ModelData,
      gifdata: GifData,
    }
  }

  render() {
    const name = this.props.name
    const lcName = name.toLowerCase().replace(/ /g, '')

    // GET PHOTOS (name-1.jpg thru name-4.jpg)
    const photos = []
    for (let i = 1; i < 5; i++) {
      let imgSrc = 'https://powershotz.com/models2/' + lcName + '-' + i + '.jpg'
      photos.push(
        <div key={i}>
          <img src={imgSrc} alt={name} />
        </div>
      )
    }

    // FIND AE VIDEO
    const aeClipName = this.state.modeldata.find(
      (item) => item.model_name === name
    ).ae_clip
    const aeClipSrc = 'https://powershotz.com/videos/' + aeClipName

    // FIND ANY GIFS WITH 'NAME'
    const gifs = []
    let gifSrc
    for (let i = 0; i < this.state.gifdata.length; i++) {
      if (
        this.state.gifdata[i].includes('_' + lcName + '.') ||
        this.state.gifdata[i].includes('_' + lcName + '_')
      ) {
        gifSrc = 'https://powershotz.com/gif/' + this.state.gifdata[i]
        gifs.push(
          <div key={i}>
            <img src={gifSrc} alt={name} />
          </div>
        )
      }
    }

    return (
      <div id="slider">
        <div className="slider">
          {photos}
          {gifs}
          <div>
            {aeClipName !== null && (
              <video src={aeClipSrc} type="video/mp4" controls />
            )}
          </div>
        </div>
        <small>Swipe or use slider for more images!</small>
      </div>
    )
  }
}

export default ModelSlider
