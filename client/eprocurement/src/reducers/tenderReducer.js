import {
    SET_TENDER,
    CREATE_TENDER,
    UPDATE_TENDER,
    DELETE_TENDER
  } from '../constants/tenderConstants';
  
  const initialState = {
    loading: false,
    suppliers: [],
    error: null,
    tenders:[]
  };
  
  export default function supplierReducer(state = initialState, action) {
    switch (action.type) {
      case SET_TENDER:
        return {
           tenders:action.data
          }
      case ADD_STARTED:
        return {
          ...state,
          loading: true
        };
      case ADD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          todos: [...state.tenders, action.data]
        };
      case ADD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      default: 
        return state;
    }
  }