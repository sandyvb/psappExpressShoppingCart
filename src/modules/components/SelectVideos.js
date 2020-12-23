import React, { Component } from 'react'
// https://react-select.com/home
import Select from 'react-select'
// import {ListContext} from '../contexts/ListContext'
import DvdData from '../../data/DvdData'
// https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf

class SelectVideos extends Component {
  constructor() {
    super()
    this.state = {
      order: '',
      subtotal: 0,
      ccfee: 0,
      total: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // const { dispatch } = useContext(ListContext)
  // in Select tag: defaultValue={[colourOptions[2], colourOptions[3]]}

  handleChange(val) {
    let tempsubtotal = 0
    let tempccfee = 0
    let temptotal = 0

    if (val !== null) {
      this.setState({ order: val }, () => {
        this.state.order.map(item => (tempsubtotal += Number(item.price)))
        this.setState({ subtotal: tempsubtotal.toFixed(2) }, () => {
          tempccfee = val.length * 3
          this.setState({ ccfee: tempccfee }, () => {
            temptotal = tempsubtotal + tempccfee
            this.setState({ total: temptotal.toFixed(2) }, () => {
              this.props.parentCallback(this.state)
            })
          })
        })
      })
    } else {
      this.setState(
        {
          order: '',
          subtotal: 0,
          ccfee: 0,
          total: 0
        },
        () => {
          this.props.parentCallback(this.state)
        }
      )
    }
  }

  render() {
    return (
      <div className="select">
        <p
          style={{
            color: 'var(--textColor)',
            fontStyle: 'normal',
            textAlign: 'left',
            marginTop: '0'
          }}
        >
          Start typing a video TITLE or CODE or use the DROPDOWN arrow:
        </p>
        <Select
          isMulti
          name="order"
          options={DvdData}
          onChange={this.handleChange}
        />
        <div
          className={this.state.order.length > 0 ? 'showSelect' : 'hideSelect'}
        >
          <h3>Order Details:</h3>
          <ul>
            {this.state.order.length > 0
              ? this.state.order.map(item => (
                  <li key={item.value}>
                    {item.value} - {item.label}
                    <span style={{ float: 'right' }}>{item.price}</span>
                  </li>
                ))
              : null}
          </ul>
          <hr style={{ backgroundColor: 'var(--backgroundColor' }} />
          <h4>
            Number of Videos: {this.state.order.length}{' '}
            <span style={{ float: 'right' }}>
              Subtotal: ${this.state.subtotal}
            </span>
          </h4>
          {/* {this.props.isCC === 'credit' && ( */}
          <h4 style={{ textAlign: 'right' }}>
            Shipping & Handling: ${this.state.ccfee}.00
          </h4>
          {/* )} */}
          <hr style={{ backgroundColor: 'var(--backgroundColor' }} />
          {/* {this.props.isCC === 'credit' ? ( */}
          <h4 style={{ textAlign: 'right' }}>Total: ${this.state.total}</h4>
          {/* ) : (
            <h4 style={{ textAlign: 'right' }}>
              Total: ${this.state.subtotal}
            </h4>
          )} */}
        </div>
      </div>
    )
  }
}

export default SelectVideos
