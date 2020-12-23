import React from 'react'
import VideoStars from './VideoStars'
// import Popup from '../components/Popup'
import VideoSlider from '../components/VideoSlider'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import Heart from '../components/Heart'
import Blockonomics from '../components/Blockonomics'
import BitcoinInfo from '../components/BitcoinInfo'
import WhyBanned from '../components/WhyBanned'

const VideoDetail = (props) => {
  // images for full-length or clip videos
  let poster
  props.video.poster
    ? (poster = 'https://powershotz.com/dvdlabels/' + props.video.poster)
    : (poster = 'https://powershotz.com/c4sImages/' + props.video.image)

  let thumb
  props.video.poster
    ? (thumb = 'https://powershotz.com/dvdlabels/thumbs/' + props.video.poster)
    : (thumb = 'https://powershotz.com/c4sImages/' + props.video.image)

  // remove html tags from clips & set variables
  let description = props.video.description.replace(/<[^>]*>/g, '')
  let title = props.video.title
  let pz_code = props.video.pz_code || props.video.id
  let runtime = props.video.length || props.video.runtime
  let c4sCode = props.video.id
  let price = props.video.price
  // TODO: SET UP PREVIEW BUTTON AND PREVIEWS
  // const previewUrl = 'https://powershotz.com/previews/prev_'
  let downloadLink = props.video.downloadLink
  let productDescription = `Powershotz Video #${pz_code}`

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
      <p className="priceAndHeart">
        <i>Price: ${price} USD</i>
        <Heart props={props.video} />
      </p>
      {pathname === 0 ? (
        <Link to={`/${c4sCode}`}>
          <button style={{ width: '100%' }}>More</button>
        </Link>
      ) : (
        <div>
          <BitcoinInfo />
          <div style={{ marginBottom: '15px' }}>
            <Blockonomics
              title={title}
              productDescription={productDescription}
              price={price}
              downloadLink={downloadLink}
            />
          </div>
          {props.video.poster && (
            <div style={{ margin: '20px auto' }}>
              <Link to="/dvd">
                <button>Buy DVD</button>
              </Link>
            </div>
          )}
          {/* <span>
            <Popup url={`${previewUrl}${c4sCode}.mp4`} msg={'PREVIEW'} />
          </span> */}
          <WhyBanned />
        </div>
      )}
    </div>
  )
}

export default React.memo(VideoDetail)
