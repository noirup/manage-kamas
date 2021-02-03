import React, {useContext} from 'react';
import { AuthenticationContext } from "../../contexts/Authentication/Authentication";
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const context = useContext(AuthenticationContext);
    context.jWTChange("");
    return (
        <Redirect to="/login"></Redirect>
    )
}

export default Logout;