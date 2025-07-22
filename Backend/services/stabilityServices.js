const axios = require('axios');
const  GeneratedImage = require('../models/GeneratedImage')

async function imageGeneration(prompt) {
    const body = {
        text_prompts: [
            {
                text: prompt
            }
        ],
        cfg_scale: 7,
        height: 1024, // updated
        width: 1024,  // updated
        samples: 1,
        steps: 30
    };

    const response = await axios.post(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                Accept: 'application/json'
            }
        }
    );

    return response.data.artifacts[0].base64;
}

async function getImage(userId) {
    try {
    const images = await GeneratedImage.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(10);

    // console.log("Fetched blogs:", images);
    return images;
    } catch(error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }

}

module.exports = { imageGeneration, getImage };

