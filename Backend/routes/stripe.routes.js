const express = require('express');
const router = express.Router();
const {createPayment} = require('../controllers/stripe.controller');
const {updateCredit} = require("../controllers/stripe.controller")

router.post('/api/payment/create-payment-intent', createPayment)
router.post('/api/credits/update', updateCredit);

module.exports = router;