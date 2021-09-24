const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/order-lists-controller');

// route to retrieve pending orders list
router.get('/getPendingOrders', OrdersController.getPendingOrders);

// route to retrieve approved purchased orders list
router.get('/getApprovedPurchasedOrders', OrdersController.getApprovedPurchasedOrders);

// route to retrieve rejected purchased orders list
router.get('/getRejectedPurchasedOrders', OrdersController.getRejectedPurchasedOrders);

// route to retrieve pending supplier orders list
router.post('/getPendingOrdersSupplier', OrdersController.getPendingOrdersSupplier);

// route to retrieve delivered supplier orders list
router.post('/getDeliveredOrdersSupplier', OrdersController.getDeliveredOrdersSupplier);

// route to retrieve rejected supplier orders list
router.post('/getRejectedOrdersSupplier', OrdersController.getRejectedOrdersSupplier);

// route to retrieve delivered delivery manager orders list
router.get('/getDeliveryOrdersDManager', OrdersController.getDeliveryOrdersDManager);

// route to retrieve delivery confirmed delivery manager orders list
router.get('/getDeliveryConfirmedDManager', OrdersController.getDeliveryConfirmedDManager);

// route to retrieve delivery rejected delivery manager orders list
router.get('/getDeliveryRejectedDManager', OrdersController.getDeliveryRejectedDManager);

// route to retrieve completed supplier orders list
router.post('/getCompletedOrdersSupplier', OrdersController.getCompletedOrdersSupplier);

// route to retrieve rejected supplier orders list
router.post('/getDRejectedOrdersSupplier', OrdersController.getDRejectedOrdersSupplier);

module.exports = router;
