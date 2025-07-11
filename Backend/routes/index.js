//
const express = require('express');

const router = express.Router();

const userRouter = require('./signup.routes');

router.use(userRouter);

module.exports = router;