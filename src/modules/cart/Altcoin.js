import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import Select from 'react-select'
import { SelectCoin } from '../../data/AltcoinData'
import bluex from '../../images/bluex.webp'
import copyImg from '../../images/copy-to-clipboard.png'
import AltcoinHelp from './AltcoinHelp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CryptoJS from 'crypto-js'
import padZeroPadding from 'crypto-js/pad-zeropadding'
import { secretKey, secretIv } from '../../secret'
import newTab from '../../images/newTabBlue.png'

export const Altcoin = ({ name, description, price, codes, date }) => {
  const [hideDiv, setHideDiv] = useState(true)
  const [email, setEmail] = useState('')
  const [coinAbbr, setCoinAbbr] = useState('BTC')
  const [coinName, setCoinName] = useState('Bitcoin')
  const [address, setAddress] = useState(
    'bc1qccj5zxshpg6ck8pffw3pjaq8us47zru26tkc57'
  )
  const [qr, setQr] = useState('https://powershotz.com/qr/btc.png')
  const [coinPrice, setCoinPrice] = useState('0.0')
  const [coinPriceText, setCoinPriceText] = useState('')
  const [addressText, setAddressText] = useState('')

  const screenWidth = window.screen.width

  //TODO: add bitpay to list
  //TODO: only change isSale for sale
  const [isSale, setIsSale] = useState(true)
  price = isSale ? (price / 2).toFixed(2) : price

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

  useEffect(() => {
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName.toLowerCase()}&order=market_cap_desc&per_page=1&page=1&sparkline=false`

    async function getPrice() {
      if (coinName === 'Cash App' || coinName === 'Zelle') {
        setCoinPrice(`$${price}`)
        return
      }
      setCoinPrice('Loading... ')
      await axios
        .get(coingeckoUrl, {
          headers: { accept: 'application/json' },
        })
        .then((response) => {
          if (response.status === 200) {
            const conversionRate = response.data[0].current_price
            setCoinPrice((price / conversionRate).toFixed(10))
          } else {
            console.log(`Error: ${response.status} ${response.message}`)
          }
        })
        .catch((err) => console.log(`callCoinGecko error: ${err}`))
    }
    getPrice()
  }, [coinName, price])

  const handleHide = () => {
    setHideDiv(!hideDiv)
  }

  const handleToast = () =>
    toast.success('Copied to clipboard', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const handleChangeCoin = (item) => {
    setCoinAbbr(item.value.coinAbbr)
    setCoinName(item.value.coinName)
    setAddress(item.value.address)
    setQr(item.value.qrImg)
  }

  const handleOrder = () => {
    const key = CryptoJS.enc.Hex.parse(secretKey)
    const iv = CryptoJS.enc.Hex.parse(secretIv)
    let cipher = CryptoJS.AES.encrypt(JSON.stringify(codes), key, {
      iv: iv,
      padding: padZeroPadding,
    })
    cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64)

    const data = {
      name,
      description,
      price,
      coinPrice,
      coinName,
      coinAbbr,
      cipher,
      date,
      email,
      address,
    }
    axios({
      method: 'post',
      url: 'https://powershotz.com/php/altcoin.php',
      data: data,
    }).then((response) => {
      if (response.data.sent === true) {
        console.log({
          successMsg: 'Thank you! Your order has been sent!',
        })
      } else {
        console.log({ successMsg: 'Server Error: please try again' })
      }
    })
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton="false"
        style={{ width: '200px', position: 'fixed', top: '10%' }}
      />
      <button
        style={styles.button}
        title="Pay with Altcoins"
        onClick={handleHide}
      >
        Click here to Pay
      </button>
      <div className={hideDiv ? 'hideAltcoin' : ''} style={styles.hiddenDiv}>
        <img
          src={bluex}
          alt="close"
          style={{
            width: '50px',
            float: 'right',
            cursor: 'pointer',
          }}
          onClick={handleHide}
        />
        <div
          style={{
            ...styles.box,
            padding: screenWidth < 450 ? '3% 5%' : '3% 10%',
          }}
        >
          <h3>{name}</h3>
          <p>
            {description.map((item) => {
              return (
                <span key={item}>
                  <span style={{ padding: '0 5px 0 10px' }}>&bull;</span>
                  {item}
                </span>
              )
            })}
          </p>
          <p
            style={{
              border: '1px solid black',
              padding: '5px 0',
              borderRadius: '3px',
            }}
          >
            Order total:{' '}
            <span style={{ color: 'green', fontWeight: '600' }}>${price} </span>
            USD
            <br />
            Order #{date}
          </p>

          <h3>Choose a Coin, Cash App, or Zelle:</h3>
          <div style={{ textAlign: 'left' }}>
            <Select
              name="coin"
              defaultValue={SelectCoin[0]}
              options={SelectCoin}
              onChange={(e) => {
                handleChangeCoin(e)
              }}
            />
          </div>

          <h3>Send this amount:</h3>
          <CopyToClipboard
            text={coinPrice}
            onCopy={() => {
              setCoinPriceText('grey')
              handleToast()
            }}
          >
            <p
              style={{
                ...styles.copyText,
                color: coinPriceText,
              }}
            >
              {coinPrice} {coinAbbr}
              <img
                title="copy to clipboard"
                src={copyImg}
                alt="copy to clipboard"
                style={styles.copyImg}
              />
            </p>
          </CopyToClipboard>
          <h3>To this address:</h3>
          <CopyToClipboard
            text={address}
            onCopy={() => {
              setAddressText('grey')
              handleToast()
            }}
          >
            <p style={{ ...styles.copyText, color: addressText }}>
              {address}
              <img
                title="copy to clipboard"
                src={copyImg}
                alt="copy to clipboard"
                style={styles.copyImg}
              />
            </p>
          </CopyToClipboard>
          <img src={qr} alt="qr code" width={175} />

          <h3>Then, enter your email address and hit send.</h3>
          <input
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Your Email"
          />
          <Link to="/thankyou">
            <button onClick={handleOrder}>SEND</button>
          </Link>
        </div>

        <p style={{ margin: '0 10%' }}>
          If you'd like to use{' '}
          <a
            href="https://cash.app/"
            target="_blank"
            rel="noopener noreferrer"
            alt="Cash App"
          >
            <b style={{ fontSize: '1.3rem' }}>Cash App</b>{' '}
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>{' '}
          or{' '}
          <a
            href="https://www.zellepay.com/"
            target="_blank"
            rel="noopener noreferrer"
            alt="Zelle"
          >
            <b style={{ fontSize: '1.3rem' }}>Zelle</b>{' '}
            <img
              src={newTab}
              style={{ opacity: '0.5', width: '10px', marginLeft: '5px' }}
              alt=""
            />
          </a>
          , you need to install that app on your phone.{' '}
          <b style={{ fontSize: '1.2rem' }}>Easy!</b>
        </p>

        <p style={{ marginTop: 10, marginBottom: 0 }}>
          <Link to="/contact">
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              Ask me about other payment options!
            </span>
          </Link>
        </p>
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: 0 }}>
            <small style={{ fontSize: '15px' }}>
              (cash, check, money order, gold... &#128521;)
            </small>
          </p>
        </div>
        <AltcoinHelp />
      </div>
    </div>
  )
}

const styles = {
  button: {
    border: '2px solid lime',
    width: '100%',
    marginBottom: '20px',
  },
  hiddenDiv: {
    textAlign: 'center',
    backgroundColor: 'var(--textColor)',
    color: 'var(--backgroundColor)',
    padding: '5px 20px 15px 20px',
    marginBottom: '20px',
    marginTop: '15px',
    borderRadius: '4px',
    width: '100%',
  },
  input: {
    display: 'block',
    margin: '20px auto',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    fontSize: '18px',
  },
  titlesContainer: {
    margin: '0 auto',
    width: '300px',
  },
  box: {
    border: '1px solid black',
    margin: '50px 10px 20px 10px',
    borderRadius: '3px',
    paddingBottom: 30,
  },
  label: {
    display: 'flex',
    paddingTop: '5px',
    fontWeight: 'bold',
    color: 'green',
    justifyContent: 'flex-start',
  },
  copyImg: {
    width: '20px',
    marginLeft: '8px',
  },
  copyText: {
    overflowWrap: 'break-word',
    backgroundColor: 'white',
    padding: '7px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
}
