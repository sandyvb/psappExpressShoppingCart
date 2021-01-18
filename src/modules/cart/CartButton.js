import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'

const CartButton = ({ item, width }) => {
  const { cart, dispatch } = useContext(CartContext)
  const [shouldAdd, setShouldAdd] = useState()

  const styles = {
    add: {
      fontSize: '1rem',
      minWidth: width,
    },
    remove: {
      fontSize: '0.9rem',
      minWidth: width,
    },
  }

  useEffect(() => {
    cart.find((product) => product.id === item.id)
      ? setShouldAdd(false)
      : setShouldAdd(true)
    // eslint-disable-next-line
  }, [item.id])

  const handleClick = () => {
    shouldAdd === true
      ? dispatch({ type: 'ADD_CART_ITEM', item: item })
      : dispatch({ type: 'REMOVE_CART_ITEM', item: item })
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
