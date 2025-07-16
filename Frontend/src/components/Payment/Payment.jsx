import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeService from '../../services/stripeService';
import getAuth from '../../Utility/auth';

function Payment() {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [error, setError] = useState('');

    const user = getAuth();
    const id = user.user_id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPaymentStatus('');

        if (!stripe || !elements) {
            setError('Stripe is not loaded yet.');
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setLoading(true);

        try {
            console.log("amount", amount);

            const clientSecret = await stripeService.createPayment(amount);

            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setPaymentStatus('Payment failed: ' + result.error.message);
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment succeeded!');

                try {
                    console.log("response id", id)
                    const response = await stripeService.updateCredits(id, amount);
                    console.log("Credits updated:", response.data);
                } catch (updateError) {
                    console.error("Failed to update credits:", updateError);
                    setError('Payment succeeded but failed to update credits.');
                }
            }
        } catch (error) {
            setPaymentStatus('Payment failed');
            setError(error.message || 'An error occurred');
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-8 px-2">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary-700 mb-6">Buy Credits</h2>
                
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount in USD"
                    required
                    min="1"
                    className="w-full p-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition mb-4 text-gray-800"
                />
                
                <div className="mb-4 p-3 border border-primary-200 rounded-lg bg-primary-50">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': { color: '#a0aec0' },
                            },
                            invalid: { color: '#e53e3e' },
                        },
                    }} />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>

                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                {paymentStatus && <p className="text-green-700 text-center font-semibold">{paymentStatus}</p>}
            </form>
        </div>
    );
}

export default Payment;
