import {
    CREATE_PENDING,SET_PENDING,DELETE_PENDING,UPDATE_PENDING
  } from '../constants/pendingConstants'
  import { SET_ERROR,SET_LOADING } from '../constants/tenderConstants';

  import axios from 'axios';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE
  export const createPending = (Pending) => {
    return dispatch => {
      dispatch(createPendingStarted());
  
      axios
        .post(`http://localhost:5001/Pendings`, {
          Pending
        })
        .then((res) => {
          dispatch(createPendingSuccess(Pending));
        })
        .catch(err => {
          dispatch(createPendingFailure(err.message));
        });
    };
  };
  
  const createPendingSuccess = Pending => ({
    type: CREATE_PENDING,
    payload: {
      ...Pending
    }
  });
  
  const createPendingStarted = () => ({
    type: SET_LOADING
  });
  
  const createPendingFailure = error => ({
    type: SET_ERROR,
    payload: {
      error
    }
  });


  //DELETING TENDER FROM THE API AND THEN FROM THE REDUX STORE 
  export const deletePending=(id)=>{
    return dispatch=>{
        dispatch(deletePendingStarted());
        axios.delete(`https://localhost:5001/tenders/${id}`)
        .then((res)=>{
          dispatch(deletePendingSuccess(id))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch(deletePendingFailure(err.message));
        });
    }
  }
  const deletePendingSuccess=id=>({
    type: DELETE_PENDING,
    payload: {
      id
    }
  })
  const deletePendingStarted=()=>({
    type: SET_LOADING
  })
  const deletePendingFailure=error=>({
    type: SET_ERROR,
    payload: {
      error
    }
  })
  
  //FETCHING TENDERS FROM THE API AND THEN SET TO THE REDUX STORE

  export const fetchPending=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
      axios.get(`http://localhost:5001/pending-supplier`)
      .then((response)=>{
        const {data}=response
        dispatch(fetchAndSetPending(data))
      })
      .catch(()=>{

      })
    }
  }
  const fetchAndSetPending=data=>({
    type:SET_PENDING,
    payload:data
  })

  export const updatePending=(Pending)=>{
    return dispatch=>{
        dispatch({type:SET_LOADING});
        axios.patch(`https://localhost:5001/tenders/id`,{
          Pending
        })
        .then((res)=>{
          dispatch(updatePendingSuccess(Pending))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch({type:SET_ERROR});
        });
    }
  }
  const updatePendingSuccess=Pending=>({
    type:UPDATE_PENDING,
    payload:{
      ...Pending
    }
  })