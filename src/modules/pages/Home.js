import React, { useState, useCallback, useEffect } from 'react'
import '../../css/home.css'
import RandomImg from '../components/RandomImg'
import Masonry from 'react-masonry-css'
import crypto from '../../images/crypto.webp'
import { Link } from 'react-router-dom'
import twitter from '../../images/twitter.webp'
import RandomGif from '../components/RandomGif'
import WhyBanned from '../components/banned/WhyBanned'
// import Chat from '../chat/chat'
import newTab from '../../images/newTab.png'
import tor from '../../images/tor.png'

const Home = () => {
  //TODO: only change isSale for sale
  const [isSale, setIsSale] = useState(true)

  const atMidnight = useCallback(() => setIsSale(false), [setIsSale])

  const timeAtMidnight = isSale && new Date('4/26/2021 12:01:00 AM').getTime()
  let timeNow = isSale && new Date().getTime()
  let offsetMs = isSale && timeAtMidnight - timeNow

  useEffect(() => {
    const timeout = isSale && setTimeout(atMidnight, offsetMs)
    return () => {
      isSale && clearTimeout(timeout)
    }
  }, [offsetMs, isSale, atMidnight])

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1000: 2,
    600: 1,
  }

  return (
    <div className="home">
      <header>
        <h1>Welcome to Powershotz!</h1>

        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={tor}
            width="25px"
            style={{ marginRight: '10px' }}
            alt="tor"
          />
          <a
            href="http://gug57oxjp5pvsjwfqurtutlv23sym2idlq5ywxfczmow6brjktb6tcad.onion/"
            title="For Tor Browsers Only"
          >
            Powershotz Onion
          </a>
        </div> */}
        <h3>
          All Original Videos & Photos Featuring Bondage, BDSM,
          Damsel-in-Distress, Rapeplay, Chloroform, Strugglefuck, Master/Slave &
          Girl-Next-Door Abduction Fantasies
        </h3>
      </header>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        <section>
          <RandomGif />
          <h2>News & Updates</h2>

          <p>
            <span style={{ color: 'red' }}>
              REFRESH YOUR BROWSER OFTEN!
              <br />
            </span>
            <span style={{ fontSize: '0.9rem' }}>
              (Ctrl+F5 or Apple Key+Shift+R)
            </span>
          </p>

          <h6>What's new?</h6>
          <ul>
            {isSale && (
              <li style={{ color: 'lime' }}>
                <h3 style={{ marginBottom: 0 }}>
                  This weekend only... 50% off!
                </h3>
                April 24-25 until midnight <br />
                Discount applied at checkout
              </li>
            )}

            <li>
              The more the market goes down today, the more you save using
              cryptocurrency!{' '}
              <span style={{ color: 'lime' }}>
                Discounts are automatically calculated and applied during
                checkout.
              </span>{' '}
              We use the{' '}
              <a
                href="https://www.coingecko.com/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                CoinGecko
              </a>
              <img
                src={newTab}
                style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
                alt=""
              />{' '}
              API to calculate your savings in real time.{' '}
              <span style={{ color: 'lime' }}>37+ ways to pay!</span>
            </li>
            <li>
              Do you make floggers, whips, or other fun things? A new shopping
              app is coming where you can easily sell your adult products!{' '}
              <span style={{ color: 'lime' }}>We are close to launching!</span>
            </li>
            <li>
              Don't want to have Powershotz videos saved on your machine? Check
              the video detail pages to find out if a video is available to
              stream.
            </li>

            <li>
              <img
                src={tor}
                width="20px"
                style={{ marginRight: '10px' }}
                alt="tor"
              />
              <a
                href="http://gug57oxjp5pvsjwfqurtutlv23sym2idlq5ywxfczmow6brjktb6tcad.onion/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powershotz Onion
              </a>
              <img
                src={newTab}
                style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
                alt=""
              />{' '}
              hidden service is available! You <em>must</em> use a Tor browser
              to access it otherwise you'll get a 404 error.
            </li>
          </ul>
        </section>

        {/* <section>
          <h2 style={{ marginTop: '0' }}>Let's Chat!</h2>
          <p style={{ marginBottom: '0px' }}>
            Chat with others who are online right now! *
            <br />
            But, please don't be an asshole...
          </p>
          <iframe
            name="chat"
            id="chat"
            title="chat"
            width="100%"
            height="530px"
            scrolling="no"
            style={{
              visibility: 'visible',
              border: 'none',
              margin: '0',
              overflow: 'hidden',
            }}
            src="http://localhost:5000"
          ></iframe>
          <small>
            * Messages are not saved and are lost when you leave this page.
          </small>
        </section> */}
        <section>
          <RandomGif />
          <h2>Top 5 Cryptocurrencies besides bitcoin for 2021</h2>
          <p>
            Apart from bitcoin, there have been hundreds of cryptocurrencies
            that have come into existence in the past decade. With so many
            altcoins how does one decide which project is promising and which is
            not? […]
          </p>
          <a
            href="https://blog.blockonomics.co/top-5-cryptocurrencies-besides-bitcoin-for-2021-b84bfb2b8ccb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on...
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>
          <h2>What is the lowest fee cryptocurrency?</h2>
          <p>
            With the recent increase in fees for both Bitcoin and Ethereum, this
            is a question coming by more recently. So let’s dive right in. [...]
          </p>
          <p style={{ marginBottom: 40 }}>
            <a
              href="https://medium.com/nanocurrency/cryptocurrency-fee-comparison-which-crypto-has-the-lowest-fees-4e9118590e1f"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on...
              <img
                src={newTab}
                style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
                alt=""
              />
            </a>
          </p>
          <WhyBanned />
        </section>

        <section>
          <RandomGif />
          <Link to="/videos" className="title">
            <h2>Full-length Videos and Clips</h2>
          </Link>
          <p>Watch the previews or gifs for free!</p>
          <p>
            Full-length titles are available on <Link to="/dvd">DVDs</Link>.
          </p>
        </section>

        <section>
          <RandomImg />
          <Link to="/photos" className="title">
            <h2>Models & Photos</h2>
          </Link>
          <p>
            Up to 50 preview photos are available for each model! Refresh the
            page to see a new batch!
          </p>
        </section>

        <section>
          <img src={crypto} alt="Buy with Bitcoin" style={{ width: '100%' }} />
          <h2>Buy with Bitcoin or Altcoins!</h2>
          <p>
            Easily order clips, DVDs, and photos using 35 different
            cryptocurrencies!
          </p>
          <p>
            <Link to="/contact">Contact us</Link> if your cryptocurrency is not
            listed. We'll try to accomodate you.
          </p>
          <p>
            After payment confirmation, check your inbox for download or stream
            links!
          </p>
          <WhyBanned />
        </section>

        <section>
          <RandomImg />
          <Link to="/faqs" className="title">
            <h2>Have Questions?</h2>
          </Link>
          <p>
            See our <Link to="/faqs">FAQs page</Link> for more information about
            clips, downloads, DVDs and lots of other stuff.
          </p>
          <p>
            If you can't find an answer, <Link to="/contact">contact us.</Link>
          </p>
        </section>

        <section>
          <RandomImg />
          <Link to="/about" className="title">
            <h2>Want to learn more about Powershotz?</h2>
          </Link>
          <p>
            See our <Link to="/about">About page</Link> to learn about our terms
            & conditions, site philosophy, privacy & return policies, and other
            legal stuff.
          </p>
        </section>

        <section>
          <img
            src={twitter}
            alt="follow @powershotzz"
            style={{ width: '100%' }}
          />
          <h2>Follow or Share us on Twitter</h2>
          <p>See great photos and watch cool video clips and gifs.</p>
          <p>Get updates and content that you can't find elsewhere.</p>
          <a
            href="https://twitter.com/powershotzz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{ width: '100%', padding: '0', margin: '0 auto' }}>
              Follow & Share @powershotzz
              <img
                src={newTab}
                style={{ opacity: '0.5', width: '12px', marginLeft: '7px' }}
                alt="twitter"
              />
            </button>
          </a>
        </section>

        {/* <section>
          <RandomImg />
          <h2>Adult Boutique Owners</h2>
          <p>
            If you'd like to carry a collection of exciting Bondage, BDSM,
            Damsel-in-Distress, Domination, and Master/slave fantasy DVDs in
            your store, please <Link to="/contact">contact us</Link> for more
            information.
          </p>
        </section> */}
      </Masonry>
    </div>
  )
}

export default Home
