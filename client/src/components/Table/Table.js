import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Container } from 'react-bootstrap';

import './_table.scss';

const logger = "Table:: ";

const Table = ({ className, rowKey, data, columns }) => {
  let classes = {
		[`table`]: true
	};

  return (
    <Container fluid className={`${className} ${classnames(classes)}`}>
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
  columns: PropTypes.array
}

Table.defaultProps = {
  className: "",
  rowKey: "_id",
  data: [],
  columns: [{label: "Label here", property: "", size: ""}]
}

export default Table;