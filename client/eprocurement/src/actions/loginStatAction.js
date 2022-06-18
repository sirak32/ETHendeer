import {
    SET_LOG_STAT
    
  } from '../constants/loginStatConstants'
  import {SET_ERROR,SET_LOADING} from '../constants/tenderConstants'
  import axios from 'axios';
  

      //ADDING TENDERS TO THE DATABASE AND ALSO TO THE REDUX STORE

  
//   const addAppliedSuccess = tender => ({
//     type: CREATE_APPLIED,
//     payload: {
//       ...tender
//     }
//   });
  
  const addAppliedStarted = () => ({
    type: SET_LOADING
  });
  
  const addAppliedFailure = error => ({
    type: SET_ERROR,
    payload: {
      error
    }
  });



  
  //FETCHING TENDERS FROM THE API AND THEN SET TO THE REDUX STORE

  export const fetchLoginStat=()=>{
    return dispatch=>{
      dispatch({type:SET_LOADING})
        axios.get(`http://localhost:5001/login-stat/`)
        .then((response)=>{
          const {data}=response
          dispatch(fetchAndSetLoginStat(data))
        })
        .catch(()=>{
  
        })
        
      
    }
  }
  const fetchAndSetLoginStat=data=>({
    type:SET_LOG_STAT,
    payload:data
  })

  