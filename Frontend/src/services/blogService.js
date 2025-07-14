import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

async function generateBlog(prompt, token) {

    console.log("prompt", prompt) 
    console.log("token in blog", token)

    try {
        const requestOptions = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json',
            'x-access-token' : token
        },
        body: JSON.stringify(prompt)
    };

        const response = await axios('http://localhost:5000/api/generate-blog', requestOptions);

        console.log("response", response);
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
