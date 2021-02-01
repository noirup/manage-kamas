import React, { useState } from 'react';
import { Form, Button, InputGroup } from "react-bootstrap";
import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

function LoginForm({
        loginSubmit,
        onChangeLogin,
        onChangePassword
    }){
    const [validated, setValidated] = useState(false);
    const [text, setText] = useState(<p></p>);
    const onSubmitEvent = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        const resp = await loginSubmit();
        const style = {
            margin: '2%'
        };
        if(!resp){
            setValidated(false);
            setText(<p style={style} className="alert alert-warning">Unable to find user</p>);
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
    return (
        <Form noValidate validated={validated} onSubmit={onSubmitEvent}>
            <Form.Group controlId="formBasicLogin">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Prepend>
                    <Form.Control required onChange={onChangeLoginEvent} type="text" placeholder="Enter Username" />
                    <Form.Control.Feedback type="invalid">Please fill in your use name.</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    {text}
                    </Form.Text>
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
        </Form>
    );
}

export default LoginForm;