import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import './RegisterForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

function RegisterForm({
        registerSubmit,
        onChangeEmail,
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
            const resp = await registerSubmit();
            if(!resp){
                setValidated(false);
                setText(<Alert variant="warning">Unable to create a user</Alert>);
            }
        }
    }

    const onChangeLoginEvent = (e) => {
        e.preventDefault();
        onChangeLogin(e.target.value);
    }

    const onChangeEmailEvent = (e) => {
        e.preventDefault();
        onChangeEmail(e.target.value);
    }

    const onChangePasswordEvent = (e) => {
        e.preventDefault();
        onChangePassword(e.target.value);
    }
    
    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/login`; 
        history.push(path);
    }

    return (
        <Form noValidate validated={validated} onSubmit={onSubmitEvent}>
            
            <Form.Text className="text-muted">
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

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Prepend>
                    <Form.Control required onChange={onChangeEmailEvent} type="text" placeholder="Enter Email" />
                    <Form.Control.Feedback type="invalid">Please fill in your email.</Form.Control.Feedback>
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
                <Button className="href-button-style" onClick={routeChange} variant="link">Click here to connect</Button>
            </Form.Group>
        </Form>
    );
}

export default RegisterForm;