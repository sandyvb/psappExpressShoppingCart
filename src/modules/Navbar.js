import React, { useState } from 'react'
import logo from '../images/logo.svg'
import logo2 from '../images/logo2.svg'
import burger from '../images/burger.webp'
import x from '../images/x.webp'
import { Link } from 'react-router-dom'
import '../css/navbar.css'
import list from '../images/list.webp'

const Navbar = () => {
  const [closeMenu, setCloseMenu] = useState(true)

  const pathname = window.location.pathname

  let prevScrollpos = window.pageYOffset
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('burgerDiv').style.top = '0'
      document.getElementById('powershotz').style.top = '22px'
      document.getElementById('logo').style.top = '12px'
      document.getElementById('logo2').style.top = '12px'
    } else {
      document.getElementById('burgerDiv').style.top = '-67px'
      document.getElementById('powershotz').style.top = '-67px'
      document.getElementById('logo').style.top = '-67px'
      document.getElementById('logo2').style.top = '-67px'
    }
    prevScrollpos = currentScrollPos
  }

  return (
    <div className="navbar" id="navbar">
      <div>
        <Link to="/home">
          <img
            src={logo}
            id="logo"
            className="logo"
            alt="Powershotz.com logo"
          />
          <img
            src={logo2}
            id="logo2"
            className="logo2"
            alt="Powershotz.com logo"
          />
          <span id="powershotz">Powershotz</span>
        </Link>

        <div
          className="burgerDiv"
          id="burgerDiv"
          onClick={() => {
            closeMenu ? setCloseMenu(false) : setCloseMenu(true)
          }}
        >
          <img
            src={burger}
            className={closeMenu ? 'burger' : 'burger hide'}
            alt="Menu"
          />
          <img src={x} className={closeMenu ? 'x hide' : 'x'} alt="close" />
          <div id="burgerLinks" className={closeMenu ? 'close' : null}>
            <div className="links">
              <div className="link">
                <Link to="/home" style={{ fontSize: '1.25rem' }}>
                  HOME
                </Link>
                <Link to="/dvd" style={{ fontSize: '1rem' }}>
                  DVDs
                </Link>
                <Link to="/faqs" style={{ fontSize: '1rem' }}>
                  FAQs
                </Link>
              </div>
              <div className="link">
                <Link to="/videos" style={{ fontSize: '1.25rem' }}>
                  VIDEOS
                </Link>
                <Link to="/membership" style={{ fontSize: '1rem' }}>
                  Membership
                </Link>
                <Link
                  to={pathname}
                  style={{ fontSize: '1rem' }}
                  onClick={() => {
                    window.scrollTo(0, document.body.scrollHeight)
                  }}
                >
                  Sitemap
                </Link>
              </div>
              <div className="link">
                <Link to="/photos" style={{ fontSize: '1.25rem' }}>
                  MODELS
                </Link>
                <Link to="/mylist" style={{ fontSize: '1rem' }}>
                  My List
                </Link>
                <Link to="/contact" style={{ fontSize: '1rem' }}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/mylist">
        <div src={list} title="My List" className="list"></div>
      </Link>

      <div
        className="top"
        title="top of page"
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      ></div>
      <div
        className="bottom"
        title="bottom of page"
        onClick={() => {
          window.scrollTo(0, document.body.scrollHeight)
        }}
      ></div>
    </div>
  )
}

export default Navbar
