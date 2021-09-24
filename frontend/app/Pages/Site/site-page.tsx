import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import SitesList from './site-list';
import SitesEdit from './site-edit';
import SitesAdd from './site-add';

const SitesPage: React.FC = () => {
  let route: any;

  const editSite = useSelector(
    (state: {
      sites: any
      editSite: boolean
    }) => state.sites.editSite
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

  if (editSite)
    route = (<SitesEdit />);
  else
    route = (<SitesAdd />);

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
          <h1>Site Management</h1>
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
              <SitesList />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SitesPage;
