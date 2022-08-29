import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import calendar_icon from './calendar_icon.png';
import moment from 'moment';

import './_main.scss';

const logger = "Main:: ";

const Main = (props) => {
  let classes = {
		[`main`]: true
	};

  return (
    <Container className={`${props.className} ${classnames(classes)} my-3`}>
      <Row className="title-bar">
        <Col><h1 >Bills N' Sheet</h1></Col>
        <Col className="center-v justify-content-end">Welcome, User</Col>
      </Row>
      <Row className="mt-3">
        <Col xl={9} lg={8} md={7} xs={10}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Col>

        <Col className="d-flex justify-content-center">
          <div className="calendar-icon">
            <img alt="calendar_icon" src={calendar_icon} className="calendar-icon-img" />
            <h2 className="calendar-icon-month">{moment().format("MMMM").toUpperCase()}</h2>
            <div className="calendar-icon-day">{moment().format("D")}</div>
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