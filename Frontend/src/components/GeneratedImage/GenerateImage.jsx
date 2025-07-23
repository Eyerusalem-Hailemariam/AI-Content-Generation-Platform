import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Paper, Alert, Button, Avatar
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import getAuth from '../../Utility/auth';
import loginService from '../../services/loginServices';
import imageService from '../../services/imageServices';
import ImageGenerator from '../ImageGenerator/ImageGenerator';

export default function GenerateImage() {
  const [images, setImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();
  const user = getAuth();
  const { user_token: token, user_id: id, user_name: name, avatarUrl } = user || {};

  const handleSignup = () => navigate('/signup');

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
    navigate('/signup');
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await imageService.getImages(id, token);
        setImages(res.data.blogs || []);
      } catch (error) {
        if (error.response?.data?.error === 'Insufficient credits') {
          enqueueSnackbar('Your credits have finished. Please purchase more to continue.', { variant: 'warning' });
          navigate('/payment');
        }
      }
    };
    fetchHistory();
  }, [id, token, enqueueSnackbar, navigate]);

  const renderTopBar = () => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'white', px: 2, py: 2, height: 65 }}>
      {isLogged ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt={name || 'User'} src={avatarUrl || ''} />
          <Typography variant="subtitle1" fontWeight="bold" color="black">{name || 'User'}</Typography>
          <Button onClick={logOut} sx={{ color: 'black', fontWeight: 'bold', textTransform: 'none' }}>Log Out</Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
        >
          Sign Up
        </Button>
      )}
    </Box>
  );

  const renderImageHistory = () => (
    <Box sx={{ flex: 1, maxHeight: 500, overflowY: 'auto' }}>
      {images.length === 0 ? (
        <Typography color="text.secondary">No image history yet.</Typography>
      ) : (
        images.map((img, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Generated Image</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Prompt: {img.prompt}
            </Typography>
            <Box
              component="img"
              src={img.imageUrl}
              alt="Generated"
              sx={{ width: '100%', borderRadius: 2, boxShadow: 1, mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {new Date(img.createdAt).toLocaleString()}
              </Typography>
              <a
                href={img.imageUrl}
                download={`generated_image_${idx + 1}.jpg`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Download
                </Button>
              </a>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {renderTopBar()}

      <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={4}>Image Generator & History</Typography>

          <Alert severity="info" sx={{ mb: 4 }}>
            Free trial includes <strong>10 credits</strong>. If you want to add more, you can buy credits on the{' '}
            <Typography
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/payment')}
            >
              Payment Page
            </Typography>.
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ImageGenerator />
            </Box>
            {renderImageHistory()}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
