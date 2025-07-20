import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';

const steps = [
  {
    icon: <LooksOneIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Sign Up',
    description: 'Create your free account in seconds and access the platform.',
  },
  {
    icon: <LooksTwoIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Enter Your Prompt',
    description: 'Describe what you want to generate and select your content type.',
  },
  {
    icon: <Looks3Icon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Get Instant Results',
    description: 'Receive high-quality AI-generated content ready to use or edit.',
  },
  {
    icon: <Looks4Icon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Generate Images',
    description: 'Create unique AI-generated images for your posts and designs.',
  },
];

function HowItWorksSection() {
  return (
    <Box id="features" sx={{ py: 8, background: '#f4f7fa' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
          How It Works
        </Typography>
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
          {steps.map((step, idx) => (
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box mb={2}>{step.icon}</Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {step.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;
