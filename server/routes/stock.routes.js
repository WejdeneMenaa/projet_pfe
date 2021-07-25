
const controller = require("../controllers/stock.controller");

module.exports = function (app) {

  var router = require("express").Router();

  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.put("/:stock_id", controller.update);
  router.delete("/:stock_id", controller.delete);
  router.get("/:stock_id", controller.findOne);
  

  app.use('/api/stock', router);

};