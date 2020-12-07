//.............IMPORTS...............//

import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import AuthService from '../api_call/AuthService';
import {AuthContext} from '../context/AuthContext';

//.............IMPORTS...............//



class Navbar extends Component {
    static contextType = AuthContext;
    handleLogout = ()=> {
        AuthService.logout().then(jsonData => {
            if(jsonData.success){
                this.context.setUser({email: ""});
                this.context.setIsAuth(false);
                this.context.setIsVerified(false);
            }
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/" exact>Navbar</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/protect1" exact>Protect1 </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/protect2" exact>Protect2 </NavLink>
                        </li>
                        {
                            this.context.isAuth?
                            <li className="nav-item">
                                <button className="btn btn-secondary" onClick={this.handleLogout}> Logout </button>
                            </li>
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login"> Login </NavLink>
                            </li>
                        }
                        
                    </ul>
                </div>
            </nav>
        )
    }
}


export default Navbar