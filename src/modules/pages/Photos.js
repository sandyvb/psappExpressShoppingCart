import React, { useState, useEffect } from 'react'
import '../../css/cards.css'
import PhotoData from '../../data/PhotoData'
import ModelDetail from '../detail/ModelDetail'
import Masonry from 'react-masonry-css'
import FilterModels from '../components/FilterModels'
import SortModels from '../components/SortModels'
import { Link } from 'react-router-dom'

const Photos = () => {
  const list = PhotoData
  const [q, setQ] = useState('')
  const [display, setDisplay] = useState(PhotoData)
  const [showItems, setShowItems] = useState(25)
  const [incr, setIncr] = useState(25)
  const [reset, setReset] = useState(null)
  const [displayType, setDisplayType] = useState(true) // true=masonry false=grid

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
  }

  //change display when user search input changes
  useEffect(() => {
    q.length > 0 ? setDisplay(FilterModels(q, list)) : setDisplay(list)
    q.length === 0 && reset !== null ? setReset(true) : setReset(false)
    // eslint-disable-next-line
  }, [q])

  //callback from SortModels
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
      <div key={item.model_name} className="card">
        <ModelDetail model={item} />
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
    const num = Math.floor(Math.random() * 4 + 1)
    let lcName = item.model_name.toLowerCase().replace(/ /g, '')
    const poster =
      'https://powershotz.com/models2/' + lcName + '-' + num + '.jpg'
    return (
      <div key={item.model_name} style={styles.grid}>
        <Link
          to={`/${item.model_name}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={poster}
            alt={item.model_name}
            style={{
              maxWidth: '100%',
              margin: 'auto',
              justifyContent: 'space-between',
              maxHeight: '300px',
              alignItems: 'center',
            }}
          />
          <h3>{item.model_name}</h3>
        </Link>
      </div>
    )
  })

  return (
    <div className="cards">
      <header>
        <h1>Photos & Models</h1>
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
          Start typing a name or a keyword
        </small>
        <input
          type="search"
          value={q}
          placeholder="Search..."
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />

        <SortModels
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
            onClick={() => handleShow(25)}
            style={styles.showButtons}
            title="Default View"
          >
            Show 25
          </button>
          <button
            onClick={() => handleShow(50)}
            style={styles.showButtons}
            title="Show 50 models"
          >
            Show 50
          </button>
          <button
            onClick={() => handleShow(list.length)}
            style={styles.showButtons}
            title="Show all Models. Wait for it... :)"
          >
            Show All
          </button>
          <div
            style={styles.displayButton}
            title="Change display type"
            onClick={handleDisplayType}
            className={displayType ? 'masonry' : 'grid'}
          ></div>
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

export default Photos
