import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    };
    const handleHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'transparent',
                color: 'black',
                px: { xs: 2, md: 6 },
                py: 1,
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
                <Link
                    href="/"
                    underline="none"
                    color="inherit"
                    onClick={handleHome}
                    sx={{ cursor: 'pointer' }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        My Application
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, md: 0 } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSignup}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s ease-in-out',
                            },
                        }}
                    >
                        Signup
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
