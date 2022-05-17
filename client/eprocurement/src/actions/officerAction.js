import {
    CREATE_OFFICER,
    SET_OFFICER,
    DELETE_OFFICER,
    UPDATE_OFFICER
  } from '../constants/officerConstants'
  import axios from 'axios';
import { CREATE_SUPPLIER } from '../constants/actionType';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE
  export const createOfficer = (officer) => {
    return dispatch => {
      dispatch(createOfficerStarted());
  
      axios
        .post(`http://localhost:5001/officers`, {
          officer
        })
        .then((res) => {
          dispatch(createOfficerSuccess(officer));
        })
        .catch(err => {
          dispatch(createOfficerFailure(err.message));
        });
    };
  };
  
  const createOfficerSuccess = officer => ({
    type: CREATE_OFFICER,
    payload: {
      ...officer
    }
  });
  
  const createOfficerStarted = () => ({
    type: SET_LOADING
  });
  
  const createOfficerFailure = error => ({
    type: SET_ERROR,
    payload: {
      error
    }
  });


  //DELETING TENDER FROM THE API AND THEN FROM THE REDUX STORE 
  export const deleteOfficer=(id)=>{
    return dispatch=>{
        dispatch(deleteOfficerStarted());
        axios.delete(`https://localhost:5001/tenders/${id}`)
        .then((res)=>{
          dispatch(deleteOfficerSuccess(id))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch(deleteOfficerFailure(err.message));
        });
    }
  }
  const deleteOfficerSuccess=id=>({
    type: DELETE_OFFICER,
    payload: {
      id
    }
  })
  const deleteOfficerStarted=()=>({
    type: SET_LOADING
  })
  const deleteOfficerFailure=error=>({
    type: SET_ERROR,
    payload: {
      error
    }
  })
  
  //FETCHING TENDERS FROM THE API AND THEN SET TO THE REDUX STORE

  export default fetchOfficer=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
      axios.get(`http://localhost:5001/tenders`)
      .then((response)=>{
        const {data}=response
        dispatch(fetchAndSetOfficer(data))
      })
      .catch(()=>{

      })
    }
  }
  const fetchAndSetOfficer=data=>({
    type:SET_OFFICER,
    payload:{
      data
    }
  })

  export const updateOfficer=(officer)=>{
    return dispatch=>{
        dispatch({type:SET_LOADING});
        axios.patch(`https://localhost:5001/tenders/${id}`,{
          officer
        })
        .then((res)=>{
          dispatch(updateOfficerSuccess(officer))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch({type:SET_ERROR});
        });
    }
  }
  const updateOfficerSuccess=officer=>({
    type:UPDATE_OFFICER,
    payload:{
      ...officer
    }
  })