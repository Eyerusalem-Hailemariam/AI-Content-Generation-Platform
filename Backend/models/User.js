const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 2,
        maxlength: 50,
    }, 
    email : {
        type: String,
        required : [true, 'Email is required'],
        unique : true,
        match: [/.+\@.+\..+/, 'Enter a valid email address'],
    },
    passwordHash : {
        type: String,
        required : true,
        minlength: 6
    },

    resetOTP : {
        type: String
    },
    resetOTPExpires : {
        type: Date
    },
    credits: {
        type: Number,
        default: 10,
        min: 0,
    }, 

    createdAt: {
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model('User', userSchema)