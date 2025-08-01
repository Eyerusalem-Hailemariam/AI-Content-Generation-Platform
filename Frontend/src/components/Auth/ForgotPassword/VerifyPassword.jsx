import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import userService from '../../../services/getUser';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Header/Logo/Logo';


function VerifyOtp() {
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate('')

  const { email } = useParams();


  const handleVerifyOtp = async () => {
    if (!otp || !newPassword) {
      setStatus('error');
      setMessage('Please fill in both OTP and new password.');
      return;
    }
  
    setLoading(true);
    setStatus(null);
    setMessage('');
  
    try {
      const res = await userService.verifyOtpAndChangePassword({ email, otp, newPassword });
  
      setStatus('success');
      setMessage(res.message || 'Password reset successful. You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error('Error from API:', err);
      setStatus('error');
      setMessage(
        err.response?.data?.message || 'Invalid OTP or server error.'
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Logo />
      </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography variant="body1" mb={3}>
          Enter the 6-digit OTP and your new password.
        </Typography>

        {status && (
          <Alert severity={status} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <TextField
          label="6-digit OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 6 }}
        />

        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleVerifyOtp}
          disabled={loading}
          sx={{ height: 45 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Verify & Reset Password'
          )}
        </Button>
      </Box>
    </Container>
  );
}

export default VerifyOtp;
