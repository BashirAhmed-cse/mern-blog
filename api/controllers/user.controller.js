import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) =>{
    res.json({message:'API is working'});
};

export const updateUser = async (req, res, next) => {
// console.log(req.body, req.params.userId);
//   if(req.userId !== req.params.userId){
//     return next(errorHandler(403, 'You are not allow to update this user'))
//   }
  if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
  if(req.body.username){
    if(req.body.username.length < 5 || req.body.username.length > 20){
        return next(errorHandler(400, 'Username must be between 5 and 20 characters'));
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'Username cannot contain space'));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'Username can only contain letters and numbers'));
      }
    }

    try {
        // Update the user information in the database
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              profilePicture: req.body.profilePicture,
              password: req.body.password,
            },
          },
          { new: true }
        );
    
        // Omit the password from the updated user data
        const { password, ...rest } = updatedUser._doc;
    
        // Respond with the updated user data
        res.status(200).json(rest);
      } catch (error) {
        // Forward any errors to the error-handling middleware
        next(error);
      }
    };