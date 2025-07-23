import React from 'react';
import { Box, Typography, Paper, Avatar, Rating, useTheme } from '@mui/material';

const testimonials = [
  {
    name: 'Leslie Alexander',
    role: 'CEO, Parkview Int.Ltd',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    name: 'Cody Fisher',
    role: 'CEO, Parkview Int.Ltd',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    name: 'Robert Fox',
    role: 'CEO, Parkview Int.Ltd',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
  {
    name: 'Michael Lee',
    role: 'CEO, Parkview Int.Ltd',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
  },
  {
    name: 'Sara Ali',
    role: 'CEO, Parkview Int.Ltd',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
  },
];

const CARD_WIDTH = 340;
const GAP = 32;
const VISIBLE_CARDS = 3;
const CONTAINER_WIDTH = CARD_WIDTH * VISIBLE_CARDS + GAP * (VISIBLE_CARDS - 1); // 1084px
const testimonialsLoop = [...testimonials, ...testimonials]; // duplicate for seamless loop

export default function Testimonial() {
  const theme = useTheme();
  return (
    <Box sx={{ py: 8, background: '#fff', overflow: 'hidden' }}>
      <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
        What Our  Client Say
      </Typography>
      <Box
        sx={{
          width: { xs: '100%', md: `${CONTAINER_WIDTH}px` },
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative',
          mx: 'auto',

        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: `${GAP}px`,
            animation: 'marqueeLeft 30s linear infinite',
            '@keyframes marqueeLeft': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: `translateX(-${(CARD_WIDTH + GAP) * testimonials.length}px)` },
            },
          }}
        >
          {testimonialsLoop.map((t, idx) => (
            <Box key={idx} sx={{ position: 'relative', minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH, flex: '0 0 auto' }}>
              {/* Avatar Overlapping */}
                      <Avatar
                src={t.avatar}
                alt={t.name}
                sx={{
                width: 64,
                height: 64,
                position: 'absolute',
                left: '50%',
                top: 35,
                transform: 'translate(-50%, -50%)', 
                boxShadow: 3,
                border: '4px solid #fff',
                zIndex: 2,
                background: '#fff',
                }}
                />
                      <Paper
                elevation={3}
                sx={{
                  mt: 6,
                  pt: 10,
                  pb: 3,
                  px: 3,
                  borderRadius: 4,
                  minHeight: 240,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'left',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  position: 'relative',
                }}
              >
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {t.text}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {t.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={t.rating} precision={0.5} readOnly sx={{ color: '#FFC107' }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t.role}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}


