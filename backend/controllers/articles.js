const logger = require("../config/logger");
const { redisClient } = require("../config/redis");
const { getSubscribedArticles } = require("../services/articles");

const getAllArticles = async (req, res) => {
    const { subscriptions } = req.user;
    const articles = await getSubscribedArticles(subscriptions);
    res.status(200).json({ status: "success",  articles:articles });
    try {
       await redisClient.set(JSON.stringify(subscriptions), JSON.stringify(articles));
    } catch (error) {
        logger.error("Error in set caching articles");
    }
    
}



module.exports = {
    getAllArticles,
}