const loginHistory = require("../models/loginHistory");


/**
 * 
 * @param {*} userId 
 * @param {*} status 
 * @param {*} ipAddress 
 * 
 * @description Create a login history for the user it used to track the user login history in login Endpoint
 */
const createLoginHistory = async (userId, status, ipAddress) => {
  try {
    await loginHistory.create({
      userId,
      status,
      ipAddress,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    createLoginHistory,
}
