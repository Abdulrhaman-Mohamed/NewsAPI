// Initialize express router
const router = require('express').Router();

const { getAllArticles, getAllSources } = require('../controllers/articles');
const cacheArticles = require('../middleware/cachedArticles');
// Import verifyToken Middleware
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', verifyToken,cacheArticles, async (req, res,next) => {
    try {
        await getAllArticles(req, res);
    } catch (error) {
       next(error); 
    }
});






module.exports = router;