const mongoose = require('mongoose');
const cellModel = require('./cellModel');


const pulseSchema = mongoose.Schema({
  pulseId: {
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    type: String,
    required: true,
    // auto: true,
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
  headerColumnId: {
    type: String,
  },
  cells: [cellModel],
},
// { _id: false }
// eslint-disable-next-line function-paren-newline
);

module.exports = pulseSchema;
