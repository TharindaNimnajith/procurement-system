import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { FaBan, FaCheck } from 'react-icons/fa';
import { proxy } from '../../conf';

const PurchaseOrdersForApprovingList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showApproved, setShowApproved] = useState<boolean>(false);
  const [showRejected, setShowRejected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [orders, setOrdersList] = useState<any>([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/orderLists/getPendingOrders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
  }, [orders]);

  const handleApproved = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/order/editOrderStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'pApproved'
        })
      });
      await response.json();
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
      const response = await fetch(`${proxy}/order/editOrderRejectReasonPS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'pRejected',
          reason: reason
        })
      });
      await response.json();
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

  const handleShowApproved = (orderId: string) => {
    setLoading(true);
    setOrderId(orderId);
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

  return (
    <div>
      <div style={{
        marginTop: '4%'
      }}>
        <Modal show={showApproved}
               onHide={handleClose}
               orderId={orderId}>
          <Modal.Header closeButton>
            <Modal.Title>Approve Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to approve this order?</Modal.Body>
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
            Amount
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Is Restricted
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
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Supplier
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Site Manager Notes
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
                  {
                    order.isRestricted ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                        True
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center',
                        color: 'green'
                      }}>
                        False
                      </td>
                    )
                  }
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
                    {order.supplierName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.deliveryNote}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => handleShowApproved(order.orderId)}
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
  );
};

export default PurchaseOrdersForApprovingList;
