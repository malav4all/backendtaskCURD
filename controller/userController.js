const UserService = require('../services/userService');
const User = require('../dto/userdto');
const bcrypt = require('../utils/encrypt');
const token = require('../utils/token');
const joi = require('joi');
const userController = {
  register(req, res) {
    let name = req.body.name;
    let hashPassword = bcrypt.doEncrypt(req.body.password);
    let email = req.body.email;
    let phone = req.body.email;

    const schema = joi.object({
      name: joi.string().min(3).max(15).required(),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net']},
      }),
      phone: joi.number().less(10).required(),
    });
    let result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    // res.send(result);
    const user = new User(name, hashPassword, phone, email);

    const promise = UserService.addUser(user);
    promise
      .then((data) => {
        res.status(201).json({
          message: 'Registration Successfully',
        });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  },
  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    const promise = UserService.login(email);
    promise
      .then((data) => {
        let pass = bcrypt.compare(password, data.password);
        if (email === data.email && pass === true) {
          const {password, ...others} = data._doc;
          const accessToken = token.createToken({
            id: data._id,
            isAdmin: data.isAdmin,
          });
          res.status(200).json({...others, accessToken});
        } else {
          res.status(500).json({
            message: 'Email And Password Not Match.....',
          });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //User Update By Verify Token
  updateUser(req, res) {
    let id = req.params.id;
    let userData = req.body;
    const promise = UserService.updateUser(id, userData);
    promise
      .then((data) => {
        console.log(data);
        res.status(201).json({
          message: 'Update Successfully',
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  // Delete User
  deleteUser(req, res) {
    let id = req.params.id;
    const promise = UserService.delete(id);
    promise
      .then((data) => {
        console.log(data);
        res.status(200).json({
          message: 'Delete Successfully',
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  // fetch All Users
  fetchAllUser(req, res) {
    const query = req.query.new;
    console.log(query);
    const promise = UserService.getAllUsers(query);
    promise
      .then((data) => {
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};

module.exports = userController;
