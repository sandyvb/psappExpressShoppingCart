import React from 'react'
import StarsInData from '../../data/StarsInData'
import FindTitle from './FindTitle'
import Masonry from 'react-masonry-css'

export default function ModelStarsIn(props) {
  const name = props.model
  const twoNames = name.includes('&')
  const pathname = window.location.pathname
  let breakpointColumnsObj

  if (pathname !== '/photos') {
    breakpointColumnsObj = {
      default: 4,
      1400: 4,
      1000: 3,
      600: 2,
    }
  } else {
    breakpointColumnsObj = {
      default: 2,
    }
  }

  const vids = StarsInData.filter((item) => item.model_name === name).map(
    (item) => (
      <div
        key={name + item.vid_id}
        style={{
          marginTop: '15px',
          backgroundColor: 'rgba(76, 73, 93, 0.2)',
          boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)',
          borderRadius: '3px',
        }}
      >
        <a
          href={`https://powershotz.com/${item.vid_id}`}
          style={{ textDecoration: 'none' }}
        >
          <FindTitle number={item.vid_id} />
        </a>
      </div>
    )
  )

  if (vids.length > 0) {
    return (
      <div>
        {!twoNames ? (
          <p style={{ textAlign: 'left' }}>
            {name} stars in {vids.length} video
            {vids.length > 1 && 's'}:
          </p>
        ) : (
          <p style={{ textAlign: 'left' }}>
            {name} star in {vids.length} video
            {vids.length > 1 && 's'}:
          </p>
        )}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid-modelDetail"
          columnClassName="masonry-grid_column-modelDetail"
        >
          {vids}
        </Masonry>
      </div>
    )
  } else {
    return null
  }
}
