import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  user,
  address,
  supplier,
  officer,
  systemAdmin,
} from "../models/user.js";
import { pendingsupplier } from "../models/pendingSupplier.js";
import { account } from "../models/account.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const registerSupplier = async (req, res) => {
  const userBody = req.body;
  const usernameNotTaken = await validateUsername("Benjaminer");
  if (!usernameNotTaken) {
    return res.status(401).json({
      message: "Username is taken",
    });
  }

  const emailNotTaken = await validateEmail("tilik@gmail.com");
  if (!emailNotTaken) {
    return res.status(401).json({
      message: "Email is taken",
    });
  }

  const password = await bcrypt.hash("tilik", 12);
  const userAddress = new address({
    city: "Finote Selam",
    subcity: "Kuchra",
    wereda: "finot",
    kebele: "01",
  });
  const personalInfor = new user({
    firstName: "Sirak",
    middleNam: "Tesfaye",
    lastName: "Tadele",
    email: "sirinka@gmail.com",
    phoneNumber: {
      countryCode: "+251",
      regionalCode: "9",
      number: "01023434",
    },
    address: userAddress._id,
    sex: "m",
  });
  const accountInform = new account({
    username: "Sirak",
    password: password,
    email: "sirak@gmail.com",
    role: "supplier",
  });
  const newSupplier = new pendingsupplier({
    personalInfo: personalInfor._id,
    accountInfo: accountInform._id,
    bussinessType: "manufacturing",
    organizationName: "Alpha Business Group",
    handlerRole: "manager",
    ownershipType: "PartnerShip",
    tinNumber: "12345676543",
    Attacheddocument: "something base 64",
  });
  // const newAccount = new account({
  //     username: userBody.accountInfo.username,
  //     password,
  //     email: userBody.accountInfo.email,
  //     role: userBody.accountInfo.role,
  // })
  //need to be nested like callback
  // await newAccount.save()
  await userAddress.save();
  await personalInfor.save();
  await accountInform.save();
  await newSupplier.save();
  return res.status(201).json({
    message: "Account Created",
  });
};

/////
const getPending = async (req, res) => {
  const pend = await pendingsupplier
    .find()
    .populate("accountInfo")
    .populate("personalInfo");
  res.status(200).json(pend);
};

// Officer Registration

const registerOfficer = async (req, res) => {
  const userAddress = new address({
    city: "Finote Selam",
    subcity: "Kuchra",
    wereda: "finot",
    kebele: "01",
  });
  const personalInfor = new user({
    firstName: "Tiliksew",
    middleNam: "Mulugeta",
    lastName: "Alamirew",
    email: "tilik@gmail.com",
    phoneNumber: {
      countryCode: "+251",
      regionalCode: "9",
      number: "19298457",
    },
    address: userAddress._id,
    sex: "m",
  });
  const Offipassword = await bcrypt.hash("tilik", 12);
  const accountInform = new account({
    username: "tilik",
    password: Offipassword,
    email: "tilik",
    role: "officer",
  });
  const newOfficer = new officer({
    personalInfo: personalInfor._id,
    accountInfo: accountInform._id,
    officerId: "ETS3",
  });
  await userAddress.save();
  await personalInfor.save();
  await accountInform.save();
  await newOfficer.save();
  return res.status(201).json({
    message: "Hurry! now you are successfully registred. Please  login.",
    success: true,
  });
};

//Admin Login
const loginAdmin = (req, res) => {};

// Officer Login
const loginOfficer = (req, res) => {};

//Supplier Login
const loginSupplier = (req, res) => {};
const displayDashboard = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
const displayAll = async (req, res) => {
  const users = await supplier
    .find()
    .populate("personalInfo")
    .populate("accountInfo");
  res.status(200).json(users);
};
const getAllOfficers = async (req, res) => {
  // const users = await officer.find().populate('personalInfo').populate('accountInfo')
  const users = await officer
    .find()
    .populate({
      path: "personalInfo",
      populate: {
        path: "address",
        model: "Address",
      },
    })
    .populate("accountInfo");
  // .populate('accountInfo')
  res.status(200).json(users);
};

const validateUsername = async (username) => {
  const userName = await account.findOne({
    username,
  });
  console.log(userName);
  return userName ? false : true;
};
const validateEmail = async (email) => {
  const Email = await account.findOne({
    email,
  });
  console.log("email-", Email);
  return Email ? false : true;
};
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) next();
  res.status(401).json({
    messages: "not your role",
  });
};
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  const user = await account.findOne({
    username,
  });
  if (!user) {
    return res.status(200).json({
      message: "Username not found",
      succes: false,
    });
  }
  // if (user.role !== role) {
  //     return res.status(403).json({
  //         message: "Make sure to login to the right endpoint",
  //         succes: false
  //     })

  // }
  console.log(user.password);
  let isMatch = await bcrypt.compare(password, user.password);
  // const officerIds=await officer.findOne().populate('accountInfo').exec((ere,res)=>{

  //     // res.filter()
  //     console.log(res)
  // })
  // console.log(officerIds.accountInfo)
  const of = await officer
    .find()
    .populate("accountInfo")
    .populate("personalInfo");
  // if (users==null)
  const ad = await systemAdmin
    .find()
    .populate("accountInfo")
    .populate("personalInfo");
  // if(users==null)
  const su = await supplier
    .find()
    .populate("accountInfo")
    .populate("personalInfo");
  let u = [1];
  u = of.filter((user) => {
    return user.accountInfo.username === username;
  });
  if (u === []) {
    u = ad.filter((user) => {
      return user.accountInfo.username === username;
    });
  }
  if (u === []) {
    u = su.filter((user) => {
      return user.accountInfo.username === username;
    });
  }

  // const offId=u[0]._id
  // res.status(200).json(u)
  console.log(ad);
  return;
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      "SECRET",
      {
        expiresIn: "7 days",
      }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      exp: 168,
    };
    return res.status(200).json({
      ...result,
      succes: true,
      // offId
    });
  } else {
    return res.status(200).json({
      message: "Incorrect Password",
      succes: false,
    });
  }
};

const userAuth = () => {
  return passport.authenticate("jwt-bearer", {
    session: false,
  });
};

const updateAccount = async (req, res) => {
  // update handling
  const filter = req.params.id;
  const data = req.body;
  const updatedUser = await user.findOneAndUpdate(filter, data, {
    new: true,
  });
};
const deleteAccount = async (req, res) => {
  const filter = req.params.id;
  const dataBeforeDeletion = await user.findOneAndDelete(filter);
  res.status(200).json(dataBeforeDeletion);
};
const deleteTender = async (req, res) => {};
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
};
