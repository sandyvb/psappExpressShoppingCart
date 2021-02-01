import React, { useState, useEffect } from 'react'
import '../../css/cards.css'
import VideoDetail from '../detail/VideoDetail'
import Masonry from 'react-masonry-css'
import FilterVideos from '../components/FilterVideos'
import SortVideos from '../components/SortVideos'
import CombineArrays from '../components/CombineArrays'
import GridItem from '../grid/gridItem'
import grid from '../../images/grid.png'
import grid_dark from '../../images/grid_dark.png'
import masonry from '../../images/masonry.png'
import masonry_dark from '../../images/masonry_dark.png'

// https://www.peterbe.com/plog/a-darn-good-search-filter-function-in-javascript
// SOMETHING LIKE FLATLIST FOR REACTJS
// https://github.com/ECorreia45/flatlist-react

const Videos = () => {
  const list = CombineArrays() //raw data alphabetized
  const [display, setDisplay] = useState(list)
  const [q, setQ] = useState('') //user input
  const [showItems, setShowItems] = useState(25)
  const [incr, setIncr] = useState(25)
  const [reset, setReset] = useState(null)
  const [displayType, setDisplayType] = useState(true) // true=masonry false=grid
  const [imgSrc, setImgSrc] = useState(masonry)

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1000: 2,
    600: 1,
  }

  const handleChange = (event) => {
    setQ(event.target.value)
    setReset(false)
  }

  const handleDisplayType = () => {
    setDisplayType(!displayType)
    displayType ? setImgSrc(masonry) : setImgSrc(grid)
  }

  const handleMouseOver = () => {
    displayType ? setImgSrc(masonry_dark) : setImgSrc(grid_dark)
  }
  const handleMouseOut = () => {
    displayType ? setImgSrc(masonry) : setImgSrc(grid)
  }

  //change display when user search input changes
  useEffect(() => {
    q.length > 0 ? setDisplay(FilterVideos(q, list)) : setDisplay(list)
    q.length === 0 && reset !== null ? setReset(true) : setReset(false)
    // eslint-disable-next-line
  }, [q])

  //callback from SortVideos
  const sortForm = (childData) => {
    setDisplay([...childData])
  }

  const handleShowMore = () => {
    setShowItems(showItems >= display.length ? showItems : showItems + incr)
  }

  const handleShow = (i) => {
    setShowItems(i)
    setIncr(i)
  }

  // MASONRY
  let items = display.slice(0, showItems).map((item) => {
    return (
      <div key={item.id} className="card">
        <VideoDetail video={item} />
      </div>
    )
  })

  // GRID
  const styles = {
    cards: {
      width: '95%',
      margin: '0 auto',
      marginBottom: ' 50px',
    },
    grid: {
      width: '250px',
      maxWidth: '300px',
      display: 'flex',
      flexGrow: '1',
      backgroundColor: ' rgb(86, 79, 111, 0.2)',
      padding: '10px',
      boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)',
      margin: '5px',
      justifyContent: 'center',
    },
    showButtons: {
      minWidth: '120px',
      margin: '5px',
      padding: '0',
      height: '35px',
      fontSize: '0.9rem',
    },
    displayButton: {
      minWidth: '35px',
      margin: '5px',
      padding: '6px',
      height: '35px',
    },
  }

  let gridItems = display.slice(0, showItems).map((item) => {
    return (
      <div key={item.id} style={styles.grid}>
        <GridItem item={item} />
      </div>
    )
  })

  return (
    <div style={styles.cards} className="cards">
      <header>
        <h1>Videos & Clips</h1>
      </header>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <small style={{ marginBottom: '5px', textAlign: 'center' }}>
          Start typing a title, a video code, or keywords
        </small>
        <input
          type="search"
          value={q}
          placeholder="Search..."
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />

        <SortVideos
          parentCallback={sortForm}
          list={display}
          reset={reset}
          resetReset={() => {
            setReset(false)
          }}
        />

        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            margin: '30px auto 20px auto',
          }}
        >
          <button
            style={styles.showButtons}
            onClick={() => handleShow(25)}
            title="Default View"
          >
            Show 25
          </button>
          <button
            style={styles.showButtons}
            onClick={() => handleShow(50)}
            title="Show 50 videos"
          >
            Show 50
          </button>
          <button
            style={styles.showButtons}
            onClick={() => handleShow(100)}
            title="Show 100 videos"
          >
            Show 100
          </button>
          <button
            style={styles.showButtons}
            onClick={() => {
              handleShow(list.length)
            }}
            title="Show All videos"
          >
            Show All
          </button>
          <button
            style={styles.displayButton}
            title="Change display type"
            onClick={handleDisplayType}
          >
            <img
              src={imgSrc}
              style={{ height: '100%' }}
              title="Change display type"
              alt="change"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          </button>
        </div>
      </div>

      <h2>{q && 'Search Results...'}</h2>
      {q ? (
        <div>
          {!display.length ? null : (
            <p>
              <b>{display.length} found </b>
              <button
                style={{ marginLeft: '20px' }}
                type="button"
                onClick={() => {
                  setQ('')
                  setDisplay(list)
                  window.scrollTo(0, 0)
                }}
              >
                Clear search
              </button>
            </p>
          )}
        </div>
      ) : null}

      {displayType === true ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {items}
        </Masonry>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 auto',
            justifyContent: 'space-evenly',
          }}
        >
          {gridItems}
        </div>
      )}

      {q ? (
        <p>
          {!display.length ? (
            <i>Nothing found.</i>
          ) : (
            <b>{display.length} found </b>
          )}
          <button
            style={{ marginLeft: '20px' }}
            type="button"
            onClick={() => {
              setQ('')
              setDisplay(list)
              window.scrollTo(0, 0)
            }}
          >
            Clear search
          </button>
        </p>
      ) : null}

      {showItems >= display.length ? null : (
        <button
          style={{
            display: 'block',
            margin: '50px auto',
            width: '100%',
            maxWidth: '300px',
            fontSize: '1.1rem',
          }}
          onClick={handleShowMore}
        >
          Show Me More!
        </button>
      )}
    </div>
  )
}

// https://academind.com/learn/react/react-hooks-introduction/ (~43min)
// use memo instead of ShouldComponentUpdate. Won't update if statement is TRUE.
// Usually don't need an argument... just wrap component name in ()
// console.log('Rendering...') at top to see if too many renders

// export default React.memo(Videos, (prevProps, nextProps) => {
//   return nextProps.selectSomething === prevProps.selectSomething
// })

export default Videos
