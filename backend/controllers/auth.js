//libraries
const jwt = require('jsonwebtoken');

//Models
const User = require("../models/user");
const LoginHistory = require('../models/loginHistory');

//Utils
const CustomError = require("../utils/customError");
const { generateRefreshToken, generateAccessToken } = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/password");

//Validators
const { registerSchema, loginSchema } = require("../validators/auth");
const { createLoginHistory } = require('../utils/loginHistory');
const { status } = require('express/lib/response');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Register the user Controller
 * 
 * @throws CustomError for Errors and catch it in the errorHandler middleware
 * 
 * @returns JSON response
 */
const register = async (req, res) => {

    const validationBody = registerSchema.validate(req.body,{abortEarly:false});
    if(validationBody.error)throw new CustomError("Validation Error",400,validationBody.error.details);

    const user = await User.findOne({email:req.body.Email});
    if(user) throw new CustomError('User already exists',400);

    const newUser = await User.create({
        fullName:req.body.FullName,
        email:req.body.Email,
        password: await hashPassword(req.body.Password)
    });

    res.status(201).json({
        status:"success",
        message:"User created successfully",
        data:newUser
    });

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Login the user Controller
 * 
 * @throws CustomError for Errors and catch it in the errorHandler middleware
 * 
 * @returns JSON response
 */
const login = async (req, res) => {

    const validationBody = loginSchema.validate(req.body,{abortEarly:false});
    if(validationBody.error)throw new CustomError("Validation Error",400,validationBody.error.details);

    const user = await User.findOne({email:req.body.Email});
    if(!user) throw new CustomError('Invalid Credentials',400);

    if(! await comparePassword(req.body.Password,user.password)){
        await createLoginHistory(user._id,false,req.ip) //=> ip v6 here
        throw new CustomError('Invalid Credentials',400);
    } 

    // here Generate access token and refresh token
    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    await createLoginHistory(user._id,true,req.ip)

    res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie('accessToken', accessToken, {
        maxAge: 15 * 60 * 1000,
    });
    res.cookie('subscriptions', JSON.stringify(user.subscriptions), {
        maxAge: 3 * 60 * 1000,
    });


    res.status(200).json({
        status:"success",
        message:"Login successful"
    });


}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Logout the user Controller
 * 
 * @throws CustomError for Errors and catch it in the errorHandler middleware
 * 
 * @returns JSON response
 */
const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new CustomError("Please login to continue", 401);

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new CustomError('Invalid token', 401);
    }

    // const {_id} = req.user;
    // const user = await User.findById(_id);
    // if (!user || user.refreshToken !== refreshToken) {
    //     throw new CustomError('Please login to continue', 401);
    // }

    // user.refreshToken = null;
    // await user.save();

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.clearCookie('subscriptions');

    res.status(200).json({ status:"success" ,message: 'User logged out successfully' });

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Refresh the token Controller
 * 
 * @throws CustomError for Errors and catch it in the errorHandler middleware
 * 
 * @returns JSON response
 */
const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new CustomError('Please login to continue', 401);
    }

    let user;
    try {
        user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new CustomError('Invalid token', 401);
    }

    // const user = req.user;
    // if (!user || user.refreshToken !== refreshToken) {
    //     throw new CustomError('Please login to continue', 401);
    // }
    
    const userSelection = await User.findById(user._id);
    
    const accessToken = generateAccessToken(userSelection);

    res.cookie('accessToken', accessToken, {
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('subscriptions', JSON.stringify(userSelection.subscriptions), {
        maxAge: 3 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * @description Get login history of the user for last 10 logins
 */
const getLoginHistory = async (req, res) => {
    const loginHistory = await LoginHistory.find({userId:req.user._id}).sort({createdAt:-1}).limit(10);
    if(loginHistory.length>=1) return res.status(200).json({status:"success",data:loginHistory});
    return res.status(200).json({status:"success",message:"No login history found"});
}

const forgetPassword = async(req , res)=>{
    const {email} = req.body;
    const user = await User.find({email})

    if(!email) throw new CustomError("Invalid Cred",401);

    const code = await generateCode();

    restObjectCache[code] = email;
    
    // where we can put the code that we generated
    // res.cookie("code-rest",code);
    res.status(200).json({url:`baseUrl/${code}`})
}


const restPassword = async(req,res)=>{
    const{code , newPassword} = req.body;

    if(!code) throw new CustomError("not found code",400);

    const email = restObjectCache[code];
    
    if(!email) throw new CustomError("Invalid Code",401);

    await User.findAndUpdate({email},{password: await hashPassword(newPassword) })

    res.status(200).json({message:"Done rest"})


    
    
}



const restObjectCache={}



const generateCode = async()=> Math.floor(Math.random() * 10000)


module.exports = {
    register,
    login,
    logout,
    refreshToken,
    getLoginHistory
};