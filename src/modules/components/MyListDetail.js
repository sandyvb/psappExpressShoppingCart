import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'
import { Link } from 'react-router-dom'
import PhotoData from '../../data/PhotoData'
import Checkbox from '../components/Checkbox'
import Blockonomics from './Blockonomics'

const MyListDetail = (props) => {
  const { dispatch } = useContext(ListContext)

  let name
  let type
  let price
  let code
  let pzcode = 0
  let thumb
  let linkTo
  let numberOfPhotos = 0
  let productDescription = 'Powershotz'
  let downloadLink = '0'

  if (props.item.poster) {
    name = props.item.title
    type = ' (video)'
    price = props.item.price
    pzcode = props.item.pz_code
    productDescription = `Powershotz Video #${pzcode}`
    downloadLink = props.item.downloadLink
    code = props.item.pz_code
    thumb = 'https://powershotz.com/dvdlabels/thumbs/' + props.item.poster
    linkTo = props.item.id
  }
  if (props.item.image) {
    name = props.item.title
    type = ' (video)'
    price = props.item.price
    code = props.item.id
    productDescription = `Powershotz Video #${code}`
    downloadLink = props.item.downloadLink
    thumb = 'https://powershotz.com/c4sImages/' + props.item.image
    linkTo = props.item.id
  }
  // TODO: correct all things Hazel
  if (props.item.model_name) {
    let lcName = 'hazel'
    if (props.item.model_name === 'Hazel I') {
      name = 'Hazel'
      type = ' (photo set I)'
      price = props.item.price
      code = props.item.id
      productDescription = `${name}${type}`
      downloadLink = props.item.downloadLink
    } else if (props.item.model_name === 'Hazel II') {
      name = 'Hazel'
      type = ' (photo set II)'
      price = props.item.price
      code = props.item.id
      productDescription = `${name}${type}`
      downloadLink = props.item.downloadLink
    } else {
      name = props.item.model_name
      type = ' (photo set)'
      const model = PhotoData.find(
        (item) => item.model_name === props.item.model_name
      )
      price = model.price
      code = model.id
      numberOfPhotos = model.num_photos
      productDescription = `${numberOfPhotos} photos`
      downloadLink = props.item.downloadLink
      lcName = props.item.model_name.toLowerCase().replace(/ /g, '')
    }
    linkTo = name
    thumb = 'https://powershotz.com/models2/thumbs/' + lcName + '-1.jpg'
  }

  return (
    <li>
      <Link to={`/${linkTo}`}>
        <img src={thumb} alt={props.item.title || props.item.model_name} />
      </Link>

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
          <Blockonomics
            title={name}
            productDescription={productDescription}
            price={price}
            downloadLink={downloadLink}
          />
        </div>

        {pzcode !== 0 ? (
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
