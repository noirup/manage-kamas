import React, { useContext } from 'react';
import LoginForm from './LoginForm/LoginForm';
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import { Redirect } from 'react-router-dom';
import { isEmpty } from '../../utils/utils';

function LoginContainer (){

    const context = useContext(AuthenticationContext);

    const loginSubmit = async (login, password) => {
        let resp = await fetch("/api/user/authenticate", {
            method: "post",
            body: JSON.stringify({
                login: login,
                password: password
            }),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(resp => {
            return resp.ok ? resp.json() : null;
        }).catch(err => console.log(err))

        if (isEmpty(resp)) {
            return false;
        }

        if (resp.token) {
            context.jWTChange(resp.token);
        }
        
        return true;
    }

    if(context.isConnected()){
        return <Redirect to="/"></Redirect>
    } else {
        return (
            <LoginForm 
                loginSubmit={loginSubmit} />
        )
    }
}


export default LoginContainer;