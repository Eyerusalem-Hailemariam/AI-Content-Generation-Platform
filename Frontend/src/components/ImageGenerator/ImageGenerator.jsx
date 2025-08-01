import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import imageService from '../../services/imageServices';
import getAuth from '../../Utility/auth';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user_token: token, user_id: id } = getAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setImage('');

    try {
      const { data } = await imageService.imageGenerator(prompt, token, id);
      setImage(data.image);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, width: '100%', borderRadius: 4, boxShadow: 6, p: 2 }}>
      <CardContent>

        {/* Header Section */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <ImageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Image Generator
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Enter a prompt and generate a stunning AI image instantly!
          </Typography>
        </Box>

        {/* Input */}
        <TextField
          label="Enter your image prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          maxRows={6}
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Error Message */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: 2,
            boxShadow: 2,
            mb: 2,
          }}
          startIcon={loading ? <CircularProgress size={22} color="inherit" /> : <ImageIcon />}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </Button>

        {/* Output Image */}
        {image && (
          <Box mt={3} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight="bold" mb={1} color="primary.main">
              Generated Image:
            </Typography>
            <Box
              component="img"
              src={image}
              alt="Generated"
              sx={{
                maxWidth: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ImageGenerator;
