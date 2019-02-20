const express = require('express');

const progressHeaderRouter = express.Router();
const progressHeaderController = require('../controllers/progressHeaderController');

progressHeaderRouter.route('/:boardId')
  .post(progressHeaderController.addProgressHeader);

progressHeaderRouter.route('/:boardId/:headerId')
  .put(progressHeaderController.editProgressHeader)
  .delete(progressHeaderController.deleteProgressHeader);

module.exports = progressHeaderRouter;
