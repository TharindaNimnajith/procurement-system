const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');

// route to insert users
router.post('/create', UserController.createUsers);

// route to retrieve users list
router.get('/getUsers', UserController.getUsers);

// route to retrieve a single user
router.get('/getUsers/:id', UserController.getUser);

// route to edit users
router.put('/editUsers', UserController.editUsers);

// route to delete users
router.delete('/deleteUsers', UserController.deleteUsers);

// route to signup
router.post('/signup', UserController.signup);

// route to login
router.post('/login', UserController.login);

// route to retrieve site managers list
router.get('/getSiteManagers', UserController.getSiteManagers);

// route to retrieve suppliers list
router.get('/getSuppliers', UserController.getSuppliers);

module.exports = router;
