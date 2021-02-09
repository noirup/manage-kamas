import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

function LoginForm({
        loginSubmit,
        onChangeLogin,
        onChangePassword
    }){
    
    const [validated, setValidated] = useState(false);

    const [text, setText] = useState(<p></p>);

    const onSubmitEvent = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const resp = await loginSubmit();
            if(!resp){
                setValidated(false);
                setText(<Alert variant="warning">Unable to find a user</Alert>);
            }
        }
    }

    const onChangeLoginEvent = (e) => {
        e.preventDefault();
        onChangeLogin(e.target.value);
    }

    const onChangePasswordEvent = (e) => {
        e.preventDefault();
        onChangePassword(e.target.value);
    }
    
    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/register`; 
        history.push(path);
    }
    return (
        <Form validated={validated} onSubmit={onSubmitEvent}>
            <Form.Text>
                    {text}
            </Form.Text>
            <Form.Group controlId="formBasicLogin">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Prepend>
                    <Form.Control required onChange={onChangeLoginEvent} type="text" placeholder="Enter Username" />
                    <Form.Control.Feedback type="invalid">Please fill in your use name.</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FontAwesomeIcon icon={faKey} />
                    </InputGroup.Prepend>
                    <Form.Control required type="password" placeholder="Password" onChange={onChangePasswordEvent} />
                    <Form.Control.Feedback type="invalid">Please fill in your password.</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group className="button-container">
                <Button variant="light" type="submit">
                    Submit
                </Button>
            </Form.Group>
            <hr/>
            <Form.Group className="no-margin">
                <Button className="href-button-style" onClick={routeChange} variant="link">Click here to create an account</Button>
            </Form.Group>
        </Form>
    );
}

export default LoginForm;