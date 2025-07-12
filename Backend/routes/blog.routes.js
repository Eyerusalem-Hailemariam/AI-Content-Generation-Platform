const express = require('express');
const router = express.Router();
const {generateBlog} = require('../controllers/blog.controller');

router.post('/api/generate-blog', generateBlog);

module.exports = router;