import React, { Component } from 'react'
import axios from 'axios'
import '../../css/forms.css'

// https://blog.bitsrc.io/how-to-build-a-contact-form-with-react-js-and-php-d5977c17fec0
// https://www.telerik.com/blogs/up-and-running-with-react-form-validation

const validNameRegex = RegExp(/^[a-z\d\s]{1,50}$/i)
const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,8})$/i
)
const validMessageRegex = RegExp(/^[^<>]{0,2000}$/i)

const validateForm = state => {
  let valid = true
  if (
    state.name === '' ||
    state.email === '' ||
    state.message === '' ||
    state.errors.name.length > 0 ||
    state.errors.email.length > 0 ||
    state.errors.message.length > 0
  ) {
    valid = false
  }
  return valid
}

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      message: '',
      hide: 'hide',
      hideErrorMsg: 'hideErrorMsg',
      successMsg: '',
      errors: {
        name: '',
        email: '',
        message: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({
      hide: 'hide',
      hideErrorMsg: 'hideErrorMsg',
      successMsg: ''
    })
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'name':
        errors.name = validNameRegex.test(value) ? '' : 'Invalid character'
        break
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Invalid email'
        break
      case 'message':
        errors.message = validMessageRegex.test(value)
          ? ''
          : 'Invalid character'
        break
      default:
        break
    }

    this.setState({ errors, [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (validateForm(this.state)) {
      console.info('Valid Form')
      axios({
        method: 'post',
        url: 'https://powershotz.com/php/contact.php',
        headers: { 'content-type': 'application/json' },
        data: this.state
      }).then(response => {
        if (response.data.sent === true) {
          this.setState({
            successMsg: 'Thank you! Your message has been sent!'
          })
        } else {
          this.setState({ successMsg: 'Server Error: please try again' })
        }
      })
      this.setState({
        name: '',
        email: '',
        message: '',
        hide: '',
        hideErrorMsg: 'hideErrorMsg',
        successMsg: '',
        error: '',
        errors: {
          name: '',
          email: '',
          message: ''
        }
      })
    } else {
      this.setState({ hide: 'hide', hideErrorMsg: '' })
      console.error('Invalid Form')
    }
  }

  render() {
    const errorStyle = {
      border: '2px solid red',
      boxSizing: 'border-box'
    }

    const successStyle = {
      border: '2px solid lime'
    }

    const { errors } = this.state

    return (
      <div className="forms">
        <header>
          <h1>Contact Us</h1>
        </header>

        <form
          onSubmit={this.handleSubmit}
          noValidate
          style={this.state.successMsg.length > 0 ? successStyle : null}
        >
          <input
            placeholder="Your Name"
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
            noValidate
            style={errors.name.length > 0 ? errorStyle : null}
          />
          {errors.name.length > 0 && (
            <span className="error">{errors.name}</span>
          )}

          <br />

          <input
            placeholder="Your Email"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
            noValidate
            style={errors.email.length > 0 ? errorStyle : null}
          />
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}

          <br />

          <textarea
            placeholder="Your Message"
            onChange={this.handleChange}
            name="message"
            value={this.state.message}
            noValidate
            style={errors.message.length > 0 ? errorStyle : null}
          />
          {errors.message.length > 0 && (
            <span className="error">{errors.message}</span>
          )}

          <br />

          <button>Submit</button>
          <p style={{ color: 'lime', fontSize: '1.5rem' }}>
            {this.state.successMsg}
          </p>
          <p className={this.state.hideErrorMsg}>The form is not complete</p>
        </form>
      </div>
    )
  }
}

export default Contact
