import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Button } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Landing/Footer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageIcon from '@mui/icons-material/Image';
import BlogPostGenerator from '../BlogPostGenerator/BlogPostGenerator';
import ImageGenerator from '../ImageGenerator/ImageGenerator';
import getAuth from '../../Utility/auth';
import generateService from '../../services/blogService';
import imageService from '../../services/imageServices';

export default function Dashboard() {
  const [showBlogGen, setShowBlogGen] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [images, setImages] = useState([]);
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
        const imageRes = await imageService.getImages(id, token);
        setImages(imageRes.data.blogs || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Welcome to your AI Content Dashboard
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Generate Blog Post
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Create high-quality blog posts with AI in seconds.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowBlogGen((prev) => !prev)}
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
              >
                {showBlogGen ? 'Hide' : 'Start Writing'}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <ImageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Generate Image
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Instantly create unique images for your content.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowImageGen((prev) => !prev)}
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
              >
                {showImageGen ? 'Hide' : 'Generate Image'}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4}>
          {showBlogGen && (
            <Box mb={4}>
              <BlogPostGenerator />
            </Box>
          )}
          {showImageGen && (
            <Box mb={4}>
              <ImageGenerator />
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* History Section */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          History
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Blog history on left */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Blog History
            </Typography>
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
          </Grid>

          {/* Image history on right */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Image History
            </Typography>
            <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
              {images.length === 0 ? (
                <Typography color="text.secondary">No image history yet.</Typography>
              ) : (
                images.map((img, idx) => (
                  <Paper key={`img-${idx}`} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Generated Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Prompt: {img.prompt}
                    </Typography>
                    <Box
                      component="img"
                      src={img.imageUrl}
                      alt="Generated"
                      sx={{ width: '100%', borderRadius: 2, boxShadow: 1, mb: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                      onClick={() => {
                        // Create a temporary link and trigger download
                        const link = document.createElement('a');
                        link.href = img.imageUrl;
                        link.download = `generated-image-${idx}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Download
                    </Button>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(img.createdAt).toLocaleString()}
                    </Typography>
                  </Paper>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
