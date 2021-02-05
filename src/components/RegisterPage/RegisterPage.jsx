import React from "react";
import Title from "../Title/Title";
import RegisterContainer from "../Register/Register.container";
import './RegisterPage.css'


function RegisterPage() {
  return (
    // <> is a shortcut for React.Fragment which because return must return a single component but we want to return
    // a sequence of components
    <div className="form-style" >
      <Title>Register</Title>
      <RegisterContainer />
    </div>
  );
}

export default RegisterPage;
