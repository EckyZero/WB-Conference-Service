'use strict'

const express = require('express');
const router = express.Router();

const { topicsController } = require('../controllers')

router.get('/', async (req, res, next) => {
  return await topicsController.getAll(req, res, next)
});

module.exports = router;
