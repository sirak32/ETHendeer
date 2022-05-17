import mongoose from 'mongoose'
import { accountSchema } from "./account.js";
const addressSchema = mongoose.Schema({
    city: String,
    subcity: String,
    wereda: String,
    kebele: String,
})
const userSchema = mongoose.Schema({
    firstName: String,
    middleNam: String,
    lastName: String,
    email: String,
    phoneNumber: {
        countryCode: String,
        regionalCode: String,
        number: String,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address'
     },
    sex: String,
})
const officerSchema = mongoose.Schema({
    personalInfo: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    accountInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
     },
    officerId: String,


})
const supplierSchema = mongoose.Schema({
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
    accountInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
     },
    bussinesType: String,
    tinNumber: String,
})
const systemAdminSchema = mongoose.Schema({
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     accountInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
     },
    adminId: String,
})
const names = ['address', 'user', 'officer', 'systemAdmin', 'supplier']
const address = mongoose.model('Address', addressSchema)
const user = mongoose.model('User', userSchema)
const officer = mongoose.model('Officer', officerSchema)
const systemAdmin = mongoose.model('SystemAdmin', systemAdminSchema)
const supplier = mongoose.model('Supplier', supplierSchema)
export {
    user,
    address,
    officer,
    supplier,
    systemAdmin,
}