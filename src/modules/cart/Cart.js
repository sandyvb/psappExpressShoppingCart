import React, { useContext } from 'react'
import CartDetail from './CartDetail'
import Blockonomics from '../components/Blockonomics'
import '../../css/mylist.css'
import WhyBanned from '../components/WhyBanned'
import SendInvoice from './SendInvoice'
import ClearContinueButtons from './ClearContinueButtons'
import { CartContext } from '../contexts/CartContext'

const Cart = () => {
  const { cart } = useContext(CartContext)

  const s = cart.length === 1 ? '' : 's'
  const screenWidth = window.screen.width

  let width = screenWidth < 650 ? '100%' : screenWidth < 1300 ? '80%' : '50%'
  let totals = screenWidth > 650 ? 'flex' : 'block'
  let spanFont = screenWidth < 1000 ? '1.2rem' : '1.3rem'
  let fontSz = screenWidth < 650 && '13px'

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
          <hr style={{ backgroundColor: 'lime' }} />
          <CartDetail key={item.id} item={item} />
        </div>
      )
    } else {
      saveForLaterArray.push(item)
      return <div key={item.id}></div>
    }
  })

  console.log('Cart.js 64 titles: ', titles)

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
  }

  return (
    <div>
      <header>
        <h1>Shopping Cart</h1>
        <h5 style={{ marginBottom: '0' }}>
          Currently, you have {itemCount} item{s} in your cart
        </h5>
        <h5 style={{ marginTop: '0' }}>
          and {saveForLaterArray.length} items saved for later.
        </h5>
        {cart.length === 0 && (
          <div>
            <small className="note">
              Use the same device and browser to maintain a cart.
              <br />
              Or, use different browsers and devices to create multiple carts.
            </small>
            <p style={{ color: 'lime' }}>
              Click on any "ADD TO CART" button to get started!
            </p>
          </div>
        )}
      </header>

      {itemCount > 0 && (
        <div style={{ width: width, margin: '0 auto' }}>
          <ClearContinueButtons />
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
            <div style={{ marginRight: '7px', flexGrow: '1' }}>
              <Blockonomics
                title="Powershotz Cart"
                productDescription={`${itemCount} Items`}
                price={amtDue}
                productTitles={titles}
                links={downloadLinks}
              />
            </div>
            {/* <div style={{ marginLeft: '7px', flexGrow: '1' }}>
              <SendInvoice />
            </div> */}
          </div>

          <div style={{ marginBottom: '125px' }}>
            <WhyBanned />
          </div>
        </div>
      )}
      {saveForLaterList.length > 0 && (
        <div style={{ width: width, margin: '75px auto' }}>
          <hr />
          <h2 style={{ textAlign: 'center' }}>Saved For Later</h2>
          <ul style={styles.ul}>{saveForLaterList}</ul>
          <hr style={{ marginBottom: '20px' }} />
          <ClearContinueButtons />
        </div>
      )}
    </div>
  )
}

export default Cart
