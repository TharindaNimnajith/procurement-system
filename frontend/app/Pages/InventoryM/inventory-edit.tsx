import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaArrowAltCircleLeft, FaEdit } from 'react-icons/fa';
import { proxy } from '../../conf';
import {
  setEditingInventory,
  setEditingInventoryId,
  setEditInventory,
  setExistingInventory,
  setInventories
} from './inventory-slice';

let errors_: string = '';

const InventoriesEdit: React.FC = () => {
  const dispatch = useDispatch();

  let inventoryList = useSelector(
    (state: {
      inventories: any
    }) => state.inventories.inventories
  );

  const existingInventory = useSelector(
    (state: {
      inventories: any
      existingInventory: boolean
    }) => state.inventories.existingInventory
  );

  const editingInventoryId = useSelector(
    (state: {
      inventories: any
      editingInventoryId: string
    }) => state.inventories.editingInventoryId
  );

  const editingInventory = useSelector(
    (state: {
      inventories: any
      editingInventory: any
    }) => state.inventories.editingInventory
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [isRestricted, setIsRestricted] = useState<string>('');
  const [sites, setSites] = useState<any>('');
  const [inventory, setInventory] = useState<{
    itemId: string,
    itemName: string,
    unitPrice: string,
    unitsInStock: string,
    thresholdUnits: string,
    description: string,
    siteName: string,
    isRestricted: boolean
  }>({
    itemId: editingInventory.itemId,
    itemName: editingInventory.itemName,
    unitPrice: editingInventory.unitPrice,
    unitsInStock: editingInventory.unitsInStock,
    thresholdUnits: editingInventory.thresholdUnits,
    description: editingInventory.description,
    siteName: editingInventory.siteName,
    isRestricted: editingInventory.isRestricted
  });

  const getSites = async () => {
    try {
      const response = await fetch(`${proxy}/site/getSites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      await setSites(responseData);
      setLoading(false);
    } catch (errors) {
      errors_ = errors;
      setLoading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    getSites().then(() => {
    });
    setInventory(editingInventory);
    if (editingInventory.isRestricted) {
      setIsRestricted('True');
    } else {
      setIsRestricted('False');
    }
  }, [editingInventory]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(setExistingInventory(false));
    if (inventory.itemName.trim() === '') {
      errors_ = 'Please enter a value for the item name.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.unitPrice.trim() === '') {
      errors_ = 'Please enter a value for the unit price.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.unitsInStock.trim() === '') {
      errors_ = 'Please enter a value for the units in stock.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.thresholdUnits.trim() === '') {
      errors_ = 'Please enter a value for the threshold units.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    } else if (inventory.siteName.trim() === '') {
      errors_ = 'Please enter a value for the site name.';
      await dispatch(setExistingInventory(true));
      setLoading(false);
    }
    if (inventory.itemName.trim() !== '' && inventory.unitPrice.trim() !== ''
      && inventory.unitsInStock.trim() !== '' && inventory.thresholdUnits.trim() !== ''
      && inventory.thresholdUnits.trim() !== '' && inventory.siteName.trim() !== '') {
      const finalObject = {
        inventories: inventory,
        id: editingInventoryId
      };
      try {
        await dispatch(setEditInventory(true));
        const response = await fetch(`${proxy}/inventory/editInventories`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        });
        const responseData = await response.json();
        await dispatch(setEditInventory(false));
        await dispatch(setEditingInventoryId(''));
        await dispatch(setEditingInventory(null));
        if (responseData.exists) {
          errors_ = responseData.message;
          await dispatch(setExistingInventory(true));
        } else {
          inventoryList = inventoryList.map((inventory_: any) => inventory_ === editingInventoryId ? inventory : inventory_);
          await dispatch(setInventories(inventoryList));
          await dispatch(setEditInventory(false));
          await dispatch(setEditingInventoryId(''));
          await dispatch(setEditingInventory(null));
        }
        setLoading(false);
      } catch (errors) {
        errors_ = errors;
        setLoading(false);
        console.log(errors);
      }
    }
  };

  const handleChangeItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, itemName: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeUnitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, unitPrice: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeUnitsInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, unitsInStock: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeThresholdUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, thresholdUnits: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, description: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeSiteName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInventory({ ...inventory, siteName: e.target.value });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleChangeIsRestricted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setIsRestricted(e.target.value);
    let isRestrictedVar = e.target.value === 'True';
    setInventory({ ...inventory, isRestricted: isRestrictedVar });
    dispatch(setExistingInventory(false));
    setLoading(false);
  };

  const handleBack = async () => {
    setLoading(true);
    await dispatch(setEditInventory(false));
    await dispatch(setEditingInventoryId(''));
    await dispatch(setEditingInventory(null));
    await dispatch(setExistingInventory(false));
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
            <Form.Label>Item Name</Form.Label>
            <Form.Control type='text'
                          value={inventory.itemName}
                          onChange={handleChangeItemName}
                          placeholder='Enter Item Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a valid item name.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formUnitPrice'>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control type='text'
                          value={inventory.unitPrice}
                          onChange={handleChangeUnitPrice}
                          placeholder='Enter Unit Price'
                          pattern='[0-9]+'
                          title='Please enter a valid unit price.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formUnitsInStock'>
            <Form.Label>Units In Stock</Form.Label>
            <Form.Control type='text'
                          value={inventory.unitsInStock}
                          onChange={handleChangeUnitsInStock}
                          placeholder='Enter Units In Stock'
                          pattern='[0-9]+'
                          title='Please enter a valid units in stock count.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formThresholdUnits'>
            <Form.Label>Threshold Units</Form.Label>
            <Form.Control type='text'
                          value={inventory.thresholdUnits}
                          onChange={handleChangeThresholdUnit}
                          placeholder='Enter Threshold Units'
                          pattern='[0-9]+'
                          title='Please enter a valid threshold units count.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text'
                          value={inventory.description}
                          onChange={handleChangeDescription}
                          placeholder='Enter Description'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a description.'
                          required
                          size='lg' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formSiteName'>
            <Form.Label>Site Name</Form.Label>
            <Form.Control as='select'
                          value={inventory.siteName}
                          onChange={handleChangeSiteName}
                          title='Please select site name.'
                          required
                          size='lg'>
              <option value="">Select Option</option>
              {
                sites.sites && sites.sites.map((site: any) => {
                  return (
                    <option key={site._id}
                            value={site.siteName}>
                      {site.siteName}
                    </option>
                  );
                })
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formIsRestricted'>
            <Form.Label>Is Restricted</Form.Label>
            <Form.Control as='select'
                          value={isRestricted}
                          onChange={handleChangeIsRestricted}
                          title='Please select if item is restricted.'
                          size='lg'>
              <option value="">Select Option</option>
              <option value='True'>True</option>
              <option value='False'>False</option>
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
          existingInventory && errors_ && (
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

export default InventoriesEdit;
