import React, { useContext } from 'react'
import CartDetail from './CartDetail'
import Blockonomics from '../components/Blockonomics'
import '../../css/mylist.css'
import WhyBanned from '../components/banned/WhyBanned'
// import SendInvoice from './SendInvoice'
import ClearContinueButtons from './ClearContinueButtons'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart } = useContext(CartContext)

  const s = cart.length === 1 ? '' : 's'
  const screenWidth = window.screen.width
  let width = screenWidth < 650 ? '100%' : screenWidth < 1300 ? '80%' : '50%'
  let totals = screenWidth > 650 ? 'flex' : 'block'
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
          <hr style={{ backgroundColor: 'lime' }} />
          <CartDetail key={item.id} item={item} />
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
    videoPhotoButton: {
      display: 'flex',
      margin: '0 auto 50px auto',
      justifyContent: 'center',
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
          <ul style={{ margin: '0 0 25px 0' }}>
            <li style={{ margin: '0' }}>Use this cart to order downloads</li>
            <li style={{ margin: '0' }}>Pay with Bitcoin</li>
            <li style={{ margin: '0' }}>
              Get an email with your download links
            </li>
          </ul>
          <ClearContinueButtons />
          <div style={{ height: '20px' }}></div>

          <ul style={styles.ul}>{generateList}</ul>
          <hr style={{ backgroundColor: 'lime' }} />
          <div style={styles.totals}>
            <h2>
              <span style={styles.span}>Total Items: </span> {itemCount}
            </h2>
            <h2>
              <span style={styles.span}>Total Due: </span> ${amtDue}{' '}
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <div>
              <Blockonomics
                name={`Powershotz Cart | ${itemCount} item${s}`}
                description={titles}
                price={amtDue}
                links={downloadLinks}
              />
            </div>
            {/* <div style={{ marginLeft: '7px', flexGrow: '1' }}>
              <SendInvoice />
            </div> */}
          </div>

          <div style={{ margin: '0 15px 30px 15px' }}>
            <WhyBanned />
          </div>
        </div>
      )}
      {saveForLaterList.length > 0 && (
        <div style={{ width: width, margin: '150px auto 75px auto' }}>
          <hr />
          <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>
            Saved For Later
          </h2>
          <ul style={styles.ul}>{saveForLaterList}</ul>
          <hr style={{ marginBottom: '20px' }} />
          <ClearContinueButtons />
        </div>
      )}
      <div style={styles.videoPhotoButton}>
        <Link to="/videos">
          <button style={{ marginRight: '15px' }}>more Videos</button>
        </Link>
        <Link to="/photos">
          <button style={{ marginLeft: '15px' }}>more Photos</button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
