const dbConfig = require("../config/dbconfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.categorie = require("../models/categorie.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.utilisateur, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.utilisateur.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "roleId"
});

db.ticket.belongsToMany(db.categorie, {
  through: "tickets",
  foreignKey: "ticket_id",
  otherKey: "cat_id"
} );

db.ticket.belongsToMany(db.utilisateur, {
  through: "tickets",
  foreignKey: "ticket_id",
  otherKey: "user_id"
});
db.ROLES = ["user", "admin", "moderator"];
db.CATEGORIES = ["materiel", "logiciel", "reseaux"];

module.exports = db;