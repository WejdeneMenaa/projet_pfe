module.exports = (sequelize, Sequelize) => {
  const Scategorie = sequelize.define("scategories", {
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

  return Scategorie;
};
