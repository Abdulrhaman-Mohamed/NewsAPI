const redis = require('redis');

const logger = require('./logger');


const redisClient = redis.createClient({
    url: 'redis://redis:6379'
    // host: '172.17.0.2',
    // port: 6379
})


// const redisClient = redis.createClient(6379,'127.0.0.1') used for local redis server connection in separeted image


/**
 * 
 * 
 * @description This function is used to connect to the redis server
 */
const conncetRedis = async ()=>{
    try {
        await redisClient.connect();
        logger.info("redis connected");
    } catch (error) {
        logger.error(error);
        logger.error("redis error");
        await redisClient.disconnect();
    }
}

module.exports = {redisClient , conncetRedis};