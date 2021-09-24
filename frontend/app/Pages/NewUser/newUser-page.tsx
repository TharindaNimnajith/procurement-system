import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import NewUsersList from './newUser-list';
import NewUserEdit from './newUser-edit';
import NewUserAdd from './newUser-add';

const NewUsersPage: React.FC = () => {
  let route: any;

  const editUser = useSelector(
    (state: {
      newUsers: any
      editUser: boolean
    }) => state.newUsers.editUser
  );

  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);

  useEffect(() => {
    if (!login) {
      setRenderRedirectToLogin(true);
    }
  }, [login]);

  const renderRedirectLogin = () => {
    if (renderRedirectToLogin) {
      return <Redirect to={routes.USER} />;
    }
    return null;
  };

  if (editUser)
    route = (<NewUserEdit />);
  else
    route = (<NewUserAdd />);

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar />
      {renderRedirectLogin()}
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>User Management</h1>
        </Col>
      </Row>
      <div>
        <Row style={{
          marginLeft: '15%',
          marginRight: '15%'
        }}>
          <Col sm='4'>
            <div>
              {
                route
              }
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <NewUsersList />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewUsersPage;
