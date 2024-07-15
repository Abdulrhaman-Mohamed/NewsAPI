const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require('../config/constant');

//Constant

/**
 * 
 * @param {*} data 
 * @returns bearer token
 * 
 * @description This function is used to generate the access token
 */
const  generateAccessToken = (data) => {
    return jwt.sign({ 
        _id:data._id,
        email:data.email,
        subscriptions:data.subscriptions
     }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN + 'm' }); 
};

/**
 * 
 * @param {*} data 
 * @returns bearer token
 * 
 * @description This function is used to generate the refresh token
 */
const generateRefreshToken = (data) => {
    return jwt.sign({ 
        _id:data._id,
        email:data.email,
        subscriptions:data.subscriptions
     }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN + 'd' }); 
};

module.exports = { generateAccessToken, generateRefreshToken };