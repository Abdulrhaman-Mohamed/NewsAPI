const logger = require("../config/logger");
const { redisClient } = require("../config/redis");
const CustomError = require("../utils/customError");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns [articles]
 * 
 * @description This middleware is used to check if the articles are cached or not,
 * If the articles are cached then return them else call next middleware to fetch the articles from API
 * 
 */
const cachedArticles = async (req, res, next) => {
    try {
        const { subscriptions } = req.user;
        logger.info("Fetching cached articles...");
        const value = await redisClient.get(JSON.stringify(subscriptions));
        if(value) return res.status(200).json({ status: "success",  articles: JSON.parse(value) });
    } catch (error) {
        logger.error("Error in fetching cached articles");
    }
    next();
}

module.exports = cachedArticles;