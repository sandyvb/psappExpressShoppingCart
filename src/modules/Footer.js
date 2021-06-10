import React from 'react'
import guarantee from '../images/guarantee.webp'
import { Link } from 'react-router-dom'
import '../css/footer.css'
import twitterBird from '../images/twitter_bird.webp'
import tor from '../images/tor.png'

const Footer = () => {
  return (
    <div className="footer" style={{ marginBottom: 100 }}>
      <div className="main">
        <div className="columns">
          <div className="column1">
            <h3>How do I order?</h3>
            <p>
              Click on any "ADD TO CART" button. Follow the instructions in the
              shopping cart.
            </p>
            <h3>How quickly will I get my links?</h3>
            <p>
              Your download or streaming links will usually come to your inbox
              within a few minutes, but always within 24 hours.
            </p>
            <h3>Why don't I see my links?</h3>
            <p>Check your junk/spam folder.</p>
          </div>

          <div className="column2">
            <h3>Delivery</h3>
            <p>
              All download, streaming and DVD orders are are delivered by
              Powershotz.
            </p>
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
            <Link to="/cart">Shopping Cart</Link>
            {/* <Link to="/membership">Membership</Link> */}
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

        <div>
          <div>
            <a href="https://twitter.com/powershotzz" title="Twitter">
              <img
                src={twitterBird}
                alt="twitter"
                style={{
                  width: '40px',
                  cursor: 'pointer',
                  marginRight: '15px',
                }}
              />
            </a>
            <a
              title="For Tor Browsers Only"
              href="http://gug57oxjp5pvsjwfqurtutlv23sym2idlq5ywxfczmow6brjktb6tcad.onion/"
            >
              <img
                src={tor}
                alt="onion site"
                style={{ height: '50px', cursor: 'pointer' }}
              />
            </a>
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: '20px' }}>
            &copy; 2000-2021 Powershotz.com &nbsp;
            <br />
            Made with <span style={{ color: 'red' }}> &hearts; </span>
            by Alexandra
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
