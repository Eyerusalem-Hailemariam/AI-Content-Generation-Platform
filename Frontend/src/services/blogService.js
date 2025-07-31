import axios from 'axios';



async function generateBlog(prompt, token, user_id) {
    console.log("prompt", prompt);
    console.log("token in blog", token);
    console.log("user_id", user_id);

    try {
      
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/generate-blog`,
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


async function getBlog(id, token) {

    console.log("id this", id)

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/get-blog/${id}`,
            {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
        );

        console.log("response", response);
        return response;
    } catch(error) {

    }
}

const generateService = {
   generateBlog,
   getBlog
};
export default generateService; 

