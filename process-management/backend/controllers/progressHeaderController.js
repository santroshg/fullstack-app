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
          headerColumnId: newHeaderId,
          cellLabelTxt: '',
          color: '',
          createTime: new Date(),
        };
        progressHeaderData.headerColumnId = newHeaderId;
        // progressHeaderData.headerTxt = 'Status';
        progressHeaderData.createTime = new Date();
        BoardModel.findOneAndUpdate({ _id: boardId }, { $push: { progressHeader: progressHeaderData, 'pulse.$[].cells': cellData } }, { new: true }, (err, newProgressHeader) => {
          if (err) {
            res.set('Content-Type', 'application/json');
            res.status(200).send({ message: 'borad not exist' });
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

  // editProgressHeader
  editProgressHeader: (req, res, next) => {
    try {
      const updateProgressHeaderData = req.body;
      console.log('updateProgressHeaderData', updateProgressHeaderData);
      const { boardId } = req.params;
      const { headerId } = req.params;
      if (boardId) {
        // eslint-disable-next-line max-len
        BoardModel.findOneAndUpdate({ _id: boardId, 'progressHeader.headerId': headerId }, { $set: { 'progressHeader.$.headerTxt': updateProgressHeaderData.headerTxt } }, { new: true }, (err, updatedProgressHeader) => {
          if (err) {
            throw err;
          } else {
            const progressHeader = updatedProgressHeader.progressHeader.filter(h => h.headerId.toString() === headerId)[0];
            const progressHeaderData = {
              headerId: progressHeader.headerId,
              headerTxt: progressHeader.headerTxt,
            };
            res.set('Content-Type', 'application/json');
            res.status(200).send(progressHeaderData);
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
      const { boardId } = req.params;
      const { headerId } = req.params;
      if (boardId && headerId) {
        BoardModel.update({ _id: boardId }, { $pull: { progressHeader: { headerId }, 'pulse.$[].cells': { headerId } } }, (err, newProgressHeader) => {
          if (err) {
            res.set('Content-Type', 'application/json');
            res.status(200).send({ message: 'borad not exist' });
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
};

module.exports = progressHeaderController;
