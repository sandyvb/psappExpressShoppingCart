import React, { createContext, useEffect, useReducer } from 'react'
import { listReducer } from '../reducers/ListReducer'

export const ListContext = createContext()

const ListContextProvider = props => {
  const [list, dispatch] = useReducer(listReducer, [], () => {
    const localData = localStorage.getItem('list')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <ListContext.Provider value={{ list, dispatch }}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
