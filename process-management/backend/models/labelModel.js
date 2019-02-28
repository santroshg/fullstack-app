const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  labelId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  labelTxt: {
    type: String,
  },
  color: {
    type: String,
  },
}, { _id: false });

module.exports = labelSchema;
