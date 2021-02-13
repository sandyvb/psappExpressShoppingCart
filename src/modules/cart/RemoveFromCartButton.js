import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const RemoveFromCartButton = () => {
  const { cart, cartDispatch } = useContext(CartContext)

  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '20px' : '0'

  const deleteItems = () =>
    cart.map(
      (item) =>
        !item.checked && cartDispatch({ type: 'REMOVE_CART_ITEM', item })
    )

  const styles = {
    clearCart: {
      // minWidth: '140px',
      fontSize: '12px',
      height: '51px',
      padding: '0px',
      marginLeft: margin,
    },
  }

  return (
    <button style={styles.clearCart} onClick={deleteItems}>
      Remove from cart
    </button>
  )
}

export default RemoveFromCartButton
