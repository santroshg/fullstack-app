const mongoose = require('mongoose');

const progressHeader = new mongoose.Schema({
  row: { type: String },
  col: { type: String },
  headerTxt: { type: String },
  createOrUpdatetime: { type: Date, default: Date.now },
});

const firstColItemName = new mongoose.Schema({
  row: { type: String },
  col: { type: String },
  itemName: { type: String },
  createOrUpdatetime: { type: Date, default: Date.now },
});

const progressCell = new mongoose.Schema({
  row: { type: String },
  col: { type: String },
  cellLabel: { type: String },
  color: { type: String },
  createOrUpdatetime: { type: Date, default: Date.now },
});

const boardSchema = mongoose.Schema({
  boardName: { type: String, required: true },
  boardDesc: { type: String },
  progressHeader: [progressHeader],
  firstColItemName: [firstColItemName],
  progressCell: [progressCell],
  createOrUpdatetime: { type: Date, default: Date.now },
  members: [],
});

const userSchema = mongoose.Schema({
  userid: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

module.exports = mongoose.model('Board', boardSchema);
