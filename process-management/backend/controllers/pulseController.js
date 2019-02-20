const BoardModel = require('../models/boardModel');

const pulseController = {
  // addPulse
  addPulse: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const pulseData = req.body;
      if (boardId) {
        BoardModel.updateOne({ _id: boardId }, { $push: { pulse: pulseData } }, (err, newPulse) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(newPulse);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // TODO fix mongo query
  // editPulse
  editPulse: (req, res, next) => {
    try {
      const updatePulseData = req.body;
      const { boardId } = req.params;
      const { pulseId } = req.params;
      if (boardId) {
        BoardModel.update({ _id: boardId, 'pulse._id': pulseId }, updatePulseData, (err, updatedPulse) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(updatedPulse);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // deletePulse
  deletePulse: (req, res, next) => {
    try {
      const { pulseId } = req.params;
      const { boardId } = req.params;
      if (boardId && pulseId) {
        BoardModel.updateOne({ _id: boardId }, { $pull: { pulse: { _id: pulseId } } }, (err) => {
          if (err) {
            res.status(404).send(`${pulseId} not exist in database.`);
          } else {
            res.status(200).send({ message: 'pulse deleted sucessfully.' });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = pulseController;
