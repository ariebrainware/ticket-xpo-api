const mongoose = require("mongoose");
const CONN_STRING = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(CONN_STRING);

const ticket = new Schema({
  name: { type: String },
  derivation: { type: String },
  destination: { type: String },
  status: {
    type: String,
    enum: ["open", "active", "failed", "closed"],
    default: "open"
  },
  createdAt: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model('ticket')
