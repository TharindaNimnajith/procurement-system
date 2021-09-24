const express = require('express');
const router = express.Router();

const PolicyController = require('../controllers/policy-controller');

// route to insert policies
router.post('/create', PolicyController.createPolicies);

// route to retrieve policies list
router.get('/getPolicies', PolicyController.getPolicies);

// route to retrieve a single policy
router.get('/getPolicies/:id', PolicyController.getPolicy);

// route to edit policies
router.put('/editPolicies', PolicyController.editPolicies);

// route to delete policies
router.delete('/deletePolicies', PolicyController.deletePolicies);

module.exports = router;
