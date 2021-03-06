import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    number: String,
    type: String,
    bidFee:mongoose.Schema.Types.Number,
    creator: String,
    publishedDate:Date,
    closingDate: Date,
    bidOpenOn: Date,
    termsAndConditions: String,
    document:String,
    attendedOfficer:{
        type:mongoose.Schema.Types.Number, 
        default:0
    },
    attendedSupplier:{
       type: mongoose.Schema.Types.Number, 
        default:0
    },
    attoff:[String],
    attsup:[String],
    payers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    }],
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    }]
})
export default mongoose.model('postTender', postSchema)
