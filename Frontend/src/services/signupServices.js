import axios from 'axios';
import generateService from './blogService';

async function signup(userData) {
    console.log("userData", userData);
    try {
        console.log("userData", userData);
        const response = await axios.post(`${import.meta.env.VITE_BASE_PATH}api/user/sign`, {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        console.log("response", response)
        return response
    } catch {

    }
}

const signupService = {
    signup
}
export default signupService;