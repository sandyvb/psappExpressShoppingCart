export const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { ...action.item.props, checked: false }]

    case 'CHANGE_ITEM':
      return [...state, action.item.props]

    case 'REMOVE_ITEM':
      if (isNaN(action.item.id)) {
        return state.filter(
          (item) => item.model_name !== action.item.model_name
        )
      } else {
        return state.filter((item) => item.id !== action.item.id)
      }
    default:
      return state
  }
}
