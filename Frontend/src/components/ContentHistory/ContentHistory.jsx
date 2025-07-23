import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Paper, Alert, Button, Avatar
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import getAuth from '../../Utility/auth';
import loginService from '../../services/loginServices';
import generateService from '../../services/blogService';
import BlogPostGenerator from '../BlogPostGenerator/BlogPostGenerator';

export default function ContentHistory() {
  const [blogs, setBlogs] = useState([]);
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
        const res = await generateService.getBlog(id, token);
        setBlogs(res.data.blogs || []);
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
        <Button variant="contained" onClick={handleSignup} sx={{ borderRadius: 2, fontWeight: 'bold' }}>Sign Up</Button>
      )}
    </Box>
  );

  const renderBlogHistory = () => (
    <Box sx={{ flex: 1, maxHeight: 500, overflowY: 'auto' }}>
      {blogs.length === 0 ? (
        <Typography color="text.secondary">No blog history yet.</Typography>
      ) : (
        blogs.map((item, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Prompt: {item.prompt}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.generatedBlog}</Typography>
            <Typography variant="caption" color="text.secondary">{new Date(item.createdAt).toLocaleString()}</Typography>
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
          <Typography variant="h6" fontWeight="bold" mb={2}>Blog Post Generator & History</Typography>

          <Alert severity="info" sx={{ mb: 4 }}>
            Free trial includes <strong>10 credits</strong>. If you want to add more, you can buy credits on the{' '}
            <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/payment')}>
              Payment Page
            </Typography>.
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <BlogPostGenerator />
            </Box>
            {renderBlogHistory()}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
