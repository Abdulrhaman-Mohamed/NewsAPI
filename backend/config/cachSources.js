const { getSources } = require("../services/sources");
const logger = require("./logger");
const { redisClient } = require("./redis");

/**
 * Cache all sources in redis
 * @returns 
 * 
 * 
 * @description This function is used to cache all sources in redis in first init of server becasue the sources are not changed frequently
 */
const cacheAllSources = async ()=>{
    const sources = await getSources();
    try {
        await redisClient.set("sources", JSON.stringify(sources));
    } catch (error) {
        logger.error("Error in set caching sources");
    }
}

module.exports = {cacheAllSources};