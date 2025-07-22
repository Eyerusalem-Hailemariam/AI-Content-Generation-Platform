import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Landing/Footer';
import getAuth from '../../Utility/auth';
import imageService from '../../services/imageServices';
import Sidebar from '../Sidebar/Sidebar';
import ImageGenerator from '../ImageGenerator/ImageGenerator';

export default function GenerateImage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = getAuth();
  const token = user.user_token;
  const id = user.user_id;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const imageRes = await imageService.getImages(id, token);
        setImages(imageRes.data.blogs || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
        <Header/>
          <Container
            maxWidth="xl"
            sx={{
              pt: 4,
              pb: 4,
              background: 'linear-gradient(135deg, rgb(237, 245, 238) 0%, #e0f7fa 100%)',
            }}
          >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={4}>
                Image Generator & History
              </Typography>

              {/* Flexbox layout for side by side */}
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                {/* Image Generator */}
                <Box sx={{ flex: 1 }}>
                  <ImageGenerator />
                </Box>

                {/* Image History */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                    {images.length === 0 ? (
                      <Typography color="text.secondary">No image history yet.</Typography>
                    ) : (
                      images.map((img, idx) => (
                        <Paper key={`img-${idx}`} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Generated Image
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Prompt: {img.prompt}
                          </Typography>
                          <Box
                            component="img"
                            src={img.imageUrl}
                            alt="Generated"
                            sx={{ width: '100%', borderRadius: 2, boxShadow: 1, mb: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(img.createdAt).toLocaleString()}
                          </Typography>
                        </Paper>
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
