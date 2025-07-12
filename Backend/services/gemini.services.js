const axios = require('axios');

async function generateBlogPost(prompt) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const model = 'gemini-1.5-flash'; // or 'gemini-1.5-pro'
        
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY environment variable is not set');
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const response = await axios.post(
            url,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a helpful blog post generator. Generate a blog post based on this prompt: ${prompt}`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
            const generatedContent = response.data.candidates[0].content.parts[0].text;
            return generatedContent;
        } else {
            throw new Error('Invalid response structure from Gemini API');
        }

    } catch(error) {
        console.error('Gemini error:', error.response ? error.response.data : error);
        throw error;
    }
}

module.exports = {generateBlogPost}