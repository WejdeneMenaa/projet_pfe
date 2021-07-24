
const { authJwt } = require("../middleware");
const controller = require("../controllers/utilisateur.controller");
const db = require("../models");
const Utilisateur = db.utilisateur;
const nodemailer = require("nodemailer");

module.exports = function (app) {

  app.use(function (req, res, next) {
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

  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isTechnicien], controller.technicienBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", controller.create);
  //find all 
  router.get("/", controller.findAll);
  router.put("/:user_id", controller.update);
  router.delete("/:user_id", controller.delete);
  router.get("/:user_id", controller.findOne);

  router.post("/sendmail", (req, res) => {
    console.log("request came");
    let utilisateur = req.body;

    const subject = "Bienvenue chez Wimbee !";
    const html = `<h3>Bonjour cher(e) ${utilisateur.nom}</h3>
    <h3>Les identifiants suivants vous donnent accés à votre espace : </h3>
    <h3>Nom d'utilisateur : ${utilisateur.username} </h3><br>
    <h3>Mot de passe : ${utilisateur.password} </h3><br>
      <h3>Merci de vous joindre à nous !</h3>`;

    sendMail(utilisateur, subject, html, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });

  router.post("/sendmail/:id/", (req, res) => {
    console.log("request came");
    let user_id = req.params.id;
    console.log('************', req.params.id)
    Utilisateur.findByPk(user_id)
      .then(data => {
        const subject = "Bienvenue chez Wimbee !";
        const html = `<h3>Bonjour cher(e) client(e)</h3>
      <h3>Par le présent, nous vous informons que votre ticket a été résolu avec succées ! </h3>
      <h3>Et voici la solution pour votre probléme :
       ${req.body.solution}! </h3>
      <h3>Merci pour votre confiance !</h3>`;
        sendMail(data, subject, html, info => {
          console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
          res.send(info);
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + user_id
        });
      });
  });
  async function sendMail(utilisateur, subject, html, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "saharmansouri789@gmail.com",
        pass: "saharsami123"
      }
    });

    let mailOptions = {
      from: '<saharmansouri789@gmail.com>', // sender address
      to: utilisateur.email, // list of receivers
      subject,
      html
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  }


  app.use('/api/utilisateur', router);

};