import mongoose from "mongoose";
import tender from "./postTender";
bidSchema = mongoose.Schema({
    basicInfo: tender,
    amount: String,

})