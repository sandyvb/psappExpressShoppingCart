import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { useHistory } from 'react-router-dom'

const ClearContinueButtons = (props) => {
  const { cartDispatch } = useContext(CartContext)
  const history = useHistory()
  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '10px' : '0'

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
      <button
        style={styles.clearCart}
        onClick={() => {
          cartDispatch({
            type: 'REMOVE_CART_ALL',
          })
        }}
      >
        Clear Cart
      </button>
      {props.children}
      <button style={styles.continue} onClick={() => history.goBack()}>
        continue shopping
      </button>
    </div>
  )
}

export default ClearContinueButtons
