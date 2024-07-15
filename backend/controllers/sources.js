
const logger = require("../config/logger");
const { redisClient } = require("../config/redis");
const User = require("../models/user");
const { getSources, getSourceById } = require("../services/sources");
const CustomError = require("../utils/customError");



const getAllSources = async (req, res) => {
    const articles = await getSources();
    res.status(200).json({ status: "success", articles });
    try {
        await redisClient.set("sources", JSON.stringify(articles));
    } catch (error) {
        logger.error("Error in set caching sources");
    }
}

const subcribeSource = async (req, res) => {
    const { source } = req.body;
    const { _id } = req.user;


    const userUpdated = await User.findByIdAndUpdate({ _id }, { $push: { subscriptions: source } });
    res.cookie('subscriptions', JSON.stringify([...userUpdated.subscriptions,source]), {
        maxAge: 3 * 60 * 1000,
    });
    res.status(200).json({ status: "success", message: `Subscribed to ${source}` });
};


// Can optimize this function
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Get top 5 sources's articles if does not exist in cache or redis doesn't work or any error occurs on it
 */
const getTop5SourcesArticles = async (req, res) => {
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
    const articles = await getSourceById(top_5.map(item => item._id));
    res.status(200).json({ status: "success", commonSubscriptions:articles });
    try {
        await redisClient.set("sources", JSON.stringify(articles));
    } catch (error) {
        logger.error("Error in set caching sources");
    }
}


// Can optimize this function
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Get top 5 sources if does not exist in cache or redis doesn't work or any error occurs on it 
 */
const getTop5Sources = async (req, res) => {
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

    const articles = await getSources();
    const arrayOdIds = top_5.map(item => item._id);
    const top_5_Sources = articles.sources.filter((item) => arrayOdIds.includes(item.id));

    res.status(200).json({ status: "success", commonSubscriptions:top_5_Sources });
    // const top_5_Sources = await redisClient.get("top_5_Sources");
    try {
        await redisClient.set("top_5_Sources", JSON.stringify(top_5_Sources));
    } catch (error) {
        logger.error("Error in set caching sources");
    }
};



module.exports = {
    getAllSources,
    subcribeSource,
    getTop5SourcesArticles,
    getTop5Sources
}