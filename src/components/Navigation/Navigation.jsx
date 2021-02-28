import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import NavLinkItem from "./NavLinkItem";
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';


function Navigation({style,...otherProps}) {
  const context = useContext(AuthenticationContext);
  if(context.isConnected()){
    return (    
      <Navbar style={{...style}} {...otherProps} expand="sm">
        <Navbar.Brand as={Link} to="/kamas" className="ml-3">Kamas Management</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLinkItem as={Link} to="/kamas">Kamas</NavLinkItem>
          <NavLinkItem as={Link} to="/logout">Logout</NavLinkItem>
        </Nav>
      </Navbar>
    );
  } else {
    return (
      <Navbar style={{...style}} {...otherProps} expand="sm">
        <Navbar.Brand as={Link} to="/" className="ml-3">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLinkItem as={Link} to="/login">Login</NavLinkItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;