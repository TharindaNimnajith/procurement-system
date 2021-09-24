import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingUser, setEditingUserId, setEditUser, setExistingUser } from './newUser-slice';

let errors_: string = '';

const NewUsersList: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [users, setUserList] = useState<any>([]);

  const getUser = async () => {
    try {
      const response = await fetch(`${proxy}/user/getUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setUserList(responseData);
    } catch (errors) {
      errors_ = errors;
      console.log(errors);
    }
  };

  useEffect(() => {
    getUser().then(() => {
    });
  }, [users]);

  const handleClose = () => {
    setLoading(true);
    setShow(false);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteUser(deleteId).then(() => setShow(false));
    setLoading(false);
  };

  const handleShow = (id: string) => {
    setLoading(true);
    setShow(true);
    setDeleteId(id);
    setLoading(false);
  };

  const editUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/user/getUsers/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log(responseData);
      await dispatch(setExistingUser(false));
      await dispatch(setEditingUserId(id));
      await dispatch(setEditingUser(responseData));
      await dispatch(setEditUser(true));
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/user/deleteUsers`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      });
      await response.json();
      await dispatch(setEditUser(false));
      await dispatch(setExistingUser(false));
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  return (
    <div>
      <div>
        <Modal show={show}
               onHide={handleClose}
               deleteId={deleteId}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant='success'
                    onClick={handleClose}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Close
            </Button>
            <Button variant='danger'
                    onClick={handleDelete}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Delete
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
            User Id
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
            Name
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Address
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Email
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            User Type
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
            users.users && users.users.map((user: any) => {
              return (
                <tr key={user._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {user.userId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {user.name}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {user.address}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {user.email}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {user.type}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => editUser(user._id)}
                            style={{
                              color: 'darkgreen',
                              backgroundColor: 'transparent',
                              border: 'none'
                            }}>
                      <FaEdit size={20} />
                    </button>
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => handleShow(user._id)}
                            style={{
                              color: 'indianred',
                              backgroundColor: 'transparent',
                              border: 'none'
                            }}>
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
      </div>
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
    </div>
  );
};

export default NewUsersList;
