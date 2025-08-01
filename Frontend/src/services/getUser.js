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
async function sendResetEmail(email){
    console.log(email)
    try {
        const response = await axios.post(
             `${import.meta.env.VITE_BASE_PATH}/api/send-otp`, 
             {email},
             {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`
                }
            })
        return response.data
    } catch(err){
        console.error('Error in sendEmail:', err);
        throw err;
    }
}

async function verifyOtpAndChangePassword({ email, otp, newPassword }){
    console.log("email", email);
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_PATH}/api/verify-otp`, 
            { email, otp, newPassword },
            {
               headers: {
                   'Content-Type': 'application/json',
                   // Authorization: `Bearer ${token}`
               }
           })
       return response.data 
    }catch(err) {

    }
}
const userService = {
    getUser,
    sendResetEmail,
    verifyOtpAndChangePassword
 };
export default userService; 