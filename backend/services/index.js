const axios = require('axios');

const apiInstance = axios.create({
    baseURL:"https://newsapi.org/v2/",
    headers:{
        "X-Api-Key":"a744974c8daf42f0bdd9e6c0eb9cd810"
    }
});

module.exports = apiInstance;