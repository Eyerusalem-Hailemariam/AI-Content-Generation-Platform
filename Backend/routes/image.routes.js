const express = require('express');
const router = express.Router();
const {createImage}= require('../controllers/image.controller')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/api/generate-image', authMiddleware, createImage);

module.exports = router;
