import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Container } from 'react-bootstrap';
import Button from '../Button/Button';
import { BsPlus } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './_table.scss';

const logger = "Table:: ";

const Table = ({ className, rowKey, data, columns, name, actions }) => {
  let classes = {
		[`table`]: true
	};

  const renderTooltip = (props) => (
    <Tooltip className="table-action-tooltip" {...props}>
      {props.label}
    </Tooltip>
  );

  return (
    <Container fluid className={`${className} ${classnames(classes)}`}>
      {/* Utility */}
      <Row className="table-menu">
        <Col className="d-flex align-items-center">
          <h5>{name}</h5>
        </Col>
        {actions.filter(a => a.global).map((action, actionIndex) => (
          <Col key={`table-menu-action-${actionIndex}`} className="text-end">
            <Button onClick={action.func} ><div>{action.label} {action.icon && action.icon}</div></Button>
          </Col>
        ))}
      </Row>

      <div className="table-content">

        {/* HEADER */}
        <Row className="table-header">
          {columns.map((column, columnIndex) => (
            <Col 
              xs={column.size} 
              key={`header-item-${columnIndex}`} 
              className={"text-start table-header-text"}
            >
              {column.label}
            </Col>
          ))}
          {actions.some(a => !a.global) && (
            <Col 
              xs={2} 
              className={"text-start table-header-text"}
            >
              Actions
            </Col>
          )}
        </Row>

        {data.length > 0 ? data.map((item, item_index) => (
          <Row key={`table-item-${item[rowKey]}`} className="table-row">
            {columns.map((column, columnIndex) => (
              <Col 
                xs={column.size} 
                key={`table-item-${item[rowKey]}-${columnIndex}`} 
                className={"text-start"}
              >
                {item[column.property]}
              </Col>
            ))}
            {actions.some(a => !a.global) && (
              <Col
                xs={2}
                className="text-start d-flex"
              >
                {actions.filter(a => !a.global).map((action, actionIndex) => (
                  <OverlayTrigger 
                    placement="top"
                    overlay={(props) => renderTooltip({...props, label: action.label})}
                    delay={{ show: 250, hide: 250 }}
                    key={`table-item-${item[rowKey]}-action-${actionIndex}`}
                    
                  >
                    <div className="table-item-action" onClick={() => action.func(item)} >{action.icon}</div>
                  </OverlayTrigger>
                ))}
              </Col>
            )}
          </Row>
        )) : (
          <Row>
            <Col className="pt-3 text-center">No data yet</Col>
          </Row>
        )}
      </div>
    </Container>
  )
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  rowKey: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  name: PropTypes.string,
  actions: PropTypes.array
}

Table.defaultProps = {
  className: "",
  rowKey: "_id",
  data: [],
  columns: [{label: "Label here", property: "", size: ""}],
  name: "Table",
  actions: []
}

export default Table;