const loginServices = require("../services/login.services");

const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    try {
        console.log("req", req.body);

        const user = await loginServices.login(req.body);

        if (user_status == "fail") {
            res.status(403).json({
                status: user.status,
                message: user.message,
              });
              console.log(user.message); 
        }

        const payload = {
            user_id : user.data.user_id,
            user_email: user.data.user_email,
        }
        const token = jwt.sign(
            {id: user._id},
        'JWT_SECRET', {expiresIn: '1d'}
    );
    
    const sendBack = {
        user_token: token,
    };
     
        res.status(200).json({
          status: "true",
          message: "Employee login successfully!",
          data: sendBack,
        });
    
    } catch(error) {

    }
}
module.exports = {
    login
}