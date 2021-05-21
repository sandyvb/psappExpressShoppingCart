import React, { useContext } from 'react'
import '../../css/mylist.css'
import { CartContext } from '../contexts/CartContext'
import MoveToListButton from './MoveToListButton'
import RemoveFromCartButton from './RemoveFromCartButton'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  const { cart } = useContext(CartContext)
  const screenWidth = window.screen.width

  let width = screenWidth < 650 ? '100%' : screenWidth < 1300 ? '80%' : '50%'
  let totals = screenWidth > 650 ? 'flex' : 'block'
  let spanFont = screenWidth < 1000 ? '1.2rem' : '1.3rem'

  let sortedList = cart.sort((a, b) => {
    if (
      a.title > b.title ||
      a.model_name > b.title ||
      a.title > b.model_name ||
      a.model_name > b.model_name
    ) {
      return 1
    }
    if (
      a.title < b.title ||
      a.model_name < b.title ||
      a.title < b.model_name ||
      a.model_name < b.model_name
    ) {
      return -1
    }
    return 0
  })

  let itemCount = 0
  let titles = []
  const generateList = sortedList.map((item) => {
    if (!item.checked) {
      itemCount += 1
      titles.push(item.title || item.model_name)
      return (
        <div key={item.id}>
          <hr style={{ backgroundColor: 'lime' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>{item.title || item.model_name}</h4>
            <h4>#{item.pz_code || item.id}</h4>
          </div>
        </div>
      )
    }
    return false
  })

  let s = itemCount === 1 ? '' : 's'

  const styles = {
    ul: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    totals: {
      display: totals,
      justifyContent: 'space-between',
      padding: '0 45px',
      backgroundColor: '#221729',
      border: '1px solid lime',
      margin: '30px auto',
    },
    span: {
      color: 'white',
      fontWeight: '200',
      fontSize: spanFont,
      paddingRight: '5px',
    },
  }

  return (
    <div>
      <header>
        <h1>Thank you for your purchase!</h1>
        <div>
          <h3 style={{ color: 'lime' }}>Your payment is being processed.</h3>
          <p>
            You will receive your download link{s} shortly.
            <br />
            <Link to="/contact">Contact me</Link> if you have any questions or
            problems.
          </p>
          <h3>Button functions:</h3>
          <ul style={{ paddingLeft: '0', margin: '0 20px 10px 20px' }}>
            <li style={{ margin: '0' }}>
              REMOVE FROM CART: remove all the items from your cart, but keep
              your saved items
            </li>
            <li style={{ margin: '0' }}>
              MOVE TO LIST: move these items from your cart to your list and
              mark as <em>"purchased"</em>
            </li>
          </ul>

          <small>
            To view your cart or list, use the icon buttons on the lower right
            of your screen.
          </small>
        </div>
      </header>

      <div style={{ width: width, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '45px',
          }}
        >
          <RemoveFromCartButton />
          <MoveToListButton />
        </div>

        <div style={{ margin: '0 20px 50px 20px' }}>
          <h2>Your Order:</h2>
          <ul style={styles.ul}>{generateList}</ul>
          <hr style={{ backgroundColor: 'lime' }} />
          <div style={styles.totals}>
            <h2>
              <span style={styles.span}>Items: </span> {itemCount}
            </h2>
            <h2>
              <span style={styles.span}>Status: </span>{' '}
              {itemCount > 0 ? 'pending' : 'n/a'}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
