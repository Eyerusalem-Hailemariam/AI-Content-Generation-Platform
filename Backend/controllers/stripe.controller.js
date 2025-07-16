const {stripePayment} = require('../services/stripe.services');
const {updateCredits} = require('../services/stripe.services')

async function createPayment(req, res) {

    const {amount} = req.body;

    console.log("amount", amount)

    if(!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    const paymentIntent = await stripePayment(amount);

    res.json({
        clientSecret: paymentIntent.client_secret,
      });


}

async function updateCredit(req, res) {
    const {userId, credits} =  req.body;

    console.log("id, crdeits", userId, credits)

    if(!userId || !credits) {
        return res.status(400).json({ error: 'is required' });
    }

    const result = await updateCredits(userId, credits);

    res.json({result})
}
module.exports = {createPayment, updateCredit};