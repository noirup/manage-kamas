import React, {useState, useContext} from 'react';
import RegisterForm from './RegisterForm/RegisterForm';
import {AuthenticationContext} from '../../contexts/Authentication/Authentication';
import {Redirect} from 'react-router-dom';
import { isEmpty } from '../../utils/utils';

function RegisterContainer (){

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(AuthenticationContext);

    const registerSubmit = async () => {
        let resp = await fetch("/api/user/register", {
            method: "post",
            body: JSON.stringify({
                login: login,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(resp => {
            return resp.json();
        }).catch(err => console.log(err))

        if (isEmpty(resp)) {
            return false;
        }

        if (resp.token) {
            context.jWTChange(resp.token);
        }
        
        return true;
    }

    const onChangeLogin = (username) => {
        setLogin(username);
    }

    const onChangeEmail = (username) => {
        setEmail(username);
    }

    const onChangePassword = (password) => {
        setPassword(password);
    }

    if(context.isConnected()){
        return <Redirect to="/"></Redirect>
    } else {
        return (
            <RegisterForm 
                registerSubmit={registerSubmit}
                onChangeLogin={onChangeLogin}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}/>
        )
    }
}


export default RegisterContainer;