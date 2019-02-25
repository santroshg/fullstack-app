const mongoose = require('mongoose');
const labelModel = require('./labelModel');

const cellSchema = mongoose.Schema({
  cellId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  headerColumnId: {
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
}, { _id: false });

module.exports = cellSchema;
