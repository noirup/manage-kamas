import React, {useContext} from "react";

import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "../DashboardPage/Dashboard.container";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Logout from "../Logout/Logout";
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';

function PageRoute() {
    const context = useContext(AuthenticationContext);
    if(context.isConnected()){
        return (
            <Switch>
                <Route path="/logout" component={Logout}/>
                <Route path="/kamas" component={Dashboard}/>
                <Redirect to="/kamas" />;
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Redirect to="/login" />;
            </Switch>
        )
    }
}

export default PageRoute;
