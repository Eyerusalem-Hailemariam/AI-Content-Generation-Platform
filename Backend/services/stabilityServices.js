const axios = require('axios');

const API_KEY = process.env.STABILITY_API_KEY;

async function imageGeneration(prompt) {
    const response = await axios.post(
        'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image',
        {
            text_prompts: [
                { text: prompt }
            ],
            cfg_scale: 7,
            height: 512,
            width: 512,
            samples: 1,
            steps: 30
        },
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    );

    return response.data.artifacts[0].base64;
}

module.exports = { imageGeneration };