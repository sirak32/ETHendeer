import mongoose from "mongoose";
const appliedTendersSchema = mongoose.Schema({
    tender: {
        type: mongoose.Schema.Types.ObjectId,
    },
    applier:{
        type: mongoose.Schema.Types.ObjectId,
    },
    appliedDate:{
        type:mongoose.Schema.Types.Date
    }
})
const appliedtenders = mongoose.model('AppliedTender', appliedTendersSchema)
export {appliedtenders}