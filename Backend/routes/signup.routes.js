const express = require('express')
const router = express.Router();

const signUpController = require("../controllers/signUp.controller");


router.post('/api/user/sign', signUpController.signup);
router.get('/api/get-user/:id', signUpController.getUser);

module.exports = router;