import React, { useState, useRef } from 'react'

export default function Preview(props) {
  const [hideModal, setHideModal] = useState(true)
  const vidRef = useRef(null)

  const id = props.id.toLowerCase()
  let videoName = `/prev_${id}.mp4`
  const url = `https://powershotz.com/previews${videoName}`

  // set size of preview video
  let screenSize = window.screen.width * 0.8
  let setWidth = screenSize > 800 ? '400px' : `${screenSize}`

  const styles = {
    prev: {
      display: 'block',
      margin: '0px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    prevDiv: {
      width: '100%',
      margin: '0 auto',
    },
  }

  const handleModal = () => {
    setHideModal(!hideModal)
    vidRef.current.pause()
  }

  return (
    <div style={styles.prevDiv} onContextMenu={(e) => e.preventDefault()}>
      <button style={styles.prev} onClick={handleModal}>
        {hideModal ? 'Preview' : 'Close'}
      </button>
      <div
        className={hideModal ? 'hideModal' : ''}
        style={{
          marginBottom: '20px',
        }}
      >
        <div
          style={{ marginTop: '13px' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <video
            ref={vidRef}
            src={url}
            type="video/mp4"
            controls
            width={setWidth}
            poster={props.poster}
          />
        </div>
      </div>
    </div>
  )
}
