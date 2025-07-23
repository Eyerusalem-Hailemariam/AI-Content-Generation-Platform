import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, TextField, CircularProgress, Avatar
} from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Sidebar from '../Sidebar/Sidebar';
import stripeService from '../../services/stripeService';
import getAuth from '../../Utility/auth';
import { useAuth } from '../../Context/AuthProvider';
import loginService from '../../services/loginServices';
import userService from '../../services/getUser';

const plans = [
  { name: 'Starter', description: 'Basic features for personal use', price: '9', features: ['500 words per generation', '5 images per month', 'Standard support'], badge: 'Basic' },
  { name: 'Pro', description: 'Advanced features for professionals', price: '29', features: ['Unlimited words', '50 images per month', 'Priority support'], badge: 'Recommended' },
  { name: 'Enterprise', description: 'Full features for teams', price: '99', features: ['Unlimited everything', '500 images per month', 'Dedicated support'], badge: 'Best Value' },
];

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();
  const user = getAuth();
  const id = user?.user_id;
  const name = user?.user_name;
  const token = user?.user_token;

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSignup = () => navigate('/signup');

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
    navigate('/signup');
  };

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const userRes = await userService.getUser(id, token);
        setUserData(userRes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPaymentStatus('');

    if (!stripe || !elements) return setError('Stripe is not loaded yet.');
    if (!amount || isNaN(amount) || Number(amount) <= 0) return setError('Please enter a valid amount.');

    setLoading(true);
    try {
      const clientSecret = await stripeService.createPayment(amount);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setPaymentStatus(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent?.status === 'succeeded') {
        setPaymentStatus('Payment succeeded!');
        await stripeService.updateCredits(id, amount);
        navigate('/generated');
      }
    } catch (err) {
      setPaymentStatus('Payment failed');
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'white', px: 2, py: 2, height: 65 }}>
          {isLogged ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar alt={name || 'User'} src={user?.avatarUrl || ''} />
              <Typography variant="subtitle1" fontWeight="bold" color="black">{name || 'User'}</Typography>
              <Button onClick={logOut} sx={{ color: 'black', fontWeight: 'bold', textTransform: 'none' }}>Log Out</Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={handleSignup} sx={{ borderRadius: 2, fontWeight: 'bold' }}>Sign Up</Button>
          )}
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, background: 'linear-gradient(135deg,rgb(245, 247, 247) 0%,rgb(247, 247, 247) 100%)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 4, py: 4, gap: 4 }}>
          
          {/* Pricing Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" mb={4}>Pricing Plans</Typography>

            {/* Current Credits & Why Upgrade side by side */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
              {userData && (
                <Paper sx={{ flex: 1, p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
                  <Typography sx={{ fontSize: '0.85rem', mb: 0.5 }} variant="subtitle2" fontWeight="bold" color="primary.main">Your Current Credits</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CreditScoreIcon color="primary" fontSize="small" />
                    <Typography variant="body2">{userData}</Typography>
                  </Box>
                </Paper>
              )}

              <Paper sx={{ flex: 1, p: 1.5, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" fontWeight="bold">Why Upgrade?</Typography>
                <Typography variant="body2">✓ Generate unlimited AI content</Typography>
                <Typography variant="body2">✓ Faster processing</Typography>
                <Typography variant="body2">✓ Premium support</Typography>
              </Paper>
            </Box>

            {/* Plans */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              {plans.map((plan, i) => (
                <Paper key={i} sx={{ flex: 1, p: 3, borderRadius: 3, textAlign: 'center', backgroundColor: 'white' }}>
                  <Box sx={{ bgcolor: plan.badge === 'Recommended' ? 'primary.main' : 'grey.500', color: 'white', px: 2, py: 0.5, borderRadius: 20, mb: 2 }}>
                    {plan.badge}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">{plan.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>{plan.description}</Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    ${plan.price}
                    <Typography variant="body2" component="span">/mo</Typography>
                  </Typography>
                  <Box component="ul" sx={{ textAlign: 'left', pl: 2, mt: 2 }}>
                    {plan.features.map((f, idx) => (
                      <Typography key={idx} component="li" variant="body2" color="text.secondary">✔ {f}</Typography>
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center', fontStyle: 'italic' }}>
              * All prices are billed monthly. You can upgrade or cancel anytime.
            </Typography>
          </Box>

          {/* Payment Form */}
          <Paper sx={{ height: 660, maxWidth: 400, width: '100%', p: 4, borderRadius: 3, backgroundColor: 'white', position: { md: 'sticky' }, top: { md: 32 }, alignSelf: { md: 'flex-start' } }}>
            <Box textAlign="center" mb={2}>
              <CreditCardIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold">Buy <span style={{ color: '#ffb300' }}>Credits</span></Typography>
              <Typography variant="body2" color="text.secondary">Secure payment powered by Stripe</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField label="Amount (USD)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth required margin="normal" inputProps={{ min: 1 }} />

              <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
                <CardElement options={{ style: { base: { fontSize: '16px', color: '#222', '::placeholder': { color: '#888' } }, invalid: { color: '#ff6b6b' } } }} />
              </Box>

              <Button type="submit" variant="contained" fullWidth disabled={!stripe || loading} startIcon={loading && <CircularProgress size={20} />}>
                {loading ? 'Processing...' : '💳 Pay Now'}
              </Button>

              {error && <Typography color="error" mt={2} align="center">{error}</Typography>}
              {paymentStatus && <Typography color="success.main" mt={2} align="center" fontWeight="bold">{paymentStatus}</Typography>}
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
