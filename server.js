const express = require('express');
//const path = require('path');
const app = express();
const pool = require("./dbconfig");

app.use(express.json())
app.listen(4600, (req,res)=> {
  console.log('RUNNING');
});
