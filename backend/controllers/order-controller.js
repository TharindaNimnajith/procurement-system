const HttpError = require('../models/http-errors');
const Orders = require('../models/order.model');
const Policy = require('../models/policy.model');
const Inventory = require('../models/inventory.model');

// method to insert orders
const createOrders = async (req, res, next) => {
  const {
    requestedDate,
    siteName,
    siteManager,
    supplierName,
    itemId,
    itemName,
    itemQuantity,
    requiredDate,
    totPrice,
    isRestricted,
    deliveryNote
  } = req.body;

  let approvalAmount;

  try {
    approvalAmount = await Policy.findOne({
      property: 'Approval Amount'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  if (approvalAmount === null)
    approvalAmount = 100000;
  else
    approvalAmount = approvalAmount.value;

  let status = 'approved';

  if (isRestricted === true || parseInt(totPrice) > parseInt(approvalAmount))
    status = 'pending';

  const OrdersItem = new Orders({
    requestedDate,
    siteName,
    requiredDate,
    siteManager,
    supplierName,
    itemId,
    itemName,
    itemQuantity,
    totPrice,
    isRestricted,
    deliveryNote,
    status
  });

  try {
    await OrdersItem.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Adding failed, please try again.', 500);
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    });
    return next(error);
  }

  res.status(201).json({
    ordersItem: OrdersItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  });
};

// method to retrieve orders list
const getOrders = async (req, res) => {
  Orders.find({})
    .then((orders) =>
      res.json({
        orders: orders,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

// method to edit orders
const editOrderStatus = async (req, res, next) => {
  let order;

  const {
    orderId,
    status
  } = req.body;

  try {
    order = await Orders.findOne({
      orderId: orderId
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  order.status = status;

  try {
    await order.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Updating failed, please try again.', 500);
    return next(error);
  }

  if (status === 'deliveryConfirmed') {
    let item = await Inventory.findOne({
      itemId: order.itemId
    });

    item.unitsInStock = parseInt(item.unitsInStock) + parseInt(order.itemQuantity);

    try {
      await item.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError('Updating failed, please try again.', 500);
      return next(error);
    }
  }

  return res.json({
    message: 'Order status updated successfully'
  });
};

// method to edit orders
const editOrders = async (req, res) => {
  const {
    orders,
    id
  } = req.body;

  const query = {
    '_id': id
  };

  Orders.findOneAndUpdate(query, orders, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      });
    return res.json({
      orders: item,
      message: 'Edited Successfully'
    });
  });
};

// method to delete orders
const deleteOrders = async (req, res) => {
  const {
    id
  } = req.body;

  Orders.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.json({
    message: 'Deleted Successfully'
  });
};

// method to retrieve a single orders
const getOrder = async (req, res, next) => {
  let order;

  const {
    id
  } = req.params;

  try {
    order = await Orders.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(order);
};

// method to insert invoice to order
const addInvoiceOrder = async (req, res, next) => {
  let order;

  const {
    id
  } = req.params;

  const {
    deliveryDate,
    invoiceId,
    supplierAmount
  } = req.body;

  try {
    order = await Orders.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  order.deliveryDate = deliveryDate;
  order.invoiceId = invoiceId;
  order.supplierAmount = supplierAmount;

  try {
    await order.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send({
    message: 'Invoice order added successfully!'
  });
};

// method to edit order with reject reason procurement staff
const editOrderRejectReasonPS = async (req, res, next) => {
  let order;

  const {
    orderId,
    status,
    reason
  } = req.body;

  try {
    order = await Orders.findOne({
      orderId: orderId
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  order.procurementStaffRejectedReason = reason;
  order.status = status;

  try {
    await order.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Updating failed, please try again.', 500);
    return next(error);
  }

  return res.json({
    message: 'Order status updated successfully'
  });
};

// method to edit order with reject reason supplier
const editOrderRejectReasonSup = async (req, res, next) => {
  let order;

  const {
    orderId,
    status,
    reason
  } = req.body;

  try {
    order = await Orders.findOne({
      orderId: orderId
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  order.supplierRejectedReason = reason;
  order.status = status;

  try {
    await order.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Updating failed, please try again.', 500);
    return next(error);
  }

  return res.json({
    message: 'Order status updated successfully'
  });
};

// method to edit order with reject reason delivery manager
const editOrderRejectReasonDM = async (req, res, next) => {
  let order;

  const {
    orderId,
    status,
    reason
  } = req.body;

  try {
    order = await Orders.findOne({
      orderId: orderId
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  order.deliveryManagerRejectedReason = reason;
  order.status = status;

  try {
    await order.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Updating failed, please try again.', 500);
    return next(error);
  }

  return res.json({
    message: 'Order status updated successfully'
  });
};

exports.createOrders = createOrders;
exports.editOrders = editOrders;
exports.getOrders = getOrders;
exports.getOrder = getOrder;
exports.deleteOrders = deleteOrders;
exports.addInvoiceOrder = addInvoiceOrder;
exports.editOrderStatus = editOrderStatus;
exports.editOrderRejectReasonPS = editOrderRejectReasonPS;
exports.editOrderRejectReasonSup = editOrderRejectReasonSup;
exports.editOrderRejectReasonDM = editOrderRejectReasonDM;
