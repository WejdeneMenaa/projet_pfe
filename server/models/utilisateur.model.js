module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateurs", {
      user_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Utilisateur;
  };