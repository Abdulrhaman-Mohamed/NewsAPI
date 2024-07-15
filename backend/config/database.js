
//Library
const mongoose = require('mongoose');
//Constant
const { DB_CONNECTION, DB_NAME } = require('./constant');

//Config
const logger = require('./logger');


/**
 * 
 * @description This function is used to connect the database
 */
const dbConnection = async ()=>{
    console.log(DB_CONNECTION, DB_NAME);
    try {
        await mongoose.connect(DB_CONNECTION,{
            dbName: DB_NAME,
        })
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection failed');
        logger.error(error);
    }
}


module.exports = dbConnection;
