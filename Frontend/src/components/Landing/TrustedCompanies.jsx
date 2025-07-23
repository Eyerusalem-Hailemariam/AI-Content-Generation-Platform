import React from 'react';
import { Box, Typography } from '@mui/material';

const companyLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_logo_black.svg',
];

const logosToShow = [...companyLogos, ...companyLogos]; 
const LOGO_WIDTH = 120;
const GAP = 24; 
const VISIBLE_LOGOS = 4;
const CONTAINER_WIDTH = LOGO_WIDTH * VISIBLE_LOGOS + GAP * (VISIBLE_LOGOS - 1); 
const TrustedCompanies = () => (
  <Box sx={{ py: 8, background: 'white', overflow: 'hidden' }}>
    <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
      Trusted by companies of all sizes
    </Typography>
    <Box
      sx={{
        width: { xs: '100%', md: `${CONTAINER_WIDTH}px` },
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        mx: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: `${GAP}px`,
          animation: 'scrollLeft 15s linear infinite',
          '@keyframes scrollLeft': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {logosToShow.map((logo, idx) => (
          <Box
            key={idx}
            component="img"
            src={logo}
            alt={`Company logo ${idx + 1}`}
            sx={{ maxHeight: 60, width: `${LOGO_WIDTH}px`, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.8 }}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

export default TrustedCompanies; 