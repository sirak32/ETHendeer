import mongoose from "mongoose";
const accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String
})
const account = mongoose.model('Account', accountSchema)
export {
    accountSchema,
    account
}