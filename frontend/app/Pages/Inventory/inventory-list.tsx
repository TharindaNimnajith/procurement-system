import React, { useEffect, useState } from 'react';
import { proxy } from '../../conf';
import { Table } from 'react-bootstrap';

let errors_: string = '';

const InventoryList: React.FC = () => {
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

  return (
    <div>
      <div>
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
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white',
            borderBottom: 'solid darkblue 1px',
            borderRight: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px'
          }}>
            Is Restricted
          </th>
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

export default InventoryList;
