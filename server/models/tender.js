import mongoose from "mongoose";
// import { officerSchema } from "./user.js";
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    number: String,
    type: String,
    // catagory: String,
    // lotNo: String,
    // minPrice:String,
    creator: String,
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Officer'
    //  },
    publishedDate:Date,
    //  {
    //     type: Date,
    //     default: new Date()
    // },
    closingDate: Date,
    // {
    //     type: Date,
    //     default: new Date()
    // },
    bidOpenOn: Date,
    // {
    //     type: Date,
    //     default: new Date()
    // },
    // participationFee: String,
    // bidSecurityAmount: String,
    termsAndConditions: String,
    document:String,
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    }]
})
export default mongoose.model('postTender', postSchema)
