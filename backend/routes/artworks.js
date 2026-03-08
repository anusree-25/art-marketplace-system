const express = require('express');
const router = express.Router();
const artworksController = require('../controllers/artworksController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('artFile'), artworksController.uploadArtwork);
router.get('/', artworksController.getAllArtworks);
module.exports = router;
