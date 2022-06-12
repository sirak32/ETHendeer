import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
    user,
    address,
    supplier,
    officer
} from '../models/user.js'
import { pendingsupplier } from "../models/pendingSupplier.js";
import {
    account,pendingAccount
} from "../models/account.js";
import passport from "passport";
import jwt from 'jsonwebtoken'

const registerSupplier = async (req, res) => {
    const userBody = req.body
    const usernameNotTaken = await validateUsername('Benjaminer')
    if (!usernameNotTaken) {
        return res.status(401).json({
            message: "Username is taken"
        })
    }

    const emailNotTaken = await validateEmail("tilik@gmail.com")
    if (!emailNotTaken) {
        return res.status(401).json({
            message: "Email is taken"
        })
    }

    const password = await bcrypt.hash('tilik', 12)
    const userAddress = new address({
        city: "Finote Selam",
        subcity: "Kuchra",
        wereda: "finot",
        kebele: "01",

    })
    const personalInfor=new user({
        firstName: "Sirak",
    middleNam: "Tesfaye",
    lastName: "Tadele",
    email: "sirinka@gmail.com",
    phoneNumber: {
        countryCode: "+251",
        regionalCode: "9",
        number: "01023434",
    },
    address:userAddress._id,
    })
    const accountInform=new account({
        username: "Sirak",
    password: password,
    email: "sirak@gmail.com",
    role: "supplier"
    })
    const newSupplier = new pendingsupplier({
        personalInfo:personalInfor._id,
        accountInfo:accountInform._id,
        bussinessType:'manufacturing',
        organizationName:'Alpha Business Group',
        handlerRole:"manager",
        ownershipType:"PartnerShip",
        tinNumber:'12345676543',
        Attacheddocument:"something base 64",
    })
    // const newAccount = new account({
    //     username: userBody.accountInfo.username,
    //     password,
    //     email: userBody.accountInfo.email,
    //     role: userBody.accountInfo.role,
    // })
    //need to be nested like callback
    // await newAccount.save()
    await userAddress.save()
    await personalInfor.save()
    await accountInform.save()
    await newSupplier.save()
    return res.status(201).json({
        message: "Account Created"
    })
}
const acceptSupplier = async (req, res) => {
    const userBody = req.body
    const usernameNotTaken = await validateUsername(userBody.accountInfo.username)
    if (!usernameNotTaken) {
        return res.status(401).json({
            message: "Username is taken"
        })
    }
    const emailNotTaken = await validateEmail(userBody.accountInfo.email)
    if (!emailNotTaken) {
        return res.status(401).json({
            message: "Email is taken"
        })
    }

    // const password = await bcrypt.hash(userBody.accountInfo.password, 12)
    // const userAddress = new address({
    //     city: "Finote Selam",
    //     subcity: "Kuchra",
    //     wereda: "finot",
    //     kebele: "01",

    // })
    // const personalInfor=userBody.personalInfo
    const accountInform=new account({
        username: userBody.accountInfo.username,
    password:userBody.accountInfo.password,
    email: userBody.accountInfo.email,
    role: "supplier"
    })
    const newSupplier = new supplier({
        personalInfo:userBody.personalInfo,
        accountInfo:accountInform._id,
        bussinessType:userBody.businessType,
        organizationName:userBody.organizationName,
        handlerRole:"manager",
        ownershipType:userBody.ownershipType,
        tinNumber:userBody.tinNumber,
        Attacheddocument:"filename.pdf",
    })

    await accountInform.save()
    await newSupplier.save()
    await pendingsupplier.findByIdAndDelete(userBody._id)
    return res.status(201).json({
        message: "Supplier Accepted"
    })
}

const registerPendingSupplier = async (req, res) => {
    const userBody = req.body
    const usernameNotTaken = await validatePendingUsername(userBody.username)
    if (!usernameNotTaken) {
        return res.status(401).json({
            message: "Username is taken"
        })
    }

    const emailNotTaken = await validatePendingEmail(userBody.email)
    if (!emailNotTaken) {
        return res.status(401).json({
            message: "Email is taken"
        })
    }

    const password = await bcrypt.hash(userBody.password, 12)
    const userAddress = new address({
        city: userBody.city.name,
        subcity:userBody.subcity,
        wereda: userBody.wereda,
        kebele: userBody.kebele,

    })
    const personalInfor=new user({
        firstName: userBody.firstName,
    middleNam: userBody.middleName,
    lastName: userBody.lastName,
    email: userBody.email,
    phoneNumber: userBody.phoneNumber,
    address:userAddress._id,
    })
    const accountInform=new pendingAccount({
        username: userBody.username,
    password: password,
    email: userBody.email,
    role: "supplier"
    })
    const newSupplier = new pendingsupplier({
        personalInfo:personalInfor._id,
        accountInfo:accountInform._id,
        businessType:userBody.businessType,
        organizationName:userBody.organizationName,
        handlerRole:"manager",
        ownershipType:"PartnerShip",
        tinNumber:userBody.tinNumber,
        Attacheddocument:userBody.Attacheddocument,
    })

    await userAddress.save()
    await personalInfor.save()
    await accountInform.save()
    await newSupplier.save()
    return res.status(201).json({
        message: "Account Created"
    })
}


