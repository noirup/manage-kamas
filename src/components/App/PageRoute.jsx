import React, {useContext} from "react";

import {Switch, Route, Redirect} from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";
import {AuthenticationContext} from '../../contexts/Authentication/Authentication';

function PageRoute() {
    const context = useContext(AuthenticationContext);
    if(context.isConnected()){
        return (
            <Switch>
                <Route path="/" component={DashboardPage}/>
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Redirect to="/login" />;
            </Switch>
        )
    }
}

export default PageRoute;
