//library
const jwt = require('jsonwebtoken');

//Constant
const { ACCESS_TOKEN_SECRET } = require("../config/constant");

//Model
const User = require("../models/user");
//Utils
const CustomError = require("../utils/customError");

const logger = require("../config/logger");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns undifined
 * @description Verify the access token for the requests that require authentication
 * 
 * @throws CustomError for Errors and catch it in the errorHandler middleware
 * 
 */
const verifyToken = async (req, res, next) => {
    try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new Error('Access Token not found');

        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
        // if (!user) throw new Error('Access Token not found');
        
        req.user = user;
        next();
    } catch (error) {
        logger.error("Verify Token Error");
        const err = new CustomError('Invalid Access Token', 403);
        next(err);
    }
};

module.exports = {verifyToken};