// Initialize express router
const router = require('express').Router();

// Import Auth Controller
const { register, login, logout, refreshToken, getLoginHistory } = require('../controllers/auth');

// Import verifyToken Middleware
const { verifyToken } = require('../middleware/verifyToken');


router.post('/register',  async(req, res , next) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/refresh-token',async(req, res, next) => {
    try {
        await refreshToken(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/logout' ,async(req, res,next) => {
    try {
        await logout(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/login-history', verifyToken, async (req, res,next) => {
    try {
        await getLoginHistory(req, res);
    } catch (error) {
        next(error);
    }
});


module.exports = router;