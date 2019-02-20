const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  labelTxt: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = labelSchema;
