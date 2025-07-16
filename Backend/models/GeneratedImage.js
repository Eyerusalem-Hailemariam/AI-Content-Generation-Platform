const mongoose = require('mongoose');


const generatedImageSchema = new mongoose.Schema({

    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    prompt : String,
    imageUrl : String,
    createdAt: { type: Date, default: Date.now}
})

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);
module.exports = GeneratedImage;
