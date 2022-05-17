import {
    CREATE_SUPPLIER,
    DELETE_SUPPLIER,
    UPDATE_SUPPLIER,
    FETCH_SUPPLIER,
    ADD_TENDER_SUCCESS,
    ADD_TENDER_FAILURE,
    ADD_TENDER_STARTED
  } from '../constants/actionType';
  
  const initialState = {
    loading: false,
    suppliers: [],
    error: null
  };
  
  export default function supplierReducer(state = initialState, action) {
    switch (action.type) {
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
          todos: [...state.todos, action.payload]
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