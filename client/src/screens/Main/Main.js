import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';
import * as Comp from '../../components'

import './_main.scss';

const logger = "Main:: ";

const Main = (props) => {
  let classes = {
		[`main`]: true
	};

  return (
    <Container className={`${props.className} ${classnames(classes)} my-3`}>
      <Comp.Card>
        <Row>
          <Col><h1 >Bills N' Sheet</h1></Col>
          <Col className="center-v justify-content-end">Welcome, User</Col>
        </Row>
      </Comp.Card>
      
      <Row className="mt-2">
        <Col xl={9} lg={8} md={7} xs={10} className="mt-3">
          <Comp.Card className="text-center">
            Table of bills will go here
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
                <h6 >TOTAL INCOME:</h6>
                <h1 className="text-success">+ {1900}</h1>
              </Comp.Card>

              <Comp.Card className="mt-3 text-center">
                <h6>TOTAL BILLS:</h6>
                <h1 className="text-danger">- {600}</h1>
              </Comp.Card>
              <Comp.Card className="mt-3 text-center py-1">
                <h6 className="mt-1">Left Over:</h6>
                <h1>${600}</h1>
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