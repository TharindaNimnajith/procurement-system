import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { proxy } from '../../conf';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

const PaymentList: React.FC = () => {
  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);
  const [payments, setPaymentsList] = useState<any>([]);

  const getPayments = async () => {
    try {
      const response = await fetch(`${proxy}/payment/getPayments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log(responseData);
      setPaymentsList(responseData.payments);
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    getPayments().then(() => {
    });
    if (!login) {
      setRenderRedirectToLogin(true);
    }
  });

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
          <h1>Payments</h1>
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
                Payment Id
              </th>
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
                Amount
              </th>
              <th style={{
                borderBottom: 'solid darkblue 1px',
                borderRight: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px',
                textAlign: 'center',
                fontSize: 'large',
                fontWeight: 'lighter',
                color: 'white'
              }}>
                Payment Method
              </th>
              </thead>
              <tbody>
              {
                payments && payments.map((payment: any) => {
                  return (
                    <tr key={payment._id}>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.paymentId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.orderId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.invoiceId}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.supplier}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.amount}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {payment.paymentMethod}
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

export default PaymentList;
