/* eslint-disable prefer-destructuring */
const BoardModel = require('../models/boardModel');
const url = require('../config/config');

const membersController = {

  // addMemberInBoard
  addMemberInBoard: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const memberData = req.body;
      // TODO find userID before Updating
      if (boardId) {
        BoardModel.findOneAndUpdate({ boardId }, { $push: { members: memberData } }, { new: true }, (err, boardsWithUpdatedMember) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(boardsWithUpdatedMember);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // deleteMemberInBoard
  deleteMemberInBoard: (req, res, next) => {
    try {
      const { memberId } = req.params;
      const { boardId } = req.params;
      if (boardId && memberId) {
        BoardModel.findOneAndUpdate({ boardId }, { $pull: { members: { userId: memberId } } }, { new: true }, (err, data) => {
          if (err) {
            res.status(404).send(`${memberId} not exist in database.`);
          } else {
            res.status(200).send(data);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

  acceptRequest: (req, res, next) => {
    try {
      // console.log('--------------req.boardId--------', req.boardId);
      // console.log('--------------req.userId--------', req.userId);
      // console.log('--------------req.query--------', req.query);
      // console.log('-------------req.user-----------', req.user);

      const boardId = req.boardId;
      const userId = req.userId;

      if (boardId && userId) {
        BoardModel.findOneAndUpdate({ boardId, 'members.userId': userId },
          {
            $set: {
              'members.$.userActive': true,
              'members.$.userId': req.user.googleId,
              'members.$.userDisplayName': req.user.userDisplayName,
            },
          // eslint-disable-next-line no-unused-vars
          }, { new: true }, (err, data) => {
            if (err) {
              res.status(404).send(`${userId} not exist in database.`);
            } else {
              // res.status(200).send(data);

              res.redirect(`${url.frontendHost}/home`);
              // res.writeHead(200, { 'Content-Type': 'text/html' });
              // res.write(acceptView.acceptView(data.boardName, url.frontendHost));
              // res.end();
            }
          });
      }
    } catch (error) {
      next(error);
    }
  },

};

module.exports = membersController;
