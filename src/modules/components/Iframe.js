import React, { useState } from 'react'

const Iframe = ({ name, number }) => {
  const [hideModal, setHideModal] = useState(true)
  let lcName = name.toLowerCase().replace(/ /g, '')
  const url = `https://powershotz.com/7xsT6AAvE1YM/zImages/${lcName}/thumbs/${lcName}-`

  // set size of preview modal
  let setWidth = window.screen.width <= 980 ? '100%' : '50%'
  // set max number of photos to display
  let show = Math.min(50, number)

  const photos = []
  for (let i = 0; i < show; i++) {
    let randomNumber = Math.floor(Math.random() * number) + 1
    let source = `${url}${randomNumber}.jpg`
    photos.push(
      <div
        key={i}
        style={{ margin: '5px' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <img src={source} alt={lcName} height="50px" loading="lazy" />
      </div>
    )
  }

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
  }

  return (
    <div style={styles.prevDiv}>
      <button style={styles.prev} onClick={handleModal}>
        {hideModal ? 'Preview' : 'Close'}
      </button>
      <div
        className={hideModal ? 'hideModal' : ''}
        style={{
          margin: '0 auto',
          width: setWidth,
        }}
      >
        <div
          style={{
            marginTop: '13px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {photos}
        </div>
      </div>
    </div>
  )
}

export default Iframe
