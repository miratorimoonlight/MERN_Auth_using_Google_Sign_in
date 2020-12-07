import React, {useContext} from 'react';
import GoogleLogin from 'react-google-login';
import AuthService from '../api_call/AuthService';
import {AuthContext} from '../context/AuthContext';


function Login(props) {
    const {setUser, setIsAuth, setIsVerified} = useContext(AuthContext);

    const responseGoogle = (response) => {
        console.log("...response..", response)
        AuthService.googleLogin(response.tokenId).then(jsonData => {
            if(jsonData.success) {
                setUser(jsonData.user);
                setIsAuth(true);
                setIsVerified(true);
                //...........Redirect back to PREVIOUS protected path........//
                if(props.location.state)
                    props.history.replace(props.location.state.from)
                else
                    props.history.replace("/")
            }
        })
    }

    return (
        <div className="text-center">
            <br />
            <GoogleLogin  
                clientId="PUT YOUR CLIENT_ID HERE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login