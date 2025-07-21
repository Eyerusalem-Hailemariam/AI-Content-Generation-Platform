import React from 'react';
import { Box, Container } from '@mui/material';
import BlogPostGenerator from '../components/BlogPostGenerator/BlogPostGenerator';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator';
import Header from '../components/Header/Header';
import Footer from '../components/Landing/Footer'; 

export default function BlogAndImageGeneratorPage() {
  return (
    <Box >
      <Header />
      <Container maxWidth="xl" sx={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e0f7fa 100%)', pt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            minHeight: 600,
          }}
        >
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'stretch',
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <BlogPostGenerator cardFullHeight />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'stretch',
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ImageGenerator cardFullHeight />
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </Box>
  );
} 