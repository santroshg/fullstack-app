const BoardModel = require('../models/boardModel');

const labelsController = {
  getLabelsList: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      if (boardId && pulseId && cellId) {
        BoardModel.find({ _id: boardId, 'pulse._id': pulseId, 'pulse.cells._id': cellId }, { 'pulse.$.cells.0.labels': 1 }, (err, response) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(response);
            return res;
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // addLabel
  addLabel: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      const labelData = req.body;
      if (boardId && pulseId && cellId && labelData) {
        BoardModel.update({ _id: boardId, 'pulse._id': pulseId, 'pulse.cells._id': cellId }, { $push: { 'pulse.$.cells.0.labels': labelData } }, { upsert: true }, (error, response) => {
          if (error) {
            throw error;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(201).send(response);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // editLabel
  editLabel: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      const { labelId } = req.params;

      const updatedLabelData = req.body;

      if (boardId && pulseId && cellId && labelId) {
        BoardModel.update({
          _id: boardId, 'pulse._id': pulseId, 'pulse.cells._id': cellId, 'pulse.cells.labels._id': labelId,
        }, { $set: { 'pulse.$.cells.0.labels': updatedLabelData } }, (err, response) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(response);
            return res;
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // deleteLabel
  deleteLabel: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      const { labelId } = req.params;
      if (boardId && pulseId && cellId && labelId) {
        BoardModel.updateOne({ _id: boardId, 'pulse._id': pulseId, 'pulse.cells._id': cellId }, { $pull: { 'pulse.$.cells.0.labels': { _id: labelId } } }, (err, response) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(response);
            return res;
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


};

module.exports = labelsController;
