const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userId: { type: String },
  userDisplayName: { type: String },
  userEmail: { type: String },
});

const progressHeader = new mongoose.Schema({
  headerTxt: { type: String },
  createTime: { type: String },
});

const labels = new mongoose.Schema({
  labelTxt: { type: String },
  color: { type: String },
});

const cells = new mongoose.Schema({
  headerId: { type: String },
  cellLabelTxt: { type: String },
  color: { type: String },
  createTime: { type: Date, default: Date.now },
  labels: [labels],
});

const pulse = new mongoose.Schema({
  createTime: { type: String },
  pulseCreatedBy: { type: String },
  pulseTxt: { type: String },
  cells: [cells],
});

const boardSchema = mongoose.Schema({
  boardName: { type: String, required: true },
  boardDesc: { type: String },
  boardCreatedBy: { type: String },
  members: [userSchema],
  progressHeader: [progressHeader],
  pulse: [pulse],
  createTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

module.exports = mongoose.model('Board', boardSchema);
