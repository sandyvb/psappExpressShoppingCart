import React, { useContext, useState, useEffect } from 'react'
import StarsInData from '../../data/StarsInData'
import PhotoData from '../../data/PhotoData'
import clips from '../../data/Clips'
import { CartContext } from '../contexts/CartContext'

const BuyAll = ({ name }) => {
  const { dispatch } = useContext(CartContext)
  const [buttonText, setButtonText] = useState('Add all to cart')
  const [buttonStyle, setButtonStyle] = useState('big')

  useEffect(() => {
    setButtonText(`add all of ${name}'s videos and photos to your cart`)
    setButtonStyle('big')
  }, [name])

  const addAllToCart = () => {
    // get all the model's videos & photos
    let lcName = name.toLowerCase().replace(/ /g, '')
    let model = PhotoData.find((item) => {
      return item.model_name.toLowerCase().replace(/ /g, '') === lcName
    })
    let videoIds = StarsInData.filter(
      (item) => item.model_name.toLowerCase().replace(/ /g, '') === lcName
    )

    // add them all to cart
    dispatch({ type: 'REMOVE_CART_ITEM', item: model })
    dispatch({ type: 'ADD_CART_ITEM', item: model })
    videoIds.forEach((item) => {
      let object = clips.find((obj) => {
        return obj.id === item.vid_id
      })
      dispatch({ type: 'REMOVE_CART_ITEM', item: object })
      dispatch({ type: 'ADD_CART_ITEM', item: object })
    })

    setButtonText('added all to cart')
    setButtonStyle('sm')
  }

  const styles = {
    big: {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    sm: {},
  }

  return (
    <button
      style={buttonStyle === 'big' ? styles.big : styles.sm}
      onClick={addAllToCart}
    >
      {buttonText}
    </button>
  )
}

export default BuyAll
