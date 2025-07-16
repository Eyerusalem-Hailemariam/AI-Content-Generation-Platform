import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  Security,
  Psychology,
  Palette,
  TrendingUp
} from '@mui/icons-material';
import featureImage from '../../assets/images/photo_2025-07-17_01-14-47.jpg';

function Features() {
  const iconStyle = {
    fontSize: 50,
    color: '#1976d2',
  };

  const features = [
    {
      icon: <Security sx={iconStyle} />,
      title: 'Secure & Private',
      description: 'Your data and generated content are protected with enterprise-grade security.'
    },
    {
      icon: <Psychology sx={iconStyle} />,
      title: 'Smart Customization',
      description: 'Fine-tune your content with intelligent prompts and style preferences.'
    },
    {
      icon: <Palette sx={iconStyle} />,
      title: 'Multiple Formats',
      description: 'Generate articles, blogs, social media posts, and more in various styles.'
    },
    {
      icon: <TrendingUp sx={iconStyle} />,
      title: 'Performance Analytics',
      description: 'Track your content performance and optimize your strategy with detailed insights.'
    }
  ];

  return (
    <>
      {/* Full-width hero image */}
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={featureImage}
          alt="AI Content Generation Platform"
          sx={{
            width: '100%',
            height: { xs: 800, sm: 400, md: 500 },
            maxHeight: { xs: 300, md: 500 },
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: '#f9fafb',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Why Choose Our Platform?
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Experience AI-driven content creation with features designed for modern creators.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                    <Box mb={2}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Features;