const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const userURL = `/user/`;

let newUser;

let name = 'Kamal Perera';
let address = 'No.1, Galle Road, Galle';
let email = '123';
let password = '1';
let type = 'Procurement Staff';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const userTests = (chai, functions) => {

  describe('User Tests', () => {
    it('Should create new user', (done) => {
      chai.request(functions).post(`${userURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          name: name,
          address: address,
          email: email,
          password: password,
          type: type
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('usersItem');
            // console.log(res.body.usersItem);
            newUser = res.body.usersItem;
          }
          done();
        })
    })

    it('Should get all users', (done) => {
      chai.request(functions).get(`${userURL}getUsers`).set({Authorization: `Bearer ${token}`})
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

    it('Should get single user', (done) => {
      chai.request(functions).get(`${userURL}getUsers/${newUser._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the user', (done) => {
      chai.request(functions).delete(`${userURL}deleteUsers`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newUser._id
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

module.exports = userTests;
