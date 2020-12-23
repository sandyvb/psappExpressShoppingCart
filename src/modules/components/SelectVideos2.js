import React, { useContext, useState, useEffect } from 'react'
// https://react-select.com/home
import Select from 'react-select'
import { ListContext } from '../contexts/ListContext'
import DvdData from '../../data/DvdData'

const SelectVideos2 = (props) => {
  const [order, setOrder] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [total, setTotal] = useState(0)
  const { list } = useContext(ListContext)

  // console.log(list)
  // const codes = list.map(item => item.pz_code)
  // console.log('codes', codes)
  // const indexitem = codes.map(
  //   item => item && DvdData.findIndex(el => el.value === item)
  // )
  // console.log('indexitem', indexitem)
  // const addtext = indexitem.map(item => (item ? `DvdData[${item}]` : ''))
  // console.log('addtext', addtext)
  // const filterlist = addtext.filter(item => item.length > 0)
  // console.log('filterlist', filterlist)

  // const defaultvalue = filterlist.map(item => ({
  //   item,
  //   key: Math.random() + Math.random()
  // }))
  // console.log('defaultvalue', defaultvalue)
  // const test = defaultvalue.map(item => item.item)
  // console.log('test', test)
  // const string = JSON.stringify(filterlist)
  // console.log('stringify filterlist:', string)
  // const defaultvalue = string.replace(/"/g, ' ')
  // console.log('defaultvalue:', defaultvalue)

  useEffect(() => {
    setTotal(subtotal + fee)
  }, [subtotal, fee])

  const handleChange = (val) => {
    // console.log('val', val)
    if (val !== null || val !== 0) {
      setOrder(val)
      setSubtotal(0)
      let sub = 0
      sub = val.forEach((item) =>
        setSubtotal(subtotal + parseFloat(item.price))
      )
      // console.log(sub)
      // setSubtotal(subtotal + Number(val[0].price))
      setFee(val.length * 3)
    } else {
      setOrder([])
      setSubtotal(0)
      setFee(0)
    }
    return props.parentCallback([order, subtotal, fee, total])
  }

  return (
    <div className="select">
      <p
        style={{
          color: 'var(--textColor)',
          fontStyle: 'normal',
          textAlign: 'left',
          marginTop: '0',
        }}
      >
        Start typing a video TITLE or CODE or use the DROPDOWN arrow:
      </p>
      <Select
        isMulti
        name="order"
        options={DvdData}
        onChange={handleChange}
        defaultValue={DvdData[-1]}
      />
      <div className={order.length > 0 ? 'showSelect' : 'hideSelect'}>
        <h3>Order Details:</h3>
        <ul>
          {order.length > 0
            ? order.map((item) => (
                <li key={item.value}>
                  {item.label}
                  <span style={{ float: 'right' }}>{item.price}</span>
                </li>
              ))
            : null}
        </ul>
        <hr style={{ backgroundColor: 'var(--backgroundColor' }} />
        <h4>
          Number of Videos: {order.length}{' '}
          <span style={{ float: 'right' }}>Subtotal: ${subtotal}</span>
        </h4>
        <h4 style={{ textAlign: 'right' }}>Shipping & Handling: ${fee}.00</h4>
        <hr style={{ backgroundColor: 'var(--backgroundColor' }} />
        <h4 style={{ textAlign: 'right' }}>Total: {total}</h4>
      </div>
    </div>
  )
}

export default SelectVideos2
