const BoardModel = require('../models/boardModel');
// const ProgressHeaderModel = require('../models/progressHeaderModel');

const pulseController = {
  // addPulse
  addPulse: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const pulseData = req.body;
      const newHeaderId = Math.random() * 123456789;
      pulseData.createTime = new Date();
      pulseData.headerId = newHeaderId;
      if (boardId) {
        BoardModel.find({ _id: boardId }, { pulse: 1 }, (error, response) => {
          if (response.length > 0) {
            if (response[0].pulse.length === 0) {
              const headerData = {
                headerTxt: '',
                createTime: new Date(),
                headerId: newHeaderId,
                headerType: 'default',
              };
              BoardModel.findOneAndUpdate({ _id: boardId }, { $push: { pulse: pulseData, progressHeader: headerData } }, { new: true }, (err, newPulse) => {
                if (err) {
                  throw err;
                } else {
                  res.set('Content-Type', 'application/json');
                  res.status(200).send(newPulse);
                  console.log('newPulse---', newPulse);
                }
              });
            } else {
              BoardModel.find({ _id: boardId }, { progressHeader: 1 }, (headersErr, headersRes) => {
                if (headersErr) {
                  throw headersErr;
                } else if (headersRes[0].progressHeader.length > 1) {
                  const cells = [];
                  headersRes[0].progressHeader.forEach((header) => {
                    if (header.headerType !== 'default') {
                      const cellData = {
                        headerId: header.headerId,
                        cellLabelTxt: '',
                        color: '',
                        createTime: new Date(),
                      };
                      cells.push(cellData);
                    }
                  });
                  pulseData.cells = cells;
                  BoardModel.findOneAndUpdate({ _id: boardId }, { $push: { pulse: pulseData } }, { new: true }, (err, newPulse) => {
                    if (err) {
                      throw err;
                    } else {
                      res.set('Content-Type', 'application/json');
                      res.status(200).send(newPulse);
                      console.log('newPulse', newPulse);
                    }
                  });
                }
              });
            }
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send({ message: 'board does not exists' });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // editPulse
  editPulse: (req, res, next) => {
    try {
      const updatePulseData = req.body;
      const { boardId } = req.params;
      const { pulseId } = req.params;
      if (boardId) {
        BoardModel.update({ _id: boardId, 'pulse._id': pulseId }, { $set: { pulse: updatePulseData } }, (err, updatedPulse) => {
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
