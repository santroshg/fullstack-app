const mongoose = require('mongoose');
const config  = require('../config/config.js');
const db = mongoose.connect(config.mongoURI, { useNewUrlParser: true }, (error, response) => {
    if(error){
        console.log('db error-', error);
    }else {
    }
});

module.exports = db;