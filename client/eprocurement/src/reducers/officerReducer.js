import {
// SET_SUPPLIER,
// CREATE_SUPPLIER,
// DELETE_SUPPLIER,
// UPDATE_SUPPLIER
SET_OFFICER
} from '../constants/officerConstants'
import { SET_ERROR,SET_LOADING } from "../constants/tenderConstants";


const initialState = {
    loading: false,
    officers: [],
    error: null
  };
  export default function supplierReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_OFFICER:
        return {
          ...state,
          loading: false,
          error: null,
          officers: action.payload
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