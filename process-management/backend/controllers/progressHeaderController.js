const BoardModel = require('../models/boardModel');

const progressHeaderController = {
  // addProgressHeader
  addProgressHeader: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const progressHeaderData = req.body;
      if (boardId) {
        BoardModel.updateOne({ _id: boardId }, { $push: { progressHeader: progressHeaderData } }, (err, newProgressHeader) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(newProgressHeader);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // TODO fix mongo query
  // editProgressHeader
  editProgressHeader: (req, res, next) => {
    try {
      const updateProgressHeaderData = req.body;
      const { boardId } = req.params;
      const { headerId } = req.params;
      if (boardId) {
        BoardModel.update({ _id: boardId, 'progressHeader._id': headerId }, updateProgressHeaderData, (err, updatedProgressHeader) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(updatedProgressHeader);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // deleteProgressHeader
  deleteProgressHeader: (req, res, next) => {
    try {
      const { headerId } = req.params;
      const { boardId } = req.params;
      if (boardId && headerId) {
        BoardModel.updateOne({ _id: boardId }, { $pull: { progressHeader: { _id: headerId } } }, (err) => {
          if (err) {
            res.status(404).send(`${headerId} not exist in database.`);
          } else {
            res.status(200).send({ message: 'progressHeader deleted sucessfully.' });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = progressHeaderController;
