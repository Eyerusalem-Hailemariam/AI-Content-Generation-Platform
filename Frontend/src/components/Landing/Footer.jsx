import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 2, background: 'linear-gradient(135deg, #e8f5e9 0%, #e0f7fa 100%)', color: 'black', textAlign: 'center' }}>
      <Container>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} AI Content Generation Platform. All rights reserved.
        </Typography>
        <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
      </Container>
    </Box>
  );
}
