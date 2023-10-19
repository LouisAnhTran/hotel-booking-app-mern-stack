import express from 'express';
import { deleteUserById, getUserByID, getUsersAll, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router=express.Router();

// what this router does is when request matching this endpoint will trigger this router handler, then it call the function to verify the token, if verification failed, the error will be thrown, otherwise, if successful, it will go to the middleware below (the third parameter in this route)
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, you are logged in");
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account");
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all account");
// })

// the user itself and admin can edit, delete, retrieve a account but only admin can get all users
//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUserById);

//GET
router.get("/:id", verifyUser, getUserByID);

//GET ALL
router.get("/",verifyAdmin,getUsersAll);



export default router;