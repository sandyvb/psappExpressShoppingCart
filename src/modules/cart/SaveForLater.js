import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const SaveForLater = ({ item }) => {
  const { dispatch } = useContext(CartContext)

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
    dispatch({ type: 'REMOVE_ITEM', item: item })
    dispatch({ type: 'CHANGE_ITEM', item: changeItem })
  }

  return (
    <button style={styles.save} onClick={handleClick}>
      {buttonText}
    </button>
  )
}

export default SaveForLater
