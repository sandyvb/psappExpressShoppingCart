import React, { Component } from 'react'
import '../../css/forms.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import check from '../../images/check.webp'
import bluex from '../../images/bluex.webp'
import Terms from '../components/forms/Terms'
import VideoData from '../../data/VideoData'

const validNameRegex = RegExp(/^[a-z\d\s]{1,50}$/i)
const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,8})$/i
)

class SingleDvd extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      dvdcode: '',
      agreeToTerms: false,
      hide: 'hide',
      hideErrorMsg: 'hideErrorMsg',
      agreeToTermsError: '',
      nameIsEmpty: '',
      emailIsEmpty: '',
      successMsg: '',
      nameError: '',
      emailError: '',
      orderError: '',
      hideG: true,
      hideT: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.hideGuarantee = this.hideGuarantee.bind(this)
    this.hideTerms = this.hideTerms.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount() {
    this.setState({ dvdcode: this.props.location.state.code })
  }

  validateForm() {
    let valid = true
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.agreeToTerms === false ||
      this.state.nameError.length > 0 ||
      this.state.emailError.length > 0 ||
      this.state.agreeToTermsError > 0
    ) {
      valid = false
    }
    return valid
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
      default:
        break
    }
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.validateForm()) {
      console.info('Valid Form')
      axios({
        method: 'post',
        url: 'https://powershotz.com/php/singledvd.php',
        headers: { 'content-type': 'application/json' },
        data: this.state,
      }).then((response) => {
        if (response.data.sent === true) {
          this.setState({
            successMsg:
              'Thank You! Please use the Clips4sale popup window to pay.',
          })
          const code = this.props.location.state.code
          const buyUrl = code.includes('VL')
            ? 'http://videos4sale.com/en/checkout/index/studio/325/video/79281-1'
            : 'http://videos4sale.com/en/checkout/index/studio/325/video/79279-1'
          const width = 690
          const height = 700
          const left = (window.screen.width - width) / 2
          const top = (window.screen.height - height) / 2
          let params =
            'width=' +
            width +
            ', height=' +
            height +
            ', top=' +
            top +
            ', left=' +
            left +
            ', directories=no, location=no, menubar=yes, resizable=yes, scrollbars=yes, status=no, toolbar=yes'
          window.open(buyUrl, 'PZWindow', params)
        } else {
          this.setState({ successMsg: 'Server Error: please try again' })
        }
      })
    } else {
      this.state.agreeToTerms === false &&
        this.setState({
          agreeToTermsError: 'You must agree to the terms & conditions',
        })
      this.state.name.length === 0
        ? this.setState({ nameIsEmpty: true })
        : this.setState({ nameIsEmpty: '' })
      this.state.email.length === 0
        ? this.setState({ emailIsEmpty: true })
        : this.setState({ emailIsEmpty: '' })
      this.setState({ hide: 'hide', hideErrorMsg: '' })
      console.error('Invalid Form')
    }
  }

  render() {
    const code = this.props.location.state.code
    const title = VideoData.find((item) => item.pz_code === code).title
    const banned = VideoData.find((item) => item.pz_code === code).banned
    const price = code.includes('VL') ? '$42.99' : '$37.99'

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
          <h1>One Full-Length DVD</h1>
          <h2
            style={{
              margin: '15px auto',
              fontSize: '2rem',
              color: 'lime',
              width: '100%',
            }}
          >
            "{title}" <span style={{ fontSize: '1.5rem' }}> ({code})</span>
          </h2>
        </header>

        <div onClick={this.hideGuarantee}>
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
            <h2>GUARANTEE & RETURN POLICY</h2>
            <p>
              Satisfaction is 100% guaranteed. It's simple. We will work with
              you to solve your problems or you get your money back.
            </p>
          </div>
        </div>

        <form
          onSubmit={this.handleSubmit}
          noValidate
          className="dvdForm"
          style={this.state.successMsg.length > 0 ? successStyle : null}
        >
          <h2
            style={{
              textAlign: 'center',
              margin: '20px',
            }}
          >
            Credit cards are no longer accepted.
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              fontStyle: 'normal',
              color: 'var(--textColor)',
            }}
          >
            To buy using CASH, CHECK, MONEY ORDER or BITCOIN please{' '}
            <Link to="/dvd" style={{ fontSize: '1.2rem' }}>
              CLICK HERE
            </Link>
            .
          </p>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              fontStyle: 'normal',
              color: 'var(--textColor)',
            }}
          >
            Or, <a href="mailto:alexandra@powershotz.com">email me</a> to place
            an order.
          </p>
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
            <span className="error" style={{ marginBottom: '40px' }}>
              {this.state.agreeToTermsError}
            </span>
          )}

          <h3
            style={{
              textAlign: 'center',
              color: 'var(--textColor)',
              margin: 0,
            }}
          >
            "{title}" ({code})
          </h3>

          {banned && (
            <p style={{ color: 'lime', fontStyle: 'normal', margin: '10px' }}>
              Banned DVDs are OK
            </p>
          )}
          <p
            style={{
              fontStyle: 'normal',
              color: 'var(--textColor)',
              margin: 0,
            }}
          >
            Price includes U.S. shipping & handling
          </p>

          <button disabled={this.state.successMsg.length > 0 ? true : false}>
            Pay {price}
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

export default SingleDvd
