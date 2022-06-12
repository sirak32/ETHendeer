import mongoose from "mongoose";
const appliedTendersSchema = mongoose.Schema({
    tender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'postTender'
    },
    applier:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    },
    appliedDate:{
        type:mongoose.Schema.Types.Date,
        default:new Date()
    },
    businessDoc:String,
    technicalDoc:String
})
const appliedtenders = mongoose.model('AppliedTender', appliedTendersSchema)
export default appliedtenders 