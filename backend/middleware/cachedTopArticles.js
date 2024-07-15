const logger = require("../config/logger");
const { redisClient } = require("../config/redis");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns [articles]
 * 
 * @description This middleware is used to check if the Top Sources's articles are cached or not,
 * If the articles are cached then return them else call next middleware to fetch the articles from API
 */
const cachedTopArticles = async (req, res, next) => {
    try {
        logger.info("Fetching cached sources's articles...");
        const top_articles = await redisClient.get("top_5_Sources_articles");
        if (top_articles) return res.status(200).json({ status: "success", commonSubscriptions: {articles:JSON.parse(top_articles)} });
    } catch (error) {
        logger.error("Error in fetching cached sources");
    }
    next();
}

module.exports = cachedTopArticles;