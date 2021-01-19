import VideoData from '../../data/VideoData'
import CombineArrays from '../components/CombineArrays'
import React from 'react'

function FindTitle(props) {
  const pathname = window.location.pathname
  const arrays = CombineArrays()
  const title = arrays.find((item) => item.id === props.number).title
  const img =
    arrays.find((item) => item.id === props.number).image ||
    arrays.find((item) => item.id === props.number).poster

  let url
  if (arrays.find((item) => item.id === props.number).image) {
    url = 'https://powershotz.com/c4sImages/'
  } else {
    url = 'https://powershotz.com/c4sImages/thumbs/'
  }
  const src = url + img
  let code = props.number
  if (VideoData.find((item) => item.id === props.number)) {
    code = VideoData.find((item) => item.id === props.number).pz_code
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {pathname !== '/photos' && (
        <img
          src={src}
          alt={title}
          style={{
            width: '100%',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
          }}
          loading="eager"
        />
      )}
      <div style={{ padding: '10px' }}>
        {title} - {code}
      </div>
    </div>
  )
}

export default FindTitle
