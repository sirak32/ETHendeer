import mongoose from 'mongoose'

const PendingsupplierSchema = mongoose.Schema({
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
    accountInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
     },
    handlerRole:String, 
    bussinesType: String,
    organizationName:String,
    tinNumber: String,
    ownershipType:String,
    Attacheddocument:String,
})

// const names = ['address', 'user', 'officer', 'systemAdmin', 'supplier']
const pendingsupplier = mongoose.model('PendingSupplier', PendingsupplierSchema)
export {
    pendingsupplier,
}