export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return [...state, { ...action.item, checked: false }]

    case 'CHANGE_CART_ITEM':
      return [...state, action.item.item]

    case 'REMOVE_CART_ITEM':
      return state.filter((item) => item.id !== action.item.id)

    case 'REMOVE_CART_ALL':
      return []

    default:
      return state
  }
}
