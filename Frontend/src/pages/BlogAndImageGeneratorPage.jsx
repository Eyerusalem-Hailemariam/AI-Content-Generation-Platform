import React from 'react';
import { Box, Container } from '@mui/material';
import BlogPostGenerator from '../components/BlogPostGenerator/BlogPostGenerator';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator';
import Header from '../components/Header/Header';

export default function BlogAndImageGeneratorPage() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)', py: 6 }}>
      <Header />
      <Container maxWidth="xl">
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
    </Box>
  );
} 