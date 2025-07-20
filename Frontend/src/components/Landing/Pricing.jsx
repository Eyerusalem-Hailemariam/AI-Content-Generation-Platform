import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    description: 'Basic features for personal use',
    price: '9',
    features: ['500 words per generation', '5 images per month', 'Standard support'],
    badge: 'Basic',
  },
  {
    name: 'Pro',
    description: 'Advanced features for professionals',
    price: '29',
    features: ['Unlimited words', '50 images per month', 'Priority support'],
    badge: 'Recommended',
  },
  {
    name: 'Enterprise',
    description: 'Full features for teams',
    price: '99',
    features: ['Unlimited everything', '500 images per month', 'Dedicated support'],
    badge: 'Best Value',
  },
];

function PricingSection() {
  return (
    <Box id="pricing" sx={{ py: 8,  background: 'linear-gradient(135deg,rgb(214, 247, 217) 0%, #e0f7fa 100%)' }}>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} flexWrap="wrap">
          <Typography variant="h4" fontWeight="bold" mb={{ xs: 3, sm: 0 }}>
            Pricing Plans
          </Typography>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography variant="button" color="primary" sx={{ fontWeight: 'bold' }}>
              Get Started &gt;
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            overflowX: { xs: 'auto', md: 'visible' },
            justifyContent: { xs: 'flex-start', md: 'center' },
            px: 1,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {plans.map((plan, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                minWidth: { xs: 260, sm: 320, md: 340 },
                maxWidth: 360,
                flex: '0 0 33.33%',
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff',
                boxShadow: plan.badge === 'Recommended' ? '0 10px 25px rgba(59,130,246,0.25)' : '0 4px 12px rgba(0,0,0,0.05)',
                border: plan.badge === 'Recommended' ? '2px solid #3b82f6' : 'none',
                transform: plan.badge === 'Recommended' ? 'scale(1.05)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                },
              }}
            >
              {/* Badge */}
              <Box
                sx={{
                  bgcolor: plan.badge === 'Recommended' ? 'primary.main' : 'grey.500',
                  color: '#fff',
                  px: 2,
                  py: 0.5,
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {plan.badge}
              </Box>

              {/* Plan Name & Price */}
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {plan.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {plan.description}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
                ${plan.price}
                <Typography variant="body2" component="span" color="text.secondary">
                  /mo
                </Typography>
              </Typography>

              {/* Features */}
              <Box component="ul" sx={{ textAlign: 'left', pl: 2, mb: 3 }}>
                {plan.features.map((feature, i) => (
                  <Typography component="li" variant="body2" color="text.secondary" key={i} sx={{ mb: 0.5 }}>
                    ✔ {feature}
                  </Typography>
                ))}
              </Box>

              {/* Button */}
              <Link to="/signup" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  variant={plan.badge === 'Recommended' ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 8, fontWeight: 'bold', py: 1.5 }}
                >
                  Choose Plan
                </Button>
              </Link>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default PricingSection;
