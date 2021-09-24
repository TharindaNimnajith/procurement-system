import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setExistingSite, setSites } from './site-slice';

let errors_: string = '';

const SitesAdd: React.FC = () => {
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

  const [loading, setLoading] = useState<boolean>(false);
  const [siteManagers, setSiteManagers] = useState<any>('');
  const [site, setSite] = useState<{
    siteName: string,
    siteManager: string
  }>({
    siteName: '',
    siteManager: ''
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
      console.log(responseData);
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
  }, []);

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
      try {
        const response = await fetch(`${proxy}/site/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(site)
        });
        const responseData = await response.json();
        siteList = { ...siteList, responseData };
        await dispatch(setSites(siteList));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingSite(true));
        }
        await dispatch(setExistingSite(false));
        await resetValues();
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

  const resetValues = async () => {
    setLoading(true);
    site.siteName = '';
    site.siteManager = '';
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

export default SitesAdd;
