import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import customError from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req,res,next)=>{
    try {
        //We need to hash user password
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        });

        await newUser.save();
        res.status(200).json({mesage: "User has been create successfully"});
    } catch (error) {
        next(error);
    }
}

export const login = async (req,res,next)=>{
    try {
        const user=await User.findOne({username:req.body.username});

        if(!user){return next(customError(404,"No user matching the email"))}

        const isPasswordCorrect=await bcrypt.compareSync(req.body.password, user.password); 

        if(!isPasswordCorrect){return next(customError(404,"wrong password"))}
        
        // // after user successfully login, we create a token to keep track the activities of the loged in users
        // create a secret key, use the following command:
        // openssl rand -base64 32
        const token=jwt.sign({id:user._id,isAdmin: user.isAdmin},process.env.JWT);

        const {password, isAdmin,...otherDetails}=user._doc;
        
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({details:{...otherDetails},isAdmin});

    } catch (error) {
        next(error);
    }
}