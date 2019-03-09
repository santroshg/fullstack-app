/* eslint-disable no-param-reassign */
const BoardModel = require('../models/boardModel');

const labelsController = {
  getLabelsList: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      if (boardId && pulseId && cellId) {
        BoardModel.find({ pulseId: boardId, 'pulse.pulseId': pulseId, 'pulse.cells.cellId': cellId }, { 'pulse.$.cells.0.labels': 1 }, (err, response) => {
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

  // setCellLabel
  setCellLabel: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      const cellData = req.body;

      if (boardId && pulseId && cellId && cellData) {
        // eslint-disable-next-line max-len
        BoardModel.findOne({ boardId }, (error, targetBoard) => {
          if (error) {
            throw error;
          } else {
            const pulseIndex = targetBoard.pulse.map(p => p.pulseId.toString()).indexOf(pulseId);
            const cellIndex = targetBoard.pulse.filter(p => p.pulseId.toString() === pulseId)[0]
              .cells.map(c => c.cellId.toString()).indexOf(cellId);

            if (pulseIndex >= 0 && cellIndex >= 0) {
              targetBoard.pulse[pulseIndex].cells[cellIndex].cellLabelTxt = cellData.cellLabelTxt;
              targetBoard.pulse[pulseIndex].cells[cellIndex].color = cellData.color;
              targetBoard.save((error1, newBoard) => {
                if (error1) {
                  throw error1;
                } else {
                  res.set('Content-Type', 'application/json');
                  res.status(201).send(newBoard);
                }
              });
            }
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


  // // addLabel
  // addLabel: (req, res, next) => {
  //   try {
  //     const { boardId } = req.params;
  //     const { pulseId } = req.params;
  //     const { cellId } = req.params;
  //     const labelData = req.body;
  //     if (boardId && pulseId && cellId && labelData) {
  //       // eslint-disable-next-line max-len
  //       BoardModel.findOneAndUpdate({ _id: boardId, 'pulse.pulseId': pulseId, 'pulse.cells.cellId': cellId },
  // { $push: { 'pulse.$.cells.0.labels': labelData } }, { new: true }, (error, response) => {
  //         if (error) {
  //           throw error;
  //         } else {
  //           res.set('Content-Type', 'application/json');
  //           res.status(201).send(response);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // addLabel
  addLabel: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { pulseId } = req.params;
      const { cellId } = req.params;
      const labelData = req.body;

      if (boardId && pulseId && cellId && labelData) {
        // eslint-disable-next-line max-len
        BoardModel.findOne({ boardId }, (error, targetBoard) => {
          if (error) {
            throw error;
          } else {
            const pulseIndex = targetBoard.pulse.map(p => p.pulseId.toString()).indexOf(pulseId);
            const cellIndex = targetBoard.pulse.filter(p => p.pulseId.toString() === pulseId)[0]
              .cells.map(c => c.cellId.toString()).indexOf(cellId);
            targetBoard.pulse[pulseIndex].cells[cellIndex].labels.push(labelData);
            if (pulseIndex >= 0 && cellIndex >= 0) {
              targetBoard.save((error1, newBoard) => {
                if (error1) {
                  throw error1;
                } else {
                  res.set('Content-Type', 'application/json');
                  res.status(201).send(newBoard);
                }
              });
            }
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
        BoardModel.findOne({ boardId }, (err, targetBoard) => {
          if (err) {
            throw err;
          } else {
            const pulseIndex = targetBoard.pulse.map(p => p.pulseId.toString()).indexOf(pulseId);
            const cellIndex = targetBoard.pulse.filter(p => p.pulseId.toString() === pulseId)[0]
              .cells.map(c => c.cellId.toString()).indexOf(cellId);
            const labelIndex = targetBoard.pulse.filter(p => p.pulseId.toString() === pulseId)[0]
              .cells.filter(c => c.cellId.toString() === cellId)[0]
              .labels.map(l => l.labelId.toString()).indexOf(labelId);

            if (pulseIndex >= 0 && cellIndex >= 0 && labelIndex >= 0) {
              targetBoard.pulse[pulseIndex].cells[cellIndex].labels[labelIndex].labelTxt = updatedLabelData.labelTxt;
              targetBoard.pulse[pulseIndex].cells[cellIndex].labels[labelIndex].color = updatedLabelData.color;
              targetBoard.save((error1, newBoard) => {
                if (error1) {
                  // throw error1;
                } else {
                  res.set('Content-Type', 'application/json');
                  res.status(201).send(newBoard);
                }
              });
            }
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
        BoardModel.findOne({ boardId }, (err, targetBoard) => {
          if (err) {
            throw err;
          } else {
            const pulseIndex = targetBoard.pulse.map(p => p.pulseId.toString()).indexOf(pulseId);
            const cellIndex = targetBoard.pulse.filter(p => p.pulseId.toString() === pulseId)[0]
              .cells.map(c => c.cellId.toString()).indexOf(cellId);
            const newLabels = targetBoard.pulse[pulseIndex].cells[cellIndex].labels.filter(l => l.labelId.toString() !== labelId);
            targetBoard.pulse[pulseIndex].cells[cellIndex].labels = newLabels;
            targetBoard.save((error1, newBoard) => {
              if (error1) {
                throw error1;
              } else {
                res.set('Content-Type', 'application/json');
                res.status(201).send(newBoard);
              }
            });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


};

module.exports = labelsController;
