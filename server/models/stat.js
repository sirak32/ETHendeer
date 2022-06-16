import mongoose from "mongoose";
const loginSchema =mongoose.Schema({
    date:{
        type:mongoose.Schema.Types.Date,
        default:new Date()
    }
})
const registerSchema =mongoose.Schema({
    date:{
        type:String,
        default:new Date()
    }
})
const applySchema =mongoose.Schema({
    date:{
        type:mongoose.Schema.Types.Date,
        default:new Date()
    }
})
const purchaseSchema =mongoose.Schema({
    date:{
        type:String,
        default:new Date()
    }
})
const login=mongoose.model('LoginStat',loginSchema)
const register=mongoose.model('RegisterStat',registerSchema)
const apply=mongoose.model('ApplyStat',applySchema)
const purchase=mongoose.model('PurchaseStat',purchaseSchema)

export {login,register,apply,purchase}