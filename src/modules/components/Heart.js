import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'

const Heart = (props) => {
  const { list, dispatch } = useContext(ListContext)
  const pathname = window.location.pathname.substring(1)
  let classname = 'save'
  let x
  switch (pathname) {
    case 'videos':
      x = list.find((item) => item.id === props.props.id)
      // x !== undefined && (classname = 'saved')
      if (x) {
        classname = 'saved'
      }
      break
    case 'photos':
      x = list.find((item) => item.model_name === props.props.model_name)
      // x !== undefined && (classname = 'saved')
      if (x) {
        classname = 'saved'
      }
      break
    default:
      if (isNaN(pathname)) {
        x = list.find((item) => item.model_name === props.props.model_name)
      } else {
        x = list.find((item) => item.id === props.props.id)
      }
      // x !== undefined && (classname = 'saved')
      if (x) {
        classname = 'saved'
      }
  }

  const handleClick = () => {
    if (classname === 'save') {
      classname = 'saved'
      dispatch({ type: 'ADD_ITEM', item: props })
    } else {
      classname = 'save'
      dispatch({ type: 'REMOVE_ITEM', item: props.props })
    }
  }

  return (
    <span
      className={classname}
      title={x !== undefined ? 'Remove from My List' : 'Save to My List'}
      onClick={handleClick}
    ></span>
  )
}

export default Heart
