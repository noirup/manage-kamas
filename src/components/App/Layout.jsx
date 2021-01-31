import React from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import PageRoute from "./PageRoute";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col className="p-0 m-0">
          <Navigation
            variant="dark"
          />
        </Col>
      </Row>

      <Row>
        <Col className="p-0 m-0">

          <PageRoute/>
         
        </Col>
      </Row>

    </Container>
  );
}

export default Layout;
