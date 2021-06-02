
const { authJwt } = require("../middleware");
const controller = require("../controllers/utilisateur.controller");

module.exports = function(app) {

  var router = require("express").Router();
  
  // Create a new Tutorial
  router.post("/", controller.create);
  //find all 
  router.get("/", controller.findAll);
  router.put("/:user_id", controller.update);
  router.delete("/:user_id", controller.delete);

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
    );


    app.use('/api/utilisateur', router);

};