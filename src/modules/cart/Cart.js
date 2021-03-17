import React, { useContext } from 'react'
import CartDetail from './CartDetail'
import Blockonomics from '../components/Blockonomics'
import '../../css/mylist.css'
import WhyBanned from '../components/banned/WhyBanned'
import ClearContinueButtons from './ClearContinueButtons'
import { CartContext } from '../contexts/CartContext'
import BitcoinHelp from './BitcoinHelp'
import MoreVideosPhotsButtons from './MoreVideosPhotosButtons'
import BitcoinInfo from './BitcoinInfo'

const Cart = () => {
  const { cart } = useContext(CartContext)

  const s = cart.length === 1 ? '' : 's'
  const screenWidth = window.screen.width
  let width = screenWidth < 650 ? '94%' : screenWidth < 1300 ? '80%' : '50%'
  let spanFont = screenWidth < 1000 ? '1.2rem' : '1.3rem'

  let randomNumber = () => {
    const max = 99
    const min = 10
    return Math.floor(Math.random() * (max - min) + min)
  }

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

  // https://stackoverflow.com/questions/29509934/encrypt-with-cryptojs-and-decrypt-with-php

  let itemCount = 0
  let total = []
  let titles = []
  let downloadLinks = []
  let saveForLaterArray = []
  const generateList = sortedList.map((item) => {
    if (!item.checked) {
      itemCount += 1
      total.push(parseFloat(item.price))
      titles.push(item.title || item.model_name)
      let extension = randomNumber()
      let link = `${extension}${item.downloadLink}`
      downloadLinks.push(link)
      return (
        <div key={item.id}>
          <CartDetail key={item.id} item={item} />
          <hr style={{ backgroundColor: 'lime' }} />
        </div>
      )
    } else {
      saveForLaterArray.push(item)
      return <div key={item.id}></div>
    }
  })

  const saveForLaterList = saveForLaterArray.map((item) => {
    return (
      <div key={item.id}>
        <hr />
        <CartDetail key={item.id} item={item} />
      </div>
    )
  })

  let amtDue = total.reduce((a, b) => a + b, 0).toFixed(2)

  const styles = {
    button: {
      display: 'block',
      margin: '0px auto',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    totals: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 45px',
      backgroundColor: '#221729',
      border: '2px solid lime',
      margin: '30px auto',
      flexWrap: 'wrap',
    },
    span: {
      color: 'white',
      fontWeight: '200',
      fontSize: spanFont,
      paddingRight: '5px',
    },
    checkout: {
      color: '#f0ad4e',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
  }

  return (
    <div>
      <header className="my-list" style={{ marginBottom: '60px' }}>
        <h1>Shopping Cart</h1>
        <h3 style={{ marginBottom: '0' }}>
          Currently, you have {itemCount} item{s} in your cart
        </h3>
        <h3 style={{ marginTop: '0' }}>
          and {saveForLaterArray.length} items saved for later.
        </h3>
        {cart.length === 0 && (
          <small className="note" style={{ fontStyle: 'italic' }}>
            Use the same device and browser to maintain a cart.
            <br />
            Or, use different browsers and devices to create multiple carts.
          </small>
        )}
      </header>
      {cart.length === 0 && (
        <div>
          <h5
            style={{
              width: '80%',
              textAlign: 'center',
              margin: '0 auto 70px auto',
              fontSize: '1.5rem',
              color: 'lime',
            }}
          >
            Click on any "ADD TO CART" button to get started!
          </h5>
        </div>
      )}

      {itemCount > 0 && (
        <div style={{ width: width, margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <ClearContinueButtons />
          </div>
          <hr style={{ margin: '0px auto' }} />
          <p style={styles.checkout}>checkout</p>
          <ul style={{ margin: '0 0 50px 0' }}>
            <li style={{ margin: '0' }}>
              Click the "Pay with Bitcoin" button.
            </li>
            <li style={{ margin: '0' }}>
              When the form pops up follow the instructions.
            </li>
            <li style={{ margin: '0' }}>
              As soon as your payment is confirmed, you'll get an email with
              your download links!
            </li>
          </ul>

          <ul
            style={{
              ...styles.ul,
              border: '2px solid lime',
              borderBottom: '0',
            }}
          >
            {generateList}
          </ul>
          <div style={styles.totals}>
            <h2>
              <span style={styles.span}>Total Items: </span> {itemCount}
            </h2>
            <h2>
              <span style={styles.span}>Total Due: </span> ${amtDue}{' '}
            </h2>
          </div>

          <Blockonomics
            key={amtDue}
            name={`Powershotz Cart | ${itemCount} item${s}`}
            description={titles}
            price={amtDue}
            links={downloadLinks}
          />

          <div style={{ marginTop: '75px' }}>
            <BitcoinInfo />
          </div>
          <div style={{ marginTop: '40px' }}>
            <BitcoinHelp />
          </div>
          <div style={{ marginTop: '40px' }}>
            <WhyBanned />
          </div>
          <div style={{ marginTop: '40px', marginBottom: '75px' }}>
            <MoreVideosPhotsButtons />
          </div>
        </div>
      )}
      {saveForLaterList.length > 0 && (
        <div
          style={{
            width: width,
            margin: '100px auto 75px auto',
            borderTop: '1px solid white',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2rem',
            }}
          >
            Saved For Later
          </h2>
          <ul style={styles.ul}>{saveForLaterList}</ul>
          <hr style={{ marginBottom: '20px' }} />
          <ClearContinueButtons />
        </div>
      )}
    </div>
  )
}

export default Cart
