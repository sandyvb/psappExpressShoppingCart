import React from 'react'
import VideoStars from './VideoStars'
import VideoSlider from '../components/VideoSlider'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import Heart from '../components/Heart'
import BitcoinInfo from '../components/BitcoinInfo'
import Preview from '../components/Preview'
import CartButton from '../cart/CartButton'

const VideoDetail = (props) => {
  // images for full-length or clip videos
  let poster
  props.video.poster
    ? (poster = 'https://powershotz.com/c4sImages/' + props.video.poster)
    : (poster = 'https://powershotz.com/c4sImages/' + props.video.image)

  let thumb
  props.video.poster
    ? (thumb = 'https://powershotz.com/c4sImages/thumbs/' + props.video.poster)
    : (thumb = 'https://powershotz.com/c4sImages/' + props.video.image)

  // remove html tags from clips & set variables
  let description = props.video.description.replace(/<[^>]*>/g, '')

  let title = props.video.title
  let pz_code = props.video.pz_code || props.video.id
  let runtime = props.video.length || props.video.runtime
  let c4sCode = props.video.id
  let price = props.video.price

  // are we on videos page (0) or detail page (-1)?
  const pathname = document.location.pathname.indexOf('/videos')

  return (
    <div>
      {pathname === 0 ? (
        <ModalImage
          small={thumb}
          large={poster}
          alt={`${title} ${pz_code}`}
          hideDownload="true"
        />
      ) : (
        <VideoSlider
          thumb={thumb}
          poster={poster}
          title={title}
          pzcode={pz_code}
        />
      )}
      {pathname === 0 ? (
        <Link to={`/${c4sCode}`}>
          <h3>{title}</h3>
        </Link>
      ) : (
        <h3 style={{ textAlign: 'center' }}>{title}</h3>
      )}

      <hr />
      <p>{description}</p>
      <VideoStars video={c4sCode} />
      <hr />
      <h4>
        #{pz_code}
        <span>{runtime} min</span>
      </h4>
      <hr />
      <div className="priceAndHeart">
        <i>Price: ${price} USD</i>
        <Heart props={props.video} />
      </div>

      {pathname === 0 ? (
        <div>
          <hr style={{ margin: '0 0 40px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '49%' }}>
              <Link to={`/${c4sCode}`}>
                <button style={{ minWidth: '100%' }}>More</button>
              </Link>
            </div>
            <CartButton item={props.video} width="49%" />
          </div>
        </div>
      ) : (
        <div>
          <BitcoinInfo />
          <div style={{ margin: '50px auto 20px auto' }}>
            <Preview key={pz_code} poster={poster} id={c4sCode} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <CartButton item={props.video} />
          </div>

          {props.video.poster && (
            <div style={{ margin: '20px auto' }}>
              <Link to="/dvd">
                <button>Buy DVD</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(VideoDetail)
