import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ListContext } from '../contexts/ListContext'
import MyListDetail from '../components/MyListDetail'
import '../../css/mylist.css'
import heart from '../../images/heart.svg'

const MyList = () => {
  const { list } = useContext(ListContext)
  const s = list.length === 1 ? '' : 's'

  let sortedList = list.sort((a, b) => {
    if (
      a.title > b.title ||
      a.model_name > b.title ||
      a.title > b.model_name ||
      a.model_name > b.model_name
    ) {
      return 1
    }
    if (
      a.title < b.title ||
      a.model_name < b.title ||
      a.title < b.model_name ||
      a.model_name < b.model_name
    ) {
      return -1
    }
    return 0
  })

  const generateList = sortedList.map((item) => {
    return <MyListDetail key={item.id || item.model_name} item={item} />
  })

  return (
    <div className="my-list">
      <header>
        <h1>My List</h1>
        <h3>
          Currently, you have {list.length} item{s} in your list.
        </h3>
        <small className="note">
          Use the same device and browser to maintain a list.
          <br />
          Or, use different browsers and devices to create multiple lists.
        </small>
      </header>

      {list.length ? (
        <div>
          <ul>{generateList}</ul>
        </div>
      ) : (
        <h5
          style={{
            width: '80%',
            textAlign: 'center',
            margin: '0 auto 70px auto',
            fontSize: '1.5rem',
            color: 'lime',
          }}
        >
          Click on any heart{' '}
          <img src={heart} alt="heart" className="heartImg" /> to add a{' '}
          <Link to="/videos" style={{ fontSize: '1.5rem' }}>
            video
          </Link>{' '}
          or{' '}
          <Link to="/photos" style={{ fontSize: '1.5rem' }}>
            photo set
          </Link>{' '}
          to your list
        </h5>
      )}
    </div>
  )
}

export default MyList
