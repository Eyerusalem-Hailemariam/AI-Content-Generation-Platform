const User = require('../models/User')
const bcrypt = require('bcrypt');

async function login(userData) {
    try {
        let returnData = {}

        const {email, password} = userData;

        const user = await User.findOne({email});

        if (!user){
            returnData = {
                status: "fail",
                message : "Employee doesn't exist"
            }
            return returnData
        }

        console.log("loginuser", user)
        const passwordMatch = await bcrypt.compare(password, user.passwordHash)
        console.log("passwordMatch", passwordMatch)
        if(!passwordMatch) {
            returnData = {
                status: "fail",
                message: "incorrect password"
            };

            return returnData;  
        }

        returnData = {
            status: "success",
            data: user
        };
        console.log(returnData)
        return returnData
    } catch (error) {

        console.log(error)
    }

}

module.exports = {
    login
}