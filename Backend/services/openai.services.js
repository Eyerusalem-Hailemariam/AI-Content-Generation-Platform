const {OpenAI} = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateBlogPost(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages : [
                {role : 'system', content : 'You are a helpful blog post generator.'},
                {role: 'system', content: prompt}
            ]
        });

        return completion.choices[0].message.content;
    } catch(error) {
        console.error('OpenAI error:', error);
        throw error;
    }
}

module.exports = {generateBlogPost};