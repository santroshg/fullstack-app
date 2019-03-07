/* eslint-disable no-underscore-dangle */
const BoardModel = require('../models/boardModel');

const boardsController = {

  getBoardsList: (req, res, next) => {
    try {
      BoardModel.find({ 'members.userId': req.query.userId }, (err, response) => {
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
      if (req.body.loggedinUser) {
        const memberUser = {
          userId: req.body.loggedinUser.userId,
          userDisplayName: req.body.loggedinUser.userDisplayName,
          userEmail: req.body.loggedinUser.userEmail,
          userActive: true,
        };

        const boardModel = new BoardModel({
          boardName: req.body.notNeededBoardObject.boardName,
          boardDesc: req.body.notNeededBoardObject.boardDesc,
          boardCreatedBy: req.body.loggedinUser.userEmail,
          members: [memberUser],
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
      const { boardId } = req.params;
      if (boardId) {
        BoardModel.findOneAndUpdate({ _id: boardId },
          {
            $set: {
              boardName: req.body.board.boardName,
              boardDesc: req.body.board.boardDesc,
            },
          }, { new: true }, (err, updatedBoard) => {
            if (err) {
              throw err;
            } else {
              res.set('Content-Type', 'application/json');
              res.status(200).send({
                _id: updatedBoard._id,
                boardName: updatedBoard.boardName,
                boardDesc: updatedBoard.boardDesc,
              });
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
        BoardModel.findOneAndDelete({ _id: boardId }, (err, deletedBoardData) => {
          if (err) {
            res.status(404).send(`${boardId} not exist in database.`);
          } else {
            res.status(200).send({ deletedBoardId: deletedBoardData._id });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },


};

module.exports = boardsController;
