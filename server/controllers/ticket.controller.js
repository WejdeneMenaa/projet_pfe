const db = require("../models");
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

// create ticket 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const ticket = {
    date_creation: req.body.date_creation,
    date_echeance: req.body.date_echeance,
    description: req.body.description,
    titre: req.body.titre,
    statut: req.body.statut,
    type: req.body.type,
    priorite: req.body.priorite,
    urgence: req.body.urgence,
    impact: req.body.impact,
    image: req.body.image,
    user_id: req.body.user_id,
    attribuea: req.body.attribuea,
    solution: req.body.solution

  };

  console.log(ticket)
  try {
    Ticket.create(ticket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Ticket."
        });
      });
  } catch (error) {
    console.log(error)
  }
};

//update Ticket
exports.update = (req, res) => {
  const ticket_id = req.params.ticket_id;

  Ticket.update(req.body, {
    where: { ticket_id: ticket_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ticket was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Ticket with id=${ticket_id}. Maybe Ticket was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + ticket_id
      });
    });
};

//find all tickets
exports.findAll = (req, res) => {
  const titre = req.query.titre;
  var condition = titre ? { titre: { [Op.iLike]: `%${titre}%` } } : null;

  Ticket.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets."
      });
    });
};

//find ticket by titre
exports.findOne = (req, res) => {
  const ticket_id = req.params.ticket_id;

  Ticket.findByPk(ticket_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Ticket with id=" + ticket_id
      });
    });
};


//delete user by id
exports.delete = (req, res) => {
  const ticket_id = req.params.ticket_id;

  Ticket.destroy({
    where: { ticket_id: ticket_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ticket was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Ticket with id=${ticket_id}. Maybe Ticket was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Ticket with id=" + ticket_id
      });
    });
};
