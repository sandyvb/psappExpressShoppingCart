import React from 'react'
import ModelStarsIn from './ModelStarsIn'
import { PHOTODATA } from '../../data/PhotoData'
import ModelSlider from '../components/ModelSlider'
import ModalImage from 'react-modal-image'
import ModelData from '../../data/ModelData'
import { Link } from 'react-router-dom'
import Heart from '../components/Heart'
import Iframe from '../components/Iframe'
import CartButton from '../cart/CartButton'
import BuyAll from '../cart/BuyAll'

function ModelDetail(props) {
  const num = Math.floor(Math.random() * 4 + 1)
  const name = props.model.model_name
  const model = PHOTODATA.find((item) => item.model_name === name)
  const price = model.price
  const description = ModelData.find((item) => item.model_name === name)
    .description
  const c4sCode = model.id
  const numPhotos = model.num_photos
  const lcName = name.toLowerCase().replace(/ /g, '')
  const poster = 'https://powershotz.com/models2/' + lcName + '-' + num + '.jpg'
  const thumb =
    'https://powershotz.com/models2/thumbs/' + lcName + '-' + num + '.jpg'

  const pathname = window.location.pathname
  const isDetail = pathname === '/photos' ? false : true

  const lastChar = name.substr(name.length - 1)
  let apostrophe = "'s"
  if (lastChar === 's') {
    apostrophe = "'"
  }

  return (
    <div>
      {!isDetail ? (
        <ModalImage
          small={thumb}
          large={poster}
          alt={name}
          hideDownload="true"
        />
      ) : (
        <ModelSlider name={name} />
      )}

      {!isDetail ? (
        <Link to={`/${name}`}>
          <h3>{props.model.model_name}</h3>
        </Link>
      ) : (
        <h3 style={{ textAlign: 'center' }}>{props.model.model_name}</h3>
      )}

      <hr />

      <p style={{ textAlign: 'left' }}>{description}</p>

      <hr />

      <h6 style={{ marginTop: '40px' }}>
        {name}
        {apostrophe} Photo Set
      </h6>
      <p style={{ textAlign: 'left' }}>
        Includes {numPhotos} downloadable images
      </p>

      <hr />
      <div className="priceAndHeart">
        <div>Price: ${price} USD</div>
        <Heart props={props.model} />
      </div>

      {isDetail && (
        <div>
          <hr />
          <div style={{ margin: '50px auto 20px auto' }}>
            <Iframe key={c4sCode} name={name} number={numPhotos} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <CartButton item={model} />
          </div>
          <div style={{ marginBottom: '50px' }}>
            <BuyAll name={name} />
          </div>
        </div>
      )}

      {!isDetail ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '49%' }}>
            <Link to={`/${name}`}>
              <button style={{ minWidth: '100%' }}>More</button>
            </Link>
          </div>
          <CartButton item={model} width="49%" />
        </div>
      ) : (
        <ModelStarsIn key={name} model={name} />
      )}
    </div>
  )
}

export default ModelDetail
