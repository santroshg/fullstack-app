const mongoose = require('mongoose');
const cellModel = require('./cellModel');


const pulseSchema = mongoose.Schema({
  pulseId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  pulseCreatedBy: {
    type: String,
  },
  pulseTxt: {
    type: String,
  },
  createTime: {
    type: String,
  },
  headerId: {
    type: String,
  },
  cells: [cellModel],
}, { _id: false });

module.exports = pulseSchema;
