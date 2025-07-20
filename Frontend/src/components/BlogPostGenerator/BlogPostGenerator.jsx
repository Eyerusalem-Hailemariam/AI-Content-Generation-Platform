import React, { useState } from 'react';
import generateService from '../../services/blogService';
import getAuth from '../../Utility/auth';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Fade,
  Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

function BlogPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generateBlog, setGeneratedBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = getAuth();
  const token = user.user_token;
  const id = user.user_id;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setGeneratedBlog('');
    try {
      const blog = await generateService.generateBlog(prompt, token, id);
      setGeneratedBlog(blog);
    } catch (error) {
      setError('Failed to generate blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, width: '100%', borderRadius: 4, boxShadow: 6, p: 2 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Blog Post Generator
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Enter a prompt and let our AI generate a high-quality blog post for you!
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Write your blog prompt here..."
          placeholder="e.g. Benefits of morning meditation"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          maxRows={8}
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box display="flex" alignItems="center" mb={2}>
          <LightbulbIcon sx={{ color: 'warning.main', mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Tip: Be specific. For example, "Write a blog about remote work productivity tips".
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ fontWeight: 'bold', borderRadius: 2, boxShadow: 2, mb: 2 }}
          startIcon={loading ? <CircularProgress size={22} color="inherit" /> : <AutoAwesomeIcon />}
        >
          {loading ? 'Generating...' : 'Generate Blog Post'}
        </Button>

        <Fade in={!!generateBlog}>
          <Box mt={4} className="generated-blog">
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary.main">
              Generated Blog Post:
            </Typography>
            <Box
              sx={{
                background: 'rgba(66, 165, 245, 0.07)',
                borderRadius: 2,
                p: 3,
                boxShadow: 1,
                color: 'text.primary',
                whiteSpace: 'pre-line',
                fontSize: '1.08rem',
                fontFamily: 'inherit',
                maxHeight: 400,
                overflowY: 'auto',
              }}
            >
              {generateBlog}
            </Box>
          </Box>
        </Fade>

        <Divider sx={{ my: 3 }} />

        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Powered by AI Content Generator © 2025
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogPostGenerator;
