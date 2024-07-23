const express = require('express');
const authRouters  = require('./auth.routers');
const categoryRouters = require('./category/category.routers')

const router =  express.Router();

//auth route
router.use('/auth',authRouters)

//category route
router.use('',categoryRouters)

module.exports = router