const signupService = require('../services/signup.services')



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


async function getUser(req, res, next) {

    const {id} = req.params;

    console.log("id", id)
    const response = await signupService.getUser(id);
    
    if (!response) {
        res.status(400).json({
             error: "Failed to get the employee!"
        })
    }
    else {  
        console.log("response am in", response)
        return res.status(200).json(response);
    }


}

async function sendOtp(req, res, next) {
    const {email} = req.body;

    const otp = await signupService.sendResetEmail(email);

    if(!otp) {
        res.status(400).json({
            error: "Failed to send otp!"
       })
    }
    else {
        console.log("response am in", otp);
        return res.status(200).json(otp);
    }

}

async function verifyOtpAndChangePassword(req, res, next){
    const {email, otp, newPassword} = req.body;
    
    const response = await signupService.verifyOtpAndChangePassword({email, otp, newPassword});

    return res.status(200).json(response);
    
}
module.exports = {
    signup,
    getUser,
    sendOtp,
    verifyOtpAndChangePassword
}

    
