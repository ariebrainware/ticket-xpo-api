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
    if (name && derivation && destination && log && status) {
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
            status,
            createdAt : new Date(),
            updatedAt : new Date()
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
    const { name, status } = req.body;
    if (name) {
      Ticket.findOneAndUpdate(name, { status })
        .then(() => res.status(200).send({ message: "Ticket status updated!" }))
        .catch(err => res.status(500).send(err));
    } else res.status(404).send({ message: "Please specify the Ticket name" });
  },

  delete: (req, res) => {
    const { name } = req.body;
    if (name) {
      Ticket.findOneAndRemove(name)
        .then(() => res.status(200).send({ message: "Ticket deleted!" }))
        .catch(err => res.status(500).send(err));
    } else res.status(404).send({ message: "Please specify the Ticket name" });
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
