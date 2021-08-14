const db = require("../models");
const Scategorie = db.scategorie;
const Op = db.Sequelize.Op;


const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'projet_pfe',
  password: 'postgres',
  port: 5432,
})
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
      });
    });
};

exports.findByCat = (req, res) => {
  const cat_id = req.params.cat_id;
  pool.query('select * FROM scategories where scategories.cat_id =$1 ',[cat_id]).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sous Categories with id=" + cat_id
      });
    });
};
