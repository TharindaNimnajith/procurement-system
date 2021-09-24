import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';
import { proxy } from '../../conf';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

const DeliveryRejectedOrdersList: React.FC = () => {
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
      const response = await fetch(`${proxy}/orderLists/getDeliveryRejectedDManager`, {
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
      {renderRedirectLogin()}
      <NavBar />
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Returned Purchase Orders</h1>
        </Col>
      </Row>
      <div className='container'>
        <div>
          <div style={{
            marginTop: '4%'
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
                Invoice Amount
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
                Reason
              </th>
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
                        {order.supplierAmount}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {order.invoiceId}
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
                        {order.supplierName}
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
      </div>
    </div>
  );
};

export default DeliveryRejectedOrdersList;
