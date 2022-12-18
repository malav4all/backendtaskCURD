const express = require('express');
const Routes = express.Router();
const {register} = require('../controller/userController');

Routes.post('/register', register);

module.exports = Routes;
