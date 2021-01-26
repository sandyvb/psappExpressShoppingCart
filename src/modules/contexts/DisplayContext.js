import React, { createContext, useEffect, useReducer } from 'react'

import { displayReducer } from '../reducers/DisplayReducer'

export const DisplayContext = createContext()

const DisplayContextProvider = (props) => {
  const [display, displayDispatch] = useReducer(displayReducer, [], () => {
    const localData = localStorage.getItem('display')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem('display', JSON.stringify(display))
  }, [display])

  return (
    <DisplayContext.Provider value={{ display, displayDispatch }}>
      {props.children}
    </DisplayContext.Provider>
  )
}

export default DisplayContextProvider
