const express = require('express');

const labelsRouter = express.Router();
const labelsController = require('../controllers/labelsController');

labelsRouter.route('/:boardId/:pulseId/:cellId')
  .get(labelsController.getLabelsList)
  .post(labelsController.addLabel);

labelsRouter.route('/:boardId/:pulseId/:cellId/:labelId')
  .put(labelsController.editLabel)
  .delete(labelsController.deleteLabel);

module.exports = labelsRouter;
