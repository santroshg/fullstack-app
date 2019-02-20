const BoardModel = require('../models/boardModel');

const membersController = {

  // addMemberInBoard
  addMemberInBoard: (req, res, next) => {
    try {
      const { boardId } = req.params;
      const memberData = req.body;
      // TODO find userID before Updating
      if (boardId) {
        BoardModel.updateOne({ _id: boardId }, { $push: { members: memberData } }, (err, newMember) => {
          if (err) {
            throw err;
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(newMember);
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
        BoardModel.updateOne({ _id: boardId }, { $pull: { members: { _id: memberId } } }, (err) => {
          if (err) {
            res.status(404).send(`${memberId} not exist in database.`);
          } else {
            res.status(200).send({ message: 'member deleted sucessfully.' });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },

};

module.exports = membersController;
