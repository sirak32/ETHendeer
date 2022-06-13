import {

    SET_LOADING,
    SET_ERROR
  } from '../constants/tenderConstants';
  import {
    SET_APPLIED,CREATE_APPLIED,UPDATE_APPLIED,DELETE_APPLIED
  } from '../constants/appliedConstants'
  const initialState = {
    loading: true,
    error: null,
    applied:[]
  };
  
  export default function appliedReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_APPLIED:
        return {
          ...state,
          loading: false,
          error: '',
          applied: action.payload
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