import {

    SET_LOADING,
    SET_ERROR
  } from '../constants/tenderConstants';
  import {
   SET_LOG_STAT
  } from '../constants/loginStatConstants'
  const initialState = {
    loading: true,
    error: null,
    stat:{}
  };
  
  export default function loginStatReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_LOG_STAT:
        return {
          ...state,
          loading: false,
          error: '',
          stat: action.payload
        };
      case SET_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      default: 
        return state;
    }
  }