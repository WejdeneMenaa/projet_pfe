const db = require("../models");
const Stock = db.stock;
const Op = db.Sequelize.Op;

// Create and Save a new stock
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a stock
    const stock = {
    name: req.body.name,
    categorie: req.body.categorie,
    quantite: req.body.quantite,
    sous_categorie: req.body.sous_categorie,
    modele: req.body.modele,
    cat_id : req.body.cat_id,
    scat_id : req.body.scat_id
  };
  
    // Save Stock in the database
    Stock.create(stock)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Stock."
        });
      });
  };

//find all
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Stock.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Stocks."
        });
      });
  };

//findone
  exports.findOne = (req, res) => {
    const stock_id = req.params.stock_id;
  
    Stock.findByPk(stock_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Stock with id=" + stock_id
        });
      });
  };


  //update Stock 
  exports.update = (req, res) => {
    const stock_id = req.params.stock_id;
  
    Stock.update(req.body, {
      where: { stock_id: stock_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Stock was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Stock with id=${stock_id}. Maybe Stock was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Stock with id=" + stock_id
        });
      });
  };


  //delete Stock by id
  exports.delete = (req, res) => {
    const stock_id = req.params.stock_id;
  
    Stock.destroy({
      where: { stock_id: stock_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Stock was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Stock with id=${stock_id}. Maybe Stock was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Stock with id=" + stock_id
        });
      });
  };