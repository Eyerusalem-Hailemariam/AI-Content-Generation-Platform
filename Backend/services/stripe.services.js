const router = require("../routes/image.routes");
const Stripe = require('stripe');
const User = require('../models/User');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function stripePayment(amount) {
  
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'usd',
            payment_method_types: ['card']
        });

        return paymentIntent;
    } catch (error) {
        console.log(error.message);
        throw error; 
    }
}

async function updateCredits(id, credit) {

    try {
        const creditsToAdd = parseInt(credit, 10);
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $inc: { credits: creditsToAdd } },
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        console.error('Error updating credits:', error.message);
        throw error;
    }
}

module.exports = {
    stripePayment,
    updateCredits
};