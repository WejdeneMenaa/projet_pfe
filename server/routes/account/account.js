var express = require('express');
var router = express.Router();
const {pool} = require("../../config/dbconfig")
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let result = await pool.query('SELECT * from accounts')
    //console.log(result);
    res.status(200).json(result.rows);
    
  } catch (error) {
    console.log(error)
    res.status(401).json({error});
  }
});

module.exports = router;
