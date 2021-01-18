import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { ListContext } from '../contexts/ListContext'
import { Link } from 'react-router-dom'

const MoveToListButton = () => {
  const { cart } = useContext(CartContext)
  const { dispatch } = useContext(ListContext)

  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '10px' : '0'

  const moveItems = () =>
    cart.map((item) => {
      if (!item.checked) {
        const x = item
        const y = { props: { ...x, checked: true } }
        dispatch({ type: 'REMOVE_ITEM', item: x })
        dispatch({ type: 'CHANGE_ITEM', item: y })
      }
      return true
    })

  const styles = {
    move: {
      minWidth: '140px',
      fontSize: '11px',
      height: '30px',
      padding: '0px',
      marginLeft: margin,
    },
    go: {
      minWidth: '140px',
      fontSize: '11px',
      height: '30px',
      padding: '0px 10px',
      marginRight: margin,
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '18px',
      }}
    >
      <button style={styles.move} onClick={moveItems}>
        Move to list
      </button>

      <Link to="/mylist">
        <button style={styles.go}>Go to My List</button>
      </Link>
    </div>
  )
}

export default MoveToListButton
