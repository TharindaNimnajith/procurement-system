const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment-controller');

// route to insert payments
router.post('/create', PaymentController.createPayments);

// route to retrieve payments list
router.get('/getPayments', PaymentController.getPayments);

// route to retrieve a single payment
router.get('/getPayments/:id', PaymentController.getPayment);

// route to edit payments
router.put('/editPayments', PaymentController.editPayments);

// route to delete payments
router.delete('/deletePayments', PaymentController.deletePayments);

module.exports = router;
