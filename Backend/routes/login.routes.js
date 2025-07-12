const express = require("express")
const router = express.Router();
const loginController = require('../controllers/logIn.controller');

router.post('/api/user/login', loginController.login);

module.exports = router;

