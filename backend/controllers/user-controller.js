const HttpError = require('../models/http-errors');
const Users = require('../models/user.model');

// method to insert users
const createUsers = async (req, res, next) => {
  const {
    name,
    address,
    email,
    password,
    type
  } = req.body;

  const UsersItem = new Users({
    name,
    address,
    email,
    password,
    type
  });

  try {
    await UsersItem.save();
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500);
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    });
    return next(error);
  }

  res.status(201).json({
    usersItem: UsersItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  });
};

// method to retrieve users list
const getUsers = async (req, res) => {
  Users.find({})
    .then((users) =>
      res.json({
        users: users,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

// method to edit users
const editUsers = async (req, res) => {
  const {
    users,
    id
  } = req.body;

  const query = {
    '_id': id
  };

  Users.findOneAndUpdate(query, users, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      });
    return res.json({
      users: item,
      message: 'Edited Successfully'
    });
  });
};

// method to delete users
const deleteUsers = async (req, res) => {
  const {
    id
  } = req.body;

  Users.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.json({
    message: 'Deleted Successfully'
  });
};

// method to retrieve a single user
const getUser = async (req, res, next) => {
  let user;

  const {
    id
  } = req.params;

  try {
    user = await Users.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(user);
};

// method to retrieve a site manager
const getSiteManagers = async (req, res, next) => {
  let siteManagers;

  try {
    siteManagers = await Users.find({
      type: 'Site Manager'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(siteManagers);
};

// method to retrieve a supplier
const getSuppliers = async (req, res, next) => {
  let suppliers;

  try {
    suppliers = await Users.find({
      type: 'Supplier'
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(suppliers);
};

// method to signup
const signup = async (req, res, next) => {
  const {
    name,
    address,
    email,
    password,
    type,
    typeDefault
  } = req.body;

  let existingUser;

  try {
    existingUser = await Users.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    res.json({
      message: 'Signing up failed, please try again later.',
      login: 0
    });
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User already exists, please login instead.'
    );
    res.json({
      message: 'User already exists, please login instead.',
      login: 0
    });
    return next(error);
  }

  const createdUser = new Users({
    name,
    address,
    email,
    password,
    type,
    typeDefault
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    res.json({message: 'Signing up failed, please try again.', login: 0});
    return next(error);
  }

  res.status(201).json({
    user: createdUser.toObject({getters: true}),
    login: 1,
    name: createdUser.name,
    type: createdUser.type,
    typeDefault: createdUser.typeDefault,
    message: 'Signed Up'
  });
};

// method to login
const login = async (req, res, next) => {
  const {email, password} = req.body;
  let existingUser;

  try {
    existingUser = await Users.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      'Login up failed, please try again later.',
      500
    );
    res.json({message: 'Login up failed, please try again later.', login: 0});
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid username or password.', 401);
    res.json({message: 'Invalid username or password', login: 0});
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    login: 1,
    name: existingUser.name,
    type: existingUser.type,
    typeDefault: existingUser.typeDefault,
    userDetails: existingUser
  });
};

exports.createUsers = createUsers;
exports.editUsers = editUsers;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.deleteUsers = deleteUsers;
exports.login = login;
exports.signup = signup;
exports.getSiteManagers = getSiteManagers;
exports.getSuppliers = getSuppliers;
