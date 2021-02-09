import React from 'react'
import './DailyKamasForm.css'
import { Form, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import MaskedInput from 'react-maskedinput';
import "react-datepicker/dist/react-datepicker.css";

function DailyKamasForm({
    validated,
    startDate,
    setStartDate,
    setAmount,
    onSubmitEvent,
    text
}) {

    return (
        <div className="form-parent-div">
            <div className="add-daily-kamas-form-style" >
                <h3>Daily Performance</h3>
                <Form validated={validated} onSubmit={onSubmitEvent}>
                    <Form.Text>
                            {text}
                    </Form.Text>
                    <Form.Group controlId="formBasicLogin">
                        <Form.Label>Date</Form.Label>
                        <InputGroup>
                            <DatePicker selected={startDate} required dateFormat='dd/MM/yyyy' onChange={d => setStartDate(d)} 
                                customInput={
                                    <MaskedInput className="form-control" mask="11/11/1111" placeholder="mm/dd/yyyy" />
                                }/>
                            <Form.Control.Feedback type="invalid">Please fill in a date.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Amount of kamas</Form.Label>
                        <InputGroup>
                            <Form.Control required type="number" placeholder="amount of kamas" onChange={a => setAmount(a.target.value)} />
                            <Form.Control.Feedback type="invalid">Please fill in an amount.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="button-container">
                        <Button variant="light" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default DailyKamasForm;