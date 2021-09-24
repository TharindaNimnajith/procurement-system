import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingInventory, setEditingInventoryId, setEditInventory, setExistingInventory } from './inventory-slice';

let errors_: string = '';

const InventoriesList: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [inventories, setInventoryList] = useState<any>([]);

  const getInventory = async () => {
    try {
      const response = await fetch(`${proxy}/inventory/getInventories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setInventoryList(responseData);
    } catch (errors) {
      errors_ = errors;
      console.log(errors);
    }
  };

  useEffect(() => {
    getInventory().then(() => {
    });
  }, [inventories]);

  const handleClose = () => {
    setLoading(true);
    setShow(false);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteInventory(deleteId).then(() => setShow(false));
    setLoading(false);
  };

  const handleShow = (id: string) => {
    setLoading(true);
    setShow(true);
    setDeleteId(id);
    setLoading(false);
  };

  const editInventory = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/inventory/getInventories/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      await dispatch(setExistingInventory(false));
      await dispatch(setEditingInventoryId(id));
      await dispatch(setEditingInventory(responseData));
      await dispatch(setEditInventory(true));
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  const deleteInventory = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/inventory/deleteInventories`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      });
      await response.json();
      await dispatch(setEditInventory(false));
      await dispatch(setExistingInventory(false));
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
            <Modal.Title>Delete Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
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
            Item Id
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
            Unit Price
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Units in Stock
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Threshold Units
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Description
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
            Is Restricted
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
            inventories.inventories && inventories.inventories.map((inventory: any) => {
              return (
                <tr key={inventory._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.itemId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.itemName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.unitPrice}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.unitsInStock}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.thresholdUnits}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.description}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {inventory.siteName}
                  </td>
                  {
                    parseInt(inventory.unitsInStock) >= parseInt(inventory.thresholdUnits) ? (
                      <td style={{
                        textAlign: 'center',
                        color: 'green'
                      }}>
                        Normal
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                        Critical
                      </td>
                    )
                  }
                  {
                    inventory.isRestricted ? (
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
                    <button onClick={() => editInventory(inventory._id)}
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
                    <button onClick={() => handleShow(inventory._id)}
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

export default InventoriesList;
