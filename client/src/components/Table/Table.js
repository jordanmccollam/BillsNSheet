import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Container } from 'react-bootstrap';
import Button from '../Button/Button';
import { BsPlus } from 'react-icons/bs';

import './_table.scss';

const logger = "Table:: ";

const Table = ({ className, rowKey, data, columns, name, menuActions }) => {
  let classes = {
		[`table`]: true
	};

  return (
    <Container fluid className={`${className} ${classnames(classes)}`}>
      {/* Utility */}
      <Row className="table-menu">
        <Col className="d-flex align-items-center">
          <h5>{name}</h5>
        </Col>
        {menuActions.map((action, actionIndex) => (
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
  menuActions: PropTypes.array
}

Table.defaultProps = {
  className: "",
  rowKey: "_id",
  data: [],
  columns: [{label: "Label here", property: "", size: ""}],
  name: "Table",
  menuActions: [
    {
      label: "Add",
      icon: <BsPlus />,
      func: () => console.log("Add to table")
    }
  ]
}

export default Table;