var express = require('express');
var router = express.Router();
const utilisateurRoutes = require('./utilisateurs/utilisateur')

/* GET home page. */
router.use('/utilisateur',utilisateurRoutes);

module.exports = router;
