import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import * as Comp from '../../components'
import { BsPlus } from "react-icons/bs";
import { BiError } from "react-icons/bi";

const defaultNewBill = {
    showPopup: false,
    description: "",
    amount: 0,
    date: 1
}

const AddBillSection = forwardRef(({ setBills }, ref) => {
    const [newBill, setNewBill] = useState(defaultNewBill)

    useImperativeHandle(ref, () => {
        return {
            togglePopup: toggleNewBillPopup
        };
    })

    const toggleNewBillPopup = () => {
        setNewBill(prevBill => ({...defaultNewBill, show: !prevBill.show}))
    }

    const onChangeNewBill = (e) => {
        setNewBill(prevBill => ({
          ...prevBill,
          [e.target.name]: e.target.value
        }))
    }

    const addNewBill = () => {
        var randID = Math.floor(Math.random() * 9999);
    
        var fullDate = new Date();
        var formattedDate = moment(`${fullDate.getMonth()+1}-${newBill.date}-${fullDate.getFullYear()}`, 'MM-DD-YYYY').format("DD")
        if (formattedDate === "Invalid date") {
          setNewBill(prevBill => ({
            ...prevBill,
            error: "Please select a valid date and try again"
          }))
          return;
        }
        if (!newBill.description) {
          setNewBill(prevBill => ({
            ...prevBill,
            error: "Please add a description and try again"
          }))
          return;
        }
    
        setBills(prevBills => [
          ...prevBills,
          {
            _id: randID,
            ...newBill,
            date: formattedDate
          }
        ])
    
        toggleNewBillPopup()
      }


    return (
        <Comp.Popup 
            show={newBill.show} 
            toggle={toggleNewBillPopup} 
            title="Add a bill" 
            action={{
            label: "Add this bill", 
            func: addNewBill
            }} 
        >
            <div>
            {newBill.error && (<div className="mb-3 text-error"><BiError /> {newBill.error}</div>)}

            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder={`Ex: "Rent"`} value={newBill.description} name="description" onChange={onChangeNewBill} />
                </Form.Group>
                <div className="d-flex justify-content-between mb-2">
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder={`Ex: "1200"`} value={newBill.amount} name="amount" onChange={onChangeNewBill} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="number" placeholder={`Ex: "01"`} value={newBill.date} name="date" onChange={onChangeNewBill} />
                    <Form.Text className="text-muted">
                    (We only need the day of the month)
                    </Form.Text>
                </Form.Group>
                </div>
            </Form>
            </div>
        </Comp.Popup>
    )
})

export default AddBillSection;