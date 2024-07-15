const User = require("../models/user");
const { getSourceById } = require("../services/sources");
const logger = require("./logger");
const { redisClient } = require("./redis");


// There are functions can be optimize More and More and make it Cleaner and more readable

/**
 * 
 * @returns 
 * 
 * This function is used to get top 5 sources's articles and cache them
 */
async function getTop5_articles(){
    try {
        const top_5 = await User.aggregate([
            {
                $unwind: "$subscriptions"
            },
            {
                $group: {
                    _id: "$subscriptions",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 1
                }
            }
        ]);
        const cachedTop5 = await redisClient.get("top_5");
        const parseCahedTop5 = JSON.parse(cachedTop5);
        if(parseCahedTop5 && top_5.every((item)=> parseCahedTop5.includes(item._id))) return;
        
        await redisClient.set("top_5", JSON.stringify(top_5.map(item => item._id)));//{_id: "source1"} => ["source1"]
        const getSources = await getSourceById(top_5.map(item => item._id));
        await redisClient.set("top_5_Sources_articles", JSON.stringify(getSources? getSources.articles:[]));        

        logger.info("Top 5 sources called and cached");
    } catch (error) {
        logger.error("Error in set caching top 5 sources");
        logger.error(error);
    }
    
}


/**
 * 
 * @returns 
 * 
 * @description Get top 5 sources and cache them in redis
 */
async function getTop5_sources(){
    try {
        const top_5 = await User.aggregate([
            {
                $unwind: "$subscriptions"
            },
            {
                $group: {
                    _id: "$subscriptions",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 1
                }
            }
        ]);
        //Check if top 5 sources are already cached array of strings like ["source1","source2"]
        const cachedTop5 = await redisClient.get("top_5");
        const parseCahedTop5 = JSON.parse(cachedTop5);
        if(parseCahedTop5 && top_5.every((item)=> parseCahedTop5.includes(item._id))) return;

        //If not cached, cache the top 5 sources from cached that i have already
        const mapTop5 = top_5.map(item => item._id);
        await redisClient.set("top_5", JSON.stringify(mapTop5));
        const getSources = await redisClient.get("sources");
        const cachedTopSource =  JSON.parse(getSources); // Getting Null because i have not cached sources yet or two process run in the same time
        await redisClient.set("top_5_Sources", JSON.stringify(cachedTopSource? cachedTopSource.sources.filter((source) => mapTop5.includes(source.id)):[]));

        logger.info("Top 5 sources called and cached");
    } catch (error) {
        logger.error("Error in set caching top 5 sources");
        logger.error(error);
    }
    
}

module.exports = {getTop5_articles,getTop5_sources};