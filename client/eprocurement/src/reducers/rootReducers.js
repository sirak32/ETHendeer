import tenderReducer from "./tenderReducer";
import supplierReducer from "./supplierReducer";
import officerReducer from './officerReducer'
import pendingReducer from './pendingReducers'
import {combineReducers} from 'redux'
import appliedReducer from "./appliedReducers";
import loginStatReducer from "./loginStatReducer";
const rootReducer=combineReducers({ 
    tenders:tenderReducer,
    suppliers:supplierReducer,
    officers:officerReducer,
    pendings:pendingReducer,
    applied:appliedReducer,
    stat:loginStatReducer
})
export default rootReducer