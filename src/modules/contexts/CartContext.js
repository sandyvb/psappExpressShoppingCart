import React, { createContext, useEffect, useReducer } from 'react'

import { cartReducer } from '../reducers/CartReducer'

export const CartContext = createContext()

const CartContextProvider = (props) => {
  const [cart, cartDispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('cart')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
