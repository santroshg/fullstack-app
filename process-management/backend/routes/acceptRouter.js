const express = require('express');

const acceptRouter = express.Router();
const membersController = require('../controllers/membersController');

acceptRouter.route('/update-active-user')
  .get(membersController.acceptRequest);

module.exports = acceptRouter;
