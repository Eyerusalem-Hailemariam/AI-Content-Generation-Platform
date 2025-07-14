const express = require('express');
const router = express.Router();
const {generateBlog} = require('../controllers/blog.controller');
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/api/generate-blog', authMiddleware, generateBlog);

module.exports = router;