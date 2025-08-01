import axios from 'axios'; 


async function getUser(id, token) {
    try {
        console.log("Calling backend with id:", id, "and token:", token);
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_PATH}/api/get-user/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("response data in getUser:", response.data);
        return response.data.credits;
    } catch (error) {
        console.error('Error in getUser:', error);
        throw error;
    }
}

const userService = {
    getUser
 };
 export default userService; 