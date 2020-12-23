import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'

const Checkbox = props => {
  const { dispatch } = useContext(ListContext)
  // console.log(props.props)
  let x = props.props

  let checked = props.props.checked

  let y

  const handleCheck = () => {
    y = { props: { ...x, checked: !props.props.checked } }
    dispatch({ type: 'REMOVE_ITEM', item: x })
    dispatch({ type: 'CHANGE_ITEM', item: y })
  }

  if (checked === true) {
    return <span className="checkbox" onClick={handleCheck}></span>
  } else {
    return <span className="MT" onClick={handleCheck}></span>
  }
}

export default Checkbox
