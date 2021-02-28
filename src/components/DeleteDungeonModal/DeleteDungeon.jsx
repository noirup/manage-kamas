import React from 'react';
import './DeleteDungeon.css';
import { Modal, Button, Form } from "react-bootstrap";

function DeleteDungeon({
    deleteDungeon,
    dungeon,
    show,
    handleClose
}) {

    const onSubmitDeleteDungeon = e => {
        e.preventDefault();
        deleteDungeon(dungeon);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form validated onSubmit={onSubmitDeleteDungeon}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete the dungeon "{dungeon.dungeonName}" ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default DeleteDungeon;