import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 4,
            mb: 2,
          }}
        >
          
          {/* Get In Touch */}
          <Box sx={{ minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body2">Our Address</Typography>
            <Typography variant="body2">1234 AI Content Generation St.</Typography>
            <Typography variant="body2">Addis Ababa, AA 94101</Typography>
            <Typography variant="body2">Ethiopia</Typography>
          </Box>

          {/* Contact Us */}
          <Box sx={{ minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Phone: +251 912345678</Typography>
            <Typography variant="body2">Email: support@aicontentgenerationplatform.com</Typography>
            <Typography variant="body2">Operating Hours: 9 AM - 6 PM (Mon - Fri)</Typography>
          </Box>

          {/* Follow Us */}
          <Box sx={{ minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="https://facebook.com" color="inherit" underline="hover">
                Facebook
              </Link>
              <Link href="https://twitter.com" color="inherit" underline="hover">
                Twitter
              </Link>
              <Link href="https://linkedin.com" color="inherit" underline="hover">
                LinkedIn
              </Link>
              <Link href="https://instagram.com" color="inherit" underline="hover">
                Instagram
              </Link>
              <Link href="https://youtube.com" color="inherit" underline="hover">
                YouTube
              </Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#555', my: 2 }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} AI Content Generation Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
