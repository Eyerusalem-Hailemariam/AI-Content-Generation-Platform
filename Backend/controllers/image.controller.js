const { imageGeneration } = require('../services/stabilityServices');
const User = require('../models/User');
const GeneratedImage = require('../models/GeneratedImage')

async function createImage(req, res) {
    const {prompt, user_id} = req.body;

    console.log('Prompt: in image', prompt);
    console.log('User ID: image', user_id);
    console.log("prompt image", prompt)
    if (!prompt) {
        return res.status(400).json({message : 'Prompt is required'});
    }

    try {
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({error : 'User not found'})
        }
        if (user.credits < 1) {
            return res.status(400).json({error : 'Insufficient credits'});
        }

        const base64Image = await imageGeneration(prompt);

        user.credits -= 1;

        const newImage = new GeneratedImage({
            user: user_id,
            prompt: prompt,
            imageUrl : `data:image/png;base64,${base64Image}` 
        });

        const savedImage = await newImage.save();
        await user.save();

        res.json({image: `data:image/png;base64,${base64Image}`,
        data: savedImage});
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({message : 'Image generation failed'});
    }
}
module.exports = {createImage};