import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Typography, Button, Paper, TextField, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import stripeService from '../../services/stripeService';
import getAuth from '../../Utility/auth';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const clientSecret = await stripeService.createPayment(amount);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setPaymentStatus('Payment failed: ' + result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setPaymentStatus('✅ Payment succeeded!');
        navigate('/dashboard')
        try {
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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 5,
          p: 4,
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <CreditCardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Buy <span style={{ color: '#ffb300' }}>Credits</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={2}>
            Secure payment powered by Stripe
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount (USD)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            required
            margin="normal"
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.5)',
              border: '1px solid #e0e0e0',
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#222',
                    '::placeholder': { color: '#888' },
                  },
                  invalid: { color: '#ff6b6b' },
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              fontWeight: 'bold',
              borderRadius: 3,
              boxShadow: 2,
              py: 1.5,
              background: 'linear-gradient(90deg, #ffb300 0%, #ff6f00 100%)',
              color: '#fff',
            }}
            disabled={!stripe || loading}
            startIcon={loading && <CircularProgress size={22} color="inherit" />}
          >
            {loading ? 'Processing...' : '💳 Pay Now'}
          </Button>
          {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
          {paymentStatus && <Typography color="success.main" align="center" mt={2} fontWeight="bold">{paymentStatus}</Typography>}
        </form>
      </Paper>
    </Box>
  );
}

export default Payment;
