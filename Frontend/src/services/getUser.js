import axios from 'axios'; 
const API_BASE_URL = 'http://localhost:5000/api';

async function getUser(id, token) {
    try {
        console.log("Calling backend with id:", id, "and token:", token);
        const response = await axios.get(
            `${API_BASE_URL}/get-user/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("response data in getUser:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getUser:', error);
        throw error;
    }
}

const userService = {
    getUser
 };
 export default userService; 