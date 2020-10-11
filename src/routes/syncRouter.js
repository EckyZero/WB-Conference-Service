'use strict'

const express = require('express');
const router = express.Router();

const { syncController } = require('../controllers')

router.post('/', (req, res, next) => {
  syncController.sync(req, res, next);
});

module.exports = router;
