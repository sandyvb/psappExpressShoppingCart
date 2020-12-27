import React from 'react'
import '../../css/home.css'
import RandomImg from '../components/RandomImg'
import Masonry from 'react-masonry-css'
import crypto from '../../images/crypto.webp'
import { Link } from 'react-router-dom'
import twitter from '../../images/twitter.webp'
import RandomGif from '../components/RandomGif'
import WhyBanned from '../components/WhyBanned'

const Home = () => {
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
          <h2>Banned Content</h2>
          <p style={{ color: '#f0ad4e' }}>
            <b>
              As you may have noticed, all of our products are now only
              available using Bitcoin, cash, check, or money order.
            </b>
          </p>
          <p>
            Recently, Clips4sale was forced by their credit card processor to
            close 12 stores. Powershotz was one of those 12 stores. We have been
            popular on clips4sale for 20 years are saddened by this closure.
          </p>
          <p>
            Visa, Mastercard, and all other card companies have cited us for the
            violation of their compliance guidelines.
          </p>
          <WhyBanned />
          <p style={{ fontSize: '1.25rem', color: 'red' }}>
            <em>
              We are sorry for the inconvenience, the puritanical nature of our
              society, and the legislation of your morality...
            </em>
          </p>
        </section>

        <section>
          <RandomGif />
          <h2>News & Updates</h2>
          <h3 style={{ color: 'red' }}>
            REFRESH YOUR BROWSER OFTEN! The images change!
          </h3>
          <p>
            For the BEST experience, we recommend using a Chrome or Opera
            browser.
          </p>
          <p>What's new?</p>
          <ul>
            <li>
              <p style={{ color: 'red' }}>
                If something isn't working correctly, please let me know!
              </p>
            </li>
            <li>
              <p>Purchase any product by clicking a "DOWNLOAD" button.</p>
            </li>
            <li>
              <p>Improved video and model searches.</p>
            </li>
            <li>
              Click on any heart to add a video or photo set to your{' '}
              <Link to="/mylist">Personalized List</Link>. Click on the icon in
              the lower-right corner for quick access to your list.
            </li>
          </ul>
          <p>Please keep checking back for new features!</p>
        </section>

        <section>
          <RandomGif />
          <Link to="/videos" className="title">
            <h2>Full-length Videos and Clips</h2>
          </Link>
          <p>
            Search <Link to="/videos">videos</Link> quickly and easily.
          </p>
          <p>
            Press any "DOWNLOAD" button to purchase a{' '}
            <Link to="/videos">video</Link> download. Press any "PREVIEW" button
            to see a preview!
          </p>
          <p>
            If you want to buy DVDs or multiple items using a shopping cart,
            please be patient as we are refactoring the site to include a
            shopping cart.
          </p>
        </section>

        <section>
          <RandomImg />
          <Link to="/photos" className="title">
            <h2>Models & Photos</h2>
          </Link>
          <p>
            Search the <Link to="/photos">photos page</Link> for your favorite
            models.
          </p>
          <p>
            Press any "DOWNLOAD" button to purchase a{' '}
            <Link to="/photos">photo set</Link>. Press any "PREVIEW" to see a
            preview!
          </p>
          <p>
            If you want to buy multiple items using a shopping cart, please be
            patient as we are refactoring the site to include a shopping cart.
          </p>
        </section>

        <section>
          <Link to="/bitcoin" className="title">
            <img
              src={crypto}
              alt="Buy with Bitcoin"
              style={{ width: '100%' }}
            />
            <h2>Buy with Bitcoin!</h2>
          </Link>
          <p>Order downloads, DVDs, and photos using Bitcoin!</p>
          <p>
            Click on any "DOWNLOAD" button or{' '}
            <a href="mailto:alexandra@powershotz.com">email me</a> for
            additional purchasing options. Shopping cart is coming soon!
          </p>
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
            <button style={{ width: '100%', margin: '0 auto' }}>
              Follow & Share @powershotzz
            </button>
          </a>
        </section>

        <section>
          <RandomImg />
          <h2>Adult Boutique Owners</h2>
          <p>
            If you'd like to carry a collection of exciting Bondage, BDSM,
            Damsel-in-Distress, Domination, and Master/slave fantasy DVDs in
            your store, please <Link to="/contact">contact us</Link> for more
            information.
          </p>
        </section>
      </Masonry>
    </div>
  )
}

export default Home
