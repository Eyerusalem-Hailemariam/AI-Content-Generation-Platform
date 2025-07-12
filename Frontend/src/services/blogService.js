import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

async function generateBlog(prompt) {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-blog`, { prompt});

        return response.data.blog;

    } catch(error) {
        console.error('Error generating blog:', error);
        throw error;
    }
}


const generateService = {
   generateBlog
  }
  export default generateService; 
