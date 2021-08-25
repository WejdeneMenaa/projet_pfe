const db = require("../models");
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'projet_pfe',
  password: 'postgres',
  port: 5432,
})
// create ticket 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  //exports.query("SELECT date_creation from tickets"),function()


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

/*exports.connect = (req, res) => {
  (function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    exports.query("SELECT tickets.date_creation from tickets", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}
*/

exports.connect = (req, res) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  pool.query("SELECT tickets.date_creation from tickets", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
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

exports.findTicketByStatut = (req, res) => {
  const statut = req.params.statut;
  pool.query('select count(*) FROM tickets where tickets.statut =$1 ', [statut]).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tickets with statut=" + statut
      });
    });
};
////////// donut user 

exports.findTicketByStatutAndUser = (req, res) => {
  const statut = req.params.statut;
  const user_id = req.params.user_id;
  pool.query('select count(*) FROM tickets where tickets.statut =$1 and tickets.user_id=$2', [statut, user_id]).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tickets with statut=" + statut
      });
    });
};

exports.findTicketByUser = (req, res) => {
  const user_id = req.params.user_id;
  pool.query('select count(*) FROM tickets where tickets.user_id=$1', [user_id]).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tickets with user_id=" + user_id
      });
    });
};

////// fin donut user


exports.findTicketAttribuea = (req, res) => {
  const attribuea = req.params.attribuea;
  pool.query('select count(*) FROM tickets where tickets.attribuea =$1 ', [attribuea]).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tickets with attribuea=" + attribuea
      });
    });
};

exports.findTicketByDate = (req, res) => {

  pool.query('select * FROM tickets where EXTRACT(MONTH FROM date_creation)=EXTRACT(MONTH FROM Now()) order by date_creation asc').then(data => {
    res.send(data);

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets with date."
      });
    });
};
