const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order-controller');

// route to insert orders
router.post('/create', OrderController.createOrders);

// route to retrieve orders list
router.get('/getOrders', OrderController.getOrders);

// route to retrieve a single order
router.get('/getOrders/:id', OrderController.getOrder);

// route to edit orders
router.put('/editOrders', OrderController.editOrders);

// route to delete orders
router.delete('/deleteOrders', OrderController.deleteOrders);

// route to insert invoice
router.post('/addInvoiceOrder/:id', OrderController.addInvoiceOrder);

// route to edit order status
router.put('/editOrderStatus', OrderController.editOrderStatus);

// route to edit order reject reason proc staff
router.post('/editOrderRejectReasonPS', OrderController.editOrderRejectReasonPS);

// route to edit order reject reason supplier
router.post('/editOrderRejectReasonSup', OrderController.editOrderRejectReasonSup);

// route to edit order reject reason delivery manager
router.post('/editOrderRejectReasonDM', OrderController.editOrderRejectReasonDM);

module.exports = router;
