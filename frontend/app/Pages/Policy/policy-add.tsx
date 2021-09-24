import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setExistingPolicy, setPolicies } from './policy-slice';

let errors_: string = '';

const methodList = [
  'Approval Amount'
];

const PoliciesAdd: React.FC = () => {
  const dispatch = useDispatch();

  let policyList = useSelector(
    (state: {
      policies: any
    }) => state.policies.policies
  );

  const existingPolicy = useSelector(
    (state: {
      policies: any
      existingPolicy: boolean
    }) => state.policies.existingPolicy
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [policy, setPolicy] = useState<{
    property: string,
    value: string
  }>({
    property: '',
    value: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingPolicy(false));
    if (policy.property.trim() === '') {
      errors_ = 'Please select property.';
      await dispatch(setExistingPolicy(true));
      setLoading(false);
    } else if (policy.value.trim() === '') {
      errors_ = 'Please enter a value.';
      await dispatch(setExistingPolicy(true));
      setLoading(false);
    }
    if (policy.property.trim() !== '' && policy.value.trim() !== '') {
      try {
        const response = await fetch(`${proxy}/policy/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(policy)
        });
        const responseData = await response.json();
        policyList = { ...policyList, responseData };
        await dispatch(setPolicies(policyList));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingPolicy(true));
        }
        await dispatch(setExistingPolicy(false));
        await resetValues();
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setPolicy({ ...policy, property: e.target.value });
    dispatch(setExistingPolicy(false));
    setLoading(false);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors_ = '';
    setLoading(true);
    setPolicy({ ...policy, value: e.target.value });
    dispatch(setExistingPolicy(false));
    setLoading(false);
  };

  const resetValues = async () => {
    setLoading(true);
    policy.property = '';
    policy.value = '';
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
          <Form.Group controlId='formItemName'>
            <Form.Label>Property</Form.Label>
            <Form.Control as='select'
                          value={policy.property}
                          onChange={handleChangeProperty}
                          title='Please select the payment method.'
                          required
                          size='lg'>
              <option>Select Option</option>
              {
                methodList?.map((method) => (
                  <option>
                    {
                      method
                    }
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formUnitPrice'>
            <Form.Label>Value</Form.Label>
            <Form.Control type='text'
                          value={policy.value}
                          onChange={handleChangeValue}
                          placeholder='Enter Value'
                          pattern='[0-9]+'
                          title='Please enter a valid value.'
                          required
                          size='lg' />
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
          existingPolicy && errors_ && (
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

export default PoliciesAdd;
