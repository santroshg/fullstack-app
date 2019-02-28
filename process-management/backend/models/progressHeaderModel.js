const mongoose = require('mongoose');

const progressHeaderSchema = mongoose.Schema({
  headerId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
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
}, { _id: false });


module.exports = progressHeaderSchema;
