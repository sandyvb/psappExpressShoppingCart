import React from 'react'
import '../../css/home.css'
import RandomImg from '../components/RandomImg'
import Masonry from 'react-masonry-css'
import crypto from '../../images/crypto.webp'
import { Link } from 'react-router-dom'
import twitter from '../../images/twitter.webp'
import RandomGif from '../components/RandomGif'

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
          <h2>News & Updates</h2>

          <p>
            REFRESH YOUR BROWSER OFTEN! The images always change and there may
            be new features!
          </p>
          <small>
            Press (Ctrl+F5) on a PC or (Apple Key+Shift+R) on a Mac to get the
            latest version of our site.
          </small>

          <p>What's new?</p>
          <ul>
            <li>
              The <Link to="/cart">shopping cart</Link> is here! Click on the
              icon in the lower-right corner for quick access to your list.
              Please let me know if you run into a bug.
            </li>
            <li>
              <h3>Preview buttons!</h3>
            </li>
            <li>
              Please give us a positive rating for your checkout! Someone didn't
              check their junk mail for their download link... :(
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
            Press any "ADD TO CART" button then go to the{' '}
            <Link to="/cart">cart</Link> to purchase a download. Full-length
            titles are available on <Link to="/dvd">DVDs</Link>.
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
            Press any "ADD TO CART" button then go to the{' '}
            <Link to="/cart">cart</Link> to purchase a download. Press any
            "PREVIEW" to see a preview!
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
          <p>
            Easy order clips, DVDs, and photos using Bitcoin! After payment,
            check your inbox for download links!
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
