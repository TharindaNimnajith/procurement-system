import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaArrowAltCircleLeft, FaEdit } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingUser, setEditingUserId, setEditUser, setExistingUser, setUsers } from './newUser-slice';

let errors_: string = '';

const usersList = [
  'Procurement Staff',
  'Supplier',
  'Delivery Manager',
  'Site Manager',
  'Manager'
];

const NewUserEdit: React.FC = () => {
  const dispatch = useDispatch();

  let userList = useSelector(
    (state: {
      newUsers: any
    }) => state.newUsers.users
  );

  const existingUser = useSelector(
    (state: {
      newUsers: any
      existingUser: boolean
    }) => state.newUsers.existingUser
  );

  const editingUserId = useSelector(
    (state: {
      newUsers: any
      editingUserId: string
    }) => state.newUsers.editingUserId
  );

  const editingUser = useSelector(
    (state: {
      newUsers: any
      editingUser: any
    }) => state.newUsers.editingUser
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{
    name: string,
    address: string,
    email: string,
    password: string,
    type: string,
    typeDefault: boolean
  }>({
    name: editingUser.name,
    address: editingUser.address,
    email: editingUser.email,
    password: editingUser.password,
    type: editingUser.type,
    typeDefault: true
  });

  useEffect(() => {
    setUser(editingUser);
  }, []);

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
    } else if (user.type.trim() === '') {
      errors_ = 'Please select a type.';
      await dispatch(setExistingUser(true));
      setLoading(false);
    }
    if (user.name.trim() !== '' && user.address.trim() !== '' && user.type.trim() !== '') {
      const finalObject = {
        users: user,
        id: editingUserId
      };
      try {
        await dispatch(setEditUser(true));
        const response = await fetch(`${proxy}/user/editUsers`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        const responseData = await response.json();
        await dispatch(setEditUser(false));
        await dispatch(setEditingUserId(''));
        await dispatch(setEditingUser(null));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingUser(true));
        } else {
          userList = userList.map((user_: any) => user_ === editingUserId ? user : user_);
          await dispatch(setUsers(userList));
          await dispatch(setEditUser(false));
          await dispatch(setEditingUserId(''));
          await dispatch(setEditingUser(null));
        }
        if (responseData.login === 0) {
          errors_ = responseData.message;
        }
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUser({ ...user, name: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUser({ ...user, address: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUser({ ...user, email: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUser({ ...user, type: e.target.value });
    dispatch(setExistingUser(false));
    setLoading(false);
  };

  const handleBack = async () => {
    setLoading(true);
    await dispatch(setEditUser(false));
    await dispatch(setEditingUserId(''));
    await dispatch(setEditingUser(null));
    await dispatch(setExistingUser(false));
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
                          disabled
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
              <option>Select</option>
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
        <Form.Row style={{
          marginTop: '10%'
        }}>
          <Form.Group>
            <Button variant='primary'
                    type='button'
                    onClick={handleBack}
                    style={{
                      marginLeft: '30%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaArrowAltCircleLeft style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }} />
              Back
            </Button>
          </Form.Group>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '60%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaEdit style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }} />
              Edit
            </Button>
          </Form.Group>
        </Form.Row>
        {
          existingUser && errors_ && (
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

export default NewUserEdit;
