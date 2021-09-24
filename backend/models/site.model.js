const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// site model
const SiteSchema = new Schema({
  siteId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  siteName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  siteManager: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Site'
});

SiteSchema.plugin(uniqueValidator);

autoIncrement.initialize(mongoose.connection);

SiteSchema.plugin(autoIncrement.plugin, {
  model: 'Site',
  field: 'siteId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Site', SiteSchema);
