const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
router.post('/buy', ordersController.buyArtwork);
module.exports = router;
