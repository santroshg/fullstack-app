const mongoose = require('mongoose');
const labelModel = require('./labelModel');

const cellSchema = mongoose.Schema({
  headerId: {
    type: String,
  },
  cellLabelTxt: {
    type: String,
  },
  color: {
    type: String,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  labels: [labelModel],
});

module.exports = cellSchema;
