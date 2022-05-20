import {
    SET_TENDER,
    CREATE_TENDER,
    UPDATE_TENDER,
    DELETE_TENDER,
    SET_LOADING,
    SET_ERROR
  } from '../constants/tenderConstants';
  
  const initialState = {
    loading: true,
    suppliers: [],
    error: null,
    tenders:[]
  };
  
  export default function tenderReducer(state = initialState, action) {
    switch (action.type) {
      
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_TENDER:
        return {
          ...state,
          loading: false,
          error: '',
          tenders: action.payload
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