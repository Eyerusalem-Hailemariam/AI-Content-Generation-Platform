import axios from'axios'

async function imageGenerator(prompt) {

    console.log("prompt in service", prompt);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/generate-image",
            { prompt },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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