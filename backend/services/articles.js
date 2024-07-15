const apiInstance = require(".");
const logger = require("../config/logger");

const getSubscribedArticles = async (subscriptions) => {
    try {
        logger.warn("Fetching articles from subscribed sources NewsApi...");
        if(subscriptions.length === 0) return [];
        const response = (await apiInstance.get(`/everything?sources=${subscriptions}`)).data;
        return response;
    } catch (error) {
        logger.error("Error in fetching articles from subscribed sources NewsApi");
        logger.error(error);
    }
}

module.exports = {
    getSubscribedArticles
}