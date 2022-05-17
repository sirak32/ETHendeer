import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
    user,
    address,
    supplier
} from '../models/user.js'
import {
    account
} from "../models/account.js";
import passport from "passport";
import jwt from 'jsonwebtoken'

const registerSupplier = async (req, res) => {
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

    const password = await bcrypt.hash(userBody.accountInfo.password, 12)
    const newUser = new supplier({
        ...userBody,
        accountInfo: {
            ...userBody.accountInfo,
            password,

        }
    })
    const newAccount = new account({
        username: userBody.accountInfo.username,
        password,
        email: userBody.accountInfo.email,
        role: userBody.accountInfo.role,
    })
    //need to be nested like callback
    await newAccount.save()
    await newUser.save()
    return res.status(201).json({
        message: "Account Created"
    })
}

// Officer Registration
const registerOfficer = async (req, res) => {

    const userAddress = new address({
        city: "Finote Selam",
        subcity: "Kuchra",
        wereda: "finot",
        kebele: "01",

    })
    const newOfficer = new user({
        firstName: "Tiliksew",
        middleNam: "Mulugeta",
        lastName: "Alamirew",
        email: "tilik@gmail.com",
        phoneNumber: {
            countryCode: "+251",
            regionalCode: "91929",
            number: "8457",
        },
        address: userAddress,
        sex: "male",
        role: "Admin"
    })
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
    const users = await account.find()
    res.status(200).json({
        user: users
    })
}

const validateUsername = async username => {
    const userName = await account.findOne({
        username
    })
    console.log(userName)
    return userName ? false : true
}
const validateEmail = async email => {
    const Email = await account.findOne({
        email
    })
    console.log(Email)
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
        return res.status(404).json({
            message: "Username not found",
            succes: false
        })


    }
    if (user.role !== role) {
        return res.status(403).json({
            message: "Make sure to login to the right endpoint",
            succes: false
        })

    }
    let isMatch = await bcrypt.compare(user.password, password)
    if (!isMatch) {
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
            succes: false
        })

    } else {
        return res.status(403).json({
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
    const filter=req.params.id
   const dataBeforeDeletion=await user.findOneAndDelete(filter)
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
    deleteTender
}