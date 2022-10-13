const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = function () {
    router.post('/createUser', userController.createUser);
    router.get('/userById/:id', userController.getUserById);

    return router;
}