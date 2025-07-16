const express = require('express');

const router = express.Router();

const signupRouter = require('./signup.routes');

const loginRouter = require('./login.routes');

const blogRouter = require('./blog.routes');

const imageRouter = require('./image.routes');

const stripeRouter = require('./stripe.routes');

router.use(blogRouter);

router.use(signupRouter);

router.use(loginRouter);

router.use(stripeRouter);

router.use(imageRouter)
module.exports = router;