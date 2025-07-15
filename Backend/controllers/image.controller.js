const { imageGeneration } = require('../services/stabilityServices');

async function createImage(req, res) {
    const {prompt} = req.body;

    console.log("prompt", prompt)
    if (!prompt) {
        return res.status(400).json({message : 'Prompt is required'});
    }

    try {
        const base64Image = await imageGeneration(prompt);
        res.json({image: `data:image/png;base64,${base64Image}`});
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({message : 'Image generation failed'});
    }
}
module.exports = {createImage};