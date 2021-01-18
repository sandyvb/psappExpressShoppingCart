import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const RemoveBackButtons = () => {
  const { cart, dispatch } = useContext(CartContext)

  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '10px' : '0'

  const deleteItems = () =>
    cart.map(
      (item) => !item.checked && dispatch({ type: 'REMOVE_CART_ITEM', item })
    )

  const styles = {
    clearCart: {
      minWidth: '140px',
      fontSize: '11px',
      height: '30px',
      padding: '0px',
      marginLeft: margin,
    },
    continue: {
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
      }}
    >
      <button style={styles.clearCart} onClick={deleteItems}>
        Remove from cart
      </button>

      <Link to="/cart">
        <button style={styles.continue}>Go back to cart</button>
      </Link>
    </div>
  )
}

export default RemoveBackButtons
