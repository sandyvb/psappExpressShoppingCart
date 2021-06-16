import React, { Component } from 'react'
import '../../css/forms.css'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import check from '../../images/check.webp'
import bluex from '../../images/bluex.webp'
import SelectVideos from '../components/SelectVideos'
// import SelectVideos2 from '../components/SelectVideos2'
import Terms from '../components/forms/Terms'
import AltcoinForDvds from '../cart/AltcoinForDvds'

const validNameRegex = RegExp(/^[a-z\d\s]{1,50}$/i)
const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,8})$/i
)
const validTextareaRegex = RegExp(/^[^<>]{0,2000}$/i)

const validateForm = (state) => {
  let valid = true
  if (
    state.name === '' ||
    state.email === '' ||
    state.address1 === '' ||
    state.address2 === '' ||
    state.order === '' ||
    state.agreeToTerms === false ||
    state.nameError.length > 0 ||
    state.emailError.length > 0 ||
    state.address1Error.length > 0 ||
    state.address2Error.length > 0 ||
    state.orderError.length > 0 ||
    state.agreeToTermsError > 0 ||
    state.paymentError > 0
  ) {
    valid = false
  }
  return valid
}

class Dvd extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address1: '',
      address2: '',
      order: [],
      agreeToTerms: false,
      hide: 'hide',
      hideErrorMsg: 'hideErrorMsg',
      address1Error: '',
      address2Error: '',
      paymentError: '',
      agreeToTermsError: '',
      nameIsEmpty: '',
      emailIsEmpty: '',
      address1IsEmpty: '',
      address2IsEmpty: '',
      orderIsEmpty: '',
      successMsg: '',
      nameError: '',
      emailError: '',
      orderError: '',
      hideG: true,
      hideT: true,
      coinName: '',
      coinPrice: '',
      coinAbbr: '',
      address: '',
      orderTotal: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.hideGuarantee = this.hideGuarantee.bind(this)
    this.hideTerms = this.hideTerms.bind(this)
    this.setPaymentData = this.setPaymentData.bind(this)
  }

  setPaymentData(coinName, coinPrice, coinAbbr, address) {
    this.setState({ coinName: coinName })
    this.setState({ coinPrice: coinPrice })
    this.setState({ coinAbbr: coinAbbr })
    this.setState({ address: address })
  }

  hideTerms() {
    this.state.hideT
      ? this.setState({ hideT: false })
      : this.setState({ hideT: true })
  }

  hideGuarantee() {
    this.state.hideG
      ? this.setState({ hideG: false })
      : this.setState({ hideG: true })
  }

  handleClick() {
    this.state.agreeToTerms
      ? this.setState({ agreeToTerms: false })
      : this.setState({
          agreeToTerms: true,
          hideErrorMsg: 'hideErrorMsg',
          agreeToTermsError: '',
          successMsg: '',
        })
  }

  handleChange = (event) => {
    this.setState({
      hide: 'hide',
      hideErrorMsg: 'hideErrorMsg',
      successMsg: '',
    })
    event.preventDefault()
    const { name, value } = event.target

    switch (name) {
      case 'name':
        validNameRegex.test(value)
          ? this.setState({ nameError: '' })
          : this.setState({ nameError: 'Invalid character' })
        this.setState({ nameIsEmpty: false })
        break
      case 'email':
        validEmailRegex.test(value)
          ? this.setState({ emailError: '' })
          : this.setState({ emailError: 'Please enter a valid email' })
        this.setState({ emailIsEmpty: false })
        break
      case 'address1':
        validTextareaRegex.test(value)
          ? this.setState({ address1Error: '' })
          : this.setState({ address1Error: 'Invalid character' })
        this.setState({ address1IsEmpty: false })
        break
      case 'address2':
        validTextareaRegex.test(value)
          ? this.setState({ address2Error: '' })
          : this.setState({ address2Error: 'Invalid character' })
        this.setState({ address2IsEmpty: false })
        break
      default:
        break
    }
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm(this.state)) {
      console.info('Valid Form')
      axios({
        method: 'post',
        url: 'https://powershotz.com/php/dvd.php',
        headers: { 'content-type': 'application/json' },
        data: this.state,
      }).then((response) => {
        if (response.data.sent === true) {
          this.setState({ successMsg: 'Thank You! Your order has been sent!' })
        } else {
          this.setState({ successMsg: 'Server Error: please try again' })
        }
      })
    } else {
      this.state.agreeToTerms === false &&
        this.setState({
          agreeToTermsError: 'You must agree to the terms & condtions',
        })
      this.state.order.length === 0 &&
        this.setState({ orderError: 'You must select a video' })
      this.state.name.length === 0
        ? this.setState({ nameIsEmpty: true })
        : this.setState({ nameIsEmpty: '' })
      this.state.email.length === 0
        ? this.setState({ emailIsEmpty: true })
        : this.setState({ emailIsEmpty: '' })
      this.state.address1.length === 0
        ? this.setState({ address1IsEmpty: true })
        : this.setState({ address1IsEmpty: '' })
      this.state.address2.length === 0
        ? this.setState({ address2IsEmpty: true })
        : this.setState({ address2IsEmpty: '' })
      this.state.order.length === 0
        ? this.setState({ orderIsEmpty: true })
        : this.setState({ orderIsEmpty: '' })
      this.setState({ hide: 'hide', hideErrorMsg: '' })
      console.error('Invalid Form')
    }
  }

  selectFunction = (childData) => {
    this.setState({ order: [childData.order] })
    this.setState({ orderError: '' })
    this.setState({ orderTotal: childData.total })
  }

  render() {
    const errorStyle = {
      border: '2px solid red',
      boxSizing: 'border-box',
    }

    const successStyle = {
      border: '2px solid lime',
    }

    return (
      <div className="forms">
        <header>
          <h1>Full-Length DVDs</h1>
        </header>

        <h4 style={{ color: 'red' }}>US SHIPPING ONLY!</h4>

        <div onClick={this.hideGuarantee} style={{ marginBottom: 50 }}>
          <h4>
            All orders are 100% <span className="guarantee">GUARANTEED!</span>
          </h4>
          <div
            className={this.state.hideG ? 'hide' : ''}
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--textColor)',
              color: 'var(--backgroundColor)',
              padding: '5px 20px 15px 20px',
              marginBottom: '20px',
              borderRadius: '4px',
            }}
          >
            <img
              src={bluex}
              alt="close"
              style={{ width: '50px', float: 'right', cursor: 'pointer' }}
            />
            <h2 style={{ color: 'var(--backgroundColor)' }}>
              GUARANTEE & RETURN POLICY
            </h2>
            <p>
              Satisfaction is 100% guaranteed. It's simple.
              <br /> We will work with you to solve your problems or you get
              your money back.
            </p>
          </div>
        </div>

        <form
          onSubmit={this.handleSubmit}
          noValidate
          className="dvdForm"
          style={this.state.successMsg.length > 0 ? successStyle : null}
        >
          <h2>First, choose your DVDs:</h2>
          <SelectVideos
            parentCallback={this.selectFunction}
            name="order"
            style={
              this.state.orderError.length > 0 || this.state.orderIsEmpty
                ? errorStyle
                : null
            }
          />
          <h2>Second, pay for your DVDs:</h2>

          <AltcoinForDvds
            price={this.state.orderTotal}
            setPaymentData={this.setPaymentData}
          />

          <h2>Third, fill out this form and click "ORDER NOW!"</h2>
          <input
            placeholder="Your Name"
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
            noValidate
            style={
              this.state.nameError.length > 0 || this.state.nameIsEmpty
                ? errorStyle
                : null
            }
          />
          {this.state.nameError.length > 0 && (
            <span className="error">{this.state.nameError}</span>
          )}

          <br />

          <input
            placeholder="Your Email"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
            noValidate
            style={
              this.state.emailError.length > 0 || this.state.emailIsEmpty
                ? errorStyle
                : null
            }
          />
          {this.state.emailError.length > 0 && (
            <span className="error">{this.state.emailError}</span>
          )}

          <br />

          <input
            placeholder="Your Street Address"
            onChange={this.handleChange}
            name="address1"
            value={this.state.address1}
            noValidate
            style={
              this.state.address1Error.length > 0 || this.state.address1IsEmpty
                ? errorStyle
                : null
            }
          />
          {this.state.address1Error.length > 0 && (
            <span className="error">{this.state.address1Error}</span>
          )}

          <br />

          <input
            className="dvdFixAddress2Gap"
            placeholder="Your City, State, and Zip"
            onChange={this.handleChange}
            name="address2"
            value={this.state.address2}
            noValidate
            style={
              this.state.address2Error.length > 0 || this.state.address2IsEmpty
                ? errorStyle
                : null
            }
          />
          {this.state.address2Error.length > 0 && (
            <span className="error">{this.state.address2Error}</span>
          )}

          {this.state.orderError.length > 0 && (
            <span className="error" style={{ marginTop: '20px' }}>
              {this.state.orderError}
            </span>
          )}

          <div className="agreeToTermsSection">
            <div
              onClick={this.handleClick}
              className="agreeToTerms"
              style={
                this.state.agreeToTermsError.length > 0 ? errorStyle : null
              }
            >
              <img
                src={check}
                alt="agree"
                className={this.state.agreeToTerms ? '' : 'hide'}
              />
            </div>

            <div onClick={this.hideTerms}>
              <p
                style={{
                  fontStyle: 'normal',
                  color: 'var(--textColor)',
                }}
              >
                I certify that I am 21 years of age or older and I agree to the{' '}
                <span className="guarantee">terms & conditions of use.</span>
              </p>
              <Terms hideT={this.state.hideT} />
            </div>
          </div>
          {!this.state.agreeToTerms && (
            <span className="error">{this.state.agreeToTermsError}</span>
          )}

          <button disabled={this.state.successMsg.length > 0 ? true : false}>
            Order Now!
          </button>
          <p style={{ color: 'lime', fontSize: '1.5rem' }}>
            {this.state.successMsg}
          </p>

          <p className={this.state.hideErrorMsg}>The form is not complete</p>
        </form>
        {this.state.successMsg.length > 0 && (
          <button
            style={{
              width: 'auto',
              padding: '15px',
              backgroundColor: 'lime',
              color: 'black',
              display: 'block',
              margin: '0 auto',
              fontWeight: 'bold',
              fontSize: '1rem',
              transform: 'translateY(-25px)',
            }}
            onClick={() => {
              window.print()
            }}
          >
            Print this screen
          </button>
        )}
      </div>
    )
  }
}

export default Dvd
