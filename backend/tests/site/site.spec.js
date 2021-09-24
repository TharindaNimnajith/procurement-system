const sinon = require('sinon');
const jwt = require('jsonwebtoken');

sinon.mock(jwt);

const siteURL = `/site/`;

let newSite;

let siteName = 'Galle';
let siteManager = 'Janaka Perera';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhhZTcxZTcwYzdjYzY5MDBlMzAzYjUiLCJpYXQiOjE2MDI5Mzg3OTQsImV4cCI6MTYwNDE0ODM5NH0.1YVVT4J2zWKcrSKIpqZd6jLELJ86MmBOiCfsA_-z3_c`;

const siteTests = (chai, functions) => {

  describe('Site Tests', () => {
    it('Should create new site', (done) => {
      chai.request(functions).post(`${siteURL}create`).set({Authorization: `Bearer ${token}`})
        .send({
          siteName: siteName,
          siteManager: siteManager
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('sitesItem');
            // console.log(res.body.sitesItem);
            newSite = res.body.sitesItem;
          }
          done();
        })
    })

    it('Should get all sites', (done) => {
      chai.request(functions).get(`${siteURL}getSites`).set({Authorization: `Bearer ${token}`})
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

    it('Should get single site', (done) => {
      chai.request(functions).get(`${siteURL}getSites/${newSite._id}`).set({Authorization: `Bearer ${token}`})
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            res.should.have.status(200);
          }
          done();
        })
    })

    it('Should delete the site', (done) => {
      chai.request(functions).delete(`${siteURL}deleteSites`).set({Authorization: `Bearer ${token}`})
        .send({
          id: newSite._id
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

module.exports = siteTests;
