const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// payment model
const PaymentSchema = new Schema({
  paymentId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  invoiceId: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  orderId: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  paymentMethod: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    default: 'Cash'
  },
  supplier: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  amount: {
    type: String,
    required: false,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Payment'
});

PaymentSchema.plugin(uniqueValidator);

autoIncrement.initialize(mongoose.connection);

PaymentSchema.plugin(autoIncrement.plugin, {
  model: 'Payment',
  field: 'paymentId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Payment', PaymentSchema);
