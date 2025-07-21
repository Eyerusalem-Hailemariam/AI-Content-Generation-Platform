import axios from "axios";

async function login(userData) {

    try {

        console.log(userData);

        const response = await axios.post("http://localhost:5000/api/user/login", {
            email: userData.email,
            password : userData.password
        })

        return response;
    } catch(error) {

    }
}

const logOut = () => {
    localStorage.removeItem("employee");
};

const loginService = {
    login,
    logOut
}

export default loginService;