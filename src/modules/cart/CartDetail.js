import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import SaveForLater from '../cart/SaveForLater'

const CartDetail = ({ item }) => {
  const { cartDispatch } = useContext(CartContext)

  let name
  let lcName
  let type
  let price
  let code
  let pzcode = 0
  let thumb
  let linkTo
  let numberOfPhotos = 0
  let productDescription = 'Powershotz'
  let screenWidth = window.screen.width
  let fontSz = screenWidth < 650 && '13px'

  if (item.poster) {
    name = item.title
    type = ' (video)'
    price = item.price
    pzcode = item.pz_code
    productDescription = `Video #${pzcode}`
    code = item.pz_code
    thumb = 'https://powershotz.com/c4sImages/thumbs/' + item.poster
    linkTo = item.id
  }
  if (item.image) {
    name = item.title
    type = ' (video)'
    price = item.price
    code = item.id
    productDescription = `Video #${code}`
    thumb = 'https://powershotz.com/c4sImages/' + item.image
    linkTo = item.id
  }

  if (item.model_name) {
    name = item.model_name
    lcName = item.model_name.toLowerCase().replace(/ /g, '')
    type = ' (photo set)'
    price = item.price
    code = item.id
    numberOfPhotos = item.num_photos
    productDescription = `${numberOfPhotos} Photos`
    linkTo = name
    thumb = 'https://powershotz.com/models2/thumbs/' + lcName + '-1.jpg'
  }

  return (
    <li
      style={{
        listStyleType: 'none',
        fontSize: fontSz,
        border: '1px solid lime',
      }}
    >
      <div style={styles.row}>
        <div
          onContextMenu={(e) => e.preventDefault()}
          style={{ ...styles.col, alignItems: 'flex-start' }}
        >
          <Link to={`/${linkTo}`}>
            <img
              width="75px"
              src={thumb}
              alt={item.title || item.model_name}
              loading="eager"
            />
          </Link>
          <button
            style={styles.delete}
            onClick={() => {
              cartDispatch({
                type: 'REMOVE_CART_ITEM',
                item: item,
              })
            }}
          >
            Delete
          </button>
        </div>
        <div style={{ margin: '0 15px', flex: 4 }}>
          <h4>
            <Link style={{ fontSize: fontSz }} to={`/${linkTo}`}>
              {name}
            </Link>
            <span
              style={(styles.type, { fontSize: fontSz, fontWeight: '100' })}
            >
              {' '}
              {type}
            </span>
          </h4>
          <p>{productDescription}</p>
        </div>
        <div style={{ ...styles.col, alignItems: 'flex-end' }}>
          <p style={{ marginTop: 0 }}>
            ${price} <span>USD</span>
          </p>
          <SaveForLater item={item} />
        </div>
      </div>
    </li>
  )
}

const styles = {
  delete: {
    minWidth: '75px',
    fontSize: '11px',
    height: '25px',
    padding: '0px',
  },
  type: {
    fontSize: '1rem',
    fontWeight: '100',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    padding: '10px 20px',
    backgroundColor: '#221729',
  },
  col: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
  },
}

export default CartDetail
