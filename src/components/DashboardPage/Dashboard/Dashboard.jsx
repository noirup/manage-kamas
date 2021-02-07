import React from 'react'
import './Dashboard.css'
import { Tab, Row, Col, ListGroup, Form } from "react-bootstrap";

function DashboardContainer({
    activeKey,
    onKeyChangeEvent,
    servers,
    newServer,
    setNewServer,
    submitNewServer
}) {

    const onChangeNewServerEvent = (e) => {
        setNewServer(e.target.value);
    }

    const onSubmitNewServer = () => {
        if (newServer) {
            submitNewServer();
            setNewServer("");
        }
    }

    return (
        <div className="main-div">
            <Tab.Container id="list-group-tabs-example" activeKey={"#"+activeKey}>
            <Row className="left-list">
                <Col sm={4}>
                <ListGroup>
                    <ListGroup.Item disabled className="serveur-style">
                    <div>Servers</div>
                    </ListGroup.Item>
                    {servers.map((server) => 
                    <ListGroup.Item onClick={onKeyChangeEvent} key={server.serverName} action href={"#"+server.serverName}><div>{server.serverName}</div></ListGroup.Item>
                    )}
                    <ListGroup.Item className="add-server-style" >
                        <Form onSubmit={onSubmitNewServer}><Form.Group><Form.Label></Form.Label><Form.Control required value={newServer} onChange={onChangeNewServerEvent} placeholder="Add a new server" type="text"/></Form.Group></Form>
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content>
                    {servers.map((server) => 
                    <Tab.Pane key={server.serverName} eventKey={"#"+server.serverName}>{server.serverName}</Tab.Pane>
                    )}
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </div>
    )
}

export default DashboardContainer;
