const HttpError = require('../models/http-errors');
const Policies = require('../models/policy.model');

// method to insert policies
const createPolicies = async (req, res, next) => {
  const {
    property,
    value
  } = req.body;

  const PoliciesItem = new Policies({
    property,
    value
  });

  try {
    await PoliciesItem.save();
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500);
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    });
    return next(error);
  }

  res.status(201).json({
    policiesItem: PoliciesItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  });
};

// method to retrieve policies list
const getPolicies = async (req, res) => {
  Policies.find({})
    .then((policies) =>
      res.json({
        policies: policies,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

// method to edit policies
const editPolicies = async (req, res) => {
  const {
    policies,
    id
  } = req.body;

  const query = {
    '_id': id
  };

  Policies.findOneAndUpdate(query, policies, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      });
    return res.json({
      policies: item,
      message: 'Edited Successfully'
    });
  });
};

// method to delete policies
const deletePolicies = async (req, res) => {
  const {
    id
  } = req.body;

  Policies.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.json({
    message: 'Deleted Successfully'
  });
};

// method to retrieve a single policy
const getPolicy = async (req, res, next) => {
  let policy;

  const {
    id
  } = req.params;

  try {
    policy = await Policies.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(policy);
};

exports.createPolicies = createPolicies;
exports.editPolicies = editPolicies;
exports.getPolicies = getPolicies;
exports.getPolicy = getPolicy;
exports.deletePolicies = deletePolicies;
