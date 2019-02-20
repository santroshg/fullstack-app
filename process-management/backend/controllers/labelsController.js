const BoardModel = require('../models/boardModel');

const labelsController = {
  getLabelsList: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      if (boardId && pulseId && cellId) {
        BoardModel.find({ _id: boardId, 'pulse._id': pulseId, 'cells._id': cellId }, { labels: 1 }, (err, response) => {
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
        BoardModel.update({ _id: boardId, 'pulse._id': pulseId }, labelData, (error, response) => {
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
        BoardModel.find({
          _id: boardId, 'pulse._id': pulseId, 'cells._id': cellId, 'labels._id': labelId,
        }, updatedLabelData, (err, response) => {
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

      const updatedLabelData = req.body;

      if (boardId && pulseId && cellId && labelId) {
        BoardModel.find({
          _id: boardId, 'pulse._id': pulseId, 'cells._id': cellId, 'labels._id': labelId,
        }, updatedLabelData, (err, response) => {
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
