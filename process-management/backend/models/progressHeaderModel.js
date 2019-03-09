const mongoose = require('mongoose');

const progressHeaderSchema = mongoose.Schema({
  headerId: {
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    type: String,
    required: true,
    // auto: true,
  },
  headerTxt: {
    type: String,
  },
  createTime: {
    type: String,
  },
  headerColumnId: {
    type: String,
  },
  headerType: {
    type: String,
  },
},
// { _id: false }
// eslint-disable-next-line function-paren-newline
);

module.exports = progressHeaderSchema;
