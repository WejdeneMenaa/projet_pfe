const db = require("../models");
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

//find all
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Categorie.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };

//findone
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Categorie.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Categorie with id=" + id
        });
      });
  };
