import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'

import './_main.scss';

const logger = "Main:: ";

const Main = (props) => {
  let classes = {
		[`main`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
      <h1 >Hello World</h1>
    </div>
  )
}

Main.propTypes = {
  className: PropTypes.string
}

Main.defaultProps = {
  className: ""
}

export default Main;