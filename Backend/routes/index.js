//
const express = require('express');

const router = express.Router();

const signupRouter = require('./signup.routes');

const loginRouter = require('./login.routes');

router.use(signupRouter);

router.use(loginRouter);

module.exports = router;