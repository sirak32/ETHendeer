import express from "express";
import passport from "passport";
import {
  displayAll,
  registerOfficer,
  checkRole,
  registerSupplier,
  loginAdmin,
  loginSupplier,
  loginOfficer,
  displayDashboard,
  userLogin,
  userAuth,
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
  changeAccount,
  getEmails
} from "../controllers/users.js";
import { account } from "../models/account.js";
import { supplier } from "../models/user.js";
import {officer} from '../models/user.js'
import {login,register} from '../models/stat.js'
import { getApplyStat } from "../controllers/posts.js";
const router = express.Router();

/** *
 *  @DESC registration routes for different
 */
// router.delete('/:id',deleteAccount)
router.post("/supplier-registration", registerSupplier);
router.post("/pending-supplier",registerPendingSupplier)
router.post("/officer-registration", registerOfficer);

/** *
 * @DESC login routes for different
 */
router.post("/supplier-login", async (req, res) => {
  await userLogin(req.body, "supplier", res);
});
router.post("/admin-login", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
router.post("/officer-login", async (req, res) => {
  await userLogin(req.body, "officer", res);
});
// router.post('/supplier-login',loginSupplier)

/** *
 * @DESC registration routes for different
 */

router.get(
  "/admin-dashboard",
  passport.authenticate("jwt-bearer", {
    session: false,
  }),
  checkRole(["admin"]),
  displayDashboard
);
router.get('/pending-supplier',getPending)
router.post('/accept-pending-supplier',acceptSupplier)
router.delete('/reject-pending-supplier/:id',rejectPending)
router.get('/get-pending-suppliers',getPendingSuppliers)
router.get('/get-pending-supplier/:id',getOnePending)
router.patch('/reset-password/:id',resetPassword)
router.patch('/change-account/:id',changeAccount)
router.get('/get-emails',getEmails)
router.get(
  "/officer-dashboard",
  passport.authenticate("jwt-bearer", {
    session: false,
  }),
  checkRole(["officer"]),
  displayDashboard
);

router.get(
  "/supplier-dashboard",
  passport.authenticate("jwt-bearer", {
    session: false,
  }),
  checkRole(["supplier"]),
  displayDashboard
);

router.get("/suppliers", displayAll);
router.get("/officers",getAllOfficers)
router.get("/officers/:id",deleteAccount)


//UPDATING THE SUPPLIER,ADMIN AND OFFICER ACCOUNTS
router.patch('/update-supplier', passport.authenticate("jwt-bearer", {
  session: false,
}), checkRole(['supplier']),updateAccount)

router.patch('/update-officer', passport.authenticate("jwt-bearer", {
  session: false,
}), checkRole(['officer']),updateAccount)

router.patch('/update-admin', passport.authenticate("jwt-bearer", {
  session: false,
}), checkRole(['admin']),updateAccount)

router.get('/fromme/:id',async (req,res)=>{
  try {
    
    const id=req.params.id
      console.log(id)
     const dataBeforeDeletion=await officer.findByIdAndRemove(id)
     const delAcc=await account.findByIdAndRemove(dataBeforeDeletion.accountInfo)
     res.status(200).json({offi:dataBeforeDeletion,acc:delAcc})
    
  } catch (error) {
    res.status(404).json({message:error.message})
  }
  // res.json({message:id})
})

router.get('/supli/:id',async (req,res)=>{
  try {
    
    const id=req.params.id
      console.log(id)
     const dataBeforeDeletion=await supplier.findByIdAndRemove(id)
     const delAcc=await account.findByIdAndRemove(dataBeforeDeletion.accountInfo)
     res.status(200).json({offi:dataBeforeDeletion,acc:delAcc})
    
  } catch (error) {
    res.status(404).json({message:error.message})
  }
  // res.json({message:id})
})
// DELETING THE SUPPLIER AND OFFICER ACCOUNTS

router.delete('/delete-supplier', passport.authenticate("jwt-bearer", {
  session: false,
}), checkRole(['admin']), deleteAccount)
router.delete('/officer-deletion', deleteAccount)
// router.delete('/delete-officer', passport.authenticate("jwt-bearer", {
//   session: false,
// }), checkRole(['admin']), deleteAccount)
router.delete('/delete-tender', passport.authenticate("jwt-bearer", {
  session: false,
}), checkRole(['officer']), deleteTender)


router.patch('/edit-supplier/:id',async(req,res)=>{
const id=req.params.id
const data=req.body
await supplier.findByIdAndUpdate(id,data)
res.json("succes")
})

///////  Statistics Data Manipulation
router.get('/login-stat',getLoginStat)
router.get('/register-stat',getRegisterStat)
router.get('/apply-stat',getApplyStat)



export default router;
