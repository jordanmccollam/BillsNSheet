import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import * as Comp from '../../components'

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

const Main = (props) => {
  let classes = {
		[`main`]: true
	};
  const [income, setIncome] = useState(1900)
  const [totalBills, setTotalBills] = useState(0)
  const [tableData, setTableData] = useState(testData)
  const [currentAmount, setCurrentAmount] = useState(0)

  useEffect(() => {
    calculateTotalBills()
    calculateCurrentAmount()
  }, [tableData])

  const calculateTotalBills = () => {
    var _totalBills = 0
    tableData.forEach(item => {
      _totalBills += item.amount;
    });
    setTotalBills(_totalBills)
  }

  const calculateCurrentAmount = () => {
    var billsBeforeToday = tableData.filter(t => parseInt(t.date) < parseInt(moment().format("D")));
    var _currentAmount = income;
    billsBeforeToday.forEach(item => {
      _currentAmount -= item.amount;
    });
    setCurrentAmount(_currentAmount)
  }

  const tableColumns = [
    {label: "Description", property: "description"},
    {label: "Amount", property: "amount", size: 2},
    {label: "Date", property: "date", size: 2}
  ]

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
          <Comp.Card className="text-center">
            {/* Table of bills will go here */}
            <Comp.Table data={tableData} columns={tableColumns} />
          </Comp.Card>
        </Col>

        <Col className="d-flex justify-content-center">
          <div>
            <div className="calendar-icon">
              <img alt="calendar_icon" src={calendar_icon} className="calendar-icon-img" />
              <h2 className="calendar-icon-month">{moment().format("MMMM").toUpperCase()}</h2>
              <div className="calendar-icon-day">{moment().format("D")}</div>
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
                  <h6 className="mt-1">Left Over:</h6>
                  <h1>${income - totalBills}</h1>
                </div>
              </Comp.Card>

              <Comp.Card className="mt-3 text-center">
                <div>
                  <h6 className="mt-1">Currently:</h6>
                  <h3>${currentAmount}</h3>
                </div>
              </Comp.Card>
            </div>
          </div>
        </Col>
      </Row>
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