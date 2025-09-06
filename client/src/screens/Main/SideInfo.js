import React, { useState, useEffect } from "react";
import { Col, Form } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import { Card } from '../../components'
import apis from "../../api";

const SideInfoSection = ({ bills, user }) => {
    const endOfMonth = moment().endOf('month').format("D")
    const [totalBills, setTotalBills] = useState(0)
    const [upcomingBills, setUpcomingBills] = useState(0)

    const [currentFunds, setCurrentFunds] = useState(user.income)
    const [payday, setPayday] = useState(parseInt(endOfMonth))
  
    useEffect(() => {
      calculateTotalBills()
    }, [bills])

    useEffect(() => {
        calculateUpcomingBills()
    }, [bills, payday, currentFunds])


    const calculateUpcomingBills = () => {
        var billsAfterToday = bills.filter(t => parseInt(t.date) >= (parseInt(moment().format("D"))));
        var billsBeforePayDay = billsAfterToday.filter(t => parseInt(t.date) <= payday);
        var _upcomingBills = 0;
        billsBeforePayDay.forEach(item => {
            _upcomingBills += parseFloat(item.amount);
        });
        setUpcomingBills(_upcomingBills)
    }

  
    const calculateTotalBills = () => {
      var _totalBills = 0
      bills.forEach(item => {
        _totalBills += parseFloat(item.amount);
      });
      setTotalBills(_totalBills)
    }

    const detectEnterKey = (e) => {
        if (e.key === "enter" || e.keyCode === 13) {
            // ENTER KEY PRESSED
            e.target.blur()
        }
    }

    const onChangeFunds = (e) => {
        setCurrentFunds(e.target.value)
    }

    const onChangePayday = (e) => {
        setPayday(e.target.value)
    }

    return (
        <Col>

            <Card className="mt-3 text-center side-card">
                <div>
                    <h6>CURRENT FUNDS:</h6>
                    <div className="d-flex justify-content-center">
                        <Form.Control 
                            type="number" 
                            value={currentFunds} 
                            onChange={onChangeFunds} 
                            className="income-input text-center" 
                            // onBlur={saveIncome} 
                            onKeyDown={detectEnterKey}
                            min={0}
                        />
                    </div>
                </div>
            </Card>

            <Card className="mt-3 text-center side-card">
                <div>
                    <h6>NEXT PAYDAY (DD):</h6>
                    <div className="d-flex justify-content-center">
                        <Form.Control 
                            type="number" 
                            value={payday} 
                            onChange={onChangePayday} 
                            className="neutral-input text-center" 
                            // onBlur={saveIncome} 
                            onKeyDown={detectEnterKey}
                            min={0}
                            max={parseInt(endOfMonth)}
                        />
                    </div>
                </div>
            </Card>

            <Card className="mt-3 text-center side-card">
                <div>
                    <h6>UPCOMING BILLS:</h6>
                    <h1 className="total-bills-text">- {upcomingBills}</h1>
                </div>
            </Card>

            <Card className="mt-3 text-center side-card">
                <div>
                    <h6>REMAINING:</h6>
                    <h1 className={currentFunds - upcomingBills < 0 ? 'total-bills-text' : 'income-text'}>{currentFunds - upcomingBills}</h1>
                </div>
            </Card>

        </Col>
    )
}

export default SideInfoSection;