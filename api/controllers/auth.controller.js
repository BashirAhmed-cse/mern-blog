import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  jwt from 'jsonwebtoken';

export const signup = async (req, res, next) =>{
    const {username, email, password} = req.body;

    if(!username || !email || !password || username ==='' || email ==='' || password ===''){
        next(errorHandler(400, 'All field are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
try {
    await newUser.save();
    res.json('Signup successfull');
} catch (error) {
   next(error);
}
    
};

export const signin = async (req, res, next) =>{

    const { email, password} = req.body;
    if( !email || !password ||  email ==='' || password ===''){
        next(errorHandler(400, 'All field are required'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
          return next(errorHandler(404, 'Invalid password'));
        }

        const token = jwt.sign(
            {id: validUser._id}, process.env.jwt_secret);

            const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly: true}).json(rest);

    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) =>{
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
         const token = jwt.sign({ id: user._id }, process.env.jwt_secret);
         const { password: pass, ...rest } = user._doc;
         res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
        }else {
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
          const newUser = new User({ username: name.split(" ").join("") + Math.random().toString(9).slice(-4),
           email, 
         password: hashedPassword,  
         profilePicture: googlePhotoUrl });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.jwt_secret);
          const { password: pass, ...rest } = newUser._doc;
          res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

        }
    } catch (error) {
        next(error)
    }
  }

  export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out!");
    } catch (error) {
        next(error)
    }
  }