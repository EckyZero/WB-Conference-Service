'use strict'

const express = require('express');
const router = express.Router();

const { peopleController } = require('../controllers')

router.get('/', async (req, res, next) => {
  return await peopleController.getAll(req, res, next)
});

module.exports = router;
