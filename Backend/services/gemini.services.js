const axios = require('axios');
const Blog = require('../models/BlogPost');

async function generateBlogPost(prompt, retries = 3, delay = 2000) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = 'gemini-1.5-flash';

  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
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

      if (
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content
      ) {
        const generatedContent = response.data.candidates[0].content.parts[0].text;
        return generatedContent;
      } else {
        throw new Error('Invalid response structure from Gemini API');
      }

    } catch (error) {
      if (error.response && error.response.status === 503 && attempt < retries) {
        const waitTime = delay * attempt; // exponential backoff
        console.log(`Gemini API overloaded. Retry attempt ${attempt} after ${waitTime}ms...`);
        await new Promise(res => setTimeout(res, waitTime));
        continue;
      } else {
        console.error('Gemini error:', error.response ? error.response.data : error);
        throw error;
      }
    }
  }
}

async function getBlog(userId) {
  try {
    console.log("Fetching blogs for userId:", userId);

    const blogs = await Blog.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // console.log("Fetched blogs:", blogs);
    return blogs;

  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

module.exports = { generateBlogPost, getBlog };
