const express = require('express');

const boardsRouter = express.Router();
const boardsController = require('../controllers/boardsController');

boardsRouter.route('/')
  .get(boardsController.getBoardsList)
  .post(boardsController.addBoard);

boardsRouter.route('/:boardId')
  .get(boardsController.getBoardDetails)
  .put(boardsController.editBoard)
  .delete(boardsController.deleteBoard);

module.exports = boardsRouter;
