import React, { useState, useEffect } from 'react'
import '../../css/cards.css'
import PhotoData from '../../data/PhotoData'
import ModelDetail from '../detail/ModelDetail'
import Masonry from 'react-masonry-css'
import FilterModels from '../components/FilterModels'
import SortModels from '../components/SortModels'

const Photos = () => {
  const list = PhotoData
  const [q, setQ] = useState('')
  const [display, setDisplay] = useState(PhotoData)
  const [showItems, setShowItems] = useState(25)
  const [incr, setIncr] = useState(25)
  const [reset, setReset] = useState(null)
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

  let items = display.slice(0, showItems).map((item) => {
    return (
      <div key={item.model_name} className="card">
        <ModelDetail model={item} />
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
            display: 'block',
            textAlign: 'center',
            margin: '30px auto 20px auto',
          }}
        >
          <button
            onClick={() => handleShow(25)}
            style={{ margin: '8px' }}
            title="Default View"
          >
            Show 25
          </button>
          <button
            onClick={() => handleShow(50)}
            style={{ margin: '8px' }}
            title="Show 50 models"
          >
            Show 50
          </button>
          <button
            onClick={() => handleShow(list.length)}
            style={{ margin: '8px' }}
            title="Show all Models. Wait for it... :)"
          >
            Show All
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

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {items}
      </Masonry>

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
