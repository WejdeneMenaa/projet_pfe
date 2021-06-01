module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", utilisateur.create);
    //find all 
    router.get("/", utilisateur.findAll);
    router.put("/:user_id", utilisateur.update);
    router.delete("/:user_id", utilisateur.delete);


    app.use('/api/utilisateur', router);

    
  };