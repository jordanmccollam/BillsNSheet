import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Card, Button } from '../../components';
import { useAuth0 } from "@auth0/auth0-react";

import './_authentication.scss';

const logger = "Authentication:: ";

const Authentication = (props) => {
  const { loginWithRedirect } = useAuth0();

  let classes = {
		[`authentication`]: true
	};

  return (
    <Container className={`${props.className} ${classnames(classes)}`}>
      <Row className="auth-container">
        <Col lg={4} >
          <Card className="px-5 pb-5 pt-4">
            <div>
              <h1 className="auth-title pb-3 mb-4">Bills N' Sheet</h1>
              {/* <h3 className="auth-subtitle">LOGIN</h3> */}

              {/* <Form className=""> */}
                {/* <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" />
                </Form.Group> */}

                <div className="text-center pt-3">
                  
                  <Button alt onClick={loginWithRedirect} >LOGIN</Button>
                </div>
              {/* </Form> */}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

Authentication.propTypes = {
  className: PropTypes.string
}

Authentication.defaultProps = {
  className: ""
}

export default Authentication;