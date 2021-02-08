import React from 'react'
import { Modal, Button, Form } from "react-bootstrap";

function AddDungeon({
    onSubmitNewDungeon,
    newDungeon,
    onChangeNewDungeonEvent,
    show,
    handleClose
}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Form validated onSubmit={onSubmitNewDungeon}>
                <Modal.Header closeButton>
                <Modal.Title>Add a new Dungeon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group>
                            <Form.Label>Dungeon name</Form.Label>
                            <Form.Control required value={newDungeon} onChange={onChangeNewDungeonEvent} placeholder="Dungeon name" type="text"/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddDungeon;