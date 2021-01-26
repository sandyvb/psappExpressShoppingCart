import React from 'react'
import { Link } from 'react-router-dom'

const GridItem = ({ item }) => {
  let poster
  item.poster
    ? (poster = 'https://powershotz.com/c4sImages/' + item.poster)
    : (poster = 'https://powershotz.com/c4sImages/' + item.image)

  let title = item.title

  return (
    <Link
      to={`/${item.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={poster}
        alt={title}
        style={{ width: '100%', justifyContent: 'space-between' }}
      />
      <h3 style={{ margin: '5px' }}>{title}</h3>
    </Link>
  )
}

export default GridItem
