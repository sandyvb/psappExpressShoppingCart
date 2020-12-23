import React, { Component } from 'react'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findindex

class Searchbox extends Component {
  constructor() {
    super()
    this.state = {
      searchbox: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target
    this.setState({ searchbox: value })
    // console.log('change:', this.state.searchbox)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log('submit:', this.state.searchbox)
  }

  render() {
    return (
      <form style={{ marginBottom: '15px' }} onSubmit={this.handleSubmit}>
        <input placeholder="coming soon..." onChange={this.handleChange} />
        <button>Search</button>
      </form>
    )
  }
}

export default Searchbox
