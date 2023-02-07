import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Screens from './screens';
import { Card } from './components';
import { useAuth0 } from "@auth0/auth0-react";
import { Rings } from 'react-loader-spinner'
import apis from './api';

import './App.scss';
// import './App.css';

function App() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [ userData, setUserData ] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.name) {
      getUserData()
    }
  }, [isAuthenticated])

  const getUserData = async () => {
    var _user = await apis.getUser(user.name);
    if (!_user.data.success) {
      createUser()
    } else {
      console.log("User found: ", _user.data.output)
      setUserData(_user.data.output)
    }
  }

  const createUser = async () => {
    var newUser = {
      email: user.name,
      income: 0,
      bills: []
    }
    await apis.createUser(newUser)
    getUserData()
  }

  return (
    <div className="App">
      <Container fluid>
        {(isLoading || (isAuthenticated && !userData)) ? (
          <Load />
        ) : (
          userData ? (
            <Screens.Main logout={logout} user={userData} />
          ) : (
            <Screens.Authentication />
          )
        )}
      </Container>
    </div>
  );
}

export default App;

const Load = () => {
  return (
    <Row className='loading-container'>
      <Col lg={4}>
        <Card>
          <div>
            <h1 className="title pb-3 mb-4">Bills N' Sheet</h1>
            <div className='loading-txt'>Loading            
              <Rings
                  height="60"
                  width="60"
                  color="#efefef"
                  radius="6"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}
