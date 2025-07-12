const express = require('express');
const router = express.Router();
const {generateBlog} = require('../controllers/blog.controller');

router.post('/generate-blog', generateBlog);

module.exports = router;