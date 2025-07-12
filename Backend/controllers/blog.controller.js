const {generateBlogPost} = require('../services/openai.services');

async function generateBlog(req, res) {

    const { prompt } = req.body;

    try {
        const generateBlog = await generateBlogPost(prompt);
        res.json({blog: generateBlog});
    }   catch (error) {
        res.status(500).json({error : 'Failed to generate blog post'});
    }
}

module.exports = {generateBlog};