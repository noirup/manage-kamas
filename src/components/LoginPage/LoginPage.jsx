import React from "react";
import Title from "../Title/Title";
import LoginContainer from "../Login/Login.container";
import './LoginPage.css'


function LoginPage() {
  return (
    // <> is a shortcut for React.Fragment which because return must return a single component but we want to return
    // a sequence of components
    <div className="form-style" >
      <Title>Login</Title>
      <LoginContainer />
    </div>
  );
}

export default LoginPage;
