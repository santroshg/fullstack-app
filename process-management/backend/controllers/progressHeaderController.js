const BoardModel = require('../models/boardModel');

const progressHeaderController = {
  // addProgressHeader
  addProgressHeader: (req, res, next) => {
    try {
      const { boardId } = req.params;
      if (boardId) {
        const progressHeaderData = req.body;
        const newHeaderId = Math.random() * 1234;
        const cellData = {
          headerId: newHeaderId,
          cellLabelTxt: '',
          color: '',
          createTime: new Date(),
        };

        progressHeaderData.headerId = newHeaderId;
        progressHeaderData.headerTxt = 'Edit header';
        progressHeaderData.createTime = new Date();
        BoardModel.updateOne({ _id: boardId }, { $push: { progressHeader: progressHeaderData, 'pulse.$[].cells': cellData } }, (err, newProgressHeader) => {
          if (err) {
            res.set('Content-Type', 'application/json');
            res.status(200).send({ message: 'borad not exist' });
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(newProgressHeader);
          }
        });
        // BoardModel.updateOne({ _id: boardId }, { $push: { 'pulse.$[].cells': cellData } }, (err, cellResponse) => {
        //   if (err) {
        //     res.set('Content-Type', 'application/json');
        //     res.status(200).send({ message: 'borad not exist' });
        //   } else {
        //     res.set('Content-Type', 'application/json');
        //     res.status(200).send(cellResponse);
        //   }
        // });
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
