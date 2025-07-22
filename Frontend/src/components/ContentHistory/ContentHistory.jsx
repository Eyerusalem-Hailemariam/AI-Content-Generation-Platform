import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Landing/Footer';
import getAuth from '../../Utility/auth';
import generateService from '../../services/blogService';
import Sidebar from '../Sidebar/Sidebar';
import BlogPostGenerator from '../BlogPostGenerator/BlogPostGenerator';

export default function ContentHistory() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = getAuth();
  const token = user.user_token;
  const id = user.user_id;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const blogRes = await generateService.getBlog(id, token);
        setBlogs(blogRes.data.blogs || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
        <Header />
          <Container
            maxWidth="xl"
            sx={{
              pt: 4,
              pb: 4,
              background: 'linear-gradient(135deg,rgb(237, 245, 238) 0%, #e0f7fa 100%)',
            }}
          >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={4}>
                Blog Post Generator & History
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                {/* Blog Post Generator */}
                <Box sx={{ flex: 1 }}>
                  <BlogPostGenerator />
                </Box>

                {/* Blog History */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                    {blogs.length === 0 ? (
                      <Typography color="text.secondary">No blog history yet.</Typography>
                    ) : (
                      blogs.map((item, idx) => (
                        <Paper key={`blog-${idx}`} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Prompt: {item.prompt}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.generatedBlog}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(item.createdAt).toLocaleString()}
                          </Typography>
                        </Paper>
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
