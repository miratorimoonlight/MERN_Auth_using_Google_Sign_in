import React, {createContext, useState, useEffect} from 'react'
import AuthService from '../api_call/AuthService';

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [user, setUser] = useState({email: ""});
    const [isAuth, setIsAuth] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthService.isAuthenticated().then(jsonData => {
            console.log("..isAuthenticated..", jsonData)
            if(jsonData.success) {
                setUser(jsonData.user);
                setIsAuth(true);
                setIsVerified(jsonData.isVerified);
            }
            setIsLoaded(true)
        })
    }, [])
    
    return (
        <React.Fragment>
            {
                isLoaded ? 
                <AuthContext.Provider value={{user, setUser, isAuth, setIsAuth, isVerified, setIsVerified}}>
                    {children}
                </AuthContext.Provider>
                :
                <div className="text-center">Loading...</div> 
            }
        </React.Fragment>
    )
}
