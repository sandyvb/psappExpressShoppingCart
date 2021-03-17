import React from 'react'
import { Link } from 'react-router-dom'

const MoreVideosPhotsButtons = () => {
  const styles = {
    videoPhotoButton: {
      display: 'flex',
      margin: '0 auto',
      justifyContent: 'center',
    },
  }

  return (
    <div style={styles.videoPhotoButton}>
      <Link to="/videos">
        <button style={{ marginRight: '15px' }}>more Videos</button>
      </Link>
      <Link to="/photos">
        <button style={{ marginLeft: '15px' }}>more Photos</button>
      </Link>
    </div>
  )
}

export default MoreVideosPhotsButtons
