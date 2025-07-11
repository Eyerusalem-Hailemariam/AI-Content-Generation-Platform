const signupService = require('../services/signup.services')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

async function signup(req, res, next){

    const {name, email, password} = req.body;

    const existingUser = await signupService. checkIfUserExists(email);

    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    else{
        try {
            const userData = req.body;

            const user = await signupService.signup(userData);

            if (!user) {
                res.status(400).json({
                     error: "Failed to add the employee!"
                })
            } else {
                
             
                res.status(200).json({
                  status: "true",
                  message: "Employee added successfully!",
                });
            }

        } catch(error) {
            console.log(error.message);
            res.status(400).json({
              error: "Something went wrong!"
            }); 
        }
    }
}
module.exports = {
    signup
}

    
