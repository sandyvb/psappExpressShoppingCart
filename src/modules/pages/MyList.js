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

  const styles = {
    videoPhotoButton: {
      display: 'flex',
      margin: '0 auto 50px auto',
      justifyContent: 'center',
    },
  }

  return (
    <div className="my-list">
      <header>
        <h1>My List</h1>
        <h3>
          Currently, you have {list.length} item{s} in your list.
        </h3>
        {list.length < 1 && (
          <small className="note">
            Use the same device and browser to maintain a list.
            <br />
            Or, use different browsers and devices to create multiple lists.
          </small>
        )}
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
          <img src={heart} alt="heart" className="heartImg" loading="eager" />{' '}
          to add a{' '}
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
      <div style={styles.videoPhotoButton}>
        <Link to="/videos">
          <button style={{ marginRight: '15px' }}>more Videos</button>
        </Link>
        <Link to="/photos">
          <button style={{ marginLeft: '15px' }}>more Photos</button>
        </Link>
      </div>
    </div>
  )
}

export default MyList
