import User from "../models/User.js";

export const updateUser=async (req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body
        },{
            new: true
        });
        res.status(200).json(updatedUser);
      } catch(err) {
        next(err);
      }
}

export const deleteUserById=async (req,res,next)=>{
    try {
        await user.findByIdAndRemove(req.params.id);
        res.status(200).json({'message': "user has been delete"});
      } catch(err) {
        next(err);
      }
}

export const getUserByID=async (req,res,next)=>{
    try {
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
      } catch(err) {
        next(err);
      }
}

export const getUsersAll=async (req,res,next)=>{
    try {
        const users= await User.find();
        res.status(200).json(users);
      } catch(err) {
        next(err);
      }
}

