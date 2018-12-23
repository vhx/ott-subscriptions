import axios from 'axios';

export const FETCH_SUBSCRIPTIONS_BEGIN   = 'FETCH_SUBSCRIPTIONS_BEGIN';
export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
export const FETCH_SUBSCRIPTIONS_FAILURE = 'FETCH_SUBSCRIPTIONS_FAILURE';


export function fetchSubscriptions() {
  return dispatch => {

    dispatch(fetchSubsBegin());
    
    return axios.get("http://localhost:3000/api/v1/customer")
      .then(json => {
        dispatch(fetchSubsSuccess(json.data));
      })
      .catch( error => dispatch(fetchSubsFailure(error)));
    };
};

export function fetchPage(pageNumber) {
  return dispatch => {

    dispatch(fetchSubsBegin());
    
    return axios.get("http://localhost:3000/api/v1/customer/?page=" + pageNumber)
      .then(json => {
        dispatch(fetchSubsSuccess(json.data));
      })
      .catch( error => dispatch(fetchSubsFailure(error)));
    };
};

export const fetchSubsBegin = () => ({
  type: FETCH_SUBSCRIPTIONS_BEGIN
});

export const fetchSubsSuccess = subscriptions => ({
  type: FETCH_SUBSCRIPTIONS_SUCCESS,
  payload: subscriptions 
});

export const fetchSubsFailure = error => ({
  type: FETCH_SUBSCRIPTIONS_FAILURE,
  payload: error 
});


