import { urlencoded } from 'body-parser'
import React from 'react'
import { Link } from 'react-router-dom'

const GridItem = ({ item }) => {
  let poster
  item.poster
    ? (poster = 'https://powershotz.com/c4sImages/' + item.poster)
    : (poster = 'https://powershotz.com/c4sImages/' + item.image)

  let title = item.title

  const styles = {
    imageDiv: {
      width: '100%',
      height: '200px',
      marginBottom: '5px',
    },
    image: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${poster})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }

  return (
    <Link
      to={`/${item.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div style={styles.imageDiv}>
        <div style={styles.image}></div>
      </div>
      <h3
        style={{
          margin: '3px 0',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {title}
      </h3>
    </Link>
  )
}

export default GridItem
