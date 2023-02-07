import React, { useState, useEffect } from "react";
import { Col, Form } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import { Card } from '../../components'

const TotalsInfoSection = ({ bills, user }) => {
    const [income, setIncome] = useState(user.income)
    const [totalBills, setTotalBills] = useState(0)
    const [currentAmount, setCurrentAmount] = useState(0)
  
    useEffect(() => {
      calculateTotalBills()
    }, [bills])

    useEffect(() => {
      setIncome(user.income)
    }, [user?.income])

    useEffect(() => {
        calculateCurrentAmount()
    }, [totalBills, income])
  
    const calculateTotalBills = () => {
      var _totalBills = 0
      bills.forEach(item => {
        _totalBills += parseFloat(item.amount);
      });
      setTotalBills(_totalBills)
    }
  
    const calculateCurrentAmount = () => {
      var billsBeforeToday = bills.filter(t => parseInt(t.date) <= (parseInt(moment().format("D"))));
      var _currentAmount = income;
      billsBeforeToday.forEach(item => {
        _currentAmount -= parseFloat(item.amount);
      });
      setCurrentAmount(_currentAmount)
    }

    const onChangeIncome = (e) => {
        setIncome(e.target.value)
    }

    const saveIncome = () => {
        // Save income to db / user profile here
        console.log("Save income")
    }

    const detectEnterKey = (e) => {
        if (e.key === "enter" || e.keyCode === 13) {
            // ENTER KEY PRESSED
            e.target.blur()
        }
    }

    return (
        <Col className="d-flex justify-content-center">
          <div>
            <div className="calendar-icon">
              <img alt="calendar_icon" src={calendar_icon} className="calendar-icon-img" />
              <h2 className="calendar-icon-month">{moment().format("MMMM").toUpperCase()}</h2>
              <div className="calendar-icon-day">{moment().format("DD")}</div>
            </div>

            <div>
              <Card className="mt-3 text-center">
                <div>
                    <h6 >TOTAL INCOME:</h6>
                    <div className="d-flex justify-content-center income-container">
                        <Form.Control 
                            type="text" 
                            value={income} 
                            onChange={onChangeIncome} 
                            className="income-input" 
                            onBlur={saveIncome} 
                            onKeyDown={detectEnterKey}
                            min={0}
                        />
                    </div>
                </div>
              </Card>

              <Card className="mt-3 text-center">
                  <div>
                    <h6>TOTAL BILLS:</h6>
                    <h1 className="total-bills-text">- {totalBills}</h1>
                  </div>
              </Card>

              <Card className="mt-3 text-center">
                  <div>
                    <h6 className="mt-1">LEFT OVER:</h6>
                    <h1>${income - totalBills}</h1>
                  </div>
              </Card>

              <Card className="mt-3 text-center">
                  <div>
                    <h6 className="mt-1">CURRENTLY:</h6>
                    <h3>${currentAmount}</h3>
                  </div>
              </Card>
            </div>
          </div>
        </Col>
    )
}

export default TotalsInfoSection;