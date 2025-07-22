const getAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("user from localStorage:", user);

    if (user && user.user_token) {
        const decodedToken = decodeTokenPayload(user.user_token);
        user.user_email = decodedToken.user_email; 
        user.user_id = decodedToken.user_id;   
        user.user_name = decodedToken.user_name;    

        return user;
    } else {
        return {};
    }
};

const decodeTokenPayload = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
};

export default getAuth;
