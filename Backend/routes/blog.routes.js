const express = require('express');
const router = express.Router();
const {generateBlog} = require('../controllers/blog.controller');
const { getBLog} = require('../controllers/blog.controller');
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/api/generate-blog', authMiddleware, generateBlog);
router.get('/api/get-blog/:id', getBLog);

module.exports = router;