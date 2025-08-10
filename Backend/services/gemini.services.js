const axios = require('axios');
const Blog = require('../models/BlogPost');

async function generateKeywords(prompt) {

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const { data } = await axios.post(url, {
     contents: [{ parts: [{ text: `Suggest 5 SEO keywords for: "${prompt}"` }] }]
  });

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const keywords = text
    .split(/[\n,]+/)
    .map(k => k.trim())
    .filter(k => k.length > 0)

  return keywords;
}

async function generateBlogPost(prompt) {
  const keywords = await generateKeywords(prompt);
  const keywordStr = keywords.join(', ');

  const articlePrompt = `Write an SEO-friendly article on "${prompt}" using these keywords naturally: ${keywordStr}`;

  const apiKey = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const { data } = await axios.post(url, {
    contents: [{ parts: [{ text: articlePrompt }] }]
  });

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

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
