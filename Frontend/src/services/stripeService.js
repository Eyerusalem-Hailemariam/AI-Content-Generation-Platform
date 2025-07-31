import axios from 'axios';

async function createPayment(amount) {
    console.log("amount", amount);


    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/payment/create-payment-intent`, {
        amount: parseInt(amount) * 100
        });
    return data.clientSecret;
}

async function updateCredits(id, amount) {

    console.log("id, credit", id, amount);

    const data = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/credits/update`, {
        userId: id, 
        credits: Number(amount) * 100 
    });

    return data;
}

const stripeService = {
    createPayment,
    updateCredits
};
export default stripeService;