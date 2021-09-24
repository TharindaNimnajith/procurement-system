import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { FaBan, FaCheck } from 'react-icons/fa';
import { proxy } from '../../conf';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {
  setEditingOrderSup,
  setEditingOrderSupId,
  setEditOrderSup,
  setExistingOrderSup,
  setOrderSup
} from './orderSup-slice';

const OrdersForSupplyingList: React.FC = () => {
  const dispatch = useDispatch();

  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  let supplier = useSelector(
    (state: {
      users: any
      userName: string
    }) => state.users.userName
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [order, setOrder] = useState({});
  const [orders, setOrdersList] = useState<any>([]);
  const [reason, setReason] = useState<string>('');
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getPendingOrdersSupplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'supplierName': supplier })
      });
      const responseData = await response.json();
      setOrdersList(responseData);
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    getOrders().then(() => {
    });
    if (!login) {
      setRenderRedirectToLogin(true);
    }
  }, [orders, login]);

  const handleApproved = async () => {
    console.log(order);
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'supDelivered'
        })
      });
      await response.json();
      await dispatch(setOrderSup(orders));
      await dispatch(setExistingOrderSup(false));
      await dispatch(setEditingOrderSupId(id));
      await dispatch(setEditingOrderSup(order));
      await dispatch(setEditOrderSup(true));
      setRenderRedirectTo(true);
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
    setShowApproved(false);
  };

  const handleRejected = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderRejectReasonSup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'supRejected',
          reason: reason
        })
      });
      await response.json();
      setRenderRedirectTo1(true);
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
    setShowRejected(false);
  };

  const handleClose = () => {
    setLoading(true);
    setShowApproved(false);
    setShowRejected(false);
    setLoading(false);
  };

  const handleShowApproved = (orderId: string, id: string, order: any) => {
    setLoading(true);
    setOrderId(orderId);
    setId(id);
    setOrder(order);
    setShowApproved(true);
    setLoading(false);
  };

  const handleShowRejected = (orderId: string) => {
    setLoading(true);
    setOrderId(orderId);
    setShowRejected(true);
    setLoading(false);
  };

  const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setReason(e.target.value);
    setLoading(false);
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.GENERATE_INVOICE} />;
    }
    return null;
  };

  const renderRedirect1 = () => {
    if (renderRedirectTo1) {
      return <Redirect to={routes.REJECTED_SUP_LIST} />;
    }
    return null;
  };

  const renderRedirectLogin = () => {
    if (renderRedirectToLogin) {
      return <Redirect to={routes.USER} />;
    }
    return null;
  };

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar />
      {renderRedirectLogin()}
      {renderRedirect()}
      {renderRedirect1()}
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Pending Purchase Orders</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          <div style={{
            marginTop: '4%'
          }}>
            <Modal show={showApproved}
                   onHide={handleClose}
                   orderId={orderId}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delivery</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to confirm this order?</Modal.Body>
              <Modal.Footer>
                <Button variant='success'
                        onClick={handleClose}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  No
                </Button>
                <Button variant='primary'
                        onClick={handleApproved}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  Yes
                </Button>
              </Modal.Footer>
              {
                loading && (
                  <Spinner animation='border'
                           style={{
                             textAlign: 'center',
                             marginLeft: '50%'
                           }} />
                )
              }
            </Modal>
            <Modal show={showRejected}
                   onHide={handleClose}
                   orderId={orderId}>
              <Modal.Header closeButton>
                <Modal.Title>Reject Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to reject this order?
                <Form style={{
                  marginLeft: '1%'
                }}>
                  <Form.Row style={{
                    marginTop: '3%'
                  }}>
                    <Form.Group controlId='formSessionId'>
                      <Form.Label>Reject Reason</Form.Label>
                      <Form.Control type='text'
                                    value={reason}
                                    onChange={handleChangeReason}
                                    title='Please select the room.'
                                    required
                                    size='lg' />
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='success'
                        onClick={handleClose}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  No
                </Button>
                <Button variant='danger'
                        onClick={handleRejected}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  Yes
                </Button>
              </Modal.Footer>
              {
                loading && (
                  <Spinner animation='border'
                           style={{
                             textAlign: 'center',
                             marginLeft: '50%'
                           }} />
                )
              }
            </Modal>
            <Table responsive
                   striped
                   bordered
                   hover
                   size='sm'
                   style={{
                     border: 'solid darkblue 1px'
                   }}>
              <thead style={{
                backgroundColor: '#0350a2'
              }}>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderLeft: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Order Id
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Item Name
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Quantity
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Estimated Amount
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Requested Date
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Required Date
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Site
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Site Manager
              </th>
              <th colSpan={2}
                  style={{
                    borderBottom: 'solid darkblue 1px',
                    borderRight: 'solid darkblue 1px',
                    borderTop: 'solid darkblue 1px'
                  }} />
              </thead>
              <tbody>
              {
                orders && orders.map((order: any) => {
                  return (
                    <tr key={order._id}>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.orderId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.itemName}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.itemQuantity}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.totPrice}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.requestedDate}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.requiredDate}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.siteName}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.siteManager}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        <button onClick={() => handleShowApproved(order.orderId, order._id, order)}
                                style={{
                                  color: 'darkgreen',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaCheck size={20} />
                        </button>
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        <button onClick={() => handleShowRejected(order.orderId)}
                                style={{
                                  color: 'red',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaBan size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersForSupplyingList;
