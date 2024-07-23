const {  authJwt } = require('../../middlewares');
const categoryController = require('../../controllers/category/category.controller');
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});
router.get('/category',authJwt.verifyToken, categoryController.fetchCategory);