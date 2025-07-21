import React, { useState } from 'react';
import loginService from '../../services/loginServices';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const response = await loginService.login(formData);
    if (response.data.status === 'success') {
      if (response.data.data && response.data.data.user_token) {
        localStorage.setItem("user", JSON.stringify({ user_token: response.data.data.user_token }));
      }
      setSuccess('Logged in successfully');
      setFormData({ email: '', password: '' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError(response.data.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 4, boxShadow: 6, p: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <LockOpenIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Welcome back! Sign in to your account
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2, mb: 1 }}>{success}</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, fontWeight: 'bold', borderRadius: 2, boxShadow: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don&apos;t have an account?{' '}
                <a href="/signup" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>
                  Sign up
                </a>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Login;
