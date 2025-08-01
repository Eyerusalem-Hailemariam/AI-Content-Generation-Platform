const express = require('express')
const router = express.Router();

const signUpController = require("../controllers/signUp.controller");


router.post('/api/user/sign', signUpController.signup);
router.get('/api/get-user/:id', signUpController.getUser);
router.post('/api/send-otp', signUpController.sendOtp);
router.post('/api/verify-otp', signUpController.verifyOtpAndChangePassword);

module.exports = router;