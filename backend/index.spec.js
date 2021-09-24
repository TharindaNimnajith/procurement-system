const chai = require("chai");
const chaiHttp = require("chai-http");
NODE_ENV = 'test'

const server = require("./app");

// test files
const orderTests = require('./tests/order/order.spec');
const paymentTests = require('./tests/payment/payment.spec');
const inventoryTests = require('./tests/inventory/inventory.spec');
const siteTests = require('./tests/site/site.spec');
const userTests = require('./tests/user/user.spec');
const policyTests = require('./tests/policy/policy.spec');

chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Run Tests', function () {
  orderTests(chai, server);
  paymentTests(chai, server);
  inventoryTests(chai, server);
  siteTests(chai, server);
  userTests(chai, server);
  policyTests(chai, server);
  after(async function () {
    console.log('Tests Ended.');
  });
});
