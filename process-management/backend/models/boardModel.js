const mongoose = require('mongoose');
const userModel = require('./userModel');
const progressHeaderModel = require('./progressHeaderModel');
const pulseModel = require('./pulseModel');

const boardSchema = mongoose.Schema({
  boardId: {
    type: String,
    required: true,
  },
  boardName: {
    type: String,
    required: true,
  },
  boardDesc: {
    type: String,
  },
  boardCreatedBy: {
    type: String,
  },
  members: [userModel],
  progressHeader: [progressHeaderModel],
  pulse: [pulseModel],
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const boardModel = mongoose.model('boards', boardSchema);
module.exports = boardModel;
