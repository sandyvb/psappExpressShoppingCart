import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { useHistory } from 'react-router-dom'

const ClearContinueButtons = (props) => {
  const { cartDispatch } = useContext(CartContext)
  const history = useHistory()
  const screenWidth = window.screen.width
  const width = screenWidth < 400 ? '120px' : ''

  const styles = {
    clearCart: {
      minWidth: width,
      maxWidth: width,
      fontSize: '11px',
      height: '30px',
      padding: 0,
      marginRight: 5,
    },
    continue: {
      minWidth: width,
      maxWidth: width,
      fontSize: '11px',
      height: '30px',
      padding: 0,
      marginLeft: 5,
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <button
        title="Clears EVERYTHING in cart including saved items"
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
      <button
        title="Go Back"
        style={styles.continue}
        onClick={() => history.goBack()}
      >
        {screenWidth < 400 ? 'shop' : 'continue shopping'}
      </button>
    </div>
  )
}

export default ClearContinueButtons
