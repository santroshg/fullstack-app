const BoardModel = require('../models/boardModel');

const boardsController = {
  // getBoardsList: (req, res, next) => {
  //   try {
  //     console.log('boardsController-');
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  getBoardsList: (req, res, next) => {
    try {
      BoardModel.find((err, response) => {
        if (err) {
          throw err;
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(response);
          return res;
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // getBoardDetails
  getBoardDetails: (req, res, next) => {
    try {
      const { boardId } = req.params;
      if (boardId) {
        BoardModel.findOne({ _id: boardId }, (err, boardDetails) => {
          if (err) {
            res.status(400).send(`Board data does not found with ${boardId}`);
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(boardDetails);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // addBoard
  addBoard: (req, res, next) => {
    try {
      if (req.body.boardName) {
        const boardModel = new BoardModel({
          boardName: req.body.boardName,
          boardDesc: req.body.boardDesc,
          boardCreatedBy: 'santosh',
          members: [],
          progressHeader: [],
          pulse: [],
          createTime: new Date(),
        });
        boardModel.save((error, response) => {
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

  // editBoard
  editBoard: (req, res, next) => {
    try {
      const updateBoardData = req.body;
      const { boardId } = req.params;
      if (boardId) {
        BoardModel.update({ _id: boardId }, updateBoardData, (err, updatedBoard) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(updatedBoard);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // deleteBoard

  deleteBoard: (req, res, next) => {
    try {
      const { boardId } = req.params;
      if (boardId) {
        BoardModel.deleteOne({ _id: boardId }, (err) => {
          if (err) {
            res.status(404).send(`${boardId} not exist in database.`);
          } else {
            res.status(200).send({ message: 'Board deleted sucessfully.' });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


};

module.exports = boardsController;
