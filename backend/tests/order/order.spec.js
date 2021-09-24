const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const orderURL = `/order/`;

let newOrder;

let requestedDate = '2020.01.10';
let siteName = 'Galle';
let siteManager = 'Janaka Perera';
let supplierName = 'Ravishanka Perera';
let itemId = 1013;
let itemName = 'Paint';
let itemQuantity = '20';
let requiredDate = '2020.01.20';
let totPrice = '40000';
let isRestricted = true;
let deliveryNote = 'Very Urgent';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const orderTests = (chai, functions) => {

  describe('Order Tests', () => {
    it('Should create new order', (done) => {
      chai.request(functions).post(`${orderURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          requestedDate: requestedDate,
          siteName: siteName,
          siteManager: siteManager,
          supplierName: supplierName,
          itemId: itemId,
          itemName: itemName,
          itemQuantity: itemQuantity,
          requiredDate: requiredDate,
          totPrice: totPrice,
          isRestricted: isRestricted,
          deliveryNote: deliveryNote
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('ordersItem');
            // console.log(res.body.ordersItem);
            newOrder = res.body.ordersItem;
          }
          done();
        })
    })

    it('Should get all orders', (done) => {
      chai.request(functions).get(`${orderURL}getOrders`).set({Authorization: `Bearer ${token}`})
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

    it('Should get single order', (done) => {
      chai.request(functions).get(`${orderURL}getOrders/${newOrder._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the order', (done) => {
      chai.request(functions).delete(`${orderURL}deleteOrders`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newOrder._id
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

module.exports = orderTests;
