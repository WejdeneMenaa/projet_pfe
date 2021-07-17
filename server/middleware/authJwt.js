const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.utilisateur;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user_id = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.user_id).then(utilisateur => {
    utilisateur.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isTechnicien = (req, res, next) => {
  User.findByPk(req.user_id).then(utilisateur => {
    utilisateur.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "technicien") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Technicien Role!"
      });
    });
  });
};

isTechnicienOrAdmin = (req, res, next) => {
  User.findByPk(req.user_id).then(utilisateur => {
    utilisateur.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "technicien") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Technicien or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isTechnicien: isTechnicien,
  isTechnicienOrAdmin: isTechnicienOrAdmin
};
module.exports = authJwt;
