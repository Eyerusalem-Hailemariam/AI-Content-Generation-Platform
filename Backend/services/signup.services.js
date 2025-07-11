const User = require('../models/User')
const bcrypt = require('bcrypt');


async function checkIfUserExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user;
    } catch (err) {
        console.error('Error checking if user exists:', err);
        throw err;
    }
}

async function signup(user) {
    
    try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

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
    console.log(err)
}
}

module.exports = {
    checkIfUserExists,
    signup
};
