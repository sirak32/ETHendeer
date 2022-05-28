import {
    CREATE_SUPPLIER,
    DELETE_SUPPLIER,
    UPDATE_SUPPLIER,
    SET_SUPPLIER,
    
  } from '../constants/supplierConstants'
  import {
    SET_ERROR,
    SET_LOADING
  } from '../constants/tenderConstants'
  import axios from 'axios';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE
  export const addTender = (supplier) => {
    return dispatch => {
      dispatch(addSupplierStarted());
  
      axios
        .post(`https://localhost:5001/suppliers`, {
          supplier
        })
        .then(res => {
          dispatch(addSupplierSuccess(supplier));
        })
        .catch(err => {
          dispatch(addSupplierFailure(err.message));
        });
    };
  };
  
  const addSupplierSuccess = supplier => ({
    type: CREATE_SUPPLIER,
    payload: {
      ...supplier
    }
  });
  
  const addSupplierStarted = () => ({
    type: SET_LOADING
  });
  
  const addSupplierFailure = error => ({
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
          dispatch(deleteTenderSuccess(1))
          console.log('deleted succussfully')
        })
        .catch(err => {
          dispatch(deleteTenderFailure(err.message));
        });
    }
  }
  const deleteTenderSuccess=supplier=>({
    type: DELETE_SUPPLIER,
    payload: {
      ...supplier
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

  export const fetchSuppliers=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
        axios.get(`http://localhost:5001/suppliers`)
        .then((response)=>{
          const {data}=response
          dispatch(fetchAndSetTenders(data))
        })
        .catch(()=>{
  
        })
        
      
    }
  }
  const fetchAndSetTenders=data=>({
    type:SET_SUPPLIER,
    payload:data
  })

  