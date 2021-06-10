import React from 'react'
import { Link } from 'react-router-dom'

const MoreVideosPhotsButtons = () => {
  const styles = {
    videoPhotoButton: {
      display: 'flex',
      margin: '0 auto',
      justifyContent: 'space-evenly',
    },
  }

  return (
    <div style={styles.videoPhotoButton}>
      <Link to="/videos">
        <button style={{ minWidth: 120, fontSize: '12px', maxWidth: 120 }}>
          more Videos
        </button>
      </Link>
      <Link to="/photos">
        <button style={{ minWidth: 120, fontSize: '12px', maxWidth: 120 }}>
          more Photos
        </button>
      </Link>
    </div>
  )
}

export default MoreVideosPhotsButtons
