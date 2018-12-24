import {
    FETCH_SUBSCRIPTIONS_BEGIN,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE,
    SEARCH_SUBSCRIPTIONS,
    SEARCH_BEGINS
} from '../actions/subActions';

const initState = {
    customers: [],
    page: null,
    pages: null,
    loading: false,
    error: null,
    searching: false,
    searchString: null
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

        case SEARCH_BEGINS:
            return {
                ...state,
                loading: true,
                error: null,
                searching: true,
                searchString: action.payload
            };

        case SEARCH_SUBSCRIPTIONS:
            return {
                ...state,
                customers: action.payload.customers,
                page: action.payload.page,
                pages: action.payload.pages,
                loading: false,
                searching: true,
                searchString: action.searchString

            }
        
        default:
            return state;
    }
}

export default rootReducer;