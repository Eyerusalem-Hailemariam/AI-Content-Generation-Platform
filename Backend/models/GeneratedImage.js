const mongoose = require('mongoose');


const generatedImageSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    prompt : {
        type : String,
        reuired : true,
        minlength : 5,
    },
    imageUrl : {
        type: String,
        required : true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
})

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);
module.exports = GeneratedImage;
