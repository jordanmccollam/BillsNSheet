import React, { useState, useEffect } from "react";
import { Col, Form, Row } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import { Card } from '../../components'
import apis from "../../api";

import './_calendar.scss';

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
        apis.updateUser(user._id, {income})
    }

    const detectEnterKey = (e) => {
        if (e.key === "enter" || e.keyCode === 13) {
            // ENTER KEY PRESSED
            e.target.blur()
        }
    }

    return (
      <Row>


        <Col>
          <Card className="mt-3 text-center totals-card">
            <div>
              <h6 >TOTAL INCOME:</h6>
              <div className="d-flex justify-content-center income-container">
                  <Form.Control 
                      type="number" 
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
        </Col>


        <Col>
          <Card className="mt-3 text-center totals-card">
            <div>
              <h6 className="mb-3" >TOTAL BILLS:</h6>
              <h1 className="total-bills-text">- {totalBills}</h1>
            </div>
          </Card>
        </Col>


        <Col>
          <Card className="mt-3 text-center totals-card">
            <div>
              <h6 className="mb-3" >REMAINING:</h6>
              <h1 className={income - totalBills < 0 ? 'total-bills-text' : 'income-text'}>{income - totalBills}</h1>
            </div>
          </Card>
        </Col>


        <Col md={3} lg={2} className="d-none d-md-block" >
          <div className="mt-3 text-center totals-card">
            <time dateTime={moment().format('YYYY-MM-DD')} className="calendar-icon">
              <span className="month">{moment().format('MMMM')}</span>
              <span className="day">{moment().format('DD')}</span>
            </time>
          </div>
        </Col>


      </Row>
    )
}

export default TotalsInfoSection;