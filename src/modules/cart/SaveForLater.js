import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const SaveForLater = ({ item }) => {
  const { cartDispatch } = useContext(CartContext)

  let buttonText = item.checked ? 'Add to Cart' : 'Save for Later'

  const styles = {
    save: {
      minWidth: '108.2px',
      height: '25px',
      padding: '0 8px',
      fontSize: '9px',
    },
  }

  let changeItem

  const handleClick = () => {
    changeItem = { item: { ...item, checked: !item.checked } }
    cartDispatch({ type: 'REMOVE_CART_ITEM', item: item })
    cartDispatch({ type: 'CHANGE_CART_ITEM', item: changeItem })
  }

  return (
    <button style={styles.save} onClick={handleClick}>
      {buttonText}
    </button>
  )
}

export default SaveForLater
