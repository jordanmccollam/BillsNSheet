import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Modal } from 'react-bootstrap';
import Button from "../Button/Button";

import './_popup.scss';

const logger = "Popup:: ";

const Popup = ({ className, show, toggle, title, action, children }) => {
  let classes = {
		[`popup`]: true
	};

  return (    
    <Modal show={show} onHide={toggle} className={`${className} ${classnames(classes)}`}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button alt onClick={toggle}>
          Cancel
        </Button>
        {action?.label && (
          <Button alt onClick={action?.func ? action.func : () => console.log("Need to assign action func")}>
            {action.label}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

Popup.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
  action: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
}

Popup.defaultProps = {
  className: "",
  show: false,
  toggle: () => console.log("Toggle popup"),
  title: "Popup Title",
  action: {
    label: "Confirm",
    func: () => console.log("Confirm")
  },
  children: "Popup content here"
}

export default Popup;