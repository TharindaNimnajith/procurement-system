import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingSite, setEditingSiteId, setEditSite, setExistingSite } from './site-slice';

let errors_: string = '';

const SitesList: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [sites, setSiteList] = useState<any>([]);

  const getSite = async () => {
    try {
      const response = await fetch(`${proxy}/site/getSites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setSiteList(responseData);
    } catch (errors) {
      errors_ = errors;
      console.log(errors);
    }
  };

  useEffect(() => {
    getSite().then(() => {
    });
  }, [sites]);

  const handleClose = () => {
    setLoading(true);
    setShow(false);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteSite(deleteId).then(() => setShow(false));
    setLoading(false);
  };

  const handleShow = (id: string) => {
    setLoading(true);
    setShow(true);
    setDeleteId(id);
    setLoading(false);
  };

  const editSite = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/site/getSites/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      await dispatch(setExistingSite(false));
      await dispatch(setEditingSiteId(id));
      await dispatch(setEditingSite(responseData));
      await dispatch(setEditSite(true));
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  const deleteSite = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${proxy}/site/deleteSites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      });
      await response.json();
      await dispatch(setEditSite(false));
      await dispatch(setExistingSite(false));
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
            <Modal.Title>Delete Site</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this site?</Modal.Body>
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
            Site Id
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
            Site Name
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
            Site Manager
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
            sites.sites && sites.sites.map((site: any) => {
              return (
                <tr key={site._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {site.siteId}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {site.siteName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {site.siteManager}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => editSite(site._id)}
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
                    <button onClick={() => handleShow(site._id)}
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

export default SitesList;
