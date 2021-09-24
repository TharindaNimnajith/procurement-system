const express = require('express');
const router = express.Router();

const InventoryController = require('../controllers/inventory-controller');

// route to insert inventories
router.post('/create', InventoryController.createInventories);

// route to retrieve inventories list
router.get('/getInventories', InventoryController.getInventories);

// route to retrieve a single inventories
router.get('/getInventories/:id', InventoryController.getInventory);

// route to edit inventories
router.put('/editInventories', InventoryController.editInventories);

// route to delete inventories
router.delete('/deleteInventories', InventoryController.deleteInventories);

module.exports = router;
