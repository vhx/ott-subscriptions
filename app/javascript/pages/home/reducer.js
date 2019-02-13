const initialState = {
  subscriptions: '',
  current_page: null,
  next_page: null,
  prev_page: null,
  total_count: null,
  total_pages: null
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "UPDATE_SUBSCRIPTIONS":
        return {...state,
          subscriptions: action.payload.data,
          current_page: action.payload.meta['current-page'],
          next_page: action.payload.meta['next-page'],
          prev_page: action.payload.meta['prev-page'],
          total_count: action.payload.meta['total-count'], total_pages: action.payload.meta['total-pages']}
    default:
      return state
  }
}

export default reducer
