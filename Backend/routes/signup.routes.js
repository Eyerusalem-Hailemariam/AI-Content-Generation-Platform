const express = require('express')
const router = express.Router();
const signUpController = require("../controllers/signUp.controller");

router.post('/api/user/sign', signUpController.signup);

module.exports = router;