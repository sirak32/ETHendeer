import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import Login from "./components/supplier/Dashboard/Login";
import {createStore} from 'redux'
import { Provider } from 'react-redux'  
import tenderReducer from "./reducers/tenderReducer";
const store=createStore(tenderReducer)
ReactDom.render(
  <Provider store={store}>  
  <App />  
</Provider>,  
document.getElementById('root')
);
