import {
    // SET_SUPPLIER,
    // CREATE_SUPPLIER,
    // DELETE_SUPPLIER,
    // UPDATE_SUPPLIER
    SET_PENDING
    } from '../constants/pendingConstants'
    import { SET_ERROR,SET_LOADING } from "../constants/tenderConstants";
    
    
    const initialState = {
        loading: false,
        pendings: [],
        error: null
      };
      export default function supplierReducer(state = initialState, action) {
        switch (action.type) {
          case SET_LOADING:
            return {
              ...state,
              loading: true
            };
          case SET_PENDING:
            return {
              ...state,
              loading: false,
              error: null,
              pendings: action.payload
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