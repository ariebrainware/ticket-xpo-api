const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const Schema = mongoose.Schema
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const CONN_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(CONN_STRING);

const ticket_schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  derivation: String,
  destination: String,
  status: {
    type: String,
    enum: ["open", "active", "failed", "closed"],
    default: "open"
  },
  log: { type: String },
  createdAt: String,
  updatedAt: String
});

ticket_schema.plugin(uniqueValidator);
const Ticket = mongoose.model("Ticket", ticket_schema);

module.exports = Ticket;
