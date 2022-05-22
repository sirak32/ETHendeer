import mongoose from "mongoose";
const accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    user:{
        type:mongoose.Schema.Types.ObjectId
    }
})
const account = mongoose.model('Account', accountSchema)
export {
    accountSchema,
    account
}