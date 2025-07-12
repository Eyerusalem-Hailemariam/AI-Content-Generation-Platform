const {generateBlogPost} = require('../services/gemini.services');

async function generateBlog(req, res) {
    const { prompt } = req.body;

    console.log("prompt", prompt)

    try {
        const generateBlog = await generateBlogPost(prompt);
        res.json({blog: generateBlog});
    } catch (error) {
        console.error('Blog generation error:', error);
        
        // Handle specific Gemini API errors
        if (error.code === 'ERR_INVALID_URL') {
            return res.status(500).json({
                error: 'Gemini API configuration error',
                details: 'Please check your GEMINI_API_KEY environment variable'
            });
        }
        
        // Handle quota or rate limit errors
        if (error.response && error.response.status === 429) {
            return res.status(429).json({
                error: 'Gemini API quota exceeded. Please try again later.',
                details: 'You have reached your Gemini API usage limit.'
            });
        }
        
        // Handle other API errors
        if (error.response && error.response.data) {
            return res.status(400).json({
                error: 'Gemini API error',
                details: error.response.data.error?.message || 'Failed to generate content'
            });
        }
        
        // Generic error
        res.status(500).json({
            error: 'Failed to generate blog post',
            details: 'An unexpected error occurred'
        });
    }
}

module.exports = {generateBlog};