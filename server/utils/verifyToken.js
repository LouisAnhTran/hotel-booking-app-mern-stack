import jwt from 'jsonwebtoken';
import customError from './error.js';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    // if request does not contain access token, we say the user is not authenticated
    if(!token){
        return next(customError(401,"You are not authenticated"));
    }

    // if the request has access token, we verify the token, if token is valid, we extract user information from request
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){return next(customError(403,"Token is not valid"))};
        req.user=user;
        next()
    });

}

// we verifiy token and cookies then we check the id is matching or not before giving the user the right to delete or remove something
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(customError(403,"You are not authorized!"));
        }
    })
}

// we verifiy token and cookies then we check the id is matching or not before giving the user the right to delete or remove something
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(customError(403,"You are not admin, hence not authorized!"));
        }
    })
}