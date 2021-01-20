import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'

const CartButton = ({ item, width }) => {
  const { cart, cartDispatch } = useContext(CartContext)
  const [shouldAdd, setShouldAdd] = useState()

  const styles = {
    add: {
      fontSize: '1rem',
      minWidth: width,
      height: '51px',
    },
    remove: {
      fontSize: '0.9rem',
      minWidth: width,
      height: '51px',
    },
  }

  useEffect(() => {
    cart.find((product) => product.id === item.id)
      ? setShouldAdd(false)
      : setShouldAdd(true)
    // eslint-disable-next-line
  }, [item.id, cart])

  const handleClick = () => {
    shouldAdd === true
      ? cartDispatch({ type: 'ADD_CART_ITEM', item: item })
      : cartDispatch({ type: 'REMOVE_CART_ITEM', item: item })
    setShouldAdd(!shouldAdd)
  }

  return (
    <button
      onClick={handleClick}
      key={item.id}
      style={shouldAdd ? styles.add : styles.remove}
    >
      {shouldAdd ? 'add to cart' : 'remove from cart'}
    </button>
  )
}

export default CartButton
