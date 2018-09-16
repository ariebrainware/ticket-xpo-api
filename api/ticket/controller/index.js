const Ticket = require("../../../models/ticket");

const trip = new Ticket([
  {
    name: "Trip to Batam",
    derivation: "Singapore",
    destination: "Batam",
    status: "open",
    log: "Hotel reserved"
  },
  {
    name: "Trip to Bali",
    derivation: "Singapore",
    destination: "Bali",
    status: "open",
    log: "Hotel and Transport reserved"
  }
]);

const controller = {
  seedData: (req, res) => {
    Ticket.insertMany(trip)
      .then(data => res.status(201).send(data))
      .catch(err => res.status(500).send(err));
  },

  show: (req, res) => {
    Ticket.find()
      .sort("-updatedAt")
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  },

  add: (req, res) => {
    const {
      name,
      derivation,
      destination,
      log,
      status,
    } = req.body;
    if (name && derivation && destination && log) {
      Ticket.findOne({ name }).then(ticket => {
        if (ticket) {
          res.status(406).send({
            message: "Ticket name already exist, please use another name!"
          });
        } else {
          Ticket.create({
            name,
            derivation,
            destination,
            log,
            status: 'open',
            createdAt: new Date(),
            updatedAt: new Date()
          })
            .then(result => res.status(201).send(result))
            .catch(err => res.status(500).send(err));
        }
      });
    } else {
      res.status(400).send({
        message: "Please fill all the field"
      });
    }
  },

  update: (req, res) => {
    const { id } = req.params
    const { status, log } = req.body;
    if (id) {
      Ticket.findById(id)
        .then(ticket => {
          if (ticket) {
            ticket.update({
              status, log, updatedAt:new Date()
            })
              .then(() => {
                res.status(200).send({ message: "Ticket updated!" })
              })
              .catch(err => res.status(500).send(err))
          } else res.status(404).send({ message: "Ticket doesn's exist, maybe your input ticket number is wrong" })
        })
    } else res.status(400).send({ message: "Please specify the ticket number" })
  },

  delete: (req, res) => {
    const { id } = req.params
    if (id) {
      Ticket.findById(id)
        .then(ticket => {
          if (ticket) {
            ticket.remove(err => {
              if (err) res.status(500).send(err)
              res.status(200).send({ message: "Ticket deleted!" })
            })
          } else res.status(404).send({ message: "Ticket doesn's exist, maybe your input ticket number is wrong" })
        })
    } else res.status(400).send({ message: "Please specify the ticket number" })
  },

  filterByStatus: (req, res) => {
    const { status } = req.query;
    if (status) {
      Ticket.find({ status })
        .then(tickets => {
          if (tickets) res.status(200).send(tickets);
          else res.status(404).send({ message: "Ticket not found" });
        })
        .catch(err => res.status(500).send(err));
    }
  }
};

module.exports = controller;
