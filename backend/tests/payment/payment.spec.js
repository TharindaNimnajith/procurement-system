const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const paymentURL = `/payment/`;

let newPayment;

let invoiceId = '1005000';
let orderId = '10050';
let supplier = 'Ravishanka Perera';
let amount = '50000';
let paymentMethod = 'Cheque';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const paymentTests = (chai, functions) => {

  describe('Payment Tests', () => {
    it('Should create new payment', (done) => {
      chai.request(functions).post(`${paymentURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          invoiceId: invoiceId,
          orderId: orderId,
          supplier: supplier,
          amount: amount,
          paymentMethod: paymentMethod
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('paymentsItem');
            // console.log(res.body.paymentsItem);
            newPayment = res.body.paymentsItem;
          }
          done();
        })
    })

    it('Should get all payments', (done) => {
      chai.request(functions).get(`${paymentURL}getPayments`).set({Authorization: `Bearer ${token}`})
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

    it('Should get single payment', (done) => {
      chai.request(functions).get(`${paymentURL}getPayments/${newPayment._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the payment', (done) => {
      chai.request(functions).delete(`${paymentURL}deletePayments`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newPayment._id
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

module.exports = paymentTests;
