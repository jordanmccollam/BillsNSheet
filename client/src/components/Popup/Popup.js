import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Modal, Button } from 'react-bootstrap';

import './_popup.scss';

const logger = "Popup:: ";

const Popup = ({ className, show, toggle }) => {
  let classes = {
		[`popup`]: true
	};

  return (    
    <Modal show={show} onHide={toggle} className={`${className} ${classnames(classes)}`}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={toggle}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

Popup.propTypes = {
  className: PropTypes.string
}

Popup.defaultProps = {
  className: ""
}

export default Popup;