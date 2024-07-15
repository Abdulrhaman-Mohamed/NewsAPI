const bcrypt = require('bcryptjs');
const { SALT_PASSWORD } = require('../config/constant');

const hashPassword = async (password) => {
    return  bcrypt.hash(password, +SALT_PASSWORD);
};


/**
 * 
 * @param {*} password 
 * @param {*} hash 
 * @returns
 * 
 * @description Compare the password with the hash password  
 */
const comparePassword = async (password, hash) => {
    try {
        return bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    hashPassword,
    comparePassword
};