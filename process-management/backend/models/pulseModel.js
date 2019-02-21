const mongoose = require('mongoose');
const cellModel = require('./cellModel');

const pulseSchema = mongoose.Schema({
  createTime: {
    type: String,
  },
  pulseCreatedBy: {
    type: String,
  },
  pulseTxt: {
    type: String,
  },
  headerId: {
    type: String,
  },
  cells: [cellModel],
});

module.exports = pulseSchema;
