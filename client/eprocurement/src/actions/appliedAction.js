import {
    CREATE_APPLIED,
    UPDATE_APPLIED,
    DELETE_APPLIED,
    SET_APPLIED,
    
  } from '../constants/appliedConstants'
  import {SET_ERROR,SET_LOADING} from '../constants/tenderConstants'
  import axios from 'axios';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE
  export const addApplied = (tender) => {
    return dispatch => {
      dispatch(addAppliedStarted());
  
      axios
        .post(`https://localhost:5001/tenders`, {
          tender
        })
        .then(res => {
          dispatch(addAppliedSuccess(tender));
        })
        .catch(err => {
          dispatch(addAppliedFailure(err.message));
        });
    };
  };
  
  const addAppliedSuccess = tender => ({
    type: CREATE_APPLIED,
    payload: {
      ...tender
    }
  });
  
  const addAppliedStarted = () => ({
    type: SET_LOADING
  });
  
  const addAppliedFailure = error => ({
    type: SET_ERROR,
    payload: {
      error
    }
  });


  //DELETING TENDER FROM THE API AND THEN FROM THE REDUX STORE 
  export const deleteApplied=({})=>{
    return dispatch=>{
        dispatch(deleteAppliedStarted());
        axios.delete(`https://localhost:5001/tenders`)
        .then((response)=>{
          dispatch(deleteAppliedSuccess(1))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch(deleteAppliedFailure(err.message));
        });
    }
  }
  const deleteAppliedSuccess=tender=>({
    type: DELETE_APPLIED,
    payload: {
      ...tender
    }
  })
  const deleteAppliedStarted=()=>({
    type: SET_LOADING
  })
  const deleteAppliedFailure=error=>({
    type: SET_ERROR,
    payload: {
      error
    }
  })
  
  //FETCHING TENDERS FROM THE API AND THEN SET TO THE REDUX STORE

  export const fetchApplied=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
        axios.get(`http://localhost:5001/tenders/`)
        .then((response)=>{
          const {data}=response
          dispatch(fetchAndSetApplied(data))
        })
        .catch(()=>{
  
        })
        
      
    }
  }
  const fetchAndSetApplied=data=>({
    type:SET_APPLIED,
    payload:data
  })

  