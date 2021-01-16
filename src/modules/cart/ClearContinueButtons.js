import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { useHistory } from 'react-router-dom'

const ClearContinueButtons = () => {
  const { dispatch } = useContext(CartContext)
  const history = useHistory()

  const styles = {
    clearCart: {
      minWidth: '100px',
      fontSize: '11px',
      height: '30px',
      padding: '0px',
      margin: '0',
    },
    continue: {
      minWidth: '100px',
      fontSize: '11px',
      height: '30px',
      padding: '0px 10px',
      margin: '0',
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '50px',
      }}
    >
      <button
        style={styles.clearCart}
        onClick={() => {
          dispatch({
            type: 'REMOVE_ALL',
          })
        }}
      >
        Clear Cart
      </button>
      <button style={styles.continue} onClick={() => history.goBack()}>
        continue shopping
      </button>
    </div>
  )
}

export default ClearContinueButtons
