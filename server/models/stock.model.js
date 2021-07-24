module.exports = (sequelize, Sequelize) => {
  const Categorie = sequelize.define("categories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
});

  return Categorie;
};
