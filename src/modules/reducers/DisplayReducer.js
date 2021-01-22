export const displayReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MASONRY':
      return [...state, { display: true }]

    case 'SET_GRID':
      return [...state, { display: false }]

    case 'TOGGLE':
      return [...state, { display: !state.display }]

    default:
      return state
  }
}
