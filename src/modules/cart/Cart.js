import React, { useContext, useState, useEffect, useCallback } from 'react'
import CartDetail from './CartDetail'
import '../../css/mylist.css'
import WhyBanned from '../components/banned/WhyBanned'
import ClearContinueButtons from './ClearContinueButtons'
import { CartContext } from '../contexts/CartContext'
import { Altcoin } from './Altcoin'

const screenWidth = window.screen.width
let width = screenWidth < 650 ? '94%' : '75%'
let spanFont = screenWidth < 1000 ? '1.2rem' : '1.3rem'

const Cart = () => {
  //TODO: only change isSale for sale
  // and on home page
  const [isSale, setIsSale] = useState(false)

  const atMidnight = useCallback(() => setIsSale(false), [setIsSale])

  const timeAtMidnight = isSale && new Date('4/26/2021 12:01:00 AM').getTime()
  let timeNow = isSale && new Date().getTime()
  let offsetMs = isSale && timeAtMidnight - timeNow

  useEffect(() => {
    const timeout = isSale && setTimeout(atMidnight, offsetMs)
    return () => {
      isSale && clearTimeout(timeout)
    }
  }, [offsetMs, isSale, atMidnight])

  const { cart } = useContext(CartContext)

  const s = cart.length === 1 ? '' : 's'

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
  let total = []
  let titles = []
  let downloadLinks = []
  let saveForLaterArray = []

  const generateList = sortedList.map((item) => {
    if (!item.checked) {
      itemCount += 1
      total.push(parseFloat(item.price))
      titles.push(item.title || item.model_name)
      downloadLinks.push(item.downloadLink)
      return (
        <div key={item.id}>
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
        <CartDetail key={item.id} item={item} />
      </div>
    )
  })

  let amtDue = total.reduce((a, b) => a + b, 0).toFixed(2)

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
            <br />
            This feature is not available for multiple sessions in Tor browsers.
          </small>
        )}
      </header>
      {cart.length === 0 && (
        <div>
          <h5 style={styles.getStarted}>
            Click on any "ADD TO CART" button to get started!
          </h5>
        </div>
      )}

      {itemCount > 0 && (
        <div style={styles.checkoutDiv}>
          <div style={{ marginBottom: '0px' }}>
            <ClearContinueButtons />
            <p style={styles.checkout}>checkout</p>
          </div>

          {isSale && (
            <ul style={{ margin: '0 0 30px 0' }}>
              <li style={{ margin: '0', color: 'lime', fontSize: '1.4rem' }}>
                This weekend only 50% off!
              </li>
              <li style={{ margin: '0' }}>Offer ends midnight 4/25/2021</li>
              {/* <li style={{ margin: '0' }}>Pay with Bitcoin or Altcoins.</li>
            <li style={{ margin: '0' }}>
              When the form pops up follow the instructions.
            </li>
            <li style={{ margin: '0' }}>
              After your payment is confirmed, you'll get an email with your
              links!
            </li> */}
            </ul>
          )}

          <Altcoin
            key={Date.now()}
            name={`Powershotz Cart | ${itemCount} item${s}`}
            description={titles}
            price={amtDue}
            codes={downloadLinks}
            date={Date.now()}
            sortedList={sortedList}
          />

          <div style={styles.totals}>
            <h2>
              <span style={styles.span}>Total Items: </span> {itemCount}
            </h2>
            {isSale ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: 0 }}>
                  <span style={styles.span}>Total Due: </span>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      fontSize: '1.4rem',
                    }}
                  >
                    ${amtDue}
                  </span>
                </h2>
                <h2 style={{ marginTop: 0, fontSize: '2rem', color: 'lime' }}>
                  <span style={styles.span}>NOW: </span> $
                  {(amtDue / 2).toFixed(2)}
                </h2>
              </div>
            ) : (
              <h2>
                <span style={styles.span}>Total Due: </span>
                <span>${amtDue}</span>
              </h2>
            )}
          </div>

          <ul style={styles.ul}>{generateList}</ul>

          <div style={{ marginTop: '30px' }}>
            <WhyBanned />
          </div>

          <div style={{ margin: '30px 0' }}>{/* <BitcoinInfo /> */}</div>
        </div>
      )}
      {saveForLaterList.length > 0 && (
        <div style={{ ...styles.checkoutDiv, margin: '30px auto 75px auto' }}>
          <h2 style={styles.savedForLater}>Saved For Later</h2>
          <ul style={{ ...styles.ul, marginBottom: '25px' }}>
            {saveForLaterList}
          </ul>
          <ClearContinueButtons />
        </div>
      )}
    </div>
  )
}

const styles = {
  ul: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  totals: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#221729',
    border: '1px solid lime',
    margin: '10px auto 0 auto',
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
    marginBottom: '50px',
    textTransform: 'uppercase',
  },
  checkoutDiv: {
    width: width,
    maxWidth: '780px',
    margin: '0 auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  getStarted: {
    width: '80%',
    textAlign: 'center',
    margin: '0 auto 70px auto',
    fontSize: '1.5rem',
    color: 'lime',
  },
  savedForLater: {
    textAlign: 'center',
    fontSize: '2rem',
    border: '1px solid lime',
    width: '100%',
    padding: '20px 0',
    backgroundColor: '#221729',
    margin: '0',
  },
}

export default Cart
