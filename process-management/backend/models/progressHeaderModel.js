const mongoose = require('mongoose');

const progressHeaderSchema = mongoose.Schema({
  headerTxt: {
    type: String,
  },
  createTime: {
    type: String,
  },
  headerId: {
    type: String,
  },
  headerType: {
    type: String,
  },
});


module.exports = progressHeaderSchema;
