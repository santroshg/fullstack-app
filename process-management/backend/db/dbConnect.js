const mongoose = require('mongoose');
const config = require('../config/config.js');

const db = mongoose.connect(config.mongoURI, { useNewUrlParser: true }, (error) => {
  if (error) {
    throw (error);
  }
});

module.exports = db;
