const User = require('../models/User')
const bcrypt = require('bcrypt');

async function login(userData) {
    try {
        let returnData = {}

        const user = await User.findOne({email});

        if (user.length == 0){
            returnData = {
                status: "fail",
                message : "Employee doesn't exist"
            }
            return returnData
        }
        const passwordMatch = await bcrypt.compare(userData.password, user[0].passwordHash)
        if(!passwordMatch) {
            returnData = {
                status: "fail",
                message: "incorrect password"
            };

            return returnData;  
        }

        returnData = {
            status: "success",
            data: user[0]
        };
        return returnData
    } catch (error) {

        console.log(error)
    }

}

module.exports = {
    login
}