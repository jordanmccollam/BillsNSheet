import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Table } from '../../components'
import { BsPlus } from "react-icons/bs";
import AddBillSection from './AddBill';
import TotalsInfoSection from "./TotalsInfo";
import { MdDelete } from 'react-icons/md';

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
  const addRef = useRef()

  let classes = {
		[`main`]: true
	};

  const [bills, setBills] = useState(testData)

  const deleteBill = (bill) => {
    setBills(prevBills => prevBills.filter(b => b != bill))
  }

  const tableColumns = [
    {label: "Description", property: "description"},
    {label: "Amount", property: "amount", size: 2},
    {label: "Date", property: "date", size: 2}
  ]

  const tableActions = [
    {
      label: "ADD A BILL",
      icon: <BsPlus />,
      func: () => addRef.current.togglePopup(),
      global: true
    },
    {
      label: "Delete",
      icon: <MdDelete />,
      func: deleteBill,
      global: false
    }
  ]

  return (
    <Container className={`${props.className} ${classnames(classes)} my-3`}>
      <Card className="px-4">
        <Row>
          <Col><h1 >Bills N' Sheet</h1></Col>
          <Col className="center-v justify-content-end">Welcome, User</Col>
        </Row>
      </Card>

      <Row className="mt-2">
        <Col xl={9} lg={8} md={7} xs={10} className="mt-3">
          {/* Table of bills will go here */}
          <Table data={bills} columns={tableColumns} name="Bills" actions={tableActions} />
        </Col>

        <TotalsInfoSection bills={bills} />
      </Row>

      <AddBillSection ref={addRef} setBills={setBills} />
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