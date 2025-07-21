import React, {useState, useEffect, useContext} from "react";

import getAuth from '../Utility/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{

    const [isLogged, setIsLogged] = useState(false);
    
    const value ={isLogged, setIsLogged};

    useEffect(() => {
        const loggedInUser = getAuth();
        console.log(loggedInUser);

        if (loggedInUser && loggedInUser.user_token) {
            setIsLogged(true);
        }
    }, []);

    console.log(value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}