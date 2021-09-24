const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// policy model
const PolicySchema = new Schema({
  policyId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  property: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  value: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Policy'
});

PolicySchema.plugin(uniqueValidator);

autoIncrement.initialize(mongoose.connection);

PolicySchema.plugin(autoIncrement.plugin, {
  model: 'Policy',
  field: 'policyId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Policy', PolicySchema);
