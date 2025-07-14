import axios from 'axios';
import generateService from './blogService';

async function signup(userData) {
    console.log("userData", userData);
    try {
        console.log("userData", userData);
        const response = await axios.post('http://localhost:5000/api/user/sign', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });

        return response
    } catch {

    }
}

const signupService = {
    signup
}
export default signupService;