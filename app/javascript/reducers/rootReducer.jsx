import {
    FETCH_SUBSCRIPTIONS_BEGIN,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE
} from '../actions/subActions';

const initState = {
    customers: [],
    page: null,
    pages: null,
    loading: false,
    error: null
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_SUBSCRIPTIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
           
        case FETCH_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                customers: action.payload.customers,
                page: action.payload.page,
                pages: action.payload.pages,
                loading: false
            }
        
        case FETCH_SUBSCRIPTIONS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                customers: [],
                page: null,
                pages: null,
                loading: false
            }
        
        default:
            return state;
    }
}

export default rootReducer;