const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// inventory model
const InventorySchema = new Schema({
  itemId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  itemName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  unitPrice: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  unitsInStock: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    default: '0'
  },
  thresholdUnits: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  description: {
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
  isRestricted: {
    type: Boolean,
    required: false,
    unique: false,
    trim: true,
    default: false
  }
}, {
  timestamps: true,
  collection: 'Inventory'
});

InventorySchema.plugin(uniqueValidator);

autoIncrement.initialize(mongoose.connection);

InventorySchema.plugin(autoIncrement.plugin, {
  model: 'Inventory',
  field: 'itemId',
  startAt: 1000,
  incrementBy: 1
});

module.exports = mongoose.model('Inventory', InventorySchema);
