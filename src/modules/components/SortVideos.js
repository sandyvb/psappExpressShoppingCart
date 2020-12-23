import React, { useState, useEffect } from 'react'

const SortVideos = (props) => {
  const [sortMethod, setSortMethod] = useState('title')
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
      setSortMethod('title')
      setSortOrder('asc')
    }
    props.resetReset()
    // eslint-disable-next-line
  }, [list])

  useEffect(() => {
    let sortResult
    if (sortMethod === 'title') {
      sortResult = list.sort((a, b) => {
        if (a.title > b.title) {
          return 1
        }
        if (a.title < b.title) {
          return -1
        }
        return 0
      })
    }

    if (sortMethod === 'code') {
      sortResult = list.sort((a, b) => {
        a = a.pz_code || a.id
        b = b.pz_code || b.id
        if (a > b) {
          return 1
        }
        if (a < b) {
          return -1
        }
        return 0
      })
    }

    if (sortMethod === 'runtime') {
      sortResult = list.sort((a, b) => {
        a = a.runtime || a.length
        b = b.runtime || b.length
        return a - b
      })
    }

    if (sortMethod === 'price') {
      sortResult = list.sort((a, b) => {
        return a.price - b.price
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
            <option value="title"> Title </option>
            <option value="code"> Code </option>
            <option value="runtime"> Length </option>
            <option value="price"> Price </option>
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
          />
          Desc
        </label>
      </form>
    </div>
  )
}

export default SortVideos
