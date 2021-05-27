var express = require('express');
var router = express.Router();
const accountRoutes = require('./account/account')

/* GET home page. */
router.use('/account',accountRoutes);

module.exports = router;
