import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import Login from "./components/supplier/Dashboard/Login";
import {createStore,compose,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'  
import tenderReducer from "./reducers/tenderReducer";
import thunk from 'redux-thunk'

const store=createStore(tenderReducer,compose(applyMiddleware(thunk)))
ReactDom.render(
  <Provider store={store}>  
  <App />  
</Provider>,  
document.getElementById('root')
);