/////
const getPending=async(req,res)=>{
    const pend=await pendingsupplier.find().populate('accountInfo').populate('personalInfo')
    res.status(200).json(pend)
}
const rejectPending=async(req,res)=>{
    const id=req.params.id
    const pend=await pendingsupplier.findByIdAndRemove(id)
    res.status(200).json("Request Rejected")
}
const getPendingSuppliers=async(req,res)=>{
    try {
        
        const pend=await pendingsupplier.find().populate('accountInfo')
        res.status(200).json(pend)
    } catch (error) {
        res.status(404).json({message:error.message})

    }
}
const getOnePending=async(req,res)=>{
    const id=req.params.id
    
    try {
        
        const sup=await pendingsupplier.findById(id).populate('accountInfo')
        // const post = await tender.findById(id);
        console.log(sup)
        res.status(200).json(sup)
        // res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

}





// Officer Registration

const registerOfficer = async (req, res) => {
    const officer1=req.body
    const userAddress = new address({
        city: officer1.city.name,
        subcity: officer1.subcity,
        wereda: officer1.wereda,
        kebele: officer1.kebele
    })
    const personalInfor=new user({
        firstName: officer1.firstName,
    middleNam: officer1.middleName,
    lastName: officer1.lastName,
    email: officer1.email,
    phoneNumber:'+251919298457',
    address:userAddress._id,

    })
    const Offipassword = await bcrypt.hash(officer1.password, 12)
    const accountInform=new account({
        username: officer1.username,
    password: Offipassword,
    email: officer1.email,
    role: "officer"
    })
    const newOfficer = new officer({
        personalInfo:personalInfor._id,
        accountInfo:accountInform._id,  
        officerId:officer1.officerId,
    })
    await userAddress.save()
    await personalInfor.save()
    await accountInform.save() 
    await newOfficer.save()
    return res.status(201).json({
        message: "Hurry! now you are successfully registred. Please  login.",
        success: true
    });
}


//Admin Login
const loginAdmin = (req, res) => {

}

// Officer Login
const loginOfficer = (req, res) => {

}


//Supplier Login
const loginSupplier = (req, res) => {

}
const displayDashboard = (req, res) => {
    res.status(200).json({
        user: req.user
    })
}
const displayAll = async (req, res) => {
    const users = await supplier.find().populate('personalInfo').populate('accountInfo')
    res.status(200).json(users)
}
const getAllOfficers=async (req, res) => {
    // const users = await officer.find().populate('personalInfo').populate('accountInfo')
    const users = await officer.find().populate({
        path:'personalInfo',
        populate:{
            path:'address',
            model:'Address'
        }
    }).populate('accountInfo')
// .populate('accountInfo')
    res.status(200).json(users)
}

const validateUsername = async username => {
    const userName = await account.findOne({
        username
    })
    console.log(userName)
    return userName ? false : true
}
const validatePendingEmail = async email => {
    const Email = await pendingsupplier.findOne({
        email
    })
    console.log('email-',Email)
    return Email ? false : true
}

const validatePendingUsername = async username => {
    const userName = await pendingsupplier.findOne({
        username
    })
    console.log(userName)
    return userName ? false : true
}
const validateEmail = async email => {
    const Email = await account.findOne({
        email
    })
    console.log('email-',Email)
    return Email ? false : true
}
const checkRole = roles => (req, res, next) => {
    if (roles.includes(req.user.role))
        next()
    res.status(401).json({
        messages: "not your role"
    })
}
const userLogin = async (userCreds, role, res) => {
    let {
        username,
        password
    } = userCreds
    const user = await account.findOne({
        username
    })
    if (!user) {
        return res.status(200).json({
            message: "Username not found",
            succes: false
        })


    }
    // if (user.role !== role) {
    //     return res.status(403).json({
    //         message: "Make sure to login to the right endpoint",
    //         succes: false
    //     })

    // }
    console.log(user.password)
    let isMatch = await bcrypt.compare(password,user.password) 
    // const officerIds=await officer.findOne().populate('accountInfo').exec((ere,res)=>{
        
        
    //     // res.filter()
    //     console.log(res)
    // })
    // console.log(officerIds.accountInfo)
    const users = await officer.find({officerId:'ETS3'}).populate('accountInfo').populate('personalInfo')
    const u=users.filter((user)=>{
        return user.accountInfo.username===username
    })
    // const offId=u[0]._id
    // res.status(200).json(u)
    if (isMatch) {
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        }, 'SECRET', {
            expiresIn: "7 days"
        })
        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            exp: 168
        }
        return res.status(200).json({
            ...result,
            succes: true,
            // offId
        })

    } else {
        return res.status(200).json({
            message: 'Incorrect Password',
            succes: false
        })
    }

}

const userAuth = () => {

    return passport.authenticate("jwt-bearer", {
        session: false
    })
}

const updateAccount=async (req,res)=>{

   // update handling
   const filter=req.params.id
   const data=req.body
  const updatedUser=await user.findOneAndUpdate(filter,data,{
      new:true
  })
}
const deleteAccount=async(req,res)=>{
    const id=req.params.id
    console.log(id)
   const dataBeforeDeletion=await officer.findOneAndDelete(id)
   res.status(200).json(dataBeforeDeletion)
}
const deleteTender=async(req,res)=>{

}
// res.status(200).json(updatedUser)

export {
    checkRole,
    userAuth,
    registerOfficer,
    registerSupplier,
    loginAdmin,
    loginSupplier,
    loginOfficer,
    displayDashboard,
    userLogin,
    displayAll,
    deleteAccount,
    updateAccount,
    deleteTender,
    getAllOfficers,
    getPending,
    registerPendingSupplier,
    getPendingSuppliers,
    getOnePending,
    acceptSupplier,
    rejectPending
}