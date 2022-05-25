import {
    SET_SUPPLIER,
  } from '../constants/supplierConstants';
  import { SET_ERROR,SET_LOADING } from "../constants/tenderConstants";
  const initialState = {
    loading: false,
    suppliers: [],
    error: null
  };
  
  export default function supplierReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_SUPPLIER:
        return {
          ...state,
          loading: false,
          error: null,
          suppliers: action.payload
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