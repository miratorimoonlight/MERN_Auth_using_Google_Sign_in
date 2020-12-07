import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export default function ProtectedRoute({component: Component, ...rest}) {
    const {isAuth} = useContext(AuthContext);
    return (
        <Route 
            {...rest}
            render = {routeProps => {
                if(isAuth) {
                    return <Component {...routeProps} />
                }
                return <Redirect to={ {pathname: "/login", state: {from: routeProps.location}} }/>
            }}
        />
    )
}
