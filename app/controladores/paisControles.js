var express = require('express'),
    router = express.Router(),
    db = require('../modelos'),
    authMiddleware = require('.././middleware/auth');

module.exports  = app =>{
    app.use('/',router);
}