import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'
import { useHistory } from 'react-router-dom'

const ClearContinueListButtons = () => {
  const { dispatch } = useContext(ListContext)
  const history = useHistory()
  const screenWidth = window.screen.width
  const margin = screenWidth < 650 ? '10px' : '0'
  const minWidth = screenWidth < 400 ? '77px' : '140px'

  const styles = {
    clearCart: {
      minWidth: minWidth,
      fontSize: '11px',
      height: '30px',
      padding: '0px',
      marginLeft: margin,
    },
    continue: {
      minWidth: minWidth,
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
        marginTop: '20px',
        width: '100%',
      }}
    >
      <div>
        <button
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
        <button style={styles.continue} onClick={() => history.goBack()}>
          continue shopping
        </button>
      </div>
    </div>
  )
}

export default ClearContinueListButtons
