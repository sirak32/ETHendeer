import mongoose from "mongoose";
const appliedTendersSchema = mongoose.Schema({
    tender: {
        type: mongoose.Schema.Types.ObjectId,
    },
    applier:{
        type: mongoose.Schema.Types.ObjectId,
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