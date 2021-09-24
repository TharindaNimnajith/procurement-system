const express = require('express');
const router = express.Router();

const SiteController = require('../controllers/site-controller');

// route to insert sites
router.post('/create', SiteController.createSites);

// route to retrieve sites list
router.get('/getSites', SiteController.getSites);

// route to retrieve a single site
router.get('/getSites/:id', SiteController.getSite);

// route to edit sites
router.put('/editSites', SiteController.editSites);

// route to delete sites
router.delete('/deleteSites', SiteController.deleteSites);

module.exports = router;
