module.exports = (sequelize, Sequelize) => {
  const Scategorie = sequelize.define("scategories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    cat_id: {
      type: Sequelize.INTEGER,
      references: 'categories',
      referencesKey: 'id'
    },
  },
  {
    timestamps: false
});

  return Scategorie;
};
