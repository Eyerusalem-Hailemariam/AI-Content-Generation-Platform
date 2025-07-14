const {generateBlogPost} = require('../services/gemini.services');
const User = require('../models/User') 

async function generateBlog(req, res) {
    
    const { prompt, user_id } = req.body;
    console.log('Prompt:', prompt);
    console.log('User ID:', user_id);

    try {

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(404).json({error : 'User not found'});
        }

        if (user.credits < 1) {
            return res.status(400).json({error : 'Insufficient credits'});
        }

        const generatedBlog = await generateBlogPost(prompt);

        user.credits -= 1;
        await user.save();

        res.json({
            blog: generatedBlog,
            creditsRemaining : user.credits
        });

        
    } catch (error) {
        console.error('Blog generation error:', error);
        
        // Handle specific Gemini API errors
        if (error.code === 'ERR_INVALID_URL') {
            return res.status(500).json({
                error: 'Gemini API configuration error',
                details: 'Please check your GEMINI_API_KEY environment variable'
            });
        }
        
        
        if (error.response && error.response.status === 429) {
            return res.status(429).json({
                error: 'Gemini API quota exceeded. Please try again later.',
                details: 'You have reached your Gemini API usage limit.'
            });
        }
        
       
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