const logger = require("../config/logger");
const { redisClient } = require("../config/redis");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns [sources] unsubcribed and subscribed
 * 
 * @description This middleware is used to check if the Top 5 sources are cached or not,
 */
const cachedTopSources = async (req, res, next) => {
  try {
    logger.info("Fetching cached Top 5 sources...");
    const top_5_Sources = await redisClient.get("top_5_Sources");
    if (top_5_Sources) {
      res
        .status(200)
        .json({
          status: "success",
          commonSubscriptions: JSON.parse(top_5_Sources),
        });
    }
  } catch (error) {
    logger.error("Error in fetching cached sources");
  }
  next();
};

module.exports = cachedTopSources;
