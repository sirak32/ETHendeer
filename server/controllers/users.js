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
import { apply, login,register } from "../models/stat.js";

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
    // accountInform.user=
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
    accountInform.user=newSupplier._id
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
    // if (!emailNotTaken) {
    //     return res.status(401).json({
    //         message: "Email is taken"
    //     })
    // }

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
    const rg=new register({})
    await rg.save()
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
    phoneNumber:officer1.phoneNumber,
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
    accountInform.user=newOfficer._id
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
  /*
_id
firstName
middleNam
lastName
email
phoneNumber
username
password
email
role
user
officerId
  */
    // const users = await officer.find().populate('personalInfo').populate('accountInfo')
    const users = await officer.find().populate({
        path:'personalInfo',
        populate:{
            path:'address',
            model:'Address'
        }
    }).populate('accountInfo')
// .populate('accountInfo')
console.log(users)
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
    const Email = await account.findOne({
        email
    })
    console.log('email-',Email)
    return Email ? false : true
}

const validatePendingUsername = async username => {
    const userName = await account.findOne({
        username
    })
    console.log('Found',userName)
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
    console.log("From Belcash",user.password,password)
    let isMatch = await bcrypt.compare(password,user.password) 
    // const officerIds=await officer.findOne().populate('accountInfo').exec((ere,res)=>{
        
        
    //     // res.filter()
    //     console.log(res)
    // })
    // console.log(officerIds.accountInfo)
    // const users = await officer.find({officerId:'ETS3'}).populate('accountInfo').populate('personalInfo')
    // const u=users.filter((user)=>{
    //     return user.accountInfo.username===username
    // })
    // const offId=u[0]._id
    // res.status(200).json(u)
    if (isMatch) {
        const lo=new login({})
        await lo.save()
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
            user:user.user
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
const getLoginStat=async (req,res)=>{
    try {
        
        const loginStat=await login.find({})
        const registerStat=await register.find({})
        const applyStat=await apply.find({})
        let logMonthly={
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0,
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
        }
        let regMonthly={
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0,
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
        }
        let aplMonthly={
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0,
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
        }
        let Mon
        loginStat.map((s)=>{ 
            Mon=new Date(s.date).getMonth()
            switch (Mon) {
              case 0:
                    console.log('inside switch')
                logMonthly = { ...logMonthly, Jan: ++logMonthly.Jan };
                break;
              case 1:
                logMonthly = { ...logMonthly, Feb: ++logMonthly.Feb };

                break;
              case 2:
                logMonthly = { ...logMonthly, Mar: ++logMonthly.Mar };

                break;
              case 3:
                logMonthly = { ...logMonthly, Apr: ++logMonthly.Apr };

                break;
              case 4:
                logMonthly = { ...logMonthly, May: ++logMonthly.May };

                break;
              case 5:
                logMonthly = { ...logMonthly, Jun: ++logMonthly.Jun };

                break;
              case 6:
                logMonthly = { ...logMonthly, Jul: ++logMonthly.Jul };

                break;
              case 7:
                logMonthly = { ...logMonthly, Aug: ++logMonthly.Aug };

                break;
              case 8:
                logMonthly = { ...logMonthly, Sep: ++logMonthly.Sep };

                break;
              case 9:
                logMonthly = { ...logMonthly, Oct: ++logMonthly.Oct };

                break;
              case 10:
                logMonthly = { ...logMonthly, Nov: ++logMonthly.Nov };

                break;
              case 11:
                logMonthly = { ...logMonthly, Dec: ++logMonthly.Dec };
                break;

              default:
                break;
            }
        })
        registerStat.map((s)=>{
            Mon=new Date(s.date).getMonth()
            switch (Mon) {
              case 0:
                    console.log('inside switch')
                    regMonthly = { ...regMonthly, Jan: ++regMonthly.Jan };
                break;
              case 1:
                regMonthly = { ...regMonthly, Feb: ++regMonthly.Feb };

                break;
              case 2:
                regMonthly = { ...regMonthly, Mar: ++regMonthly.Mar };

                break;
              case 3:
                regMonthly = { ...regMonthly, Apr: ++regMonthly.Apr };

                break;
              case 4:
                regMonthly = { ...regMonthly, May: ++regMonthly.May };

                break;
              case 5:
                regMonthly = { ...regMonthly, Jun: ++regMonthly.Jun };

                break;
              case 6:
                regMonthly = { ...regMonthly, Jul: ++regMonthly.Jul };

                break;
              case 7:
                regMonthly = { ...regMonthly, Aug: ++regMonthly.Aug };

                break;
              case 8:
                regMonthly = { ...regMonthly, Sep: ++regMonthly.Sep };

                break;
              case 9:
                regMonthly = { ...regMonthly, Oct: ++regMonthly.Oct };

                break;
              case 10:
                regMonthly = { ...regMonthly, Nov: ++regMonthly.Nov };

                break;
              case 11:
                regMonthly = { ...regMonthly, Dec: ++regMonthly.Dec };
                break;

              default:
                break;
            }
        })
        applyStat.map((s)=>{
            Mon=new Date(s.date).getMonth()
            switch (Mon) {
              case 0:
                    console.log('inside switch')
                    aplMonthly = { ...aplMonthly, Jan: ++aplMonthly.Jan };
                break;
              case 1:
                aplMonthly = { ...aplMonthly, Feb: ++aplMonthly.Feb };

                break;
              case 2:
                aplMonthly = { ...aplMonthly, Mar: ++aplMonthly.Mar };

                break;
              case 3:
                aplMonthly = { ...aplMonthly, Apr: ++aplMonthly.Apr };

                break;
              case 4:
                aplMonthly = { ...aplMonthly, May: ++aplMonthly.May };

                break;
              case 5:
                aplMonthly = { ...aplMonthly, Jun: ++aplMonthly.Jun };

                break;
              case 6:
                aplMonthly = { ...aplMonthly, Jul: ++aplMonthly.Jul };

                break;
              case 7:
                aplMonthly = { ...aplMonthly, Aug: ++aplMonthly.Aug };

                break;
              case 8:
                aplMonthly = { ...aplMonthly, Sep: ++aplMonthly.Sep };

                break;
              case 9:
                aplMonthly = { ...aplMonthly, Oct: ++aplMonthly.Oct };

                break;
              case 10:
                aplMonthly = { ...aplMonthly, Nov: ++aplMonthly.Nov };

                break;
              case 11:
                aplMonthly = { ...aplMonthly, Dec: ++aplMonthly.Dec };
                break;

              default:
                break;
            }
        })
        res.status(200).json({login:logMonthly,
                            register:regMonthly,
                        apply:aplMonthly}) 
    } catch (error) {
        res.status(404).json(error)
    }
    
}
const getRegisterStat=async (req,res)=>{ 
    try {
        
        const registerStat=await register.find({})
        let logMonthly={
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0,
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
        }
        let Mon
        registerStat.map((s)=>{
            Mon=new Date(s.date).getMonth()
            switch (Mon) {
              case 0:
                    console.log('inside switch')
                logMonthly = { ...logMonthly, Jan: ++logMonthly.Jan };
                break;
              case 1:
                logMonthly = { ...logMonthly, Feb: ++logMonthly.Feb };

                break;
              case 2:
                logMonthly = { ...logMonthly, Mar: ++logMonthly.Mar };

                break;
              case 3:
                logMonthly = { ...logMonthly, Apr: ++logMonthly.Apr };

                break;
              case 4:
                logMonthly = { ...logMonthly, May: ++logMonthly.May };

                break;
              case 5:
                logMonthly = { ...logMonthly, Jun: ++logMonthly.Jun };

                break;
              case 6:
                logMonthly = { ...logMonthly, Jul: ++logMonthly.Jul };

                break;
              case 7:
                logMonthly = { ...logMonthly, Aug: ++logMonthly.Aug };

                break;
              case 8:
                logMonthly = { ...logMonthly, Sep: ++logMonthly.Sep };

                break;
              case 9:
                logMonthly = { ...logMonthly, Oct: ++logMonthly.Oct };

                break;
              case 10:
                logMonthly = { ...logMonthly, Nov: ++logMonthly.Nov };

                break;
              case 11:
                logMonthly = { ...logMonthly, Dec: ++logMonthly.Dec };
                break;

              default:
                break;
            }
        })
        res.status(200).json(logMonthly)
    } catch (error) {
        res.status(404).json(error)
    }
    
}
const resetPassword=async(req,res)=>{
  const id = req.params.id
  let data=req.body
  console.log(data)
  try {
    var pass="ETHENDER"
    const p=await bcrypt.hash(pass,12)
    // data={...data,password:p}
    // console.log('info inside',p)
    const account1=await account.findByIdAndUpdate(id,{password:p})
    // account1.password=p
    // await account1.save() 
    res.status(200).json({message:account1})
  } catch (error) {
    res.status(404).json({error})

  }
}
const changeAccount=async(req,res)=>{
  const id = req.params.id
  let data=req.body
  try {
    const ac=await account.findOne({username:id})
    const pw=ac.password
    const newpw=data.newPassword
    const un=data.username
    const p=await bcrypt.hash(newpw,12)
    const isOk=await bcrypt.compare(data.oldPassword,pw)
    if(isOk){
      const account1=await account.findOneAndUpdate({username:id},{password:p,username:un})
      res.status(200).json({success:true})
      console.log('Match')
    }
    else{
  
      res.status(404).json({success:false})
      console.log('not match')
    }
  } catch (error) {
    res.status(200).json({error})
  }
  // try {
  //   var pass=data.password
  //   const p=await bcrypt.hash(pass,12)
  //   data={...data,password:p}
  //   console.log('info inside',p)
  //   const account1=await account.findByIdAndUpdate(id,data)
  //   res.status(200).json({message:account1})
  // } catch (error) {
  //   res.status(200).json({error})

  // }
}

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
    rejectPending,
    getLoginStat,
    getRegisterStat,
    resetPassword,
    changeAccount
}