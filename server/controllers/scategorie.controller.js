const db = require("../models");
const Scategorie = db.scategorie;
const Op = db.Sequelize.Op;

//find all
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Scategorie.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sous_categories."
        });
      });
  };

//findone
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
  Scategorie.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving sous_categorie with id=" + id
        });id
      });
  };
