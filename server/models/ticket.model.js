module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
      ticket_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      titre: {
        type: Sequelize.STRING
      },
      statut: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      priorite: {
        type: Sequelize.STRING
      },
      urgence: {
        type: Sequelize.STRING
      },
      impact: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      attribuea: {
        type: Sequelize.STRING
      },
      date_creation: {
        type: Sequelize.DATE
      },
      date_echeance: {
        type: Sequelize.DATE
      },
      categorie: {
        type: Sequelize.STRING
      },
      cat_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: 'users',
        referencesKey: 'user_id'
      },
    },
    {
      timestamps: false
  });
  
    return Ticket;
  };