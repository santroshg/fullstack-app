const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  labelId: {
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    type: String,
    required: true,
    // auto: true,
  },
  labelTxt: {
    type: String,
  },
  color: {
    type: String,
  },
},
// { _id: false }
// eslint-disable-next-line function-paren-newline
);

module.exports = labelSchema;
