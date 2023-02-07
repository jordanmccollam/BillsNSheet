import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Screens from './screens';
import * as Comp from './components';

import './App.scss';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            {/* <Screens.Main /> */}
            <Screens.Authentication />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
