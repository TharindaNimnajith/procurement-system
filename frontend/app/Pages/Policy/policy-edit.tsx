import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaArrowAltCircleLeft, FaEdit } from 'react-icons/fa';
import { proxy } from '../../conf';
import { setEditingPolicy, setEditingPolicyId, setEditPolicy, setExistingPolicy, setPolicies } from './policy-slice';

let errors_: string = '';

const methodList = [
  'Approval Amount'
];

const PoliciesEdit: React.FC = () => {
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

  const editingPolicyId = useSelector(
    (state: {
      policies: any
      editingPolicyId: string
    }) => state.policies.editingPolicyId
  );

  const editingPolicy = useSelector(
    (state: {
      policies: any
      editingPolicy: any
    }) => state.policies.editingPolicy
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [policy, setPolicy] = useState<{
    property: string,
    value: string
  }>({
    property: editingPolicy.property,
    value: editingPolicy.value
  });

  useEffect(() => {
    setPolicy(editingPolicy);
  }, [editingPolicy]);

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
      const finalObject = {
        policies: policy,
        id: editingPolicyId
      };
      try {
        await dispatch(setEditPolicy(true));
        const response = await fetch(`${proxy}/policy/editPolicies`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        const responseData = await response.json();
        await dispatch(setEditPolicy(false));
        await dispatch(setEditingPolicyId(''));
        await dispatch(setEditingPolicy(null));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingPolicy(true));
        } else {
          policyList = policyList.map((policy_: any) => policy_ === editingPolicyId ? policy : policy_);
          await dispatch(setPolicies(policyList));
          await dispatch(setEditPolicy(false));
          await dispatch(setEditingPolicyId(''));
          await dispatch(setEditingPolicy(null));
        }
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

  const handleBack = async () => {
    setLoading(true);
    await dispatch(setEditPolicy(false));
    await dispatch(setEditingPolicyId(''));
    await dispatch(setEditingPolicy(null));
    await dispatch(setExistingPolicy(false));
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

export default PoliciesEdit;
