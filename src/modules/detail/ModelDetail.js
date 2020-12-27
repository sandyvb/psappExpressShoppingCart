import React from 'react'
import ModelStarsIn from './ModelStarsIn'
import PhotoData from '../../data/PhotoData'
import Hazel from './Hazel'
import Popup from '../components/Popup'
import ModelSlider from '../components/ModelSlider'
import ModalImage from 'react-modal-image'
import ModelData from '../../data/ModelData'
import { Link } from 'react-router-dom'
import Heart from '../components/Heart'
import BitcoinInfo from '../components/BitcoinInfo'
import WhyBanned from '../components/WhyBanned'
import Blockonomics from '../components/Blockonomics'

function ModelDetail(props) {
  const num = Math.floor(Math.random() * 4 + 1)
  const name = props.model.model_name
  const model = PhotoData.find((item) => item.model_name === name)
  const price = model.price
  const downloadLink = model.downloadLink
  const description = ModelData.find((item) => item.model_name === name)
    .description
  const c4sCode = model.id
  const numPhotos = model.num_photos
  const productDescription = `${numPhotos} photos`
  const lcName = name.toLowerCase().replace(/ /g, '')
  const poster = 'https://powershotz.com/models2/' + lcName + '-' + num + '.jpg'
  const thumb =
    'https://powershotz.com/models2/thumbs/' + lcName + '-' + num + '.jpg'

  // TODO: check if c4s still has these
  const thumbnails =
    'http://images4sale.com/store/popup/325/' + c4sCode + '/thumbnail'

  const pathname = window.location.pathname
  const isDetail = pathname === '/photos' ? false : true

  const lastChar = name.substr(name.length - 1)
  let apostrophe = "'s"
  if (lastChar === 's') {
    apostrophe = "'"
  }

  if (name === 'Hazel') {
    return <Hazel />
  } else {
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

        <p className="priceAndHeart">
          <i>Price: ${price} USD</i>
          <Heart props={props.model} />
        </p>

        {isDetail && (
          <div>
            <BitcoinInfo />
            <Blockonomics
              key={c4sCode}
              title={name}
              productDescription={productDescription}
              price={price}
              downloadLink={downloadLink}
            />
            <div style={{ margin: '20px auto' }}>
              <span>
                <Popup url={thumbnails} msg={'Preview'} />
              </span>
            </div>
            <WhyBanned />
          </div>
        )}

        <hr style={{ margin: '40px 0 40px 0' }} />

        {!isDetail ? (
          <Link to={`/${name}`}>
            <button style={{ width: '100%' }}>
              More about {props.model.model_name}
            </button>
          </Link>
        ) : (
          <ModelStarsIn key={name} model={name} />
        )}
      </div>
    )
  }
}

export default ModelDetail
