import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_button.scss';

const logger = "Button:: ";

const Button = (props) => {
  let classes = {
		[`button`]: true
	};

  return (
    <button className={`${props.className} ${classnames(classes)}`} onClick={props.onClick}>
    
      {props.children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  className: "",
  children: "Button",
  onClick: () => console.log("on click!")
}

export default Button;