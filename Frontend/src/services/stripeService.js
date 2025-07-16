import axios from 'axios';

async function createPayment(amount) {
    console.log("amount", amount);
    // Fix the URL typo and use the correct destructured variable
    const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: parseInt(amount) * 100
    });
    return data.clientSecret;
}

const stripeService = {
    createPayment
};
export default stripeService;