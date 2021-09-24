import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { Carousel, Col, Row } from 'react-bootstrap';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

const WelcomePage: React.FC = () => {
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

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden'
    }}>
      <NavBar />
      {renderRedirectLogin()}
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Home</h1>
        </Col>
      </Row>
      <div style={{
        marginTop: '-45px'
      }}>
        <Carousel>
          <Carousel.Item>
            <img className='d-block w-100'
                 src='https://3czfu91fpa5s34atq735lonm-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/Depositphotos_170349458_l-2015-1024x684.jpg'
                 alt='Construction Site Image'
                 height='900px' />
            <Carousel.Caption>
              <h3>Procurement System for Construction Industry</h3>
              <p>2020-REG-WE-49</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100'
                 src='https://1v1d1e1lmiki1lgcvx32p49h8fe-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/1563178065-Construction-960x540.jpg'
                 alt='Construction Site Image'
                 height='900px' />
            <Carousel.Caption>
              <h3>Procurement System for Construction Industry</h3>
              <p>2020-REG-WE-49</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100'
                 src='https://www.eosis.energy/wp-content/uploads/081219110833.jpg'
                 alt='Construction Site Image'
                 height='900px' />
            <Carousel.Caption>
              <h3>Procurement System for Construction Industry</h3>
              <p>2020-REG-WE-49</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomePage;
