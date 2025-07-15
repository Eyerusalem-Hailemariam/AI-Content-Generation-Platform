import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';


async function generateBlog(prompt, token, user_id) {
    console.log("prompt", prompt);
    console.log("token in blog", token);
    console.log("user_id", user_id);

    try {
      
        const response = await axios.post(
            `${API_BASE_URL}/generate-blog`,
            { prompt, user_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("response", response);
        return response.data.blog;
    } catch (error) {
        console.error('Error generating blog:', error);
        throw error;
    }
}

const generateService = {
   generateBlog
};
export default generateService; 

