import tenderReducer from "./tenderReducer";
import supplierReducer from "./supplierReducer";
import {combineReducers} from 'redux'
const rootReducer=combineReducers({
    tenders:tenderReducer,
    suppliers:supplierReducer
})
export default rootReducer