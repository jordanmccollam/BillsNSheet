import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Container } from 'react-bootstrap';

import './_table.scss';

const logger = "Table:: ";

const testData = [
  // {
  //   _id: Math.floor(Math.random() * 9999), // <- asigns a random id
  //   description: "Rent",
  //   amount: 400,
  //   date: "05"
  // }
]

const columns = [
  {label: "Description", property: "description"},
  {label: "Amount", property: "amount", size: 1},
  {label: "Date", property: "date", size: 1},
]

const Table = ({ className, rowKey }) => {
  let classes = {
		[`table`]: true
	};
  const [data, setData] = useState(testData);

  return (
    <Container fluid className={`${className} ${classnames(classes)}`}>
      {/* HEADER */}
      <Row className="border-bottom border-secondary">
        {columns.map((column, columnIndex) => (
          <Col 
            xs={column.size} 
            key={`header-item-${columnIndex}`} 
            className={`${column.size !== 1 && "text-start"} text-secondary`}
          >
            {column.label}
          </Col>
        ))}
      </Row>

      {data.length > 0 ? data.map((item, item_index) => (
        <Row key={`table-item-${item[rowKey]}`}>
          {columns.map((column, columnIndex) => (
            <Col 
              xs={column.size} 
              key={`table-item-${item[rowKey]}-${columnIndex}`} 
              className={`${column.size !== 1 && "text-start"}`}
            >
              {item[column.property]}
            </Col>
          ))}
        </Row>
      )) : (
        <Row>
          <Col className="pt-3">No data yet</Col>
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
  rowKey: PropTypes.string
}

Table.defaultProps = {
  className: "",
  rowKey: "_id"
}

export default Table;