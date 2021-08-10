
const controller = require("../controllers/categorie.controller");

module.exports = function (app) {


  var router = require("express").Router();
  //find all tickets
  router.get("/", controller.findAll);
  //find ticket by titre
  router.get("/:cat_id", controller.findOne);

  app.use('/api/categorie', router);

};