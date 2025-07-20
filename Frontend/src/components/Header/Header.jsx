import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo/Logo';

function Header() {
    const navigate = useNavigate();

    const handleSignup = () => {
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
            position="static"
            elevation={0}
            sx={{
                background: 'white',
                color: 'black',
                px: { xs: 2, md: 6 },
                py: 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Logo />
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                    <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigate('/')}>Home</Button>
                    <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('features')}>Features</Button>
                    <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('companies')}>Partner</Button>
                    <Button color="inherit" sx={{ fontSize: 17, fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleScroll('testimonial')}>Testimonial</Button>
                </Box>

                {/* Signup Button */}
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
            </Toolbar>
        </AppBar>
    );
}

export default Header;
