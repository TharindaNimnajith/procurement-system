import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingPolicy, setEditingPolicyId, setEditPolicy, setExistingPolicy } from './policy-slice';

let errors_: string = '';

const PoliciesList: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [policies, setPolicyList] = useState<any>([]);

  const getPolicy = async () => {
    try {
      const response = await fetch(`${proxy}/policy/getPolicies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setPolicyList(responseData);
    } catch (errors) {
      errors_ = errors;
      console.log(errors);
    }
  };

  useEffect(() => {
    getPolicy().then(() => {
    });
  }, [policies]);

  const handleClose = () => {
    setLoading(true);
    setShow(false);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deletePolicy(deleteId).then(() => setShow(false));
    setLoading(false);
  };

  const handleShow = (id: string) => {
    setLoading(true);
    setShow(true);
    setDeleteId(id);
    setLoading(false);
  };

  const editPolicy = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/policy/getPolicies/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      await dispatch(setExistingPolicy(false));
      await dispatch(setEditingPolicyId(id));
      await dispatch(setEditingPolicy(responseData));
      await dispatch(setEditPolicy(true));
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  const deletePolicy = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/policy/deletePolicies`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      });
      await response.json();
      await dispatch(setEditPolicy(false));
      await dispatch(setExistingPolicy(false));
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
            <Modal.Title>Delete Policy</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this policy?</Modal.Body>
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
            Policy Id
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
            Property
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
            Value
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
            policies.policies && policies.policies.map((policy: any) => {
              return (
                <tr key={policy._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {policy.policyId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {policy.property}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {policy.value}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => editPolicy(policy._id)}
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
                    <button onClick={() => handleShow(policy._id)}
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

export default PoliciesList;
