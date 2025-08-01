import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo/Logo';
import { useAuth } from '../../Context/AuthProvider';
import loginService from '../../services/loginServices';
import { Typography, Avatar } from '@mui/material';
import getAuth from '../../Utility/auth';

function Header() {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();

  const user = getAuth();
  const token = user.user_token;
  const id = user.user_id;
  const name = user.user_name;

  console.log("username in header", name);

  const handleSignup = () => {
    navigate('/signup');
  };

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
    navigate('/signup');
  };

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        background: 'white',
        color: 'black',
        px: { xs: 2, md: 6 },
        py: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    minHeight: 64,
    px: 0,
  }}
>
  {/* Logo Section */}
  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    {!isLogged && <Logo />}
  </Box>

  {/* Nav Links */}
  {!isLogged && (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 3,
        height: '100%',
      }}
    >
      {['Home', 'Features', 'Partner', 'Testimonial', 'Pricing'].map((item) => (
        <Button
          key={item}
          color="inherit"
          onClick={() =>
            item === 'Home' ? navigate('/') : handleScroll(item.toLowerCase())
          }
          sx={{
            fontSize: 17,
            fontWeight: 'bold',
            textTransform: 'none',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {item}
        </Button>
      ))}
    </Box>
  )}

  {/* Right Controls */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: '100%',
    }}
  >
    {isLogged ? (
      <>
        <Avatar
          alt={name || 'User'}
          src={user?.avatarUrl || ''}
          sx={{ width: 32, height: 32 }}
        />
        <Typography
          variant="body2"
          fontWeight="bold"
          color="black"
          sx={{
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {name || 'User'}
        </Typography>
        <Button
          onClick={logOut}
          variant="text"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'none',
            height: 36,
            display: 'flex',
            alignItems: 'center',
            px: 2,
          }}
        >
          Log Out
        </Button>
      </>
    ) : (
      <Button
        variant="contained"
        onClick={handleSignup}
        sx={{
          height: 40,
          minWidth: 100,
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Sign Up
      </Button>
    )}
  </Box>
</Toolbar>

    </AppBar>
  );
}

export default Header;
