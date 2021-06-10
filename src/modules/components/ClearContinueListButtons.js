import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'
import { useHistory } from 'react-router-dom'

const ClearContinueListButtons = () => {
  const { dispatch } = useContext(ListContext)
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
      marginRight: 5,
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <div>
        <button
          title="Clears EVERYTHING in your list"
          style={styles.clearCart}
          onClick={() => {
            dispatch({
              type: 'REMOVE_ALL',
            })
          }}
        >
          Clear List
        </button>
      </div>
      <div>
        <button
          title="Go Back"
          style={styles.continue}
          onClick={() => history.goBack()}
        >
          {screenWidth < 400 ? 'shop' : 'continue shopping'}
        </button>
      </div>
    </div>
  )
}

export default ClearContinueListButtons
