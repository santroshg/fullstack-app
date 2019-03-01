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
        // eslint-disable-next-line max-len
        BoardModel.findOneAndUpdate({ _id: boardId, 'pulse.pulseId': pulseId, 'pulse.cells.cellId': cellId }, { $push: { 'pulse.$.cells.0.labels': labelData } }, { upsert: true }, { new: true }, (error, response) => {
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
          _id: boardId, 'pulse.pulseId': pulseId, 'pulse.cells.cellId': cellId, 'pulse.cells.labels.labelId': labelId,
        }, { $set: { 'pulse.$.cells.0.labels.0.labelTxt': updatedLabelData.labelTxt } }, { new: true }, (err, response) => {
          if (err) {
            throw err;
          } else { 
            res.set('Content-Type', 'application/json');
            res.status(200).send(response);
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
        // eslint-disable-next-line max-len
        BoardModel.findOneAndUpdate({ _id: boardId, 'pulse.pulseId': pulseId, 'pulse.cells.cellId': cellId }, { $pull: { 'pulse.$.cells.0.labels': { labelId: req.params.labelId } } }, (err, response) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(response);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


};

module.exports = labelsController;
