const { verifySignUp , authJwt } = require('../middlewares');
const authController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

// Middleware to set headers
router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

// Public routes
router.post('/signup', verifySignUp.checkDuplicateEmail, authController.signup);
router.post('/login', authController.login);

// Protected route
router.get('/me',authJwt.verifyToken, authController.me);

module.exports = router;