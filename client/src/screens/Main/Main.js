import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import * as Comp from '../../components'
import { BsPlus } from "react-icons/bs";
import { BiError } from "react-icons/bi";

import './_main.scss';

const logger = "Main:: ";

const testData = [
  {
    _id: 1,
    description: "Rent",
    amount: 400,
    date: "05"
  },
  {
    _id: 2,
    description: "Phone",
    amount: 30,
    date: "28"
  },
  {
    _id: 3,
    description: "Internet",
    amount: 30,
    date: "28"
  },
]

const defaultNewBill = {
  showPopup: false,
  description: "",
  amount: 0,
  date: 1
}

const Main = (props) => {
  let classes = {
		[`main`]: true
	};
  const [income, setIncome] = useState(1900)
  const [totalBills, setTotalBills] = useState(0)
  const [bills, setBills] = useState(testData)
  const [currentAmount, setCurrentAmount] = useState(0)
  const [newBill, setNewBill] = useState(defaultNewBill)

  useEffect(() => {
    calculateTotalBills()
    calculateCurrentAmount()
  }, [bills])

  const calculateTotalBills = () => {
    var _totalBills = 0
    bills.forEach(item => {
      _totalBills += parseFloat(item.amount);
    });
    setTotalBills(_totalBills)
  }

  const calculateCurrentAmount = () => {
    var billsBeforeToday = bills.filter(t => parseInt(t.date) < parseInt(moment().format("D")));
    var _currentAmount = income;
    billsBeforeToday.forEach(item => {
      _currentAmount -= parseFloat(item.amount);
    });
    setCurrentAmount(_currentAmount)
  }

  const tableColumns = [
    {label: "Description", property: "description"},
    {label: "Amount", property: "amount", size: 2},
    {label: "Date", property: "date", size: 2}
  ]

  const toggleNewBillPopup = () => {
    setNewBill(prevBill => ({...defaultNewBill, show: !prevBill.show}))
  }

  const tableMenuActions = [
    {
      label: "ADD A BILL",
      icon: <BsPlus />,
      func: toggleNewBillPopup,
    }
  ]

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
    <Container className={`${props.className} ${classnames(classes)} my-3`}>
      <Comp.Card className="px-4">
        <Row>
          <Col><h1 >Bills N' Sheet</h1></Col>
          <Col className="center-v justify-content-end">Welcome, User</Col>
        </Row>
      </Comp.Card>
      
      <Row className="mt-2">
        <Col xl={9} lg={8} md={7} xs={10} className="mt-3">
          {/* Table of bills will go here */}
          <Comp.Table data={bills} columns={tableColumns} name="Bills" menuActions={tableMenuActions} />
        </Col>

        <Col className="d-flex justify-content-center">
          <div>
            <div className="calendar-icon">
              <img alt="calendar_icon" src={calendar_icon} className="calendar-icon-img" />
              <h2 className="calendar-icon-month">{moment().format("MMMM").toUpperCase()}</h2>
              <div className="calendar-icon-day">{moment().format("DD")}</div>
            </div>

            <div>
              <Comp.Card className="mt-3 text-center">
                <div>
                  <h6 >TOTAL INCOME:</h6>
                  <h1 className="text-success">+ {income}</h1>
                </div>
              </Comp.Card>

              <Comp.Card className="mt-3 text-center">
                <div>
                  <h6>TOTAL BILLS:</h6>
                  <h1 className="text-danger">- {totalBills}</h1>
                </div>
              </Comp.Card>

              <Comp.Card className="mt-3 text-center">
                <div>
                  <h6 className="mt-1">LEFT OVER:</h6>
                  <h1>${income - totalBills}</h1>
                </div>
              </Comp.Card>

              <Comp.Card className="mt-3 text-center">
                <div>
                  <h6 className="mt-1">CURRENTLY:</h6>
                  <h3>${currentAmount}</h3>
                </div>
              </Comp.Card>
            </div>
          </div>
        </Col>
      </Row>

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
    </Container>
  )
}

Main.propTypes = {
  className: PropTypes.string
}

Main.defaultProps = {
  className: ""
}

export default Main;