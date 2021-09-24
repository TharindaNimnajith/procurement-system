import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Nav, Navbar} from 'react-bootstrap';
import routes from '../../constants/routes.json';
import {setLogin, setUserName, setUserType} from '../../Pages/LoginSignup/user-slice';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  let user = useSelector(
    (state: {
      users: any
      userType: string
    }) => state.users.userType
  );

  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  let handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setUserType(''));
    dispatch(setUserName(''));
  };

  // Next 3 lines are for development and testing purposes only.
  // Comment them out when building for production environments.
  // dispatch(setLogin(true));
  // user = 'Test';
  // login = true;

  if (login) {
    if (user === 'Site Manager') {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (user === 'Procurement Staff') {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORY}>
                <Nav.Link href='#inventory'>
                  Inventories
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PURCHASE_ORDERS_FOR_APPROVING}>
                <Nav.Link href='#pendingPS'>
                  Purchase Orders for Approval
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_PS_LIST}>
                <Nav.Link href='#confirmedPS'>
                  Approved Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_PS_LIST}>
                <Nav.Link href='#rejectedPS'>
                  Rejected Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (user === 'Supplier') {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PENDING_SUP_LIST}>
                <Nav.Link href='#pendingSUP'>
                  Pending Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_SUP_LIST}>
                <Nav.Link href='#confirmedSUP'>
                  Accepted Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_SUP_LIST}>
                <Nav.Link href='#rejectedSUP'>
                  Rejected Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_DM_LIST_SUP}>
                <Nav.Link href='#confirmedDMSupplier'>
                  Completed Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_DM_LIST_SUP}>
                <Nav.Link href='#rejectedDMSupplier'>
                  Returned Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (user === 'Delivery Manager') {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PENDING_DM_LIST}>
                <Nav.Link href='#pendingDM'>
                  Pending Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_DM_LIST}>
                <Nav.Link href='#confirmedDM'>
                  Completed Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_DM_LIST}>
                <Nav.Link href='#rejectedDM'>
                  Returned Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PAYMENT_LIST}>
                <Nav.Link href='#paymentList'>
                  Payments
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORY}>
                <Nav.Link href='#inventory'>
                  Inventories
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (user === 'Manager') {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '100vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.NEW_USERS}>
                <Nav.Link href='#newusers'>
                  User Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.SITE}>
                <Nav.Link href='#site'>
                  Site Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.POLICY}>
                <Nav.Link href='#policy'>
                  Policy Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORIES}>
                <Nav.Link href='#inventorys'>
                  Inventory Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PAYMENT_LIST}>
                <Nav.Link href='#paymentList'>
                  Payments
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.ORDER}>
                <Nav.Link href='#order'>
                  Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar collapseOnSelect
                expand={false}
                bg='dark'
                variant='dark'
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '7px'
                }}>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto float-left'
                 style={{
                   height: '130vh'
                 }}>
              <br/>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORIES}>
                <Nav.Link href='#inventorys'>
                  Inventory Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PURCHASE_ORDERS_FOR_APPROVING}>
                <Nav.Link href='#pendingPS'>
                  Purchase Orders for Approval
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_PS_LIST}>
                <Nav.Link href='#confirmedPS'>
                  Approved Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_PS_LIST}>
                <Nav.Link href='#rejectedPS'>
                  Rejected Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PENDING_SUP_LIST}>
                <Nav.Link href='#pendingSUP'>
                  Pending Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_SUP_LIST}>
                <Nav.Link href='#confirmedSUP'>
                  Accepted Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_SUP_LIST}>
                <Nav.Link href='#rejectedSUP'>
                  Rejected Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_DM_LIST_SUP}>
                <Nav.Link href='#confirmedDMSupplier'>
                  Completed Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_DM_LIST_SUP}>
                <Nav.Link href='#rejectedDMSupplier'>
                  Returned Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PENDING_DM_LIST}>
                <Nav.Link href='#pendingDM'>
                  Pending Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.CONFIRMED_DM_LIST}>
                <Nav.Link href='#confirmedDM'>
                  Completed Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.REJECTED_DM_LIST}>
                <Nav.Link href='#rejectedDM'>
                  Returned Purchase Orders
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PAYMENT_LIST}>
                <Nav.Link href='#paymentList'>
                  Payments
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORY}>
                <Nav.Link href='#inventory'>
                  Inventories
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
              <NavLink to={routes.HOME_PAGE}>
                <Nav.Link href='#home'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.NEW_USERS}>
                <Nav.Link href='#newusers'>
                  User Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.SITE}>
                <Nav.Link href='#site'>
                  Site Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.POLICY}>
                <Nav.Link href='#policy'>
                  Policy Management
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.PAYMENT_LIST}>
                <Nav.Link href='#paymentList'>
                  Payments
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.INVENTORY}>
                <Nav.Link href='#inventory'>
                  Inventories
                </Nav.Link>
              </NavLink>
              <NavLink to={routes.ORDER}>
                <Nav.Link href='#order'>
                  Purchase Orders
                </Nav.Link>
              </NavLink>
              <Nav.Link onClick={handleLogout}>
                Sign Out
              </Nav.Link>
              <NavLink to={routes.USER}>
                <Nav.Link href='#users'>
                  Sign In
                </Nav.Link>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  } else {
    return (
      <Navbar collapseOnSelect
              expand={false}
              bg='dark'
              variant='dark'
              style={{
                position: 'absolute',
                zIndex: 2,
                top: '7px'
              }}>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto float-left'
               style={{
                 height: '100vh'
               }}>
            <br/>
            <NavLink to={routes.USER}>
              <Nav.Link href='#users'>
                Sign In
              </Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default NavBar;
