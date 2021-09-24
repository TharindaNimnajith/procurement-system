import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaArrowAltCircleLeft, FaEdit } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingSite, setEditingSiteId, setEditSite, setExistingSite, setSites } from './site-slice';

let errors_: string = '';

const SitesEdit: React.FC = () => {
  const dispatch = useDispatch();

  let siteList = useSelector(
    (state: {
      sites: any
    }) => state.sites.sites
  );

  const existingSite = useSelector(
    (state: {
      sites: any
      existingSite: boolean
    }) => state.sites.existingSite
  );

  const editingSiteId = useSelector(
    (state: {
      sites: any
      editingSiteId: string
    }) => state.sites.editingSiteId
  );

  const editingSite = useSelector(
    (state: {
      sites: any
      editingSite: any
    }) => state.sites.editingSite
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [siteManagers, setSiteManagers] = useState<any>('');
  const [site, setSite] = useState<{
    siteName: string,
    siteManager: string
  }>({
    siteName: editingSite.siteName,
    siteManager: editingSite.siteManager
  });

  const getSiteManagers = async () => {
    try {
      const response = await fetch(`${proxy}/user/getSiteManagers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      await setSiteManagers(responseData);
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    getSiteManagers().then(() => {
    });
    setSite(editingSite);
  }, [editingSite]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingSite(false));
    if (site.siteName.trim() === '') {
      errors_ = 'Please enter site name.';
      await dispatch(setExistingSite(true));
      setLoading(false);
    } else if (site.siteManager.trim() === '') {
      errors_ = 'Please select site manager.';
      await dispatch(setExistingSite(true));
      setLoading(false);
    }
    if (site.siteName.trim() !== '' && site.siteManager.trim() !== '') {
      const finalObject = {
        sites: site,
        id: editingSiteId
      };
      try {
        await dispatch(setEditSite(true));
        const response = await fetch(`${proxy}/site/editSites`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        const responseData = await response.json();
        await dispatch(setEditSite(false));
        await dispatch(setEditingSiteId(''));
        await dispatch(setEditingSite(null));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingSite(true));
        } else {
          siteList = siteList.map((site_: any) => site_ === editingSiteId ? site : site_);
          await dispatch(setSites(siteList));
          await dispatch(setEditSite(false));
          await dispatch(setEditingSiteId(''));
          await dispatch(setEditingSite(null));
        }
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeSiteName = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setSite({ ...site, siteName: e.target.value });
    dispatch(setExistingSite(false));
    setLoading(false);
  };

  const handleChangeSiteManager = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setSite({ ...site, siteManager: e.target.value });
    dispatch(setExistingSite(false));
    setLoading(false);
  };

  const handleBack = async () => {
    setLoading(true);
    await dispatch(setEditSite(false));
    await dispatch(setEditingSiteId(''));
    await dispatch(setEditingSite(null));
    await dispatch(setExistingSite(false));
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
          <Form.Group controlId='formSiteName'>
            <Form.Label>Site Name</Form.Label>
            <Form.Control type='text'
                          value={site.siteName}
                          onChange={handleChangeSiteName}
                          placeholder='Enter Site Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter site name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formSiteManager'>
            <Form.Label>Site Manager</Form.Label>
            <Form.Control as='select'
                          value={site.siteManager}
                          onChange={handleChangeSiteManager}
                          title='Please select site manager.'
                          required
                          size='lg'>
              <option>Select Option</option>
              {
                siteManagers && siteManagers.map((siteManager: any) => (
                  <option key={siteManager._id}
                          value={siteManager.name}>
                    {
                      siteManager.name
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
          existingSite && errors_ && (
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

export default SitesEdit;
