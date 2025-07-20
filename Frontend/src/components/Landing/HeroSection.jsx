import React from 'react';
import { Box, Typography, Button, CardMedia, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import featureImage from '../../assets/images/image.png';


const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        background: 'linear-gradient(135deg, #e8f5e9 0%, #e0f7fa 100%)',
        borderRadius: 4,
        boxShadow: 3,
        mb: 6,
        minHeight: { md: 400 },
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2} color="primary.main">
            Generate High-Quality Content Instantly
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Use our AI platform to create blogs, articles, and social posts in seconds.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 5, fontWeight: 'bold', boxShadow: 2 }}
              onClick={() => navigate('/blog-post')}
            >
              Start Generating
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-end' },
            height: '100%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 220, md: 340 },
              height: { xs: 220, md: 340 },
              background: 'linear-gradient(135deg, #b2ebf2 0%, #e1bee7 100%)',
              transform: 'rotate(15deg)',
              borderRadius: '20%',
              zIndex: 1,
              opacity: 0.4,
            }}
          />

          <CardMedia
            component="img"
            image={featureImage}
            alt="AI Content Generation"
            sx={{
              width: { xs: '100%', md: '80%' },
              maxWidth: 400,
              height: 'auto',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;