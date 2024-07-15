require('dotenv').config()


const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const API_URL = process.env.API_URL;
const SALT_PASSWORD = process.env.SALT_PASSWORD;
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN= process.env.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_TOKEN_EXPIRES_IN= process.env.REFRESH_TOKEN_EXPIRES_IN;


module.exports = {
    DB_CONNECTION,
    PORT,
    DB_NAME,
    API_URL,
    SALT_PASSWORD,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
};