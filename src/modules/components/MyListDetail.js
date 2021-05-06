import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'
import { Link } from 'react-router-dom'
import { PHOTODATA } from '../../data/PhotoData'
import Checkbox from '../components/Checkbox'
import CartButton from '../cart/CartButton'

const MyListDetail = (props) => {
  const { dispatch } = useContext(ListContext)

  let name
  let lcName
  let type
  let price = '0'
  let code
  let pzcode = '0'
  let thumb
  let linkTo
  let numberOfPhotos = 0
  let productDescription = 'Powershotz'
  let toCart

  if (props.item.poster) {
    name = props.item.title
    type = ' (video)'
    price = props.item.price
    pzcode = props.item.pz_code
    productDescription = `Powershotz Video #${pzcode}`
    code = props.item.pz_code
    thumb = 'https://powershotz.com/c4sImages/thumbs/' + props.item.poster
    linkTo = props.item.id
    toCart = props.item
  }
  if (props.item.image) {
    name = props.item.title
    type = ' (video)'
    price = props.item.price
    code = props.item.id
    productDescription = `Powershotz Video #${code}`
    thumb = 'https://powershotz.com/c4sImages/' + props.item.image
    linkTo = props.item.id
    toCart = props.item
  }

  if (props.item.model_name) {
    name = props.item.model_name
    type = ' (photo set)'
    const model = PHOTODATA.find(
      (item) => item.model_name === props.item.model_name
    )
    toCart = model
    price = model.price || '0'
    code = model.id
    numberOfPhotos = model.num_photos
    productDescription = `${numberOfPhotos} photos`
    lcName = props.item.model_name.toLowerCase().replace(/ /g, '')
    linkTo = name
    thumb = 'https://powershotz.com/models2/thumbs/' + lcName + '-1.jpg'
  }

  return (
    <li>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Link to={`/${linkTo}`}>
          <img
            src={thumb}
            alt={props.item.title || props.item.model_name}
            loading="eager"
          />
        </Link>
      </div>

      <div className="smallScreenMargin">
        <h4>
          <Link to={`/${linkTo}`}>{name}</Link>
          <span className="spanType"> {type}</span>
        </h4>
        {numberOfPhotos === 0 ? (
          <p>{productDescription}</p>
        ) : (
          <p>{numberOfPhotos} photos</p>
        )}

        <p>
          ${price} <span>USD</span>
        </p>
        <p
          style={
            props.item.checked
              ? { color: '#00b300' }
              : { color: 'var(--textColor)' }
          }
        >
          <Checkbox props={props.item} />
          Purchased
        </p>
      </div>
      <div>
        <Link to={`/${linkTo}`}>
          <button style={{ marginBottom: '15px' }}>Details</button>
        </Link>
        <div style={{ marginBottom: '15px' }}>
          <CartButton item={toCart} />
        </div>

        {props.item.pz_code ? (
          <div>
            <Link to={{ pathname: '/dvd', state: { code: pzcode } }}>
              <button style={{ marginBottom: '15px' }}>BUY DVD</button>
            </Link>
            <button
              onClick={() => {
                dispatch({
                  type: 'REMOVE_ITEM',
                  item: props.item,
                })
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch({
                type: 'REMOVE_ITEM',
                item: props.item,
              })
            }}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}

export default MyListDetail
