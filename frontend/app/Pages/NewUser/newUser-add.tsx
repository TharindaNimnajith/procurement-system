import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setExistingUser, setLogin, setUserName, setUserType } from './newUser-slice';

let errors_: string = '';

const usersList = [
  'Procurement Staff',
  'Supplier',
  'Delivery Manager',
  'Site Manager',
  'Manager'
];

const NewUserAdd: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{
    name: string,
    address: string,
    email: string,
    password: string,
    type: string,
    typeDefault: boolean
  }>({
    name: '',
    address: '',
    email: '',
    password: '',
    type: '',
    typeDefault: true
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingUser(false));
    if (user.name.trim() === '') {
      errors_ = 'Please enter a value for name.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    } else if (user.address.trim() === '') {
      errors_ = 'Please enter a value for address.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    } else if (user.email.trim() === '') {
      errors_ = 'Please enter a value for email.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    } else if (user.password.trim() === '') {
      errors_ = 'Please enter a value for password.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    } else if (user.type.trim() === '') {
      errors_ = 'Please select a type.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    }

    if (user.email.trim() !== '' && user.password.trim() !== '' && user.email.trim() !== ''
      && user.password.trim() !== '' && user.type.trim() !== '') {
      try {
        const response = await fetch(`${proxy}/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const responseData = await response.json();
        if (responseData.login === 1) {
          await dispatch(setLogin(true));
          await dispatch(setUserType(responseData.type));
          await dispatch(setUserName(responseData.name));
        }
        if (responseData.login === 0) {
          errors_ = responseData.message;
          await dispatch(setLogin(false));
          await dispatch(setUserType(''));
          await dispatch(setUserName(''));
        }
        await resetValues();
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setUser({ ...user, name: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setUser({ ...user, address: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setUser({ ...user, email: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setUser({ ...user, password: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setUser({ ...user, type: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const resetValues = async () => {
    setLoading(true);
    user.name = '';
    user.address = '';
    user.email = '';
    user.password = '';
    user.type = '';
    setLoading(false);
  };

  return (
    <div style={{
      borderRadius: '8px',
      padding: '3% 9% 3% 9%',
      border: '2px solid #007bff',
      maxWidth: 'fit-content'
    }}>
      <Form>
        <Form.Row style={{
          marginTop: '5%'
        }}>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
                          value={user.name}
                          onChange={handleChangeName}
                          placeholder='Enter Name'
                          title='Please enter a valid name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"
                          value={user.address}
                          onChange={handleChangeAddress}
                          placeholder='Enter Address'
                          title='Please enter a valid address.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
                          value={user.email}
                          onChange={handleChangeEmail}
                          placeholder='Enter Email'
                          title='Please enter a valid email.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          value={user.password}
                          onChange={handleChangePassword}
                          placeholder='Enter Password'
                          title='Please enter a valid password.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomName'>
            <Form.Label>User Type</Form.Label>
            <Form.Control as='select'
                          value={user.type}
                          onChange={handleChangeType}
                          title='Please select the type.'
                          required
                          size='lg'>
              <option>Select Option</option>
              {
                usersList?.map((user) => (
                  <option>
                    {
                      user
                    }
                  </option>
                ))
              }
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
        <Form.Row>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '100%',
                      marginTop: '20%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaPlusCircle style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }} />
              Add
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
  );
};

export default NewUserAdd;
