const express = require('express');
const router = express.Router();
const {createImage}= require('../controllers/image.controller')
const {getIMage}= require('../controllers/image.controller')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/api/generate-image', authMiddleware, createImage);
router.get('/api/get-image/:id', getIMage);

module.exports = router;
