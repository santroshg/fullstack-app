// const mongoose = require('mongoose');
const { ObjectID } = require('bson');

const BoardModel = require('../models/boardModel');
// const ProgressHeaderModel = require('../models/progressHeaderModel');

const pulseController = {
  // addPulse
  addPulse: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const pulseData = req.body;
      // const newHeaderId = new ObjectID().toString();
      // const newHeaderId = Math.random() * 12345678909899;
      pulseData.createTime = new Date();
      // pulseData.headerColumnId = newHeaderId;
      if (boardId) {
        BoardModel.find({ boardId }, { pulse: 1 }, (error, response) => {
          if (response.length > 0) {
            if (response[0].pulse.length === 0) {
              const headerData = {
                headerTxt: 'Task Header',
                createTime: new Date(),
                headerId: pulseData.headerId,
                headerColumnId: pulseData.headerColumnId,
                headerType: 'default',
              };
              BoardModel.findOneAndUpdate({ boardId }, { $push: { pulse: pulseData, progressHeader: headerData } }, { new: true }, (err, newPulse) => {
                if (err) {
                  throw err;
                } else {
                  res.set('Content-Type', 'application/json');
                  res.status(200).send(newPulse);
                }
              });
            } else {
              BoardModel.find({ boardId }, { progressHeader: 1 }, (headersErr, headersRes) => {
                // console.log('--------headersRes----------------', headersRes[0].progressHeader);
                if (headersErr) {
                  throw headersErr;
                } else if (headersRes[0].progressHeader.length >= 1) {
                  const cells = [];
                  headersRes[0].progressHeader.forEach((header) => {
                    if (header.headerType !== 'default') {
                      const cellData = {
                        cellId: (new ObjectID()).toString(),
                        headerColumnId: header.headerColumnId,
                        cellLabelTxt: '',
                        color: '',
                        createTime: new Date(),
                      };
                      cells.push(cellData);
                    }
                  });
                  pulseData.cells = cells;
                  // pulseData.pulseId = new mongoose.Schema.Types.ObjectId();
                  BoardModel.findOneAndUpdate({ boardId }, { $push: { pulse: pulseData } }, { new: true }, (err, newPulse) => {
                    if (newPulse) {
                      // res.set('Content-Type', 'application/json');
                      // console.log('newPulse------------------', newPulse);
                      // setTimeout(() => res.status(200).send(newPulse), 5000);
                      res.status(200).send(newPulse);
                    } else {
                      res.set('Content-Type', 'application/json');
                      res.status(200).send(err);
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
      // const { pulseTxt } = updatePulseData;
      const { boardId } = req.params;
      const { pulseId } = req.params;
      if (boardId) {
        BoardModel.findOneAndUpdate({ boardId, 'pulse.pulseId': pulseId }, { $set: { 'pulse.$.pulseTxt': updatePulseData.pulseTxt } }, { new: true }, (err, updatedPulse) => {
          if (err) {
            throw err;
          } else {
            const pulse = updatedPulse.pulse.filter(p => p.pulseId.toString() === pulseId)[0];
            const pulseData = {
              pulseId: pulse.pulseId,
              pulseTxt: pulse.pulseTxt,
            };
            res.set('Content-Type', 'application/json');
            // setTimeout(() => res.status(200).send(pulseData), 5000);
            res.status(200).send(pulseData);
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
      const { pulseId, boardId } = req.params;
      // const { boardId } = req.params;
      if (boardId && pulseId) {
        BoardModel.find({ boardId }, { pulse: 1 }, (error, response) => {
          if (response[0].pulse.length === 1) {
            BoardModel.updateOne({ boardId }, { $set: { progressHeader: [] } }, (err) => {
              next(err);
            });
          }
        });
        BoardModel.findOneAndUpdate({ boardId }, { $pull: { pulse: { pulseId: req.params.pulseId } } }, { new: true }, (err) => {
          if (err) {
            res.status(404).send(`${pulseId} not exist in database.`);
          } else {
            const pulseData = {
              pulseId,
            };
            // console.log('pulseData------------------------------------', pulseData);
            res.set('Content-Type', 'application/json');
            // setTimeout(() => res.status(200).send(pulseData), 5000);
            res.status(200).send(pulseData);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = pulseController;
