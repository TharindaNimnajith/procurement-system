import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';
import { proxy } from '../../conf';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

const PurchaseOrdersPage: React.FC = () => {
  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);
  const [orders, setOrdersList] = useState<any>([]);

  const getOrders = async () => {
    try {
      const response = await fetch(`${proxy}/order/getOrders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setOrdersList(responseData);
    } catch (errors) {
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
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Purchase Orders</h1>
        </Col>
      </Row>
      <div style={{
        marginLeft: '6%',
        marginRight: '6%'
      }}>
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
            Item Id
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
            Supplier Amount
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Invoice Id
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Status
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
            Delivery Date
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
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Approved By
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Procurement Staff Rejected Reason
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Supplier Rejected Reason
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Delivery Manager Rejected Reason
          </th>
          </thead>
          <tbody>
          {
            orders.orders && orders.orders.map((order: any) => {
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
                    {order.itemId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.itemName}
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
                    {order.supplierAmount}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.invoiceId}
                  </td>
                  {
                    order.status === 'pending' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'black'
                      }}>
                        Pending
                      </td>
                    ) : order.status === 'approved' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'blue'
                      }}>
                        Approved (SM)
                      </td>
                    ) : order.status === 'pApproved' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'blue'
                      }}>
                        Approved (PS)
                      </td>
                    ) : order.status === 'pRejected' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                        Rejected (PS)
                      </td>
                    ) : order.status === 'supDelivered' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'blue'
                      }}>
                        Supplier Accepted
                      </td>
                    ) : order.status === 'supRejected' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                        Rejected (S)
                      </td>
                    ) : order.status === 'deliveryConfirmed' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'green'
                      }}>
                        Completed
                      </td>
                    ) : order.status === 'deliveryRejected' ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                        Rejected (DM)
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.status}
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
                    {order.deliveryDate}
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
                  {
                    order.status === 'approved' ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        Site Manager
                      </td>
                    ) : order.status === 'pApproved' ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        Procurement Staff
                      </td>
                    ) : (
                      <td/>
                    )
                  }
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.procurementStaffRejectedReason}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.supplierRejectedReason}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {order.deliveryManagerRejectedReason}
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

export default PurchaseOrdersPage;
