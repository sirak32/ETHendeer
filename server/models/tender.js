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
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    }]
})
export default mongoose.model('postTender', postSchema)
