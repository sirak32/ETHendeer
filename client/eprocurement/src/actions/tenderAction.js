import {
    CREATE_TENDER,
    UPDATE_TENDER,
    DELETE_TENDER,
    SET_TENDER,
    SET_LOADING,
    SET_ERROR
  } from '../constants/tenderConstants'
  import axios from 'axios';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE
  export const addTender = (tender) => {
    return dispatch => {
      dispatch(addTenderStarted());
  
      axios
        .post(`https://localhost:5001/tenders`, {
          tender
        })
        .then(res => {
          dispatch(addTenderSuccess(tender));
        })
        .catch(err => {
          dispatch(addTenderFailure(err.message));
        });
    };
  };
  
  const addTenderSuccess = tender => ({
    type: CREATE_TENDER,
    payload: {
      ...todo
    }
  });
  
  const addTenderStarted = () => ({
    type: SET_LOADING
  });
  
  const addTenderFailure = error => ({
    type: SET_ERROR,
    payload: {
      error
    }
  });


  //DELETING TENDER FROM THE API AND THEN FROM THE REDUX STORE 
  export const deleteTender=({})=>{
    return dispatch=>{
        dispatch(deleteTenderStarted());
        axios.delete(`https://localhost:5001/tenders`)
        .then((response)=>{
          dispatch(deleteTenderSuccess(tenderId))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch(deleteTenderFailure(err.message));
        });
    }
  }
  const deleteTenderSuccess=tender=>({
    type: DELETE_TENDER,
    payload: {
      ...tender
    }
  })
  const deleteTenderStarted=()=>({
    type: SET_LOADING
  })
  const deleteTenderFailure=error=>({
    type: SET_ERROR,
    payload: {
      error
    }
  })
  
  //FETCHING TENDERS FROM THE API AND THEN SET TO THE REDUX STORE

  export default fetchTender=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
      axios.get(`http://localhost:5001/tenders`)
      .then((response)=>{
        const {data}=response
        dispatch(fetchAndSetTenders(data))
      })
      .catch(()=>{

      })
    }
  }
  const fetchAndSetTenders=data=>({
    type:SET_TENDER,
    payload:{
      ...data
    }
  })

  