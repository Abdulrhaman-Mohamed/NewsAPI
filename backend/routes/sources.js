const { getAllSources, subcribeSource, getTop5Sources, getTop5SourcesArticles } = require('../controllers/sources');
const cachedSources = require('../middleware/cachedSources');
const cachedTopArticles = require('../middleware/cachedTopArticles');
const cachedTopSources = require('../middleware/cachedTopSources');
const { verifyToken } = require('../middleware/verifyToken');

// Initialize express router
const router = require('express').Router();

router.get('/', verifyToken,cachedSources, async (req, res,next) => {
    try {
        await getAllSources(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/subcribe-source', verifyToken, async (req, res,next) => {
    try {
        await subcribeSource(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/top-sources', verifyToken,cachedTopSources, async (req, res,next) => {
    try {
        await getTop5Sources(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/top-articles', verifyToken,cachedTopArticles, async (req, res,next) => {
    try {
        await getTop5SourcesArticles(req, res);
    } catch (error) {
        next(error);
    }
});




module.exports = router;