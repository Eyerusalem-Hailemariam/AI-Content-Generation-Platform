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
          flexWrap: 'wrap',
        }}
      >

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isLogged && <Logo />}
        </Box>

        
        {!isLogged && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('features')}>Features</Button>
            <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('companies')}>Partner</Button>
            <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('testimonial')}>Testimonial</Button>
            <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('price')}>Pricing</Button>
          </Box>
        )}


<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  {isLogged ? (
    <>
      <Avatar alt={name || "User"} src={user?.avatarUrl || ""} />
      <Typography variant="subtitle1" fontWeight="bold" color='black'>
        {name || "User"}
      </Typography>
      <Button
        onClick={logOut}
        sx={{
          color: 'black', // make text black
          fontWeight: 'bold', // make text bold
          textTransform: 'none',
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
        borderRadius: '20px',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#115293',
        },
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
