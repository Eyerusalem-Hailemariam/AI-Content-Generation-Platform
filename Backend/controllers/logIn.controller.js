const loginServices = require("../services/login.services")
const jwtSecret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    try {

        const user = await loginServices.login(req.body);

        if (user.status == "fail") {
            return res.status(403).json({
                status: user.status,
                message: user.message,
            });
        }

        const payload = {
            user_id: user.data._id,
            user_email: user.data.email,
        }
       
        const token = jwt.sign(
            payload,
            jwtSecret, 
            {expiresIn: '1d'}
        );
       
        
        const sendBack = {
            user_token: token,
        };
         
        return res.status(200).json({
            status: "success",
            message: "Employee login successfully!",
            data: sendBack,
        });
    
    } catch(error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error"
        });
    }
}

module.exports = {
    login
}