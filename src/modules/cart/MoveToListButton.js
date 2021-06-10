import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { ListContext } from '../contexts/ListContext'

const MoveToListButton = () => {
  const { cart, cartDispatch } = useContext(CartContext)
  const { dispatch } = useContext(ListContext)

  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '20px' : '0'

  const moveItems = () => {
    cart.map((item) => {
      if (!item.checked) {
        let origItem = item
        let changeItem = { props: { ...item, checked: true } }
        dispatch({ type: 'REMOVE_ITEM', item: origItem })
        dispatch({ type: 'CHANGE_ITEM', item: changeItem })
        cartDispatch({ type: 'REMOVE_CART_ITEM', item: origItem })
      }
      return true
    })
  }

  const styles = {
    move: {
      // minWidth: '140px',
      fontSize: '12px',
      height: '51px',
      padding: '0px',
      marginRight: margin,
    },
  }

  return (
    <button
      title='Move these items from your cart to your list and mark as "purchased"'
      style={styles.move}
      onClick={moveItems}
    >
      Move to list
    </button>
  )
}

export default MoveToListButton
