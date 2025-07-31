import axios from'axios'


async function imageGenerator(prompt, token, user_id) {

    console.log("prompt", prompt);
    console.log("token in blog", token);
    console.log("user_id", user_id);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}api/generate-image`,
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
async function getImages(id, token) {

    console.log("id this image", id)

    try { 
        console.log("response image", id)
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/get-image/${id}`,
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

const imageService = {
    imageGenerator,
    getImages
 };
 export default imageService; 