const express = require('express');

const pulsesRouter = express.Router();
const pulseController = require('../controllers/pulseController');

pulsesRouter.route('/:boardId')
  .post(pulseController.addPulse);

pulsesRouter.route('/:boardId/:pulseId')
  .put(pulseController.editPulse)
  .delete(pulseController.deletePulse);

module.exports = pulsesRouter;
