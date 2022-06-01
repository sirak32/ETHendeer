import tenderReducer from "./tenderReducer";
import supplierReducer from "./supplierReducer";
import officerReducer from './officerReducer'
import pendingReducer from './pendingReducers'
import {combineReducers} from 'redux'
const rootReducer=combineReducers({
    tenders:tenderReducer,
    suppliers:supplierReducer,
    officers:officerReducer,
    pendings:pendingReducer
})
export default rootReducer