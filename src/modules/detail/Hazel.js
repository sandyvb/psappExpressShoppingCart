import React from 'react'
import ModalImage from 'react-modal-image'
import ModelStarsIn from './ModelStarsIn'
import Popup from '../components/Popup'
import ModelSlider from '../components/ModelSlider'
import { Link } from 'react-router-dom'
import Heart from '../components/Heart'

function Hazel() {
  const set1 = {
    id: '241949',
    model_name: 'Hazel',
    num_photos: '985',
    num_galleries: '2',
    price: '6.90',
    keywords:
      "Cute little 19 year old with big clear eyes, cinchable elbows, and a perfect ass!  That puppy dog pout doesn't hurt one bit either. 19 yo teen strict bondage nose hook rope domination forced stripping abduction ballgag spreader bar bit gag nipple clamps clothes pins fucking blowjob cock sucking crying tears leather straps",
  }
  const set2 = {
    id: '248381',
    model_name: 'Hazel',
    num_photos: '793',
    num_galleries: '2',
    price: '5.55',
    keywords:
      "Cute little 19 year old with big clear eyes, cinchable elbows, and a perfect ass!  That puppy dog pout doesn't hurt one bit either. hazel outdoor bondage domination blowjob gettin done what needs gettin done tied and trained hk forcing function forced fantasy fuckettes caught up inverted yield curve model student fucking",
  }

  const setI = {
    id: '241949',
    model_name: 'Hazel I',
    num_photos: '985',
    num_galleries: '2',
    price: '6.90',
    keywords:
      "Cute little 19 year old with big clear eyes, cinchable elbows, and a perfect ass!  That puppy dog pout doesn't hurt one bit either. 19 yo teen strict bondage nose hook rope domination forced stripping abduction ballgag spreader bar bit gag nipple clamps clothes pins fucking blowjob cock sucking crying tears leather straps",
  }
  const setII = {
    id: '248381',
    model_name: 'Hazel II',
    num_photos: '793',
    num_galleries: '2',
    price: '5.55',
    keywords:
      "Cute little 19 year old with big clear eyes, cinchable elbows, and a perfect ass!  That puppy dog pout doesn't hurt one bit either. hazel outdoor bondage domination blowjob gettin done what needs gettin done tied and trained hk forcing function forced fantasy fuckettes caught up inverted yield curve model student fucking",
  }

  const num = Math.floor(Math.random() * 4 + 1)
  const name = 'Hazel'
  const description =
    "Cute little 19 year old with big clear eyes, cinchable elbows, and a perfect ass!  That puppy dog pout doesn't hurt one bit either."
  const poster = 'https://powershotz.com/models2/hazel-' + num + '.jpg'
  const thumb = 'https://powershotz.com/models2/thumbs/hazel-' + num + '.jpg'
  const numPhotos1 = set1.num_photos
  const numPhotos2 = set2.num_photos
  const price1 = set1.price
  const price2 = set2.price
  const thumbnails1 =
    'http://images4sale.com/store/popup/325/' + set1.id + '/thumbnail'
  const thumbnails2 =
    'http://images4sale.com/store/popup/325/' + set2.id + '/thumbnail'
  const buyUrl1 =
    'http://images4sale.com/en/checkout/index/store/325/image/' + set1.id
  const buyUrl2 =
    'http://images4sale.com/en/checkout/index/store/325/image/' + set2.id
  const pathname = window.location.pathname

  return (
    <div>
      {pathname === '/photos' ? (
        <ModalImage
          small={thumb}
          large={poster}
          alt={name}
          hideDownload="true"
        />
      ) : (
        <ModelSlider name={name} />
      )}
      {pathname === '/photos' ? (
        <Link to={`/${name}`}>
          <h3>{name}</h3>
        </Link>
      ) : (
        <h3 style={{ textAlign: 'center' }}>{name}</h3>
      )}
      <hr />
      <p>{description}</p>
      <hr />
      <h6>{name}'s Photo Set I</h6>
      <p>Includes {numPhotos1} downloadable images</p>
      <p className="priceAndHeart">
        <i>Price: ${price1} USD</i>
        <Heart props={setI} />
      </p>
      <div className="hazel">
        <div className="modelDetailsButtons">
          <span>
            <Popup url={buyUrl1} msg={`BUY Download`} />
          </span>
          <span>
            <Popup url={thumbnails1} msg={'Preview'} />
          </span>
        </div>
      </div>
      <hr />
      <h6>{name}'s Photo Set II</h6>
      <p>Includes {numPhotos2} downloadable images</p>
      <p className="priceAndHeart">
        <i>Price: ${price2} USD</i>
        <Heart props={setII} />
      </p>
      <div className="modelDetailsButtons">
        <span>
          <Popup url={buyUrl2} msg={`BUY Download`} />
        </span>
        <span>
          <Popup url={thumbnails2} msg={'Preview'} />
        </span>
      </div>
      <hr style={{ margin: '40px 0 40px 0' }} />{' '}
      {pathname === '/photos' ? (
        <Link to={`/${name}`}>
          <button style={{ width: '100%' }}>More about {name}</button>
        </Link>
      ) : (
        <ModelStarsIn key={name} model={name} />
      )}
    </div>
  )
}

export default Hazel
