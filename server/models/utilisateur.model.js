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
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      status: {
        type:  Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING
      }

    });
  
    return Utilisateur;
  };