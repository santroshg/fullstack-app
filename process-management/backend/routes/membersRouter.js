const express = require('express');

const membersRouter = express.Router();
const membersController = require('../controllers/membersController');

membersRouter.route('/:boardId')
  .post(membersController.addMemberInBoard);

membersRouter.route('/:boardId/:memberId')
  .delete(membersController.deleteMemberInBoard);

module.exports = membersRouter;
