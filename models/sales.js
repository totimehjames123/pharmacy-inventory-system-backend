const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    default: Date.now,
  },
});

module.exports = mongoose.model("sales", salesSchema);
