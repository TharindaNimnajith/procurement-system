const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const policyURL = `/policy/`;

let newPolicy;

let property = 'Approval Amount1';
let value = '100000';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const policyTests = (chai, functions) => {

  describe('Policy Tests', () => {
    it('Should create new policy', (done) => {
      chai.request(functions).post(`${policyURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          property: property,
          value: value
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('policiesItem');
            // console.log(res.body.policiesItem);
            newPolicy = res.body.policiesItem;
          }
          done();
        })
    })

    it('Should get all policies', (done) => {
      chai.request(functions).get(`${policyURL}getPolicies`).set({Authorization: `Bearer ${token}`})
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

    it('Should get single policy', (done) => {
      chai.request(functions).get(`${policyURL}getPolicies/${newPolicy._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the policy', (done) => {
      chai.request(functions).delete(`${policyURL}deletePolicies`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newPolicy._id
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

module.exports = policyTests;
