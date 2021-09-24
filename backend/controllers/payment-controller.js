const HttpError = require('../models/http-errors');
const Payments = require('../models/payment.model');

// method to insert payments
const createPayments = async (req, res, next) => {
  const {
    invoiceId,
    orderId,
    paymentMethod,
    supplier,
    amount
  } = req.body;

  const PaymentsItem = new Payments({
    invoiceId,
    orderId,
    paymentMethod,
    supplier,
    amount
  });

  try {
    await PaymentsItem.save();
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500);
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    });
    return next(error);
  }

  res.status(201).json({
    paymentsItem: PaymentsItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  });
};

// method to retrieve payments list
const getPayments = async (req, res) => {
  Payments.find({})
    .then((payments) =>
      res.json({
        payments: payments,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

// method to edit payments
const editPayments = async (req, res) => {
  const {
    payments,
    id
  } = req.body;

  const query = {
    '_id': id
  };

  Payments.findOneAndUpdate(query, payments, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      });
    return res.json({
      payments: item,
      message: 'Edited Successfully'
    });
  });
};

// method to delete payments
const deletePayments = async (req, res) => {
  const {
    id
  } = req.body;

  Payments.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.json({
    message: 'Deleted Successfully'
  });
};

// method to retrieve a single payment
const getPayment = async (req, res, next) => {
  let payment;

  const {
    id
  } = req.params;

  try {
    payment = await Payments.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(payment);
};

exports.createPayments = createPayments;
exports.editPayments = editPayments;
exports.getPayments = getPayments;
exports.getPayment = getPayment;
exports.deletePayments = deletePayments;
