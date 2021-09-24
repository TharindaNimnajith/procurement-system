const HttpError = require('../models/http-errors');
const Orders = require('../models/order.model');

// method to retrieve pending orders list
const getPendingOrders = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: 'pending'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve approved purchased orders list
const getApprovedPurchasedOrders = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: {
        $in: ['approved', 'pApproved']
      }
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve rejected purchased orders list
const getRejectedPurchasedOrders = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: 'pRejected'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve pending supplier orders list
const getPendingOrdersSupplier = async (req, res, next) => {
  let orderList;

  const {
    supplierName
  } = req.body;

  try {
    orderList = await Orders.find({
      status: {
        $in: ['approved', 'pApproved']
      },
      supplierName: supplierName
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve delivered supplier orders list
const getDeliveredOrdersSupplier = async (req, res, next) => {
  let orderList;

  const {
    supplierName
  } = req.body;

  try {
    orderList = await Orders.find({
      status: 'supDelivered',
      supplierName: supplierName
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve rejected supplier orders list
const getRejectedOrdersSupplier = async (req, res, next) => {
  let orderList;

  const {
    supplierName
  } = req.body;

  try {
    orderList = await Orders.find({
      status: 'supRejected',
      supplierName: supplierName
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve delivered delivery manager orders list
const getDeliveryOrdersDManager = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: 'supDelivered'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve delivery confirmed delivery manager orders list
const getDeliveryConfirmedDManager = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: 'deliveryConfirmed'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve delivery rejected delivery manager orders list
const getDeliveryRejectedDManager = async (req, res, next) => {
  let orderList;

  try {
    orderList = await Orders.find({
      status: 'deliveryRejected'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve completed supplier orders list
const getCompletedOrdersSupplier = async (req, res, next) => {
  let orderList;

  const {
    supplierName
  } = req.body;

  try {
    orderList = await Orders.find({
      status: 'deliveryConfirmed',
      supplierName: supplierName
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

// method to retrieve rejected supplier orders list
const getDRejectedOrdersSupplier = async (req, res, next) => {
  let orderList;

  const {
    supplierName
  } = req.body;

  try {
    orderList = await Orders.find({
      status: 'deliveryRejected',
      supplierName: supplierName
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(orderList);
};

exports.getPendingOrders = getPendingOrders;
exports.getApprovedPurchasedOrders = getApprovedPurchasedOrders;
exports.getRejectedPurchasedOrders = getRejectedPurchasedOrders;
exports.getPendingOrdersSupplier = getPendingOrdersSupplier;
exports.getDeliveredOrdersSupplier = getDeliveredOrdersSupplier;
exports.getRejectedOrdersSupplier = getRejectedOrdersSupplier;
exports.getDeliveryOrdersDManager = getDeliveryOrdersDManager;
exports.getDeliveryConfirmedDManager = getDeliveryConfirmedDManager;
exports.getDeliveryRejectedDManager = getDeliveryRejectedDManager;
exports.getCompletedOrdersSupplier = getCompletedOrdersSupplier;
exports.getDRejectedOrdersSupplier = getDRejectedOrdersSupplier;
