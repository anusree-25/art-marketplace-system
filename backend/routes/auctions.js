const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
router.post('/finalize', (req,res)=>{
  auctionController.finalizeAuctions();
  res.json({message:'Auction check triggered!'});
});
module.exports = router;
