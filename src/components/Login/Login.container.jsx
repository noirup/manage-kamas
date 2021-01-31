import React, {useState, useContext} from 'react';
import LoginForm from './LoginForm/LoginForm';
import {AuthenticationContext} from '../../contexts/Authentication/Authentication';
import {Redirect} from 'react-router-dom';

function LoginContainer (){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(AuthenticationContext);

    const loginSubmit = async () => {
        let resp = await fetch("/api/users/me", {
            method: "post",
            body: JSON.stringify({
                username: login,
                password: password
            }),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(resp => {
            return resp.json();
        }).catch(err => console.log(err))

        console.log("Connection successfull,", resp.success)

        if (resp.success) {
            context.jWTChange(resp.token);
        }
        
        return resp.success;
    }

    const onChangeLogin = (username) => {
        setLogin(username);
    }

    const onChangePassword = (password) => {
        setPassword(password);
    }

    if(context.isConnected()){
        return <Redirect to="/"></Redirect>
    } else {
        return (
            <LoginForm 
                loginSubmit={loginSubmit}
                onChangeLogin={onChangeLogin}
                onChangePassword={onChangePassword}/>
        )
    }
}


export default LoginContainer;