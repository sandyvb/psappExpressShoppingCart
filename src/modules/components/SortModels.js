import React, { useState, useEffect } from 'react'

const SortModels = (props) => {
  const [sortMethod, setSortMethod] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const list = props.list

  const handleChange = (event) => {
    setSortMethod(event.target.value)
  }

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value)
  }

  useEffect(() => {
    if (props.reset === true && props.reset !== null) {
      setSortMethod('name')
      setSortOrder('asc')
    }
    props.resetReset()
    // eslint-disable-next-line
  }, [list])

  useEffect(() => {
    let sortResult
    if (sortMethod === 'name') {
      sortResult = list.sort((a, b) => {
        if (a.model_name > b.model_name) {
          return 1
        }
        if (a.model_name < b.model_name) {
          return -1
        }
        return 0
      })
    }

    if (sortMethod === 'price') {
      sortResult = list.sort((a, b) => {
        return a.price - b.price
      })
    }

    if (sortMethod === 'numPhotos') {
      sortResult = list.sort((a, b) => {
        return a.num_photos - b.num_photos
      })
    }

    sortOrder === 'desc'
      ? props.parentCallback(sortResult.reverse())
      : props.parentCallback(sortResult)
    // eslint-disable-next-line
  }, [sortMethod, sortOrder])

  return (
    <div>
      <form style={{ display: 'inline' }}>
        <label>
          Sort By:
          <select
            name="sortMethod"
            onChange={handleChange}
            value={sortMethod}
            className="sortFormSelect"
            style={{ margin: 'auto 10px' }}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="numPhotos"># of Photos</option>
          </select>
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="asc"
            style={{ display: 'inline', margin: 'auto 10px', width: '10px' }}
            checked={sortOrder === 'asc'}
            onChange={handleSortOrder}
            className="radio"
          />
          Asc
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="desc"
            style={{ display: 'inline', margin: 'auto 10px', width: '10px' }}
            checked={sortOrder === 'desc'}
            onChange={handleSortOrder}
            className="radio"
          />
          Desc
        </label>
      </form>
    </div>
  )
}

export default SortModels
