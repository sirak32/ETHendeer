import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import Login from "./components/supplier/Dashboard/Login";
import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'  
import tenderReducer from "./reducers/tenderReducer";
import supplierReducer from "./reducers/supplierReducer";
import rootReducer from "./reducers/rootReducers";
import thunk from 'redux-thunk'
// const reducers=combineReducers({tenders:tenderReducer,suppliers:supplierReducer})
const store=createStore( rootReducer,compose(applyMiddleware(thunk)))
ReactDom.render(
  <Provider store={store}>  
  <App />  
  {/* <Home/> */}
</Provider>,  
document.getElementById('root')
);
