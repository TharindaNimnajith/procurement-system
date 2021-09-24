const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const inventoryURL = `/inventory/`;

let newInventory;

let unitsInStock = '70';
let isRestricted = true;
let itemName = 'Paint';
let unitPrice = '2000';
let thresholdUnits = '20';
let description = 'Paint';
let siteName = 'Galle';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const inventoryTests = (chai, functions) => {

  describe('Inventory Tests', () => {
    it('Should create new inventory', (done) => {
      chai.request(functions).post(`${inventoryURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          unitsInStock: unitsInStock,
          isRestricted: isRestricted,
          itemName: itemName,
          unitPrice: unitPrice,
          thresholdUnits: thresholdUnits,
          description: description,
          siteName: siteName
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('inventoriesItem');
            // console.log(res.body.inventoriesItem);
            newInventory = res.body.inventoriesItem;
          }
          done();
        })
    })

    it('Should get all inventories', (done) => {
      chai.request(functions).get(`${inventoryURL}getInventories`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
          }
          done();
        })
    })

    it('Should get single inventory', (done) => {
      chai.request(functions).get(`${inventoryURL}getInventories/${newInventory._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the inventory', (done) => {
      chai.request(functions).delete(`${inventoryURL}deleteInventories`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newInventory._id
        })
        .end((error) => {
          if (error) {
            console.log(error);
          } else {
            // console.log('Deleted Successfully');
          }
          done();
        })
    })
  });
}

module.exports = inventoryTests;
