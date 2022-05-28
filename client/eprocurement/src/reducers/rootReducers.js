import tenderReducer from "./tenderReducer";
import supplierReducer from "./supplierReducer";
import officerReducer from './officerReducer'
import {combineReducers} from 'redux'
const rootReducer=combineReducers({
    tenders:tenderReducer,
    suppliers:supplierReducer,
    officers:officerReducer
})
export default rootReducer