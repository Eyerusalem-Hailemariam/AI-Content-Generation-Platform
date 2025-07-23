import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ContentHistory from '../components/ContentHistory/ContentHistory';
import { Box } from '@mui/material';

const GeneratedPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(245, 247, 247) 0%,rgb(247, 247, 247) 100%)',
      }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <ContentHistory />
      </Box>
    </Box>
  );
};

export default GeneratedPage;
