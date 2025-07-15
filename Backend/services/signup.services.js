//services.signup.services
const User = require('../models/User')
const bcrypt = require('bcrypt');


async function checkIfUserExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}

async function signup(user) {
    try {
        name = user.name,
        email = user.email
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
       name, 
        email,
        passwordHash,
        credits: 10.
    });

    await newUser.save();
    console.log("newUser", newUser);
    return newUser
}
catch(error) {
    console.log(error)
}
}

module.exports = {
    checkIfUserExists,
    signup
};
