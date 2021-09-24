import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { proxy } from '../../conf';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import { setExistingOrderDM } from './orderDM-slice';

let errors_: string = '';

const methodList = [
  'Cash',
  'Cheque'
];

const MakePayment: React.FC = () => {
  const dispatch = useDispatch();

  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  const editingOrderDM = useSelector(
    (state: {
      orderDM: any
      editingOrderDM: any
    }) => state.orderDM.editingOrderDM
  );

  const [renderRedirectToLogin, setRenderRedirectToLogin] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [order, setOrder] = useState<{
    orderId: number,
    purchaseDate: string,
    requestedDate: string,
    deliveryDate: string,
    siteName: string,
    siteManager: string,
    supplierName: string,
    itemId: number,
    itemName: string,
    itemQuantity: string,
    totPrice: string,
    isRestricted: boolean,
    deliveryNote: string,
    status: string,
    invoiceId: string,
    supplierAmount: string
  }>({
    orderId: editingOrderDM.orderId,
    purchaseDate: editingOrderDM.purchaseDate,
    requestedDate: editingOrderDM.requestedDate,
    deliveryDate: editingOrderDM.deliveryDate,
    siteName: editingOrderDM.siteName,
    siteManager: editingOrderDM.siteManager,
    supplierName: editingOrderDM.supplierName,
    itemId: editingOrderDM.itemId,
    itemName: editingOrderDM.itemName,
    itemQuantity: editingOrderDM.itemQuantity,
    totPrice: editingOrderDM.totPrice,
    isRestricted: editingOrderDM.isRestricted,
    deliveryNote: editingOrderDM.deliveryNote,
    status: editingOrderDM.status,
    invoiceId: editingOrderDM.invoiceId,
    supplierAmount: editingOrderDM.supplierAmount
  });

  useEffect(() => {
    setOrder(editingOrderDM);
    if (!login) {
      setRenderRedirectToLogin(true);
    }
  }, [editingOrderDM, login]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingOrderDM(false));
    if (paymentMethod.trim() === '') {
      errors_ = 'Please select a value for payment method.';
      await dispatch(setExistingOrderDM(true));
      setLoading(false);
    }
    const finalObject = {
      invoiceId: order.invoiceId,
      orderId: order.orderId,
      paymentMethod,
      supplier: order.supplierName,
      amount: order.supplierAmount
    };
    if (paymentMethod.trim() !== '') {
      try {
        const response = await fetch(`${proxy}/payment/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        await response.json();
        setRenderRedirectTo(true);
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setPaymentMethod(e.target.value);
    dispatch(setExistingOrderDM(false));
    setLoading(false);
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.PAYMENT_LIST} />;
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
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Payment</h1>
        </Col>
      </Row>
      <div className='container'>
        <div style={{
          borderRadius: '8px',
          padding: '3% 7% 3% 7%',
          border: '2px solid #007bff',
          maxWidth: 'fit-content',
          marginLeft: '30%',
          marginTop: '7%'
        }}>
          <Form>
            <Form.Row style={{
              marginTop: '5%'
            }}>
              <Form.Group controlId='formRoomName'>
                <Form.Label>Invoice Id</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.invoiceId}
                              size='lg' />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formLocatedBuilding'>
                <Form.Label>Order Id</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.orderId}
                              size='lg'>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formRoomType'>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.supplierName}
                              size='lg'>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formRoomCapacity'>
                <Form.Label>Amount</Form.Label>
                <Form.Control disabled
                              type="text"
                              value={order.supplierAmount}
                              size='lg' />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId='formLocatedBuilding'>
                <Form.Label>Payment Method</Form.Label>
                <Form.Control as='select'
                              value={paymentMethod}
                              onChange={handleChangePaymentMethod}
                              title='Please select the payment method.'
                              required
                              size='lg'>
                  <option>Select Option</option>
                  {methodList?.map((method) => (
                    <option>{method}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {
              loading && (
                <Spinner animation='border'
                         style={{
                           textAlign: 'center',
                           marginLeft: '50%'
                         }} />
              )
            }
            <Form.Row style={{
              marginTop: '10%'
            }}>
              <Form.Group>
                <Button variant='success'
                        type='submit'
                        onClick={handleSubmit}
                        style={{
                          marginLeft: '100%',
                          fontSize: 'large',
                          textTransform: 'uppercase'
                        }}>
                  Submit
                </Button>
              </Form.Group>
            </Form.Row>
            {
              errors_ && (
                <div style={{
                  color: 'red',
                  fontSize: '18px',
                  marginTop: '7px',
                  textAlign: 'center'
                }}>
                  {
                    errors_
                  }
                </div>
              )
            }
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
