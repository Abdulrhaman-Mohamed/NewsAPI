const logger = require("../config/logger");

/**
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns response with error message
 * 
 * @description Middleware to handle the errors in the application
 * 
 * @throws error message with status code
 */
const errorHandler = (err, req, res, next) => {
    logger.error(err);
    if(err.details&&err.details.length>0)
        return res.status(err.statusCode || 400).json({
            message:err.message,
            errors:err.details.map(e=> {return {[e.path[0]]:e.message}})
         });
         
    res.status(err.statusCode || 500).json({
            message: err.message
    });
};

module.exports = errorHandler;