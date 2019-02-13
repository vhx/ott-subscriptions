const initialState = {
  subscriptions: ''
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "UPDATE_SUBSCRIPTIONS":
        return {...state, subscriptions: action.payload}
    default:
      return state
  }
}

export default reducer
