const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// order model
const OrderSchema = new Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  requestedDate: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  requiredDate: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  deliveryDate: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  siteName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  siteManager: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  supplierName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  itemId: {
    type: Number,
    required: false,
    unique: false,
    trim: true
  },
  itemName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  itemQuantity: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  totPrice: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  isRestricted: {
    type: Boolean,
    required: false,
    unique: false,
    trim: true
  },
  deliveryNote: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  status: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  invoiceId: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  supplierAmount: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  procurementStaffRejectedReason: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  supplierRejectedReason: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  deliveryManagerRejectedReason: {
    type: String,
    required: false,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Order'
});

OrderSchema.plugin(uniqueValidator);

autoIncrement.initialize(mongoose.connection);

OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderId',
  startAt: 10000,
  incrementBy: 1
});

module.exports = mongoose.model('Order', OrderSchema);
