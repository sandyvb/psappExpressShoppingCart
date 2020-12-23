import React from 'react'
import StarsInData from '../../data/StarsInData'

const VideoStars = (props) => {
  const models = StarsInData.filter((item) => item.vid_id === props.video).map(
    (item) => (
      <a
        href={`https://powershotz.com/${item.model_name}`}
        key={item.model_name + item.vid_id}
      >
        <li>{item.model_name}</li>
      </a>
    )
  )

  if (models.length > 0) {
    return (
      <div>
        <h5 className="starring">Starring:</h5>
        <ul>{models}</ul>
      </div>
    )
  } else {
    return null
  }
}

export default VideoStars
