import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Form } from 'react-bootstrap'
import moment from 'moment';
import * as Comp from '../../components'
import { BiError } from "react-icons/bi";

const defaultEmptyBill = {
    showPopup: false,
    description: "",
    amount: 0,
    date: 1
}

const EditBillSection = forwardRef(({ setBills, bills }, ref) => {
    const [currentBill, setCurrentBill] = useState(defaultEmptyBill)

    useImperativeHandle(ref, () => {
        return {
            togglePopup: (targetBill) => togglePopup(targetBill)
        };
    })

    const togglePopup = (targetBill) => {
        if (targetBill) {
            setCurrentBill(prevBill => ({...targetBill, showPopup: !prevBill.showPopup}))
        } else {
            setCurrentBill(prevBill => ({...prevBill, showPopup: !prevBill.showPopup}))
        }
    }

    const onChange = (e) => {
        setCurrentBill(prevBill => ({
          ...prevBill,
          [e.target.name]: e.target.value
        }))
    }

    const confirmEdit = () => {        
        var updatedBills = [...bills];
        var index = updatedBills.findIndex(bill => bill._id === currentBill._id)
        updatedBills[index] = {
            ...updatedBills[index],
            ...currentBill
        }
        console.log(updatedBills)
        setBills(updatedBills);
        togglePopup(null);
    }


    return (
        <Comp.Popup 
            show={currentBill.showPopup} 
            toggle={() => togglePopup(null)} 
            title="Edit bill" 
            action={{
            label: "Confirm Edit", 
            func: confirmEdit
            }} 
        >
            <div>
            {currentBill.error && (<div className="mb-3 text-error"><BiError /> {currentBill.error}</div>)}

            <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder={`Ex: "Rent"`} value={currentBill.description} name="description" onChange={onChange} />
                </Form.Group>
                <div className="d-flex justify-content-between mb-2">
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder={`Ex: "1200"`} value={currentBill.amount} name="amount" onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="number" placeholder={`Ex: "01"`} value={currentBill.date} name="date" onChange={onChange} />
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

export default EditBillSection;