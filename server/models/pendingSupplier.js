import mongoose from 'mongoose'
const PendingsupplierSchema = mongoose.Schema({
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
    accountInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'PendingAccount'
     },
    handlerRole:String, 
    businessType: String,
    organizationName:String,
    tinNumber: String,
    ownershipType:String,
    Attacheddocument:String,
})

const pendingsupplier = mongoose.model('PendingSupplier', PendingsupplierSchema)

export {
    pendingsupplier,
}