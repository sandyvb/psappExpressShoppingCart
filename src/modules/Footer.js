import React from 'react'
import guarantee from '../images/guarantee.webp'
import { Link } from 'react-router-dom'
import Popup from '../modules/components/Popup'
import '../css/footer.css'
import twitterBird from '../images/twitter_bird.webp'

// TODO: change twitter logo at very bottom

const Footer = () => {
  return (
    <div className="footer">
      <div className="main">
        <div className="columns">
          <div className="column1">
            <h3>How do I order instant downloads?</h3>
            <p>
              Click on any "DOWNLOAD" button. Pay with Bitcoin. Check your
              email.
            </p>
            <h3>How do I order multiple items?</h3>
            <button>Cart Coming Soon!</button>
            <h3>How can I pay?</h3>
            <p>Bitcoin, Cash, Check, or Money Order</p>
          </div>

          <div className="column2">
            <h3>Delivery</h3>
            <p>All download and DVD orders are are delivered by Powershotz.</p>
            <h3>Guarantee</h3>
            <p>
              We want you to be satisfied and happy with your purchase! We will
              work with you to solve your problem or you get your money back.
              It's that simple.
            </p>
            <img
              src={guarantee}
              alt="Shop with confidence"
              className="guarantee"
            />
          </div>
        </div>
      </div>

      <div className="disclaimer sitemap">
        <h3>Sitemap</h3>
        <div className="cols">
          <div className="cols1">
            <Link to="/home" className="sitemap">
              Home
            </Link>
            <Link to="/dvd">DVDs</Link>
            <Link to="/faqs">FAQs</Link>
          </div>
          <div className="cols2">
            <Link to="/videos" className="sitemap">
              Videos
            </Link>
            <Link to="/mylist">My List</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="cols3">
            <Link to="/photos" className="sitemap">
              Models/Photos
            </Link>
            <Link to="/membership">Membership</Link>

            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <h3>Important!</h3>
        <p>
          Unauthorized copying, sharing, distribution, reproduction, or any
          other use is a violation of applicable laws. All clips and images sold
          are to be viewed by the purchaser only and are not to be shared,
          traded or posted for others to download. Violators will be prosecuted
          to the fullest extent of the law. There is to be no re-sale of any
          merchandise, videos, video clips, or pictures purchased from
          Powershotz without written consent from Powershotz. All models on this
          site are 18 or older.
        </p>

        <div className="twitter">
          <Popup
            url={'https://twitter.com/powershotzz'}
            msg={
              <img
                src={twitterBird}
                alt="twitter"
                style={{ width: '40px', cursor: 'pointer' }}
              />
            }
          />
        </div>
        <div className="copyright-alexandra">
          <span className="copyright">
            &copy; 2000-2021 Emotionz LLC &nbsp;
          </span>
          <span className="alexandra">
            Made with <span className="heart"> &hearts; </span>
            by Alexandra
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
