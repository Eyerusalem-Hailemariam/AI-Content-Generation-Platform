import axios from'axios'

async function imageGenerator(prompt, token, user_id) {

    console.log("prompt", prompt);
    console.log("token in blog", token);
    console.log("user_id", user_id);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/generate-image",
            { prompt, user_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("response", response);
        
        return response

    } catch(error) {
        console.log(error)
    }
}


const imageService = {
    imageGenerator
 };
 export default imageService; 