import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import Select from 'react-select'
import { SelectCoin } from '../../data/AltcoinData'
import bluex from '../../images/bluex.webp'
import copyImg from '../../images/copy-to-clipboard.png'

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

  useEffect(() => {
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName.toLowerCase()}&order=market_cap_desc&per_page=1&page=1&sparkline=false`

    async function getPrice() {
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

  const handleChangeCoin = (item) => {
    setCoinAbbr(item.value.coinAbbr)
    setCoinName(item.value.coinName)
    setAddress(item.value.address)
    setQr(item.value.qrImg)
  }

  const handleOrder = () => {
    const data = {
      name,
      description,
      price,
      coinPrice,
      coinName,
      coinAbbr,
      codes,
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
          successMsg: 'Thank you! Your message has been sent!',
        })
      } else {
        console.log({ successMsg: 'Server Error: please try again' })
      }
    })
  }

  //TODO: visual cue on copy to clipboard

  return (
    <div>
      <button
        style={styles.button}
        title="Pay with Altcoins"
        onClick={handleHide}
      >
        Pay with Bitcoin or Altcoins
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
        <div style={styles.box}>
          <p style={{ margin: '0', fontStyle: 'italic' }}>
            No more expired payments!
          </p>

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
          <p style={{ border: '1px solid black', padding: '5px 0' }}>
            Order total:{' '}
            <span style={{ color: 'green', fontWeight: '600' }}>${price}</span>{' '}
            USD
            <br />
            Order #{date}
          </p>
          <h3>Choose a wallet:</h3>
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
            }}
          >
            <p style={{ ...styles.copyText, color: coinPriceText }}>
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

        <p style={{ fontSize: '1rem', margin: '20px auto', width: '70%' }}>
          An email containing your download link(s) will be sent to you within
          24 hours upon receipt of payment.
          <br />
          <i>
            <small style={{ fontSize: '15px' }}>
              (I'm working on automating this...)
            </small>
          </i>
          <br />
          <Link to="/contact">Ask me about more payment options!</Link>
        </p>
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
    padding: '3% 10%',
  },
  label: {
    display: 'flex',
    paddingTop: '5px',
    fontWeight: 'bold',
    color: 'green',
    justifyContent: 'flex-start',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '210px',
  },
  radio: {
    marginRight: '10px',
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