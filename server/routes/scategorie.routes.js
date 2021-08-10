
const controller = require("../controllers/scategorie.controller");

module.exports = function (app) {


  var router = require("express").Router();
  //find all tickets
  router.get("/", controller.findAll);
  //find ticket by titre
  router.get("/:scat_id", controller.findOne);

  app.use('/api/scategorie', router);

};