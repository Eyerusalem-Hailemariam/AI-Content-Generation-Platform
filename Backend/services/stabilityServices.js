const axios = require('axios');

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

module.exports = { imageGeneration };

