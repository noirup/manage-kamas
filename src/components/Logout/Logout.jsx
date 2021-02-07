import React, { useContext, useEffect } from 'react';
import { AuthenticationContext } from "../../contexts/Authentication/Authentication";
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const context = useContext(AuthenticationContext);

    useEffect(() => {
        context.jWTChange("");
    });
    
    return (
        <Redirect to="/login"></Redirect>
    )
}

export default Logout;