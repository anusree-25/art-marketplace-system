const express = require('express');
const router = express.Router();
const bidsController = require('../controllers/bidsController');
router.post('/place', bidsController.placeBid);
module.exports = router;