const logger = require("../config/logger");
const { redisClient } = require("../config/redis");
const CustomError = require("../utils/customError");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns [sources] unsubcribed and subscribed
 * 
 * @description This middleware is used to check if the sources are cached or not,
 * If the sources are cached then return them else call next middleware to fetch the sources From API
 */
const cachedSources = async (req, res, next) => {
    try {
        logger.info("Fetching cached sources...");
        const value = await redisClient.get("sources");
        if(value) return res.status(200).json({ status: "success",  articles: JSON.parse(value) });
    } catch (error) {
        logger.error("Error in fetching cached sources");
    }
    next();
}

module.exports = cachedSources;