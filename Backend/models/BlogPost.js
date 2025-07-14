const mongoose = require('mongoose');

const blogPostSchema = new mongoose.mongoose.Schema({
    title : {
        type: String,
        required : true,
    },

    prompt : {
        type : String,
        required : true,
    },

    generatedBlog: {
        type: String,
        required : true,
    },

    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    createdAt: {
        type : Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
